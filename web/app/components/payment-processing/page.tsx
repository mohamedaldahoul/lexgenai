'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PaymentProcessingUI from './PaymentProcessingUI';
import api from '@/utils/axios';

const catchphrases = [
  "Turning legal jargon into plain English...",
  "Objection overruled! Your document is being prepared...",
  "Briefing the AI judge on your requirements...",
  "Citing precedents and adding legal pizzazz...",
  "Examining the fine print so you don't have to...",
  "Translating legalese into something actually readable...",
  "Preparing to make opposing counsel jealous...",
  "Dotting the i's, crossing the t's, and adding some legal flair...",
  "Summoning the ghost of legal documents past...",
  "Arguing with the AI about comma placement...",
  "Deliberating on the perfect legal tone...",
  "Calling expert witnesses to verify your document...",
  "Striking hearsay from the record...",
  "Preparing closing arguments for your document...",
  "Instructing the jury of AI models on your case..."
];

const legalEmojis = [
  "⚖️", // scales of justice
  "📜", // scroll
  "📝", // memo
  "🧑‍⚖️", // judge
  "👨‍💼", // person in suit
  "🔍", // magnifying glass
  "📋", // clipboard
  "🗂️", // card index dividers
  "📊", // bar chart
  "🏛️", // classical building
  "🤝", // handshake
  "📁", // file folder
  "🗄️", // file cabinet
  "📔", // notebook with decorative cover
  "🖋️"  // fountain pen
];

export default function PaymentProcessingPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [progress, setProgress] = useState(0);
  const [currentCatchphrase, setCurrentCatchphrase] = useState(catchphrases[0]);
  const [currentEmoji, setCurrentEmoji] = useState(legalEmojis[0]);
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      setErrorMessage('No session ID provided');
      return;
    }

    const startTime = new Date().getTime();
    const animationInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = (currentTime - startTime) / 1000;
      const totalTime = 120;
      const newProgress = Math.min(95, (elapsedTime / totalTime) * 100);
      setProgress(newProgress);

      if (Math.floor(elapsedTime) % 5 === 0) {
        setCurrentCatchphrase(catchphrases[Math.floor(Math.random() * catchphrases.length)]);
        setCurrentEmoji(legalEmojis[Math.floor(Math.random() * legalEmojis.length)]);
      }
    }, 1000);

    const checkPaymentStatus = async (retryCount = 0, maxRetries = 3) => {
      try {
        const response = await api.get(`/payment-success?session_id=${sessionId}`);
        const data = response.data;

        if (data.success) {
          clearInterval(animationInterval);
          setProgress(100);
          setStatus('success');
          setDownloadUrl(data.download_url);
          
          // Auto-download the file
          const link = document.createElement('a');
          link.href = data.download_url;
          link.download = data.download_url.split('/').pop() || 'document.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else if (data.status === 'processing') {
          setTimeout(() => {
            checkPaymentStatus();
          }, 5000);
        } else {
          throw new Error(data.error || 'Failed to generate document');
        }
      } catch (error) {
        if (error instanceof Error && error.message.includes('503') && retryCount < maxRetries) {
          setTimeout(() => {
            checkPaymentStatus(retryCount + 1, maxRetries);
          }, (retryCount + 1) * 2000);
          return;
        }
        
        clearInterval(animationInterval);
        setProgress(100);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    };

    checkPaymentStatus();

    return () => clearInterval(animationInterval);
  }, [sessionId]);

  return (
    <PaymentProcessingUI
      progress={progress}
      currentCatchphrase={currentCatchphrase}
      currentEmoji={currentEmoji}
      status={status}
      errorMessage={errorMessage}
      downloadUrl={downloadUrl}
    />
  );
} 