import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/ui/ContactForm";

export const metadata = {
  title: "Contact Us | Macwealth FreeStore Blog",
  description:
    "Get in touch with the Macwealth FreeStore editorial desk. Submit questions, feedback, testimonies, or inquiries regarding Dr. Isaiah Macwealth's spiritual teachings.",
};

export default function ContactPage() {
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
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
