'use client';

import { useState } from 'react';
import type { FormData } from '@/app/components/document/DocumentForm';

export default function TestPage() {
  const [generatedDocument, setGeneratedDocument] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const testFormData: FormData = {
    document_type: 'nda',
    business_name: 'Test Company Ltd',
    business_type: 'Limited Liability Company (LLC)',
    country: 'UK',
    language: 'English',
    industry: 'Technology',
    protection_level: '2',
    clause_confidentiality: true,
    clause_arbitration: true,
    clause_termination: false,
    clause_ip: true,
    additional_instructions: 'This is a test document generation.'
  };

  const handleTestGeneration = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/preview-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testFormData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate document preview');
      }

      const data = await response.json();
      setGeneratedDocument(data.preview);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate document');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">AI Document Generation Test</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Test Configuration:</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
          {JSON.stringify(testFormData, null, 2)}
        </pre>
      </div>

      <button
        onClick={handleTestGeneration}
        disabled={isLoading}
        className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Generating...' : 'Generate Test Document'}
      </button>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {generatedDocument && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Generated Document:</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 whitespace-pre-wrap">
            {generatedDocument}
          </div>
        </div>
      )}
    </div>
  );
} 