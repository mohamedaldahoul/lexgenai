'use client';

import { useState } from 'react';

export default function FAQ() {
  // State to track which FAQ items are open
  const [openItems, setOpenItems] = useState<{[key: number]: boolean}>({});
  
  // Toggle FAQ item open/closed
  const toggleItem = (index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  // FAQ data
  const faqItems = [
    {
      question: "Are these documents legally binding?",
      answer: "Yes, our AI-generated documents are legally binding when properly executed by all parties. They are created using the same legal principles and requirements that attorneys use when drafting documents."
    },
    {
      question: "Is my information secure?",
      answer: "Absolutely. We use bank-level encryption to protect your data. We never share your information with third parties, and your documents are only accessible to you."
    },
    {
      question: "How quickly will I receive my document?",
      answer: "Most documents are generated within 2 minutes. Once generated, you can download them immediately."
    },
    {
      question: "What if I need a document type not listed?",
      answer: "Contact our support team, and we'll work to add your requested document type to our system. We're constantly expanding our document library based on customer needs."
    },
    {
      question: "Can I edit the document after receiving it?",
      answer: "Yes, all documents are delivered in editable PDF format. You can make any necessary adjustments before finalizing."
    },
    {
      question: "Do I need a lawyer to review these documents?",
      answer: "While our documents are legally sound, for complex situations or high-stakes agreements, we recommend having a lawyer review the final document. Our service significantly reduces legal costs but doesn't replace legal advice for complex matters."
    }
  ];

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto max-w-7xl px-5">
        <h2 className="text-3xl font-bold text-[#f8fafc] text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-[#f8fafc] text-center mb-12">Everything you need to know about our AI-generated legal documents</p>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div key={index} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
              <div 
                className="p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                onClick={() => toggleItem(index)}
              >
                <h3 className="font-semibold text-lg">{item.question}</h3>
                <div className="text-2xl text-primary">
                  {openItems[index] ? '−' : '+'}
                </div>
              </div>
              
              {openItems[index] && (
                <div className="p-5 pt-0 border-t border-gray-light">
                  <p className="text-gray">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}