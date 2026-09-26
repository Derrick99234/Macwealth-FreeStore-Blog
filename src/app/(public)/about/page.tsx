"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DEFAULT_FOCUS_IMAGE } from "@/lib/images";

export default function AboutPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-[#121622] via-[#0f121a] to-[#0c0e14] border border-white/[0.08] rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                About <span className="text-indigo-400">Macwealth FreeStore</span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                A premium editorial platform dedicated to the intersection of architecture, machine intelligence, and cognitive focus. We believe in high-clarity reading and intellectual depth.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Illustration Grid */}
        <section className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Our Vision for Modern Reading
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Macwealth FreeStore was created as a sanctuary for deep thinking in an age of fragmented attention. We curate and commission critical essays, architectural analysis, and technological forecasts that prioritize substance over vanity metrics.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Every perspective published undergoes rigorous editorial curation to ensure accuracy, originality, and conceptual depth. We treat ideas with the care they deserve.
            </p>
          </div>

          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl aspect-[16/10]">
            <img
              src={DEFAULT_FOCUS_IMAGE}
              alt="Editorial Meditation"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Core Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Depth Over Speed",
                desc: "We prioritize thorough investigation and sustained cognitive clarity over fast-cycle breaking news.",
              },
              {
                title: "Human Agency",
                desc: "Exploring how technological automation can augment human dignity and creative sovereignty rather than replace it.",
              },
              {
                title: "Design Integrity",
                desc: "Crafting quiet, distraction-free reading interfaces that respect your visual attention span.",
              },
            ].map((val, i) => (
              <div
                key={i}
                className="bg-[#10141e] border border-white/[0.07] rounded-2xl p-6 hover:border-indigo-500/30 transition-all shadow-lg"
              >
                <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full mb-4 inline-block">
                  0{i + 1}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Inquiry Section */}
        <section className="max-w-2xl mx-auto bg-[#10141e] border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
            <p className="text-slate-400 text-sm">
              Editorial submissions, press inquiries, or collaboration proposals.
            </p>
          </div>

          {status === "success" && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm text-center">
              Thank you! Your inquiry has been sent to our editorial desk.
            </div>
          )}

          {status === "error" && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm text-center">
              Failed to send inquiry. Please try again or email us directly at info@macwealthfreestore.com.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Alex Mercer"
                  className="w-full px-4 py-3 bg-[#0a0c10] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="alex@domain.com"
                  className="w-full px-4 py-3 bg-[#0a0c10] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Editorial pitch / Question"
                className="w-full px-4 py-3 bg-[#0a0c10] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Write your note here..."
                className="w-full px-4 py-3 bg-[#0a0c10] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 cursor-pointer"
            >
              {status === "loading" ? "Sending..." : "Submit Inquiry"}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
