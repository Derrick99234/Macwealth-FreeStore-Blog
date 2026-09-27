import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata = {
  title: "About Us | Macwealth FreeStore Blog",
  description: "Learn about the mission, vision, and heart behind Macwealth FreeStore and Dr. Isaiah Macwealth.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-[#121622] via-[#0f121a] to-[#0c0e14] border border-white/[0.08] rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20">
                Our Mission &amp; Purpose
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                About <span className="text-indigo-400">Macwealth FreeStore</span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Empowering believers worldwide with free access to life-transforming spiritual teachings, kingdom financial wisdom, and practical life strategies by Dr. Isaiah Macwealth.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Heart */}
        <section className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              A Mandate of Radical Generosity
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              <strong>Macwealth FreeStore</strong> was founded under the visionary leadership of <strong>Prophet Dr. Isaiah Macwealth</strong> with a singular, clear mandate: to dismantle barriers to spiritual growth and make divine wisdom accessible to everyone, everywhere, entirely free of charge.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Believing that the truth of God’s Word possesses the power to redeem minds, rebuild families, restore economies, and redirect human destiny, the FreeStore platform provides thousands of believers with unrestricted streaming and downloads of audio teachings, sermons, and spiritual literature.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              This blog serves as the editorial voice of the FreeStore mission—condensing high-level spiritual revelations, kingdom financial laws, and mindset renewal into structured, readable articles for your daily personal devotion and growth.
            </p>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#121624] via-[#10141f] to-[#0c0e15] border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xl">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              The Heart Behind the Platform
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              <em>“Wisdom is good with an inheritance. What God places in your hands must be stewarded with diligence, illuminated by His Word, and multiplied through disciplined action.”</em>
            </p>
            <div className="pt-4 border-t border-white/[0.08]">
              <p className="text-sm font-semibold text-white">Dr. Isaiah Macwealth</p>
              <p className="text-xs text-slate-500">Author, Pastor, &amp; Founder</p>
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Our Core Pillars</h2>
            <p className="text-slate-400 text-sm">
              The four foundational cornerstones of every teaching published on Macwealth FreeStore Blog.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "account_balance_wallet",
                title: "Kingdom Stewardship",
                desc: "Discovering biblical laws of financial growth, trading wisely, purposeful saving, and ethical wealth creation that honors God.",
              },
              {
                icon: "auto_awesome",
                title: "Spiritual Depth",
                desc: "Moving beyond superficial religious routines into intentional quiet time, divine intimacy, and confidence in the Father’s love.",
              },
              {
                icon: "psychology",
                title: "Mindset Renewal",
                desc: "Replacing defeatist patterns with sound biblical thinking, intellectual diligence, and overcoming fear through Romans 12 and 2 Timothy 1.",
              },
              {
                icon: "military_tech",
                title: "Order & Discipline",
                desc: "Establishing divine order, decisive living, and high-discipline routines that build true capacity for every new season of life.",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="bg-[#10141e] border border-white/[0.07] hover:border-indigo-500/30 rounded-2xl p-6 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                    <span className="material-symbols-outlined text-xl">{pillar.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FreeStore Digital Platform Callout */}
        <section className="bg-gradient-to-br from-[#121624] via-[#0f131e] to-[#0a0d14] border border-indigo-500/20 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center">
          <div className="max-w-2xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Access the Free Audio &amp; Media Store
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Looking for full sermon audio series, prophetic worship tracks, and extended masterclasses? Visit the main FreeStore platform to stream and download without cost.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <a
                href="https://macwealthfreestore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 inline-flex items-center gap-2"
              >
                <span>Visit Macwealth FreeStore</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
              <Link
                href="/contact"
                className="bg-[#151926] hover:bg-[#1a2030] text-slate-300 hover:text-white text-xs font-semibold px-6 py-3 rounded-xl border border-white/10 transition-colors inline-flex items-center gap-2"
              >
                <span>Contact Our Team</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
