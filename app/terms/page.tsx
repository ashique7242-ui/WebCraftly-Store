import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | WebCraftly Digital Marketplace",
  description: "Review the terms and conditions governing purchases, digital licenses, and access to WebCraftly digital products.",
};

export default function TermsPage() {
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
            Legal Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Terms &amp; Conditions</h1>
          <p className="mt-2 text-sm text-[#8b949e]">Effective Date: January 1, 2026 | Last Updated: March 2026</p>
        </div>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-300">
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using the WebCraftly digital marketplace (<a href="https://www.webcraftly.site" className="text-[#82d0e3] underline">https://www.webcraftly.site</a>), you agree to be bound by these Terms &amp; Conditions. If you do not agree with any part of these terms, please discontinue use of our site and services immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">2. Nature of Digital Goods</h2>
            <p>
              WebCraftly supplies intangible, downloadable digital assets, software runtimes, web templates, design systems, and developer toolkits. Upon checkout and payment clearance, users receive immediate digital access or license keys.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">3. Licensing and Usage Rights</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Commercial Single License:</strong> Grants a worldwide, non-exclusive license to use the digital asset in one end product (commercial or personal) for yourself or a client.</li>
              <li><strong className="text-white">Prohibited Uses:</strong> You may not sublicense, re-sell, distribute, or share raw source files on public repositories or asset marketplaces as standalone deliverables.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">4. Pricing, Payments &amp; Razorpay Processing</h2>
            <p>
              Prices on WebCraftly are billed in United States Dollars (USD). Transactions are securely processed through Razorpay and authorized international payment channels. You agree to provide valid, authorized payment instruments. Any currency conversion rates are calculated real-time by your issuing bank and the payment processor.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">5. Intellectual Property</h2>
            <p>
              All trademarks, logos, and creator materials displayed on WebCraftly are the intellectual property of WebCraftly or their respective verified creator partners. Unauthorized reproduction or scraping is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">6. Limitation of Liability &amp; Governing Law</h2>
            <p>
              WebCraftly provides assets &quot;as is&quot; without warranties beyond statutory consumer guarantees. These terms shall be governed by and construed in accordance with the laws of India, and disputes shall be subject to the exclusive jurisdiction of the competent courts.
            </p>
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-sm">
              <p className="font-semibold text-white">Contact Regarding Terms:</p>
              <p className="text-slate-300">Email: <a href="mailto:contact@webcraftly.site" className="text-[#82d0e3]">contact@webcraftly.site</a></p>
              <p className="text-slate-300">Website: <a href="https://www.webcraftly.site" className="text-[#82d0e3]">https://www.webcraftly.site</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
