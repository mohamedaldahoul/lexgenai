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

  const handleDownload = async () => {
    if (sessionId) {
      try {
        // Create a link to download the PDF from the server
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
        const downloadUrl = `${apiBaseUrl}/api/generate-pdf?session_id=${sessionId}`;
        window.open(downloadUrl, '_blank');
        
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } catch (error) {
        console.error("Error downloading document:", error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Document Preview</h2>
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200 max-h-[500px] overflow-y-auto">
        <pre className="whitespace-pre-wrap font-mono text-sm">{preview || "No preview available."}</pre>
      </div>
      <button
        onClick={handleDownload}
        disabled={!sessionId}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        Download Document
      </button>
    </div>
  );
} 