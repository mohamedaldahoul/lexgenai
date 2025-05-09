"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/utils/axios';

export default function PaymentProcessingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) return;
    const checkPaymentStatus = async () => {
      try {
        const response = await api.get(`/api/payment-success?session_id=${sessionId}`);
        const data = response.data;
        if (data.success) {
          router.replace(`/document-preview?session_id=${sessionId}`);
        } else if (data.status === 'processing') {
          setTimeout(checkPaymentStatus, 5000);
        }
      } catch (error) {
        // Optionally handle error
        console.error('Error checking payment status:', error);
      }
    };
    checkPaymentStatus();
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">Processing your payment...</h1>
        <p className="text-gray-600">Please wait while we verify your payment and prepare your document.</p>
      </div>
    </div>
  );
} 