import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | WebCraftly Digital Marketplace",
  description: "Review WebCraftly's 7-Day Risk-Free Promise and cancellation policy for digital goods and licenses.",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#00171f] text-[#c9d1d9] py-16 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-4xl mx-auto bg-[#00222c]/90 border border-white/10 rounded-3xl p-6 sm:p-12 shadow-2xl backdrop-blur-md">
        
        {/* Navigation Breadcrumb */}
        <Link href="/marketplace" className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF8533] hover:underline mb-8 group">
          <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">arrow_back</span>
          <span>Back to Marketplace</span>
        </Link>

        <div className="mb-10 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6600]/10 border border-[#FF6600]/30 text-[#FF8533] text-xs font-semibold uppercase tracking-wider mb-4">
            Customer Guarantee &amp; Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Refund &amp; Cancellation Policy</h1>
          <p className="mt-2 text-sm text-[#8b949e]">Effective Date: January 1, 2026 | Last Updated: March 2026</p>
        </div>

        {/* 7-Day Guarantee Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#FF6600]/15 via-[#82d0e3]/10 to-transparent border border-[#FF6600]/30 mb-8">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-3xl text-[#FF8533] flex-shrink-0 mt-1">verified_user</span>
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Our 7-Day Risk-Free Promise</h2>
              <p className="text-sm text-slate-300">
                At WebCraftly, every digital product is vetted for quality and production readiness. If an asset is technically defective, corrupted, or substantially misdescribed and our team cannot resolve it, you are protected by our 7-day refund guarantee.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-300">
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">1. Scope of Policy</h2>
            <p>
              This Refund &amp; Cancellation Policy applies to all digital goods, downloadable products, source code kits, and software components purchased on <a href="https://www.webcraftly.site" className="text-[#82d0e3] underline">WebCraftly</a>. Because digital assets are delivered instantly and cannot be physically returned, refund requests are evaluated according to the fair criteria outlined below.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">2. Eligible Criteria for Refund</h2>
            <p>You may request a full refund within 7 calendar days of purchase if:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong className="text-white">Technical Malfunction:</strong> The digital asset exhibits critical defects, missing essential files, or crashes, and our engineering team or the vendor cannot provide a working fix within 48 hours.</li>
              <li><strong className="text-white">Misrepresentation:</strong> The delivered asset differs substantially from the preview, screenshots, or stated features listed on the product detail page.</li>
              <li><strong className="text-white">Duplicate Transactions:</strong> You were charged more than once for the same order due to a technical network or payment gateway error.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">3. Non-Refundable Scenarios</h2>
            <p>Refunds are not granted in the following circumstances:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Change of mind after the product files and source codes have been downloaded.</li>
              <li>Inability to operate the software due to lacking requisite technical expertise or incompatible environments that were clearly outlined in the system requirements.</li>
              <li>Requests initiated past the 7-day guarantee window.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">4. Cancellation &amp; Settlement Timeline</h2>
            <p>
              Order cancellations can be made prior to asset download. Once approved, refunds are credited back to the original payment source (credit/debit card, UPI, net banking) via our Razorpay payment processor. Processing typically completes within <strong>5 to 7 business days</strong>, depending on your banking institution.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">5. How to Initiate a Refund</h2>
            <p>
              To submit a claim, please reach out to our dedicated resolution desk with your Order ID, email address, and a brief description of the technical issue:
            </p>
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-sm">
              <p className="font-semibold text-white">Refund Resolution Desk</p>
              <p className="text-slate-300">Email: <a href="mailto:contact@webcraftly.site" className="text-[#82d0e3]">contact@webcraftly.site</a></p>
              <p className="text-slate-300">Support Hours: Monday – Saturday (9:00 AM – 6:00 PM IST)</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
