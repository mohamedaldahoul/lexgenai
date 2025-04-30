'use client';

import { useState } from 'react';
import { FormData } from './DocumentForm';

interface DocumentPreviewProps {
  formData: FormData;
  onBack: () => void;
  onProceedToPayment: () => void;
}

export default function DocumentPreview({ formData, onBack, onProceedToPayment }: DocumentPreviewProps) {
  const [preview, setPreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Fetch preview when component mounts
  useState(() => {
    fetchPreview();
  });

  const fetchPreview = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/preview-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate preview');
      }

      const data = await response.json();
      setPreview(data.preview);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate preview');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Generating preview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Back to Form
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Document Preview</h2>
      
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200 max-h-[500px] overflow-y-auto">
        <pre className="whitespace-pre-wrap font-mono text-sm">{preview}</pre>
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back to Edit
        </button>
        <button
          onClick={onProceedToPayment}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <span>Proceed to Payment</span>
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
} 