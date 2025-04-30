'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link href="/" className="text-xl font-bold">
              <span className="text-white">Lex</span>
              <span className="text-[#b89457]">Gen</span>
              <span className="text-white">AI</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              AI-powered legal documents for modern businesses. Save time, reduce costs, and get the legal protection you need.
            </p>
          </div>

          {/* Documents Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Documents</h3>
            <ul className="space-y-2">
              <li><Link href="/documents/nda" className="hover:text-blue-400">Non-Disclosure Agreement</Link></li>
              <li><Link href="/documents/terms" className="hover:text-blue-400">Terms of Service</Link></li>
              <li><Link href="/documents/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link href="/documents/contract" className="hover:text-blue-400">Freelance Contract</Link></li>
              <li><Link href="/documents/employment" className="hover:text-blue-400">Employment Agreement</Link></li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-blue-400">About Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-blue-400">How It Works</Link></li>
              <li><Link href="/testimonials" className="hover:text-blue-400">Testimonials</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/legal/terms" className="hover:text-blue-400">Terms of Service</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link href="/legal/cookies" className="hover:text-blue-400">Cookie Policy</Link></li>
              <li><Link href="/legal/disclaimer" className="hover:text-blue-400">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 mb-8">
          <div className="flex items-center space-x-3 bg-[#1E293B] p-4 rounded-lg">
            <div className="bg-[#b89457] p-2 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-white font-medium">Secure Payment</span>
          </div>
          <div className="flex items-center space-x-3 bg-[#1E293B] p-4 rounded-lg">
            <div className="bg-[#b89457] p-2 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span className="text-white font-medium">Privacy Protected</span>
          </div>
          <div className="flex items-center space-x-3 bg-[#1E293B] p-4 rounded-lg">
            <div className="bg-[#b89457] p-2 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-white font-medium">24/7 Support</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 mt-8">
          © 2023 LexGenAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 