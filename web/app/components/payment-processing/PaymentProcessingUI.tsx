'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PaymentProcessingUIProps {
  progress: number;
  currentCatchphrase: string;
  currentEmoji: string;
  status: 'processing' | 'success' | 'error';
  errorMessage: string;
  downloadUrl?: string;
}

export default function PaymentProcessingUI({
  progress,
  currentCatchphrase,
  currentEmoji,
  status,
  errorMessage,
  downloadUrl,
}: PaymentProcessingUIProps) {
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  useEffect(() => {
    if (status === 'success' && downloadUrl) {
      const timer = setTimeout(() => {
        setShowDownloadButton(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, downloadUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {status === 'processing' ? 'Generating Your Document' : 
             status === 'success' ? 'Document Ready!' : 'Oops!'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {status === 'processing' ? currentCatchphrase : 
             status === 'success' ? 'Your document has been generated successfully!' : 
             'Something went wrong while generating your document.'}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {status === 'processing' && (
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    {currentEmoji} {Math.round(progress)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                ></div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{errorMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {status === 'success' && showDownloadButton && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Success</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Your document is ready to download!</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-4">
            {status === 'success' && showDownloadButton && (
              <a
                href={downloadUrl}
                download
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Download Document
              </a>
            )}
            <Link
              href="/"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 