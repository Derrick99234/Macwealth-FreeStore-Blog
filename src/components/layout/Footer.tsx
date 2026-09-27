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
              Transformational teachings on biblical wisdom, kingdom stewardship, spiritual illumination, and mindset renewal by Dr. Isaiah Macwealth.
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
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About FreeStore
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
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
                <Link href="/?category=wealth-stewardship" className="hover:text-white transition-colors">
                  Wealth & Stewardship
                </Link>
              </li>
              <li>
                <Link href="/?category=spiritual-growth" className="hover:text-white transition-colors">
                  Spiritual Growth
                </Link>
              </li>
              <li>
                <Link href="/?category=mindset-success" className="hover:text-white transition-colors">
                  Mindset & Success
                </Link>
              </li>
              <li>
                <Link href="/?category=vision-purpose" className="hover:text-white transition-colors">
                  Vision & Purpose
                </Link>
              </li>
              <li>
                <Link href="/?category=discipline-order" className="hover:text-white transition-colors">
                  Discipline & Order
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
              Subscribe to receive inspirational teachings, wisdom strategies, and kingdom insights delivered directly to your inbox.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} Macwealth FreeStore. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/privacy#terms" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
