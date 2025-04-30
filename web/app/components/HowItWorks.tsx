'use client';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Select Document Type",
      description: "Choose from our library of professional legal documents"
    },
    {
      number: 2,
      title: "Enter Your Details",
      description: "Provide your business information and requirements"
    },
    {
      number: 3,
      title: "AI Customization",
      description: "Our AI tailors the document to your specific needs"
    },
    {
      number: 4,
      title: "Download & Use",
      description: "Get your document instantly and ready to use"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">
            Our AI-powered system creates professional legal documents in just minutes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#1A365D] rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 