import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import ClientOnly from "./components/providers/ClientOnly";
import StripeProvider from "./components/providers/StripeProvider";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import "./globals.css";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LexGenAI - AI-Powered Legal Document Generator",
  description: "Generate professional legal documents instantly using AI. Save time and money while ensuring legal compliance.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
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
        <Footer />
      </body>
    </html>
  );
}
