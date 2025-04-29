'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const redirectToCheckout = async () => {
      try {
        const stripe = await stripePromise;
        if (!stripe) throw new Error('Stripe failed to initialize.');
        
        if (sessionId) {
          const { error } = await stripe.redirectToCheckout({
            sessionId,
          });
          
          if (error) {
            console.error('Error:', error);
          }
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    redirectToCheckout();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to checkout...</h1>
        <p className="text-gray-600">Please wait while we redirect you to the secure payment page.</p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    </div>
  );
} 