"use client";

import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", icon: "dashboard", href: "/admin" },
  { label: "Content", icon: "article", href: "/admin/content" },
  { label: "Editor", icon: "edit_note", href: "/admin/editor" },
  { label: "Settings", icon: "settings", href: "/admin/settings" },
  { label: "Subscribers", icon: "mail", href: "/admin/subscribers" },
  { label: "Inquiries", icon: "contact_support", href: "/admin/inquiries" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userInitial = session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0)?.toUpperCase() || "A";
  const userName = session?.user?.name || "Admin";
  const userRole = (session?.user as any)?.role || "AUTHOR";

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-[#0d1017] border-r border-white/[0.08] flex flex-col py-6 z-50">
      <div className="px-6 mb-8">
        <Link href="/" className="inline-block">
          <div className="text-lg font-bold text-white tracking-tight">
            Macwealth <span className="text-indigo-400">FreeStore</span>
          </div>
        </Link>
        <p className="text-xs text-slate-500 mt-1">Admin CMS Studio</p>
      </div>

      <nav className="flex-grow space-y-1.5 px-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-indigo-600/15 text-indigo-400 border border-indigo-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <span className="material-symbols-outlined text-xl">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-auto pt-4 border-t border-white/[0.08] space-y-3">
        <Link
          href="/admin/editor"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">add</span>
          New Article
        </Link>

        {/* User Profile Card & Sign Out */}
        <div className="bg-[#121622] border border-white/[0.06] rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {userInitial}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{userName}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">{userRole}</p>
              </div>
            </div>
            <Link
              href="/"
              className="text-[11px] text-slate-400 hover:text-white transition-colors"
              title="Return to site"
            >
              <span className="material-symbols-outlined text-base">open_in_new</span>
            </Link>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
