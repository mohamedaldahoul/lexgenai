'use client';

const Advantages = () => {
  const advantages = [
    {
      icon: (
        <svg className="w-8 h-8 text-[#0f2a4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Save Thousands in Legal Fees",
      description: "Our AI-generated documents cost a fraction of what lawyers charge. Get the same quality without the hefty price tag."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#0f2a4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Ready in 2 Minutes",
      description: "No waiting days or weeks for a lawyer to draft your document. Our AI generates it instantly, ready for immediate use."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#0f2a4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Country-Specific Legal Compliance",
      description: "All documents are created following current legal standards for your specific country, providing you with the protection you need."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#0f2a4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Industry-Specific Customization",
      description: "Not a generic template. Each document is tailored to your specific industry, business type, and requirements."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#0f2a4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Plain Language",
      description: "No complex legal jargon. Our documents are written in clear, straightforward language that both parties can understand."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#0f2a4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Secure & Confidential",
      description: "Your business information is encrypted and secure. We never share your data with third parties."
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">The LexGenAI Advantage</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="bg-white rounded-lg p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#0f2a4d]/10 w-14 sm:w-16 h-14 sm:h-16 rounded-lg flex items-center justify-center mb-6">
                {advantage.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                {advantage.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages; 