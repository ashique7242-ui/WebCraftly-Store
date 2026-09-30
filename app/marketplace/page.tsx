import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { headers, cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Digital Marketplace Vault | WebCraftly",
  description: "Browse curated, audited digital tools, runtimes, spreadsheet models, and templates built by top creators.",
};

const PRODUCTS = [
  {
    id: "aging_well",
    title: "What Nobody Tells You About Getting Old",
    subtitle: "Mars Kowalski's Blunt Workbook",
    category: "Education",
    price: 11,
    originalPrice: 27,
    rating: 4.7,
    reviews: 1126,
    badge: "🔥 #1 Best Seller",
    tagline: "A raw, practical roadmap to aging gracefully, health protocols, and psychological resilience.",
    creator: { name: "Mars Kowalski", country: "US" }
  },
  {
    id: "finance",
    title: "FinanceOS Spreadsheet",
    subtitle: "10 plug-and-play Excel & Sheets models",
    category: "Finance",
    price: 39,
    originalPrice: 79,
    rating: 4.9,
    reviews: 840,
    badge: "Staff Pick",
    tagline: "Automated cashflow forecasting, SaaS unit economics models, and venture burn tracking.",
    creator: { name: "Elena Rostova", country: "DE" }
  },
  {
    id: "devkit",
    title: "DevKit Essentials UI",
    subtitle: "TypeScript & React Production Stack",
    category: "Developer",
    price: 49,
    originalPrice: 99,
    rating: 4.95,
    reviews: 620,
    badge: "Audited Codebase",
    tagline: "Over 80 accessible Tailwind UI primitives with full keyboard navigation and light/dark modes.",
    creator: { name: "Liam Vance", country: "US" }
  },
  {
    id: "creator_pack",
    title: "Creator Utility Pack",
    subtitle: "Digital Creator Operating System",
    category: "Creator",
    price: 29,
    originalPrice: 59,
    rating: 4.8,
    reviews: 430,
    badge: "High Leverage",
    tagline: "Sponsorship pitch decks, rate card calculators, content scheduling grids, and email sequences.",
    creator: { name: "Maya Lin", country: "CA" }
  },
  {
    id: "proposalkit",
    title: "ProposalKit Pro",
    subtitle: "Agency Pitch & Contract Suite",
    category: "Business",
    price: 35,
    originalPrice: 69,
    rating: 4.85,
    reviews: 512,
    badge: "Enterprise Grade",
    tagline: "Win 6-figure client retainers with vetted scope-of-work templates, MSA contracts, and SLA baselines.",
    creator: { name: "David Sterling", country: "UK" }
  },
  {
    id: "seo_accelerator",
    title: "SEO Growth Accelerator",
    subtitle: "Technical Audit & Content Blueprint",
    category: "Marketing",
    price: 45,
    originalPrice: 89,
    rating: 4.75,
    reviews: 388,
    badge: "Updated 2026",
    tagline: "Automated schema generators, programmatic SEO architecture guides, and crawl-budget optimizer.",
    creator: { name: "Sophie Martin", country: "FR" }
  }
];

export default function MarketplacePage() {
  const cookieStore = cookies();
  const headersList = headers();
  const currency = cookieStore.get("webcraftly_currency")?.value || headersList.get("x-user-currency") || "USD";
  const USD_TO_INR_RATE = 83.50;

  const formatPrice = (usd: number) => {
    if (currency === "INR") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(Math.round(usd * USD_TO_INR_RATE));
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(usd);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-7xl mx-auto">
        
        {/* Marketplace Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F6F3EC] border border-[#D4AF37] text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Audited Digital Marketplace
          </div>
          <h1 className="font-headline-lg text-4xl sm:text-5xl text-espresso font-extrabold tracking-tight mb-4">
            The Digital Vault
          </h1>
          <p className="text-espresso-light text-base sm:text-lg leading-relaxed">
            Every product in this vault is battle-tested, verified for zero bloatware, and backed by our 7-day risk-free promise. Billed seamlessly in {currency === 'INR' ? 'INR (₹) with UPI' : 'USD ($)'} via Razorpay.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {["All Tools", "Developer", "Finance", "Business", "Education", "Creator", "Marketing"].map((cat, idx) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                idx === 0
                  ? "bg-primary text-white shadow-sm"
                  : "bg-[#F6F3EC] text-espresso hover:bg-[#E5E2DB] border border-[#E5E2DB]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((prod) => (
            <article
              key={prod.id}
              className="bg-white border border-[#E5E2DB] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-50 text-[#735C00] border border-amber-200/80 text-[11px] font-bold uppercase tracking-wider">
                    {prod.badge}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                    <span>★</span>
                    <span className="text-espresso">{prod.rating}</span>
                    <span className="text-slate-400 font-normal">({prod.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3 text-xs text-espresso-light font-medium">
                  <span>{prod.creator.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 font-mono font-bold text-slate-500">
                    {prod.creator.country}
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-sky-500">verified</span>
                </div>

                <h2 className="font-headline-sm text-xl font-bold text-espresso group-hover:text-primary transition-colors mb-1 leading-snug">
                  {prod.title}
                </h2>
                <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">
                  {prod.subtitle}
                </p>
                <p className="text-sm text-espresso-light leading-relaxed mb-6">
                  {prod.tagline}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E2DB] flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-espresso">{formatPrice(prod.price)}</span>
                  <span className="text-sm text-slate-400 line-through">{formatPrice(prod.originalPrice)}</span>
                </div>

                <Link
                  href={`/contact?topic=order&product=${prod.id}`}
                  style={{ background: "linear-gradient(135deg, #FF8533 0%, #FF6600 100%)" }}
                  className="px-4 py-2.5 rounded-xl text-white font-bold text-xs tracking-wide shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span>Instant Access</span>
                  <span className="material-symbols-outlined text-sm">bolt</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Legal & Trust Guarantee Strip */}
        <div className="mt-16 bg-[#F6F3EC] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#D4AF37] flex items-center justify-center text-primary text-2xl shadow-sm shrink-0">
              <span className="material-symbols-outlined text-2xl text-primary">verified_user</span>
            </div>
            <div>
              <h3 className="font-bold text-espresso text-base sm:text-lg">Razorpay Protected Checkout &amp; 7-Day Guarantee</h3>
              <p className="text-xs sm:text-sm text-espresso-light mt-0.5">
                All purchases are backed by our transparent <Link href="/refund" className="text-primary underline font-medium">Refund Policy</Link> and compliant with statutory digital goods standards.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-espresso text-xs font-bold border border-[#E5E2DB] transition-all"
            >
              Ask Support
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
