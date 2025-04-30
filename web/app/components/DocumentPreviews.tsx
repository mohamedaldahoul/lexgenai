import React, { useState } from 'react';

export default function DocumentPreviews() {
  const [activeTab, setActiveTab] = useState('employment');

  const tabs = [
    { id: 'employment', label: 'Employment Contract' },
    { id: 'nda', label: 'Non-Disclosure Agreement' },
    { id: 'terms', label: 'Terms of Service' },
    { id: 'privacy', label: 'Privacy Policy' },
  ];

  // Sample document content for each tab
  const documentContent = {
    employment: (
      <>
        <h3 className="text-lg font-bold mb-3">EMPLOYMENT CONTRACT</h3>
        <p className="mb-2">This Employment Contract (&quot;Contract&quot;) is made between:</p>
        <p className="mb-4"><strong>EMPLOYER:</strong> [Company Name], a company registered under the laws of [Country]</p>
        <p className="mb-4"><strong>EMPLOYEE:</strong> [Employee Name]</p>
        <p className="font-semibold mb-2">1. POSITION AND DUTIES</p>
        <p className="mb-4">The Employee is hired for the position of [Position]. The Employee&apos;s duties include but are not limited to [Job Responsibilities].</p>
        <p className="font-semibold mb-2">2. TERM</p>
        <p className="mb-4">This Contract shall commence on [Start Date] and shall continue until terminated in accordance with the provisions herein.</p>
      </>
    ),
    nda: (
      <>
        <h3 className="text-lg font-bold mb-3">NON-DISCLOSURE AGREEMENT</h3>
        <p className="mb-2">This Non-Disclosure Agreement (&quot;Agreement&quot;) is entered into between:</p>
        <p className="mb-4"><strong>DISCLOSING PARTY:</strong> [Company Name], a company registered under the laws of [Country]</p>
        <p className="mb-4"><strong>RECEIVING PARTY:</strong> [Recipient Name/Company]</p>
        <p className="font-semibold mb-2">1. CONFIDENTIAL INFORMATION</p>
        <p className="mb-4">&quot;Confidential Information&quot; means any information disclosed by the Disclosing Party to the Receiving Party, either directly or indirectly, in writing, orally or by inspection of tangible objects.</p>
        <p className="font-semibold mb-2">2. OBLIGATIONS</p>
        <p className="mb-4">The Receiving Party shall hold all Confidential Information in strict confidence and shall not disclose any Confidential Information to any third party.</p>
      </>
    ),
    terms: (
      <>
        <h3 className="text-lg font-bold mb-3">TERMS OF SERVICE</h3>
        <p className="mb-2">These Terms of Service (&quot;Terms&quot;) govern your access to and use of [Company Name]&apos;s services.</p>
        <p className="mb-4"><strong>EFFECTIVE DATE:</strong> [Date]</p>
        <p className="font-semibold mb-2">1. ACCEPTANCE OF TERMS</p>
        <p className="mb-4">By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.</p>
        <p className="font-semibold mb-2">2. DESCRIPTION OF SERVICES</p>
        <p className="mb-4">[Company Name] provides [description of services] (collectively, the &quot;Services&quot;).</p>
      </>
    ),
    privacy: (
      <>
        <h3 className="text-lg font-bold mb-3">PRIVACY POLICY</h3>
        <p className="mb-2">This Privacy Policy (&quot;Policy&quot;) describes how [Company Name] collects, uses, and discloses your information.</p>
        <p className="mb-4"><strong>LAST UPDATED:</strong> [Date]</p>
        <p className="font-semibold mb-2">1. INFORMATION WE COLLECT</p>
        <p className="mb-4">We collect information that you provide directly to us, information we collect automatically when you use our Services, and information from third-party sources.</p>
        <p className="font-semibold mb-2">2. USE OF INFORMATION</p>
        <p className="mb-4">We use the information we collect to provide, maintain, and improve our Services, to communicate with you, and to comply with applicable laws and regulations.</p>
      </>
    ),
  };

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto max-w-7xl px-5">
        <h2 className="text-3xl font-bold text-[#f8fafc] text-center mb-12">Document Previews</h2>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-4 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4.5 py-2 rounded-full font-medium transition-colors ${activeTab === tab.id ? 'bg-[#b89457] text-[#f8fafc]' : 'bg-white text-gray hover:bg-gray-light'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Document Preview */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto relative">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 rotate-[-30deg] text-5xl font-bold text-primary">
            SAMPLE DOCUMENT
          </div>
          
          {/* Document Content */}
          <div className="relative z-10 font-serif text-sm leading-relaxed">
            {documentContent[activeTab as keyof typeof documentContent]}
          </div>
          
          {/* Document Footer */}
          <div className="mt-8 pt-4 border-t border-gray-light text-center">
            <p className="text-sm text-gray mb-4">This is a sample document. The final document will be customized based on your inputs.</p>
            <button className="bg-[#aaaeb5] hover:bg-primary/80 text-dark font-medium py-2 px-6 rounded-md transition duration-300">
              Generate Your Document
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}