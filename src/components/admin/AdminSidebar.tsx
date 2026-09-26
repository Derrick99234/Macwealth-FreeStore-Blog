"use client";

import { usePathname } from "next/navigation";
import { images } from "@/lib/images";

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

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant flex flex-col py-md z-50">
      <div className="px-sm mb-lg">
        <h1 className="text-display-lg-mobile text-primary font-display-lg mb-xs">
          Admin Panel
        </h1>
        <p className="text-on-surface-variant text-meta-data font-meta-data">
          Editor Workspace
        </p>
      </div>
      <nav className="flex-grow space-y-xs px-xs">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-xs px-sm py-xs transition-all cursor-pointer active:scale-95 ${
                isActive
                  ? "text-primary border-l-2 border-primary bg-secondary-container"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-xl">
                {item.icon}
              </span>
              <span className="font-ui-label text-ui-label">{item.label}</span>
            </a>
          );
        })}
      </nav>
      <div className="px-sm mt-auto pt-md border-t border-outline-variant">
        <a
          href="/admin/editor"
          className="w-full flex items-center justify-center gap-xs bg-primary text-on-primary py-sm rounded-lg font-ui-button text-ui-button hover:opacity-90 transition-opacity active:scale-95"
        >
          <span className="material-symbols-outlined">add</span>
          New Post
        </a>
        <div className="mt-md flex items-center gap-sm px-xs">
          <img
            src={images.admin.avatar}
            alt="Admin"
            className="w-10 h-10 rounded-full object-cover border border-outline-variant"
          />
          <div className="overflow-hidden">
            <p className="text-ui-label text-on-surface truncate font-ui-label">
              Admin Profile
            </p>
            <p className="text-meta-data text-on-surface-variant truncate font-meta-data">
              admin@macwealthfreestore.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
