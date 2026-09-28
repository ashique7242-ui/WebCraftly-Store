import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "WebCraftly — Masterfully Crafted Digital Products",
  description: "Discover vetted tools across Finance, Business, Marketing, Education, Healthcare, Dev, Creator, and Productivity — with direct access to a peer collective of digital builders.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://www.webcraftly.site/#website",
                  "url": "https://www.webcraftly.site/",
                  "name": "WebCraftly",
                  "alternateName": "WebCraftly Digital Marketplace Community",
                  "description": "A premium marketplace for masterfully crafted digital products, vetted tools, and a community for visionary creators and digital builders.",
                  "inLanguage": "en-US",
                  "publisher": {
                    "@id": "https://www.webcraftly.site/#organization"
                  }
                },
                {
                  "@type": "Organization",
                  "@id": "https://www.webcraftly.site/#organization",
                  "name": "WebCraftly",
                  "alternateName": "WebCraftly Digital Marketplace Community",
                  "url": "https://www.webcraftly.site/",
                  "description": "A premium marketplace for masterfully crafted digital products, vetted tools, and a community for visionary creators and digital builders.",
                  "logo": {
                    "@type": "ImageObject",
                    "@id": "https://www.webcraftly.site/#logo",
                    "url": "https://www.webcraftly.site/favicon-512x512.png",
                    "contentUrl": "https://www.webcraftly.site/favicon-512x512.png",
                    "caption": "WebCraftly Logo",
                    "width": 512,
                    "height": 512
                  },
                  "image": "https://www.webcraftly.site/favicon-512x512.png"
                }
              ]
            })
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <div className="bg-[#F0EEE7] border-b border-[#E5E2DB] px-4 py-2 text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 text-espresso-light text-[13px]">
            <span className="inline-flex items-center text-primary-container font-semibold">
              <span className="material-symbols-outlined text-[15px] mr-1 text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
              Artisanal Software Registry
            </span>
            <span className="hidden sm:inline text-espresso-light">Ultra-useful production utilities, runtimes, and tested blueprints for tech builders everywhere.</span>
            <span className="hidden md:inline-block text-[#D4AF37]">•</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-[11px] bg-[#6A0006]/10 text-primary font-semibold px-2 py-0.5 rounded border border-[#6A0006]/20">
              <span className="material-symbols-outlined text-[13px]">verified</span> 12,000+ builders across 40+ countries
            </span>
          </div>
        </div>

        <header className="bg-[#FFFDF9]/95 backdrop-blur-md text-espresso sticky top-0 z-50 shadow-[0_4px_20px_-4px_rgba(28,28,24,0.05)] border-b border-[#E5E2DB]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
            <a href="/" className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-xl wax-seal text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 border border-[#D4AF37]">
                <span className="material-symbols-outlined text-2xl">handshake</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-md text-2xl md:text-3xl text-primary tracking-tight font-bold leading-none">WebCraftly</span>
                <span className="text-[10px] tracking-[0.2em] text-[#735C00] uppercase font-bold mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> Global Tech Atelier
                </span>
              </div>
            </a>
            
            <nav className="hidden lg:flex items-center space-x-7">
              <a href="#tools" className="text-espresso-light font-medium hover:text-primary transition-colors text-[14px] hover:underline decoration-[#D4AF37] decoration-2 underline-offset-8">Tool Suites</a>
              <a href="#crafts" className="text-espresso-light font-medium hover:text-primary transition-colors text-[14px] hover:underline decoration-[#D4AF37] decoration-2 underline-offset-8">Digital Crafts</a>
              <a href="#atelier" className="text-espresso-light font-medium hover:text-primary transition-colors text-[14px] hover:underline decoration-[#D4AF37] decoration-2 underline-offset-8">Creator Atelier</a>
              <a href="#reviews" className="text-espresso-light font-medium hover:text-primary transition-colors text-[14px] hover:underline decoration-[#D4AF37] decoration-2 underline-offset-8">Sanctuary Notes</a>
            </nav>
            
            <div className="flex items-center space-x-3">
              <select className="bg-[#F6F3EC] rounded-full text-espresso text-[12px] font-bold border border-[#D4AF37]/70 shadow-sm px-3 py-1 outline-none">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
                <option value="JPY">JPY</option>
              </select>
              
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-espresso-light hover:text-primary hover:bg-[#F0EEE7] transition-colors border border-transparent hover:border-[#E5E2DB]" title="Saved Crafts">
                <span className="material-symbols-outlined text-[20px]">favorite</span>
              </button>
              
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-espresso-light hover:text-primary hover:bg-[#F0EEE7] transition-colors relative border border-transparent hover:border-[#E5E2DB]" title="Vault Bag">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-white"></span>
              </button>
              
              <a href="#atelier" className="hidden sm:inline-flex items-center gap-2 bg-primary hover:bg-[#8E1616] text-white px-4 py-2 rounded-lg text-[13px] font-semibold shadow-[0_3px_10px_rgba(106,0,6,0.2)] border border-[#410002] transition-all duration-150 active:scale-95">
                <span className="material-symbols-outlined text-[17px]">add_circle</span>
                Submit Craft
              </a>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="bg-[#FFFDF9] text-espresso border-t border-[#E5E2DB] relative mt-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="max-w-md">
                <div className="font-headline-sm text-2xl text-primary font-bold mb-2 flex items-center gap-2">
                  <span>WebCraftly</span>
                  <span className="text-[11px] font-body-md text-[#735C00] uppercase tracking-widest px-2 py-0.5 rounded bg-[#FED65B]/30 border border-[#D4AF37]/50 font-bold">Est. 2024</span>
                </div>
                <p className="text-[13px] text-espresso-light mb-4 leading-relaxed">
                  An artisanal digital emporium dedicated to independent crafters and honest utilities. Handcrafted with reverence for builders everywhere. Every tool and craft here is hand-audited, not dropshipped.
                </p>
                <div className="inline-flex items-center gap-2 text-[12px] text-espresso bg-[#F6F3EC] px-3 py-1.5 rounded-full border border-[#D4AF37]/40">
                  <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                  Audited codebases • 85% Creator split • Global secure checkout
                </div>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3 font-medium text-[13px]">
                <a href="/privacy" className="text-espresso-light hover:text-primary transition-colors">Privacy Policy</a>
                <a href="/terms" className="text-espresso-light hover:text-primary transition-colors">Terms &amp; Conditions</a>
                <a href="/refund" className="text-espresso-light hover:text-primary transition-colors">Refund/Cancellation Policy</a>
                <a href="/contact" className="text-espresso-light hover:text-primary transition-colors">Contact Us</a>
                <a href="#atelier" className="text-primary font-bold hover:underline transition-colors">Creator Atelier</a>
              </div>
            </div>
            <div className="pt-8 border-t border-[#E5E2DB] flex flex-col sm:flex-row items-center justify-between text-[13px] text-espresso-light gap-4">
              <div>
                © {new Date().getFullYear()} WebCraftly Digital Emporium. Handcrafted with reverence for independent creators.
              </div>
            </div>
          </div>
        </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
