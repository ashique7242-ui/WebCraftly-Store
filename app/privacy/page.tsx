import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | WebCraftly Digital Marketplace",
  description: "Learn how WebCraftly collects, processes, and protects your personal data under global compliance and industry standards.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#00171f] text-[#c9d1d9] py-16 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-4xl mx-auto bg-[#00222c]/90 border border-white/10 rounded-3xl p-6 sm:p-12 shadow-2xl backdrop-blur-md">
        
        {/* Navigation Breadcrumb */}
        <Link href="/marketplace" className="inline-flex items-center gap-2 text-xs font-semibold text-[#82d0e3] hover:underline mb-8 group">
          <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">arrow_back</span>
          <span>Back to Marketplace</span>
        </Link>

        <div className="mb-10 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#82d0e3]/10 border border-[#82d0e3]/30 text-[#82d0e3] text-xs font-semibold uppercase tracking-wider mb-4">
            Legal & Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
          <p className="mt-2 text-sm text-[#8b949e]">Effective Date: January 1, 2026 | Last Updated: March 2026</p>
        </div>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-300">
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">1. Overview & Commitment</h2>
            <p>
              WebCraftly (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the digital marketplace located at <a href="https://www.webcraftly.site" className="text-[#82d0e3] underline">https://www.webcraftly.site</a>. We value your privacy and are committed to safeguarding personal information collected when you access our curated catalog, register an account, or purchase digital products.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">2. Data We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Account Information:</strong> Name, email address, password hashes, and profile metadata.</li>
              <li><strong className="text-white">Transaction & Payment Data:</strong> Order records, digital goods download tokens, and billing zip codes. Payment transactions are processed directly by our PCI-DSS Level 1 compliant gateway partners (including Razorpay). We never view or store full credit card numbers or banking credentials.</li>
              <li><strong className="text-white">Technical & Analytics Data:</strong> IP address, browser type, regional location for tax compliance, device information, and site interaction metrics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">3. How We Use Information</h2>
            <p>Your data is processed strictly for authentic business purposes, including:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Fulfilling orders and delivering instant digital product download licenses.</li>
              <li>Detecting fraudulent checkout activities and preventing chargebacks.</li>
              <li>Providing customer support and technical troubleshooting.</li>
              <li>Complying with statutory financial, taxation, and anti-money-laundering obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">4. Payment Processing & Razorpay Compliance</h2>
            <p>
              When purchasing digital assets on WebCraftly, your payment details are transmitted encrypted via SSL directly to authorized payment service providers, notably Razorpay. Transactions comply with global PCI-DSS standards, Reserve Bank of India (RBI) e-commerce directives, and international payment security protocols.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">5. Data Retention & Security</h2>
            <p>
              We implement industry-standard AES-256 encryption at rest and TLS 1.3 in transit. We retain account records only as long as necessary to maintain active product licenses and comply with statutory tax guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">6. User Rights & Contact</h2>
            <p>
              Depending on your jurisdiction (such as GDPR or CCPA), you hold the right to access, rectify, or erase your personal data. For privacy inquiries or data requests, contact our Compliance Office:
            </p>
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-sm">
              <p className="font-semibold text-white">WebCraftly Privacy & Compliance</p>
              <p className="text-slate-300">Email: <a href="mailto:contact@webcraftly.site" className="text-[#82d0e3]">contact@webcraftly.site</a></p>
              <p className="text-slate-300">Platform: <a href="https://www.webcraftly.site" className="text-[#82d0e3]">https://www.webcraftly.site</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
