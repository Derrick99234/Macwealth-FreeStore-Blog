"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Popular", href: "/popular" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function NavbarInner() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const querySearch = searchParams.get("search") || "";

  const { data: session } = useSession();
  const [search, setSearch] = useState(querySearch);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setSearch(querySearch);
  }, [querySearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push("/");
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    if (querySearch) {
      router.push("/");
    }
  };

  return (
    <nav className="w-full top-0 sticky z-50 bg-[#0a0c10]/95 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="flex justify-between items-center px-4 sm:px-6 py-3.5 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            M
          </div>
          <span className="font-bold text-lg tracking-tight text-white group-hover:text-indigo-400 transition-colors">
            Macwealth <span className="text-slate-400 font-normal">FreeStore</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex gap-8 items-center text-sm font-medium">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 ${
                  isActive
                    ? "text-indigo-400 font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-3">
          {/* Search Form - Visible on md and up */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">
              search
            </span>
            <input
              className="pl-9 pr-8 py-2 bg-[#121620] border border-white/[0.08] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all w-48 sm:w-60 lg:w-72 focus:w-80"
              placeholder="Search teachings, wisdom, books..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </form>

          {/* Auth State Links */}
          {session?.user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-xs font-medium text-slate-200 hover:text-white px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 transition-all cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">
                  {session.user.name?.charAt(0) || "U"}
                </div>
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-xs text-slate-400 hover:text-red-400 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/auth/signin"
                className="text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition-all shadow-md shadow-indigo-600/20 active:scale-95 cursor-pointer"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg ml-1"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-[#0c0e14] px-4 py-4 space-y-3">
          <form onSubmit={handleSearch} className="relative mb-3">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">
              search
            </span>
            <input
              className="w-full pl-9 pr-8 py-2 bg-[#121620] border border-white/[0.08] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              placeholder="Search teachings, wisdom, books..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </form>

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-slate-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
            {session?.user ? (
              <>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-xs text-indigo-400 font-medium"
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                    {session.user.name?.charAt(0) || "U"}
                  </div>
                  <span>{session.user.name || "Dashboard"}</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3 w-full">
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-medium text-slate-300 hover:text-white bg-white/[0.05] rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export function Navbar() {
  return (
    <Suspense fallback={<div className="h-16 w-full bg-[#0a0c10]" />}>
      <NavbarInner />
    </Suspense>
  );
}
