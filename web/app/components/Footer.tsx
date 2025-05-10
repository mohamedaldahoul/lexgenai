'use client';

import Link from 'next/link';

const Features = [
  {
    title: "Secure Payment",
    description: "We use Stripe for secure payments. Your financial information is always protected.",
    icon: "🔒"
  },
  {
    title: "Secure Payment",
    description: "We use Stripe for secure payments. Your financial information is always protected.",
    icon: "🔒"
  },
  {
    title: "Secure Payment",
    description: "We use Stripe for secure payments. Your financial information is always protected.",
    icon: "🔒"
  }
]


const Footer = () => {
  return (
    <footer className="bg-[#0f2a4d] text-gray-300 py-16">
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
              <li>
                {/* <Link href="mailto:support@lexgenai.com" className="hover:text-blue-400">Contact</Link> */}
                  <a href= "mailto:support@lexgenai.com" className="hover:text-blue-400">Contact</a>
                </li>
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
        {Features.map((feature) => (
          <div key={feature.title} className="flex items-center space-x-3 bg-[#262c35] p-4 rounded-lg">
            <div className="bg-[#b89457] p-2 rounded-full">
              <span className="text-white font-medium">{feature.icon}</span>
            </div>
            <span className="text-white font-medium">{feature.title}</span>
          </div>
          
))}
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-300 mt-8">
          © 2023 LexGenAI. All rights reserved. <a className="text-decoration-line: underline hover:text-blue-400" href="mailto:support@lexgenai.com">support@lexgenai.com</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 