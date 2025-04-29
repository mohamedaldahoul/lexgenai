# Legal Document Generator Backend

This is the Flask backend for the Legal Document Generator application. It handles document generation and payment processing using OpenAI's GPT-4 and Stripe.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the server directory with the following variables:
```
SECRET_KEY=your-secret-key-here
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
OPENAI_API_KEY=your-openai-api-key
```

4. Run the development server:
```bash
python app.py
```

The server will start on http://localhost:5000

## API Endpoints

### POST /api/preview-document
Generates a document preview based on the provided parameters without requiring payment.

### POST /api/create-checkout-session
Creates a Stripe checkout session for document generation with payment.

### POST /api/webhook
Handles Stripe webhook events for payment processing. 