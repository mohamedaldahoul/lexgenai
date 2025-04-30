'use client';

import { useEffect } from 'react';
import DocumentForm from './components/document/DocumentForm';
import PromotionSection from './components/PromotionSection';
import Header from './components/Header';
import DocumentPreviews from './components/DocumentPreviews';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';

export default function Home() {
  // Initialize Stripe.js when the component mounts
  useEffect(() => {
    // Load Stripe.js script
    const stripeScript = document.createElement('script');
    stripeScript.src = 'https://js.stripe.com/v3/';
    stripeScript.async = true;
    document.body.appendChild(stripeScript);

    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(stripeScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-blue-600">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <PromotionSection />
          <DocumentForm />
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold text-primary mb-2">Select Document Type</h3>
              <p className="text-secondary">Choose from our list of professional legal documents</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold text-primary mb-2">Enter Your Details</h3>
              <p className="text-secondary">Provide your business information and preferences</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold text-primary mb-2">AI Customization</h3>
              <p className="text-secondary">Our AI tailors the document to your specific needs</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-lg font-semibold text-primary mb-2">Download & Use</h3>
              <p className="text-secondary">Get your ready-to-use legal document instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">The LexGen AI Advantage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Ready in 5 Minutes</h3>
              <p className="text-secondary">Get your legal documents instantly, saving time and money</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Country-Specific Legal Compliance</h3>
              <p className="text-secondary">Documents tailored to your jurisdiction&apos;s requirements</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Industry-Specific Customization</h3>
              <p className="text-secondary">Tailored to your business sector&apos;s unique requirements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Document Previews Section */}
      <DocumentPreviews />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}
