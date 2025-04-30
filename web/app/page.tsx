'use client';

import { useEffect } from 'react';
import DocumentForm from './components/document/DocumentForm';
import PromotionSection from './components/PromotionSection';
import Header from './components/Header';
import DocumentPreviews from './components/DocumentPreviews';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import HowItWorks from './components/HowItWorks';
import Advantages from './components/Advantages';

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
    <div className="min-h-screen bg-[#1A365D]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <PromotionSection />
          <DocumentForm />
        </div>
      </div>

      {/* How It Works Section */}
      <HowItWorks />
      <Advantages />


      {/* Document Previews Section */}
      <DocumentPreviews />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}
