import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy & Terms | Macwealth FreeStore Blog",
  description: "Privacy policy and terms of use for Macwealth FreeStore Blog.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
        {/* Header Hero */}
        <section className="mb-12 text-center">
          <div className="inline-block mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Legal & Privacy
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Privacy Policy &amp; Terms
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Our commitment to protecting your privacy and maintaining transparency across Macwealth FreeStore Blog.
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Last Updated: September 2026
          </p>
        </section>

        {/* Content Body */}
        <div className="bg-[#10141e] border border-white/[0.08] rounded-3xl p-6 sm:p-12 shadow-2xl space-y-10 text-slate-300 leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              1. Overview
            </h2>
            <p>
              Macwealth FreeStore Blog is dedicated to sharing life-transforming spiritual teachings, financial wisdom, and personal growth resources by Dr. Isaiah Macwealth. We respect your personal privacy and are committed to safeguarding any personal data you entrust to us when visiting our platform, subscribing to updates, or submitting inquiries.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              2. Information We Collect
            </h2>
            <p>
              We collect minimal information necessary to deliver our editorial services:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Newsletter Subscriptions:</strong> When you subscribe to our email updates, we collect your email address solely to deliver new blog posts, spiritual messages, and ministry announcements.
              </li>
              <li>
                <strong className="text-white">Contact &amp; Inquiries:</strong> When you reach out via our contact page, we collect your name, email address, subject, and message content to reply to your question or feedback.
              </li>
              <li>
                <strong className="text-white">Usage Analytics:</strong> We collect non-personally identifiable metrics (such as aggregate article page views) to understand which teachings resonate most with our community. We do not sell or monetize personal browsing history.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              3. How We Use Your Information
            </h2>
            <p>
              Your data is utilized strictly for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>Distributing regular spiritual insights, blog digests, and teaching notifications.</li>
              <li>Responding to personal inquiries, feedback, or prayer requests.</li>
              <li>Maintaining system security, uptime, and optimal browsing performance.</li>
            </ul>
            <p>
              We will never sell, rent, or trade your personal information to third parties or commercial marketers.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              4. Unsubscribing &amp; Data Rights
            </h2>
            <p>
              You have complete control over your subscription preferences. Every email communication includes an unsubscribe link. You may also contact us at any time at{" "}
              <a href="mailto:info@macwealthfreestore.com" className="text-indigo-400 hover:underline">
                info@macwealthfreestore.com
              </a>{" "}
              to request the deletion or correction of your email address from our subscriber registry.
            </p>
          </section>

          {/* Section 5 - Terms Anchor */}
          <section id="terms" className="pt-6 border-t border-white/[0.08] space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              5. Terms of Use &amp; Content Licensing
            </h2>
            <p>
              All published articles, audio message references, and editorial content on Macwealth FreeStore Blog are provided for personal spiritual enrichment, education, and study:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Free Access:</strong> In alignment with the FreeStore vision, these blog articles and audio resources are made accessible freely to bless believers worldwide.
              </li>
              <li>
                <strong className="text-white">Intellectual Property:</strong> All writings, teachings, audio productions, and media assets authored by Dr. Isaiah Macwealth and Macwealth FreeStore remain the protected intellectual property of the author and ministry.
              </li>
              <li>
                <strong className="text-white">Sharing &amp; Attribution:</strong> You are encouraged to share article links and quotes for non-commercial ministry or educational purposes, provided clear attribution is given to Dr. Isaiah Macwealth and Macwealth FreeStore Blog.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              6. Contact Us
            </h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our platform terms, please reach out to our team:
            </p>
            <div className="bg-[#151926] p-4 rounded-xl border border-white/10 text-sm space-y-1">
              <p className="text-white font-semibold">Macwealth FreeStore Editorial Office</p>
              <p className="text-slate-400">Email: <a href="mailto:info@macwealthfreestore.com" className="text-indigo-400 hover:underline">info@macwealthfreestore.com</a></p>
              <p className="text-slate-400">Website: <a href="https://macwealthfreestore.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">macwealthfreestore.com</a></p>
            </div>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Return to Homepage
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
