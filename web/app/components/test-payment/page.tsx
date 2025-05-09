'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TestPaymentPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to payment processing with a mock session ID
    router.push('api/payment-processing?session_id=test_session_123');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Redirecting to Payment Processing...</h1>
        <p className="text-gray-600">You will be automatically redirected to test the payment processing page.</p>
      </div>
    </div>
  );
} 