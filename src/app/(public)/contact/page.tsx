"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

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
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || "Unable to send your message. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
        {/* Header Hero */}
        <section className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-block mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20">
              Connect With Us
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Contact <span className="text-indigo-400">Macwealth FreeStore</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Have questions about a teaching, testimony to share, or general inquiry? We welcome your messages and look forward to connecting with you.
          </p>
        </section>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Information & Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#10141e] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Direct Communication
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Macwealth FreeStore is committed to serving believers worldwide with free spiritual teachings, life-changing audio albums, and practical kingdom literature.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</h3>
                    <a
                      href="mailto:info@macwealthfreestore.com"
                      className="text-sm font-medium text-white hover:text-indigo-400 transition-colors"
                    >
                      info@macwealthfreestore.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <span className="material-symbols-outlined text-xl">language</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Digital Resource Store</h3>
                    <a
                      href="https://macwealthfreestore.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-white hover:text-indigo-400 transition-colors"
                    >
                      macwealthfreestore.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <span className="material-symbols-outlined text-xl">schedule</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Response Window</h3>
                    <p className="text-sm text-slate-300">
                      Typically within 24 to 48 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ministry Teachings Card */}
            <div className="bg-gradient-to-br from-[#121624] to-[#0c0e15] border border-indigo-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-base font-bold text-white mb-2">
                Looking for Full Audio Teachings?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Access hundreds of hours of free audio messages, sermon series, and spiritual literature by Dr. Isaiah Macwealth directly on the main FreeStore platform.
              </p>
              <a
                href="https://macwealthfreestore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline"
              >
                Visit Macwealth FreeStore Audio Platform
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#10141e] border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">
                Send a Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-8 leading-relaxed">
                Fill out the form below and our editorial and communications desk will attend to your inquiry.
              </p>

              {status === "success" && (
                <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-400">check_circle</span>
                  <span>Thank you! Your message has been sent successfully. We will get back to you shortly.</span>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-3">
                  <span className="material-symbols-outlined text-red-400">error</span>
                  <span>{errorMessage || "Failed to send inquiry. Please try again."}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Your Name <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. John Emmanuel"
                      className="w-full px-4 py-3 bg-[#0a0c10] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Email Address <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 bg-[#0a0c10] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
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
                    placeholder="e.g. Feedback on Quiet Time Teaching / Prayer Request"
                    className="w-full px-4 py-3 bg-[#0a0c10] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Message <span className="text-indigo-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your note, inquiry, or question here..."
                    className="w-full px-4 py-3 bg-[#0a0c10] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <span className="material-symbols-outlined text-sm">send</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
