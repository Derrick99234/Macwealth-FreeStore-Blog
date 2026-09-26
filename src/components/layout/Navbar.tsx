"use client";

import { usePathname } from "next/navigation";

const links = [
  { label: "Latest", href: "/" },
  { label: "Popular", href: "/popular" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-surface-container-lowest w-full top-0 sticky z-50 border-b border-outline-variant">
      <div className="flex justify-between items-center px-md py-xs max-w-container-max mx-auto">
        <div className="font-display-lg-mobile text-display-lg-mobile text-primary cursor-pointer">
          FreeStore
        </div>
        <div className="hidden md:flex gap-md items-center font-ui-label text-ui-label">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`cursor-pointer active:opacity-80 ${
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-on-surface-variant hover:text-primary transition-colors"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
        <div className="flex items-center gap-sm">
          <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-outline-variant">
              search
            </span>
            <input
              className="pl-8 pr-4 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-ui-label focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Search articles..."
              type="text"
            />
          </div>
          <button className="font-ui-button text-ui-button px-sm py-1.5 text-on-secondary-fixed-variant hover:text-primary transition-colors cursor-pointer active:opacity-80">
            Sign In
          </button>
          <button className="font-ui-button text-ui-button bg-primary text-on-primary px-md py-1.5 rounded-lg hover:opacity-90 transition-all cursor-pointer active:scale-95">
            Subscribe
          </button>
        </div>
      </div>
    </nav>
  );
}
