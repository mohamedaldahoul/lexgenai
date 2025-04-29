# Legal Document Generator

A full-stack application for generating professional legal documents using AI.

## Features

- Generate various types of legal documents (NDA, Terms of Service, Privacy Policy, etc.)
- Customize documents with business-specific details
- Secure payment processing with Stripe
- AI-powered document generation using OpenAI
- PDF document creation and download
- Modern, responsive UI

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Stripe Elements

### Backend
- Flask
- Python
- OpenAI API
- Stripe API
- ReportLab (PDF generation)

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the server directory with the following variables:
```
SECRET_KEY=your-secret-key-here
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
OPENAI_API_KEY=your-openai-api-key
```

5. Start the backend server:
```bash
python app.py
```

### Frontend Setup

1. Navigate to the web directory:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Fill out the document generation form with your business details
3. Click "Generate Document" to proceed to payment
4. Complete the payment process
5. Wait for the document to be generated
6. Download your generated document

## API Endpoints

### Backend API

- `POST /api/create-checkout-session`: Create a Stripe checkout session
- `GET /api/payment-success`: Check payment status and generate document
- `GET /api/download/<filename>`: Download generated document
- `GET /api/health`: Health check endpoint

## Development

### Running Tests

To test the payment processing flow:

1. Visit `http://localhost:3000/test-payment`
2. You'll be redirected to the payment processing page
3. The system will simulate document generation and download

### Environment Variables

Make sure to set up the following environment variables:

- `SECRET_KEY`: Flask secret key for session management
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `OPENAI_API_KEY`: Your OpenAI API key

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 