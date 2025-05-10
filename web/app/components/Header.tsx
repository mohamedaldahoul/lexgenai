import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-100 shadow-sm">
      <div className="container mx-auto max-w-7xl px-5">
        <div className="flex justify-between items-center py-3">
          <Link href="/" className="text-xl font-bold text-dark flex items-center no-underline">
            Lex<span className="text-primary text-[#b89457]">Gen</span> AI
          </Link>
          
            <a href="mailto:support@lexgenai.com" className="hover:text-blue-400">
          <div className="flex items-center bg-[#d5f7ec] border border-success px-4 py-2 rounded-full font-semibold text-[#10b981] text-sm gap-2 lg:mr-5 md:mr-2 ml-4">

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            100% Money Back Guarantee
          </div>
            </a>
        </div>
      </div>
    </header>
  );
}