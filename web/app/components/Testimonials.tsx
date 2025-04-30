'use client';

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-7xl px-5">
        <h2 className="text-3xl font-bold text-center mb-4">What Our Customers Say</h2>
        <p className="text-gray text-center mb-12">Join thousands of satisfied business owners who trust LexGen AI</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-light p-6 rounded-lg shadow-md">
            <div className="text-primary mb-3">★★★★★</div>
            <p className="text-gray mb-6">I needed an NDA urgently for a client meeting the next day. LexGen AI delivered a perfectly customized document in minutes. Saved me at least £400 in legal fees and the document was actually better than what my previous lawyer provided!</p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-cover bg-center mr-4" style={{backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80')"}}></div>
              <div>
                <h4 className="font-semibold">Michael Thompson</h4>
                <p className="text-gray text-sm">Marketing Agency Owner</p>
              </div>
            </div>
          </div>
          
          <div className="bg-light p-6 rounded-lg shadow-md">
            <div className="text-primary mb-3">★★★★★</div>
            <p className="text-gray mb-6">As a startup founder, legal costs were eating into our budget. This service has been a game-changer - professional documents at a fraction of the cost and available instantly. The country-specific compliance was exactly what we needed.</p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-cover bg-center mr-4" style={{backgroundImage: "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80')"}}></div>
              <div>
                <h4 className="font-semibold">Sarah Johnson</h4>
                <p className="text-gray text-sm">Tech Startup CEO</p>
              </div>
            </div>
          </div>
          
          <div className="bg-light p-6 rounded-lg shadow-md">
            <div className="text-primary mb-3">★★★★★</div>
            <p className="text-gray mb-6">I was skeptical about AI-generated legal documents, but the quality exceeded my expectations. Clean, professional, and tailored specifically to my e-commerce business in California. I`ve now used it for 3 different documents - all perfect.</p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-cover bg-center mr-4" style={{backgroundImage: "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80')"}}></div>
              <div>
                <h4 className="font-semibold">David Chen</h4>
                <p className="text-gray text-sm">E-commerce Entrepreneur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}