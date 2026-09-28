"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", issue: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.issue.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.webcraftly.site/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Server responded with error status");
      }

      setStatus("success");
      setFormData({ name: "", email: "", issue: "" });
    } catch {
      // Fallback endpoint test
      try {
        const fallbackRes = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (fallbackRes.ok) {
          setStatus("success");
          setFormData({ name: "", email: "", issue: "" });
          return;
        }
      } catch {
        // Fallback also failed
      }
      setStatus("error");
      setErrorMessage("Could not send message. Please contact us directly at contact@webcraftly.site.");
    }
  };

  return (
    <div className="min-h-screen bg-[#00171f] text-[#c9d1d9] py-16 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <Link href="/marketplace" className="inline-flex items-center gap-2 text-xs font-semibold text-[#82d0e3] hover:underline mb-8 group">
          <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">arrow_back</span>
          <span>Back to Marketplace</span>
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#82d0e3]/10 border border-[#82d0e3]/30 text-[#82d0e3] text-xs font-semibold uppercase tracking-wider mb-4">
            Support &amp; Inquiries
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Contact WebCraftly</h1>
          <p className="mt-3 text-base text-slate-400 max-w-xl mx-auto">
            Have questions about digital assets, licensing, or need technical assistance? Our dedicated support team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Details */}
          <div className="md:col-span-5 bg-[#00222c]/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Direct Contact</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                We typically respond within 24 hours on business days.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#82d0e3] text-xl mt-0.5">mail</span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Official Email</div>
                  <a href="mailto:contact@webcraftly.site" className="text-white hover:text-[#82d0e3] text-sm font-medium transition-colors">
                    contact@webcraftly.site
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#82d0e3] text-xl mt-0.5">schedule</span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Working Hours</div>
                  <div className="text-white text-sm">Mon - Sat: 9:00 AM - 6:00 PM IST</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#82d0e3] text-xl mt-0.5">verified_user</span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Security &amp; Payments</div>
                  <div className="text-slate-300 text-xs mt-0.5">Protected with 256-bit SSL encryption. Razorpay compliance authorized.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="md:col-span-7 bg-[#00222c]/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2">Send us a Message</h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">Fill out the form below and we will get back to your inquiry promptly.</p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#82d0e3] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#82d0e3] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Issue / Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Please describe your question or issue in detail..."
                  value={formData.issue}
                  onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#82d0e3] transition-all resize-none"
                />
              </div>

              {status === "error" && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">error</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === "success" && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">task_alt</span>
                  <span>Thank you! Your message has been sent successfully. We will contact you soon.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                style={{ background: "linear-gradient(135deg, #FF8533 0%, #FF6600 100%)" }}
                className="w-full py-3 rounded-xl text-white font-bold text-sm tracking-wide shadow-lg hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {status === "loading" ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">send</span>
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
