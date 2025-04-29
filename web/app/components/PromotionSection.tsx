'use client';

export default function Hero() {
  return (
    <div className="flex items-start">
      <div className="flex-1 pt-8">
        <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
          AI-Generated Legal<br />
          Documents<br />
          Tailored to Your Business
        </h1>
        
        <p className="text-xl text-white/90 mb-8">
          Our AI technology creates custom legal documents instantly.<br />
          No lawyers, no waiting, no excessive fees. Get exactly what<br />
          you need in minutes, not days.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white text-lg">
              AI-Powered Customization for Your Specific Business
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white text-lg">
              Instant Download - Ready in 2 Minutes
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white text-lg">
              Save $500+ Compared to Traditional Legal Services
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white text-lg">
              State-Specific Legal Compliance Built In
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}