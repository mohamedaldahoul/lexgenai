import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import ClientOnly from "./components/providers/ClientOnly";
import StripeProvider from "./components/providers/StripeProvider";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LexGenAI - Legal Document Generator",
  description: "Generate professional legal documents using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Script 
          src="https://js.stripe.com/v3/"
          strategy="lazyOnload"
        />
          <ClientOnly fallback={<LoadingSpinner />}>
            <StripeProvider>
              {children}
            </StripeProvider>
          </ClientOnly>
      </body>
    </html>
  );
}
