"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/utils/axios";
import { AxiosError } from "axios";

interface Revision {
  revision_id: string;
  status: string;
  timestamp: string;
  comment: string;
}

export default function DocumentPreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const revisionId = searchParams.get("revision_id");
  
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'pending' | 'completed'>('idle');
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [showOriginal, setShowOriginal] = useState(!revisionId);
  const [latestRevisionId, setLatestRevisionId] = useState<string | null>(revisionId);

  useEffect(() => {
    if (!sessionId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch revisions first
        const revisionsResponse = await api.get(`/api/document-revisions/${sessionId}`);
        const fetchedRevisions = revisionsResponse.data.revisions || [];
        setRevisions(fetchedRevisions);

        // Determine which document to fetch
        if (revisionId) {
          // If a revision ID is specified, fetch that revision
          const revisionResponse = await api.get(`/api/revised-document/${revisionId}`);
          setPreview(revisionResponse.data.preview);
          setLatestRevisionId(revisionId);
          setShowOriginal(false);
        } else if (fetchedRevisions.length > 0) {
          // If there are revisions but none specified, fetch the latest completed revision
          const completedRevisions = fetchedRevisions.filter((rev: Revision) => rev.status === 'completed');
          if (completedRevisions.length > 0) {
            const latestRev = completedRevisions[0]; // Revisions are sorted newest first
            const revisionResponse = await api.get(`/api/revised-document/${latestRev.revision_id}`);
            setPreview(revisionResponse.data.preview);
            setLatestRevisionId(latestRev.revision_id);
            
            // Still set showOriginal to true by default so they see revisions are available
            setShowOriginal(true);
          } else {
            // If no completed revisions, fetch the original
            const originalResponse = await api.get(`/api/document-details?session_id=${sessionId}`);
            setPreview(originalResponse.data.preview);
            setShowOriginal(true);
          }
        } else {
          // If no revisions, fetch the original
          const originalResponse = await api.get(`/api/document-details?session_id=${sessionId}`);
          setPreview(originalResponse.data.preview);
          setShowOriginal(true);
        }
      } catch (error) {
        console.error("Error fetching document data:", error);
        setPreview("Failed to load document preview.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId, revisionId]);

  const handleDownload = async (format: 'pdf' | 'docx') => {
    if (!sessionId) return;
    
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
      let downloadUrl;
      
      if (!showOriginal && latestRevisionId) {
        // Download revised document
        downloadUrl = `${apiBaseUrl}/api/download-revision/${format}/${latestRevisionId}`;
      } else {
        // Download original document
        downloadUrl = `${apiBaseUrl}/api/generate-${format}?session_id=${sessionId}`;
      }
      
      window.open(downloadUrl, '_blank');
      
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error(`Error downloading ${format.toUpperCase()} document:`, error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim() || !sessionId) return;
    
    setSubmitting(true);
    setUpdateStatus('pending');
    
    try {
      const response = await api.post('/api/document-feedback', {
        sessionId,
        comment
      });
      
      if (response.data.success) {
        setFeedbackSubmitted(true);
        setComment("");
        
        // If we got a revision ID back, fetch the revised document
        if (response.data.revision_id) {
          try {
            const revisionResponse = await api.get(`/api/revised-document/${response.data.revision_id}`);
            setPreview(revisionResponse.data.preview);
            setLatestRevisionId(response.data.revision_id);
            setShowOriginal(false);
            
            // Also refresh the revisions list
            const revisionsResponse = await api.get(`/api/document-revisions/${sessionId}`);
            setRevisions(revisionsResponse.data.revisions || []);
            
            // Set status to completed and reset feedback submitted after 5 seconds
            setUpdateStatus('completed');
            setTimeout(() => {
              setFeedbackSubmitted(false);
            }, 5000);
          } catch (error) {
            console.error("Error fetching revised document:", error);
            setUpdateStatus('idle');
            setFeedbackSubmitted(false);
          }
        } else {
          setUpdateStatus('completed');
          // Reset feedback submitted after 5 seconds
          setTimeout(() => {
            setFeedbackSubmitted(false);
          }, 5000);
        }
      } else {
        alert("We received your feedback but couldn't update the document automatically. Our team will review it.");
        setUpdateStatus('idle');
        setFeedbackSubmitted(false);
      }
    } catch (error: unknown) {
      console.error("Error submitting feedback:", error);
      
      // Handle document type validation errors
      const axiosError = error as AxiosError<{
        validation_failed?: boolean;
        message?: string;
        explanation?: string;
        original_document_type?: string;
      }>;
      
      if (axiosError.response?.status === 400 && axiosError.response.data && 'validation_failed' in axiosError.response.data) {
        const validationData = axiosError.response.data;
        let errorMessage = "Your request could not be processed: ";
        
        if (validationData.message === 'Document type change detected') {
          errorMessage = `We cannot change the document type from "${validationData.original_document_type}" to another type.\n\n`;
          
          if (validationData.explanation) {
            errorMessage += `Reason: ${validationData.explanation}\n\n`;
          }
          
          errorMessage += "Please submit a revision request that maintains the same document type.";
        } else {
          errorMessage += validationData.message || "Unknown validation error";
        }
        
        alert(errorMessage);
      } else {
        alert("Failed to submit your feedback. Please try again.");
      }
      
      setUpdateStatus('idle');
      setFeedbackSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleDocumentVersion = () => {
    if (!showOriginal && latestRevisionId) {
      // Currently showing revision, switch to original
      const fetchOriginal = async () => {
        setLoading(true);
        try {
          const response = await api.get(`/api/document-details?session_id=${sessionId}`);
          setPreview(response.data.preview);
          setShowOriginal(true);
        } catch (error) {
          console.error("Error fetching original document:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchOriginal();
    } else if (latestRevisionId) {
      // Currently showing original, switch to latest revision
      const fetchRevision = async () => {
        setLoading(true);
        try {
          const response = await api.get(`/api/revised-document/${latestRevisionId}`);
          setPreview(response.data.preview);
          setShowOriginal(false);
        } catch (error) {
          console.error("Error fetching revised document:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchRevision();
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Document Preview/Revision</h2>
      
      {revisions.length > 0 && latestRevisionId && (
        <div className="mb-4">
          <button 
            onClick={toggleDocumentVersion}
            className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300"
          >
            {showOriginal ? "View Revised Document" : "View Original Document"}
          </button>
          
          {!showOriginal && (
            <div className="mt-2 text-sm text-gray-600">
              <strong>Currently viewing:</strong> Revised document with your requested changes
            </div>
          )}
        </div>
      )}
      
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200 max-h-[500px] overflow-y-auto">
        <pre className="whitespace-pre-wrap font-mono text-sm">{preview || "No preview available."}</pre>
      </div>
      
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-8">
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
      
      {/* Request Changes Section */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">Request Document Changes</h3>
        
        {feedbackSubmitted ? (
          <div className={`border rounded-md p-4 ${updateStatus === 'pending' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            <p className="font-medium">{updateStatus === 'pending' ? 'Processing your request...' : 'Thank you for your feedback!'}</p>
            <p className="text-sm mt-1">
              {updateStatus === 'pending' 
                ? "We're updating your document with the requested changes." 
                : "We've updated your document with the requested changes."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleCommentSubmit}>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                What changes would you like to make to your document?
              </label>
              <textarea
                id="comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Please specify any sections that need revision, additional clauses you'd like to include, or any other changes..."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={submitting || !comment.trim()}
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Update"}
            </button>
          </form>
        )}
      </div>
      
      {/* Revisions History */}
      {revisions.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Revision History</h3>
          <div className="space-y-4">
            {revisions.map((revision) => (
              <div key={revision.revision_id} className="border rounded-md p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      {new Date(revision.timestamp).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Status: <span className={revision.status === 'completed' ? 'text-green-600' : revision.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}>
                        {revision.status.charAt(0).toUpperCase() + revision.status.slice(1)}
                      </span>
                    </p>
                  </div>
                  {revision.status === 'completed' && (
                    <button
                      onClick={() => {
                        router.push(`/document-preview?session_id=${sessionId}&revision_id=${revision.revision_id}`);
                      }}
                      className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100"
                    >
                      View
                    </button>
                  )}
                </div>
                <p className="text-sm mt-2 bg-gray-50 p-2 rounded">
                  {revision.comment.length > 150 ? revision.comment.substring(0, 150) + '...' : revision.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 