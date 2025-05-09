'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState, ReactNode } from 'react';

// Initialize Stripe outside of component to avoid re-initialization
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function StripeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by rendering children only after mounting
  return <>{mounted ? children : null}</>;
}

// Export the stripe promise for use in other components
export { stripePromise }; 