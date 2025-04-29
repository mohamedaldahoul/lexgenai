import Link from 'next/link';

interface PaymentProcessingUIProps {
  progress: number;
  currentCatchphrase: string;
  currentEmoji: string;
  status: 'processing' | 'success' | 'error';
  errorMessage: string;
  downloadUrl: string;
}

export default function PaymentProcessingUI({
  progress,
  currentCatchphrase,
  currentEmoji,
  status,
  errorMessage,
  downloadUrl,
}: PaymentProcessingUIProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-5">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <Link href="/" className="text-2xl font-bold text-slate-900 inline-flex items-center mb-5">
          Lex<span className="text-blue-600">Gen</span>AI
        </Link>

        <div className="text-6xl mb-5 animate-bounce">{currentEmoji}</div>
        <h1 className="text-2xl font-semibold text-slate-900 mb-5">Processing Your Payment</h1>

        <div className="w-full h-1.5 bg-slate-200 rounded-full mb-5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-lg italic text-slate-600 mb-5 min-h-[54px]">
          &ldquo;{currentCatchphrase}&rdquo;
        </div>

        <p className="text-sm text-slate-500 mb-5">
          This may take up to 2 minutes. Thank you for your patience!
        </p>

        {status === 'success' && (
          <div className="bg-emerald-50 border border-emerald-500 text-emerald-600 p-4 rounded-lg mb-5">
            Your document has been generated successfully!{' '}
            <a
              href={downloadUrl}
              className="text-emerald-600 underline hover:text-emerald-700"
              download
            >
              Click here to download
            </a>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-50 border border-red-500 text-red-600 p-4 rounded-lg mb-5">
            {errorMessage}
          </div>
        )}

        {(status === 'success' || status === 'error') && (
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 hover:-translate-y-0.5"
          >
            Return to Home
          </Link>
        )}
      </div>
    </div>
  );
} 