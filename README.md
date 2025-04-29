# LexGenAI - Legal Document Generator

A full-stack application for generating professional legal documents using AI. Built with Next.js, Flask, and powered by OpenAI.

## 🚀 Live Demo
[Coming Soon]

## ✨ Features

- 📄 Generate various legal documents (NDA, Terms of Service, Privacy Policy, etc.)
- 🎯 Customize documents with business-specific details
- 💳 Secure payment processing with Stripe
- 🤖 AI-powered document generation using OpenAI
- 📱 Modern, responsive UI built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend (web/)
- Next.js 14
- TypeScript
- Tailwind CSS
- Stripe Elements

### Backend (server/)
- Flask
- Python
- OpenAI API
- Stripe API
- ReportLab (PDF generation)

## 🏗️ Local Development Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.8+
- Stripe account
- OpenAI API key

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```bash
SECRET_KEY=your-secret-key-here
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
OPENAI_API_KEY=your-openai-api-key
```

5. Start the development server:
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

3. Create `.env.local` file:
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## 🚀 Production Deployment

### Backend Deployment (Flask)
1. Install production dependencies:
```bash
pip install gunicorn
```

2. Set up environment variables on your hosting platform
3. Configure CORS settings for production domain
4. Use gunicorn for production server:
```bash
gunicorn app:app
```

### Frontend Deployment (Next.js)
1. Build the application:
```bash
npm run build
# or
yarn build
```

2. Set up environment variables on your hosting platform
3. Deploy the built application

## 🔒 Security Considerations

- All API keys and secrets are stored as environment variables
- CORS is configured for specific domains in production
- Input validation on both frontend and backend
- Secure payment processing through Stripe
- Rate limiting on API endpoints

## 📝 API Documentation

### Backend Endpoints

- `POST /api/create-checkout-session`
  - Creates Stripe checkout session
  - Returns session ID for frontend redirect

- `GET /api/payment-success`
  - Verifies payment status
  - Triggers document generation

- `GET /api/download/<filename>`
  - Securely serves generated documents

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Mohamed Al-Dahoul - Initial work - [mohamedaldahoul](https://github.com/mohamedaldahoul) 