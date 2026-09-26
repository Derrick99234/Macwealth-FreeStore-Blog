"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function useFooterVariant() {
  const pathname = usePathname();
  const [variant, setVariant] = useState<"home" | "article" | "popular" | "categories">("home");

  useEffect(() => {
    if (pathname === "/") setVariant("home");
    else if (pathname.startsWith("/popular")) setVariant("popular");
    else if (pathname.startsWith("/categories")) setVariant("categories");
    else if (pathname.startsWith("/about")) setVariant("home");
    else setVariant("article");
  }, [pathname]);

  return variant;
}

function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-md ${className}`}>
      <span className="material-symbols-outlined text-on-secondary-fixed-variant hover:text-on-primary cursor-pointer transition-colors">
        public
      </span>
      <span className="material-symbols-outlined text-on-secondary-fixed-variant hover:text-on-primary cursor-pointer transition-colors">
        rss_feed
      </span>
      <span className="material-symbols-outlined text-on-secondary-fixed-variant hover:text-on-primary cursor-pointer transition-colors">
        alternate_email
      </span>
    </div>
  );
}

function FooterHome() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md px-md max-w-container-max mx-auto">
        <div className="flex flex-col gap-sm">
          <div className="text-display-lg-mobile text-on-primary font-display-lg">
            Macwealth FreeStore
          </div>
          <p className="text-on-secondary-fixed-variant leading-relaxed">
            A premium editorial platform dedicated to the intersection of technology, design, and culture. We believe in high-focus reading and intellectual integrity.
          </p>
        </div>
        <div className="flex flex-col md:items-center">
          <div className="flex flex-col gap-xs">
            <h4 className="text-on-primary font-bold uppercase tracking-widest text-xs mb-xs">
              Navigation
            </h4>
            {["Latest Articles", "Editor's Choice", "Popular Tags", "About the Platform"].map(
              (l) => (
                <a
                  key={l}
                  className="text-on-secondary-fixed-variant hover:underline decoration-primary transition-all cursor-pointer"
                  href="#"
                >
                  {l}
                </a>
              )
            )}
          </div>
        </div>
        <div className="flex flex-col md:items-end">
          <div className="flex flex-col gap-xs md:text-right">
            <h4 className="text-on-primary font-bold uppercase tracking-widest text-xs mb-xs">
              Legal & Connect
            </h4>
            {["Privacy Policy", "Terms of Service", "Contact Us", "Newsletter"].map(
              (l) => (
                <a
                  key={l}
                  className="text-on-secondary-fixed-variant hover:underline decoration-primary transition-all cursor-pointer"
                  href="#"
                >
                  {l}
                </a>
              )
            )}
          </div>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-md mt-lg pt-md border-t border-outline/20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-sm">
          <p className="text-on-secondary-fixed-variant">
            &copy; 2024 Macwealth FreeStore. All rights reserved.
          </p>
          <SocialIcons />
        </div>
      </div>
    </>
  );
}

function FooterArticle() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-md px-md max-w-container-max mx-auto">
      <div className="flex flex-col gap-sm">
        <div className="text-display-lg-mobile text-on-primary font-display-lg">
          Macwealth FreeStore
        </div>
        <p className="text-on-secondary-fixed-variant leading-relaxed">
          Curating ideas that matter. Exploring the future of design, technology, and human creativity.
        </p>
        <SocialIcons />
      </div>
      <div className="flex flex-col md:items-center">
        <div className="flex flex-col gap-xs">
          <h4 className="text-on-primary font-bold uppercase tracking-widest text-xs mb-xs">
            Resources
          </h4>
          {["Latest Articles", "Popular Tags", "Contact Us", "Newsletter"].map(
            (l) => (
              <a
                key={l}
                className="text-on-secondary-fixed-variant hover:underline decoration-primary transition-all cursor-pointer"
                href="#"
              >
                {l}
              </a>
            )
          )}
        </div>
      </div>
      <div className="flex flex-col md:items-end">
        <div className="flex flex-col gap-xs md:text-right">
          <h4 className="text-on-primary font-bold uppercase tracking-widest text-xs mb-xs">
            Legal
          </h4>
          <a className="text-on-secondary-fixed-variant hover:underline decoration-primary transition-all cursor-pointer" href="#">
            Privacy Policy
          </a>
          <a className="text-on-secondary-fixed-variant hover:underline decoration-primary transition-all cursor-pointer" href="#">
            Terms of Service
          </a>
          <p className="text-on-secondary-fixed-variant mt-sm">
            &copy; 2024 Macwealth FreeStore
          </p>
        </div>
      </div>
    </div>
  );
}

function FooterPopular() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-md px-md max-w-container-max mx-auto">
      <div className="flex flex-col gap-sm">
        <div className="text-display-lg-mobile text-on-primary font-display-lg">
          Macwealth FreeStore
        </div>
        <p className="text-on-secondary-fixed-variant leading-relaxed">
          Curating ideas that matter. Exploring the future of design, technology, and human creativity.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-md">
        <div className="flex flex-col gap-xs">
          <h4 className="text-on-primary font-bold uppercase tracking-widest text-xs mb-xs">
            Platform
          </h4>
          {["Latest", "Popular", "Categories"].map((l) => (
            <a
              key={l}
              className="text-on-secondary-fixed-variant hover:underline decoration-primary transition-all cursor-pointer"
              href="#"
            >
              {l}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-xs">
          <h4 className="text-on-primary font-bold uppercase tracking-widest text-xs mb-xs">
            Company
          </h4>
          {["About", "Privacy Policy", "Terms"].map((l) => (
            <a
              key={l}
              className="text-on-secondary-fixed-variant hover:underline decoration-primary transition-all cursor-pointer"
              href="#"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:items-end gap-sm">
        <h4 className="text-on-primary font-bold uppercase tracking-widest text-xs">
          Connect
        </h4>
        <SocialIcons />
        <p className="text-on-secondary-fixed-variant mt-sm">
          &copy; 2024 Macwealth FreeStore
        </p>
      </div>
    </div>
  );
}

function FooterCategories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-md px-md max-w-container-max mx-auto">
      <div className="flex flex-col gap-sm">
        <div className="text-display-lg-mobile text-on-primary font-display-lg">
          Macwealth FreeStore
        </div>
        <p className="text-on-secondary-fixed-variant leading-relaxed">
          Curating ideas that matter. Exploring the future of design, technology, and human creativity.
        </p>
        <SocialIcons />
      </div>
      <div className="flex flex-col md:items-center">
        <div className="flex flex-col gap-xs">
          <h4 className="text-on-primary font-bold uppercase tracking-widest text-xs mb-xs">
            Resources
          </h4>
          {["Latest Articles", "Popular Tags", "Contact Us", "Newsletter"].map(
            (l) => (
              <a
                key={l}
                className="text-on-secondary-fixed-variant hover:underline decoration-primary transition-all cursor-pointer"
                href="#"
              >
                {l}
              </a>
            )
          )}
        </div>
      </div>
      <div className="flex flex-col md:items-end gap-sm">
        <div>
          <h4 className="text-on-primary font-bold uppercase tracking-widest text-xs mb-xs">
            Language
          </h4>
          <div className="flex gap-sm">
            {["English", "Español", "Français"].map((l) => (
              <span
                key={l}
                className="text-on-secondary-fixed-variant hover:text-on-primary cursor-pointer transition-colors text-meta-data font-meta-data"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-sm">
          <h4 className="text-on-primary font-bold uppercase tracking-widest text-xs mb-xs">
            Stay in Touch
          </h4>
          <div className="flex gap-xs">
            <input
              className="px-sm py-1 rounded bg-surface-container-lowest text-meta-data font-meta-data border border-outline-variant focus:outline-none focus:ring-1 focus:ring-primary w-36"
              placeholder="Your email"
              type="email"
            />
            <button className="px-md py-1 bg-primary text-on-primary text-meta-data font-bold rounded hover:opacity-90 transition-all text-xs">
              Subscribe
            </button>
          </div>
        </div>
        <p className="text-on-secondary-fixed-variant mt-sm">
          &copy; 2024 Macwealth FreeStore
        </p>
      </div>
    </div>
  );
}

const variants = {
  home: FooterHome,
  article: FooterArticle,
  popular: FooterPopular,
  categories: FooterCategories,
} as const;

export function Footer() {
  const variant = useFooterVariant();
  const Component = variants[variant];

  return (
    <footer className="bg-inverse-surface w-full py-lg border-t border-outline-variant">
      <Component />
    </footer>
  );
}
