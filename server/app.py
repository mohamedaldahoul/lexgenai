import os
import json
import uuid
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from dotenv import load_dotenv
import openai
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_JUSTIFY, TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib import colors
import stripe
import time

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "default-secret-key")

# Configure CORS
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Configure rate limiting
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://",
)

# Configure Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
STRIPE_PUBLISHABLE_KEY = os.getenv("STRIPE_PUBLISHABLE_KEY")

# Configure OpenAI
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise ValueError("OPENAI_API_KEY environment variable is not set")
openai.api_key = openai_api_key

# Document types and their descriptions
DOCUMENT_TYPES = {
    "nda": "Non-Disclosure Agreement (NDA)",
    "terms": "Website Terms of Service",
    "privacy": "Privacy Policy",
    "contract": "Freelance Contract",
    "employee": "Employment Agreement",
    "partnership": "Partnership Agreement"
}

# Ensure the downloads directory exists
DOWNLOAD_FOLDER = os.path.join(os.getcwd(), "static", "downloads")
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

@app.route('/api/create-checkout-session', methods=['POST'])
@limiter.limit("10 per minute")
def create_checkout_session():
    try:
        data = request.get_json()
        form_data = data.get('formData', {})
        
        # Create a Stripe checkout session
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': f'Legal Document: {DOCUMENT_TYPES.get(form_data.get("document_type", ""), "Custom Document")}',
                            'description': 'AI-generated legal document tailored to your business needs',
                        },
                        'unit_amount': 2000,  # £20.00 in cents
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=request.host_url.rstrip('/') + '/payment-processing?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=request.host_url.rstrip('/') + '/payment-processing?status=cancelled',
            metadata={
                'form_data': json.dumps(form_data)
            }
        )
        
        return jsonify({
            'sessionId': checkout_session.id
        })
    except Exception as e:
        app.logger.error(f"Stripe error: {str(e)}")
        return jsonify({'error': str(e)}), 400

@app.route('/api/payment-success', methods=['GET'])
@limiter.limit("20 per minute")
def payment_success():
    session_id = request.args.get('session_id')
    
    try:
        session = stripe.checkout.Session.retrieve(session_id)
        form_data = json.loads(session.metadata.get('form_data', '{}'))
        
        start_time = time.time()
        timeout_limit = 25
        
        max_retries = 2
        retry_delay = 1
        
        for attempt in range(max_retries):
            try:
                if time.time() - start_time > timeout_limit:
                    return jsonify({
                        'status': 'processing',
                        'message': 'Your document is still being generated. Please wait a moment and try again.'
                    }), 202
                
                document_result = generate_document(form_data)
                
                if document_result.get('success'):
                    return jsonify(document_result)
                else:
                    error_msg = document_result.get('error', 'Unknown error')
                    app.logger.error(f"Document generation failed: {error_msg}")
                    
                    if attempt < max_retries - 1:
                        time.sleep(retry_delay)
                        retry_delay *= 2
                    else:
                        return jsonify({'error': f'Failed to generate document after {max_retries} attempts: {error_msg}'}), 500
            
            except Exception as doc_error:
                app.logger.error(f"Document generation exception (attempt {attempt+1}/{max_retries}): {str(doc_error)}")
                
                if attempt < max_retries - 1:
                    time.sleep(retry_delay)
                    retry_delay *= 2
                else:
                    return jsonify({'error': f"Document generation failed after {max_retries} attempts: {str(doc_error)}"}), 500
            
    except stripe.error.StripeError as e:
        app.logger.error(f"Stripe error: {str(e)}")
        return jsonify({'error': f"Payment verification failed: {str(e)}"}), 400
    except Exception as e:
        app.logger.error(f"Payment success route error: {str(e)}")
        return jsonify({'error': f"An unexpected error occurred: {str(e)}"}), 500

def generate_document(form_data):
    try:
        document_type = form_data.get('document_type')
        business_name = form_data.get('business_name')
        business_type = form_data.get('business_type')
        state = form_data.get('state')
        industry = form_data.get('industry')
        protection_level = form_data.get('protection_level', '2')
        
        clauses = []
        if form_data.get('clause_confidentiality'):
            clauses.append("Enhanced Confidentiality")
        if form_data.get('clause_arbitration'):
            clauses.append("Arbitration Provision")
        if form_data.get('clause_termination'):
            clauses.append("Advanced Termination Options")
        if form_data.get('clause_ip'):
            clauses.append("Intellectual Property Protection")
        
        additional_instructions = form_data.get('additional_instructions', '')
        
        prompt = f"""Generate a professional {DOCUMENT_TYPES.get(document_type, 'legal document')} for {business_name}, a {business_type} in the {industry} industry, operating in {state}.

Protection Level: {protection_level} out of 3

Special Clauses to Include: {', '.join(clauses) if clauses else 'None'}

Additional Instructions: {additional_instructions}

**Formatting Guidelines:**
- Use clear section headings in bold and all caps (e.g., **TERMS AND CONDITIONS**).
- Use proper indentation and line spacing for readability.
- Ensure signature fields are properly spaced and formatted as follows:

  **Signature:** ______________________  **Date:** _______________

- Use bullet points for lists where appropriate.
- Avoid overly dense paragraphs; break them up into short, digestible sections.
- Use legal language but ensure clarity for business professionals.

Format the document professionally with appropriate sections, headings, and legal language. Include all necessary legal provisions for this type of document in {state}.
"""

        max_retries = 3
        retry_delay = 2
        
        for attempt in range(max_retries):
            try:
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "You are a legal document generator that creates professional, legally-sound documents tailored to specific business needs and jurisdictions."},
                        {"role": "user", "content": prompt}
                    ],
                    timeout=30,
                    max_tokens=4000
                )
                
                document_text = response.choices[0].message.content
                break
                
            except Exception as e:
                if attempt < max_retries - 1:
                    time.sleep(retry_delay)
                    retry_delay *= 2
                else:
                    raise Exception(f"Failed to generate document after {max_retries} attempts: {str(e)}")
        
        unique_id = uuid.uuid4().hex[:8]
        filename = f"{document_type}_{unique_id}.pdf"
        filepath = os.path.join(DOWNLOAD_FOLDER, filename)
        
        create_pdf(document_text, filepath, business_name, DOCUMENT_TYPES.get(document_type, "Legal Document"))
        
        return {
            'success': True,
            'download_url': f'/api/download/{filename}'
        }
    
    except Exception as e:
        app.logger.error(f"Document generation error: {str(e)}")
        raise Exception(f"Failed to generate document: {str(e)}")

def create_pdf(text, filepath, business_name, document_type):
    doc = SimpleDocTemplate(filepath, pagesize=letter,
                          rightMargin=72, leftMargin=72,
                          topMargin=72, bottomMargin=72)
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'Title',
        parent=styles['Heading1'],
        fontSize=16,
        alignment=TA_CENTER,
        spaceAfter=20,
        textColor=colors.navy,
        fontName='Helvetica-Bold'
    )
    
    normal_style = ParagraphStyle(
        'Normal',
        parent=styles['Normal'],
        fontSize=11,
        alignment=TA_JUSTIFY,
        firstLineIndent=20,
        leading=14,
        spaceBefore=6,
        spaceAfter=6
    )
    
    header_style = ParagraphStyle(
        'Header',
        parent=styles['Heading2'],
        fontSize=13,
        spaceAfter=10,
        spaceBefore=15,
        textColor=colors.navy,
        fontName='Helvetica-Bold',
        borderWidth=1,
        borderColor=colors.lightgrey,
        borderPadding=5,
        borderRadius=2
    )
    
    content = []
    
    content.append(Paragraph(f"{document_type.upper()}", title_style))
    content.append(Paragraph(f"For: {business_name}", title_style))
    content.append(Spacer(1, 20))
    
    date_style = ParagraphStyle(
        'Date',
        parent=styles['Normal'],
        fontSize=11,
        alignment=TA_RIGHT,
        textColor=colors.darkgrey
    )
    content.append(Paragraph(f"Date: {datetime.now().strftime('%B %d, %Y')}", date_style))
    content.append(Spacer(1, 20))
    
    paragraphs = text.split('\n')
    for para in paragraphs:
        if para.strip():
            if para.strip().startswith('#'):
                header_text = para.replace('#', '').strip()
                content.append(Paragraph(header_text, header_style))
            elif para.strip().isupper() and len(para.strip()) > 3:
                content.append(Paragraph(para.strip(), header_style))
            elif para.strip().startswith(('•', '-', '*')):
                bullet_style = ParagraphStyle(
                    'Bullet',
                    parent=normal_style,
                    leftIndent=30,
                    firstLineIndent=0,
                    spaceBefore=3,
                    spaceAfter=3
                )
                content.append(Paragraph(para.strip(), bullet_style))
            elif "signature" in para.lower() or "sign" in para.lower() or "date:" in para.lower():
                sig_style = ParagraphStyle(
                    'Signature',
                    parent=normal_style,
                    spaceBefore=15,
                    spaceAfter=15
                )
                content.append(Paragraph(para, sig_style))
            else:
                content.append(Paragraph(para, normal_style))
            
            if para.strip().startswith('#') or para.strip().isupper():
                content.append(Spacer(1, 10))
            else:
                content.append(Spacer(1, 6))
    
    doc.build(content)

@app.route('/api/download/<filename>')
@limiter.limit("10 per minute")
def download_file(filename):
    return send_from_directory(DOWNLOAD_FOLDER, filename, as_attachment=True)

@app.route('/api/health', methods=['GET'])
def health_check():
    try:
        stripe.Account.retrieve()
        openai_status = "ok"
        try:
            openai.Model.list(timeout=5)
        except Exception as e:
            openai_status = f"error: {str(e)}"
        
        return jsonify({
            'status': 'healthy',
            'timestamp': datetime.now().isoformat(),
            'stripe': 'ok',
            'openai': openai_status
        })
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'error': str(e),
            'timestamp': datetime.now().isoformat()
        }), 500

@app.route('/api/preview-document', methods=['POST'])
def preview_document():
    try:
        data = request.json
        
        # Create a prompt based on the form data
        prompt = f"""Create a {data['document_type']} for {data['business_name']}, a {data['business_type']} in {data['country']}.
        Industry: {data['industry']}
        Protection Level: {data['protection_level']}
        Special Clauses:
        - Confidentiality: {'Yes' if data.get('clause_confidentiality') else 'No'}
        - Arbitration: {'Yes' if data.get('clause_arbitration') else 'No'}
        - Termination: {'Yes' if data.get('clause_termination') else 'No'}
        - IP Protection: {'Yes' if data.get('clause_ip') else 'No'}
        
        Additional Instructions: {data.get('additional_instructions', 'None')}
        
        Please generate a professional legal document based on these requirements."""

        # Call OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a legal document generation assistant. Create professional, well-structured legal documents based on the provided requirements."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=2000,
            temperature=0.7
        )

        # Extract the generated document
        generated_text = response.choices[0].message.content

        return jsonify({
            "preview": generated_text,
            "status": "success"
        })

    except Exception as e:
        return jsonify({
            "error": str(e),
            "status": "error"
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port) 