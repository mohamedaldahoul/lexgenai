'use client';

export default function Hero() {
  return (
    <div className="flex-1 flex flex-col justify-center px-8 text-white">
      <h1 className="text-4xl font-bold mb-4">
        AI-Generated Legal Documents
      </h1>
      <h2 className="text-2xl mb-6">
        Tailored to Your Business
      </h2>
      <ul className="space-y-3">
        <li className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
          Instant Customization for Your Specific Business
        </li>
        <li className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
          Smart Contracts - Ready in Minutes
        </li>
        <li className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
          Each Document Complete & Customized Legal Protection
        </li>
        <li className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
          State-Specific Legal Compliance Built-In
        </li>
      </ul>
    </div>
  );
} 