# Legal Document Generator Frontend

This is the Next.js frontend for the Legal Document Generator application. It provides a user interface for document generation and payment processing.

## Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create a `.env.local` file in the web directory with the following variables:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key-here
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The application will start on http://localhost:3000

## Features

- Document generation form with various input fields
- Integration with Stripe for payment processing
- Real-time document preview
- Responsive design using Tailwind CSS

## Project Structure

- `app/`: Next.js app router pages and layouts
- `components/`: Reusable React components
  - `document/`: Document-related components
    - `DocumentForm.tsx`: Main form for document generation
- `public/`: Static assets
- `styles/`: Global styles and Tailwind CSS configuration

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
