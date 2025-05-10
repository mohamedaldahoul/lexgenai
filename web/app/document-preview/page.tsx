"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/utils/axios";

export default function DocumentPreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;
    const fetchDocument = async () => {
      try {
        const response = await api.get(`/api/document-details?session_id=${sessionId}`);
        setPreview(response.data.preview);
      } catch {
        setPreview("Failed to load document preview.");
      } finally {
        setLoading(false);
      }
    };
    fetchDocument();
  }, [sessionId]);

  if (loading) return <div>Loading...</div>;

  const handleDownload = async (format: 'pdf' | 'docx') => {
    if (sessionId) {
      try {
        // Create a link to download the document from the server
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
        const downloadUrl = `${apiBaseUrl}/api/generate-${format}?session_id=${sessionId}`;
        window.open(downloadUrl, '_blank');
        
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } catch (error) {
        console.error(`Error downloading ${format.toUpperCase()} document:`, error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Document Preview</h2>
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200 max-h-[500px] overflow-y-auto">
        <pre className="whitespace-pre-wrap font-mono text-sm">{preview || "No preview available."}</pre>
      </div>
      
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => handleDownload('pdf')}
          disabled={!sessionId}
          className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download PDF</span>
        </button>

        <button
          onClick={() => handleDownload('docx')}
          disabled={!sessionId}
          className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download Word</span>
        </button>
      </div>
    </div>
  );
} 