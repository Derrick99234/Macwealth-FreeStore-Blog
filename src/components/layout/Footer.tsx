import Link from "next/link";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-[#07090d] border-t border-white/[0.08] text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Macwealth <span className="text-indigo-400 font-normal">FreeStore</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              Curated perspectives on design systems, artificial intelligence, and intellectual focus in the digital age.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Latest Stories
                </Link>
              </li>
              <li>
                <Link href="/popular" className="hover:text-white transition-colors">
                  Popular Reads
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Editorial
                </Link>
              </li>
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/?category=ai-machine-learning" className="hover:text-white transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/?category=design-systems" className="hover:text-white transition-colors">
                  Design Systems
                </Link>
              </li>
              <li>
                <Link href="/?category=technology" className="hover:text-white transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/?category=modern-lifestyle" className="hover:text-white transition-colors">
                  Modern Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Stay Informed
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Subscribe to get curated editorial insights delivered directly to your inbox.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} Macwealth FreeStore. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/admin" className="hover:text-indigo-400 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
