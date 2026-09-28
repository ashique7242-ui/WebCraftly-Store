import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-12 pb-14 md:pt-16 md:pb-20 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] bg-[#FED65B]/15 blur-[140px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-1/4 right-1/4 w-[420px] h-[280px] bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF9] border border-[#D4AF37] text-primary mb-6 shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-[#D4AF37]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="text-[13px] font-semibold text-espresso">Zero Bloatware • Audited Codebases • Instant Global Delivery</span>
          </div>
          
          <h1 className="font-headline-lg text-4xl sm:text-5xl md:text-6xl text-espresso max-w-4xl mx-auto tracking-tight mb-5 leading-[1.12]">
            Handcrafted utilities & digital treasures, <span className="italic font-normal text-primary">built with reverence for your craft.</span>
          </h1>
          
          <p className="font-body-lg text-lg md:text-xl text-espresso-light max-w-3xl mx-auto mb-8 font-normal leading-relaxed">
            Every tool and craft here is hand-audited, not dropshipped. Battle-tested microservices, production engines, legal vaults, and clean architectures for global builders.
          </p>

          {/* Global Trust Strip */}
          <div className="wedding-card max-w-3xl mx-auto rounded-2xl p-5 mb-9 text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFF7D9] border border-[#D4AF37] flex items-center justify-center text-2xl shadow-inner shrink-0">
                🌍
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-lg text-espresso font-bold">Audited, not just uploaded</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-600"></span>
                </div>
                <div className="text-[13px] text-espresso-light mt-0.5">
                  <span className="font-semibold text-primary">Free-first trust</span> • Local currencies • Secure checkout
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="gold-seal-badge px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold">
                Globally Verified
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-9 relative">
            <div className="relative flex items-center">
              <span className="absolute left-4 text-[#8D706D] material-symbols-outlined pointer-events-none">search</span>
              <input 
                type="text" 
                className="w-full pl-12 pr-32 py-3.5 bg-[#FFFFFF] border border-[#D4AF37]/80 rounded-full text-espresso placeholder:text-[#8D706D] focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-[0_4px_15px_rgba(28,28,24,0.04)] text-[15px]" 
                placeholder="Search by tech or pain point..." 
              />
              <Link href="/marketplace" className="absolute right-2 px-5 py-2 bg-primary text-white rounded-full text-[13px] font-semibold hover:bg-[#8E1616] transition-all shadow-sm">
                Find Craft
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="gilded-rule"></div>
      </div>

      {/* Start Free Strip */}
      <section className="py-14 md:py-20" id="start-free">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-[12px] uppercase tracking-widest mb-1.5">
                <span className="material-symbols-outlined text-[16px]">redeem</span>
                Experience our quality
              </div>
              <h2 className="font-headline-lg text-3xl md:text-4xl text-espresso font-normal">
                Start Free
              </h2>
              <p className="text-espresso-light text-[15px] mt-1">
                Zero payment friction. Handcrafted templates and guides to elevate your craft instantly.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Free Craft Card */}
            <div className="item-card wedding-card rounded-2xl overflow-hidden flex flex-col justify-between">
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-bold">Free</span>
                </div>
                <h4 className="font-headline-sm text-xl text-espresso mb-1.5 font-bold">DesignToken Starter UI</h4>
                <p className="text-[13px] text-espresso-light mb-3 leading-relaxed">
                  A foundational set of accessible Tailwind components. Handcrafted by the WebCraftly atelier team.
                </p>
                <div className="text-[11px] text-[#574500] bg-[#FFF7D9] p-2.5 rounded-lg border border-[#FED65B] mb-3">
                  Includes: 50+ primitives, typography tokens, and color system.
                </div>
              </div>
              <div className="p-5 pt-0 border-t border-[#E5E2DB] flex items-center justify-between mt-auto">
                <div className="font-headline-sm text-xl text-primary font-bold">Free</div>
                <Link href="/marketplace" className="px-3.5 py-1.5 bg-[#FFFDF9] hover:bg-primary text-espresso hover:text-white border border-[#D4AF37] rounded-lg text-[12px] font-bold transition-all shadow-sm">
                  Get for Free
                </Link>
              </div>
            </div>
            
            {/* Another Free Craft Card */}
            <div className="item-card wedding-card rounded-2xl overflow-hidden flex flex-col justify-between">
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-bold">Free</span>
                </div>
                <h4 className="font-headline-sm text-xl text-espresso mb-1.5 font-bold">Indie Founder Checklist</h4>
                <p className="text-[13px] text-espresso-light mb-3 leading-relaxed">
                  The absolute essentials for launching your startup securely. Provenance: Created by vetted startup founders.
                </p>
                <div className="text-[11px] text-[#574500] bg-[#FFF7D9] p-2.5 rounded-lg border border-[#FED65B] mb-3">
                  Includes: Legal launch checklist & security baselines.
                </div>
              </div>
              <div className="p-5 pt-0 border-t border-[#E5E2DB] flex items-center justify-between mt-auto">
                <div className="font-headline-sm text-xl text-primary font-bold">Free</div>
                <Link href="/marketplace" className="px-3.5 py-1.5 bg-[#FFFDF9] hover:bg-primary text-espresso hover:text-white border border-[#D4AF37] rounded-lg text-[12px] font-bold transition-all shadow-sm">
                  Get for Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-14 md:py-20 bg-[#F6F3EC]/70 border-b border-[#E5E2DB]" id="tools">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-[12px] uppercase tracking-widest mb-1.5">
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                High-Leverage Engineering Systems
              </div>
              <h2 className="font-headline-lg text-3xl md:text-4xl text-espresso font-normal">
                Premium Tool Suites
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="item-card wedding-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-headline-sm text-2xl text-espresso mb-1 font-bold">DevPulse Studio</h3>
                <div className="text-[12px] text-espresso-light mb-3 flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Dual Runtimes • Made by Sarah Reynolds
                </div>
                <div className="bg-[#FCF9F2] border border-[#E5E2DB] rounded-xl p-3.5 mb-4">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">report_problem</span>
                    <p className="text-[13px] text-espresso font-medium leading-snug">
                      <strong className="text-primary font-bold">High Pain Solved:</strong> Eliminates microservice contract testing drift.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-[#E5E2DB] flex items-center justify-between">
                <div>
                  <div className="font-headline-sm text-2xl text-primary font-bold">899<span className="text-[13px] font-normal text-espresso-light font-body-md">/mo</span></div>
                </div>
                <Link href="/marketplace" className="px-4 py-2 bg-primary hover:bg-[#8E1616] text-white rounded-lg text-[13px] font-semibold shadow-sm transition-all border border-[#410002]">
                  Inspect &amp; Test
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Atelier */}
      <section className="py-16 md:py-24 bg-[#FCF9F2]" id="atelier">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-headline-lg text-3xl md:text-5xl text-espresso font-normal mb-4">
            Have you built an ultra-useful craft?
          </h2>
          <p className="text-espresso-light text-base md:text-lg mb-10 max-w-2xl mx-auto">
            We welcome rigorously tested developer libraries, sane legal architectures, and battle-tested tools built by real engineers with heart.
          </p>
          <Link href="/contact?topic=creator-atelier" className="inline-flex items-center gap-2 bg-primary hover:bg-[#8E1616] text-white px-7 py-3 rounded-lg font-semibold text-[14px] shadow-sm border border-[#410002]">
            Open Creator Atelier Submission Portal
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-[#F6F3EC]/70 border-t border-[#E5E2DB]" id="reviews">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-headline-lg text-3xl md:text-4xl text-espresso font-normal">
              The Gratitude Sanctuary
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="wedding-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <p className="font-serif text-base text-espresso italic mb-4 leading-relaxed">
                  "The Indie Founder Legal Vault saved us thousands during our incorporation."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-[#E5E2DB]">
                <div>
                  <div className="font-semibold text-[14px] text-espresso">🇯🇵 Kenji Sato</div>
                  <div className="text-[12px] text-espresso-light">Co-Founder, Synapse</div>
                </div>
              </div>
            </div>
            
            <div className="wedding-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <p className="font-serif text-base text-espresso italic mb-4 leading-relaxed">
                  "DevPulse Studio resolved our microservice contract drifts across our backend and frontends in hours."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-[#E5E2DB]">
                <div>
                  <div className="font-semibold text-[14px] text-espresso">🇩🇪 Sarah Mueller</div>
                  <div className="text-[12px] text-espresso-light">Staff Infrastructure Architect</div>
                </div>
              </div>
            </div>
            
             <div className="wedding-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <p className="font-serif text-base text-espresso italic mb-4 leading-relaxed">
                  "WebCraftly is the cleanest antidote to modern SaaS bloat. Real craftsmanship."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-[#E5E2DB]">
                <div>
                  <div className="font-semibold text-[14px] text-espresso">🇮🇳 Rahul Desai</div>
                  <div className="text-[12px] text-espresso-light">Engineering Lead</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
