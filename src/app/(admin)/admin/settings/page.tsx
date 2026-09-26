"use client";

import { useEffect, useState } from "react";

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [blogName, setBlogName] = useState("");
  const [blogDesc, setBlogDesc] = useState("");
  const [blogLogo, setBlogLogo] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        setBlogName(data.blogName || "");
        setBlogDesc(data.blogDescription || "");
        setBlogLogo(data.blogLogo || "");
        setSeoTitle(data.seoTitle || "");
        setSeoDesc(data.seoDescription || "");
        setAdminName(data.adminName || "");
        setAdminEmail(data.adminEmail || "");
      })
      .catch(() => {});
  }, []);

  const showMsg = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSave = async (fields: Record<string, string>) => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error("Failed to save");
      showMsg("success", "Settings saved!");
    } catch {
      showMsg("error", "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (!settings) return <div className="min-h-screen bg-surface-bright p-lg text-on-surface-variant">Loading...</div>;

  return (
    <main className="min-h-screen bg-surface-bright p-lg">
      {message && (
        <div className={`fixed top-4 right-4 z-50 px-md py-sm rounded-lg shadow-lg font-ui-label text-ui-label ${
          message.type === "success" ? "bg-tertiary text-on-tertiary" : "bg-error text-on-error"
        }`}>
          {message.text}
        </div>
      )}
      <header className="mb-lg">
        <h2 className="text-display-lg text-primary font-display-lg mb-xs">Settings</h2>
        <p className="text-on-surface-variant text-meta-data font-meta-data">Configure your blog platform.</p>
      </header>

      <div className="max-w-3xl space-y-lg">
        <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md">
          <h3 className="text-ui-button text-on-surface font-ui-button mb-md">General</h3>
          <div className="space-y-md">
            <div>
              <label className="block text-ui-label text-on-surface-variant font-ui-label mb-xs">Blog Name</label>
              <input className="w-full px-md py-sm bg-surface-container border border-outline-variant rounded-lg font-ui-label text-ui-label focus:outline-none focus:ring-2 focus:ring-primary/50" value={blogName} onChange={(e) => setBlogName(e.target.value)} type="text" />
            </div>
            <div>
              <label className="block text-ui-label text-on-surface-variant font-ui-label mb-xs">Description</label>
              <textarea className="w-full px-md py-sm bg-surface-container border border-outline-variant rounded-lg font-ui-label text-ui-label focus:outline-none focus:ring-2 focus:ring-primary/50 h-24 resize-none" value={blogDesc} onChange={(e) => setBlogDesc(e.target.value)} />
            </div>
            <div>
              <label className="block text-ui-label text-on-surface-variant font-ui-label mb-xs">Logo URL</label>
              <input className="w-full px-md py-sm bg-surface-container border border-outline-variant rounded-lg font-ui-label text-ui-label focus:outline-none focus:ring-2 focus:ring-primary/50" value={blogLogo} onChange={(e) => setBlogLogo(e.target.value)} placeholder="https://example.com/logo.png" type="text" />
            </div>
          </div>
          <div className="mt-md pt-md border-t border-outline-variant">
            <button
              onClick={() => handleSave({ blogName, blogDescription: blogDesc, blogLogo })}
              disabled={saving}
              className="bg-primary text-on-primary font-ui-button text-ui-button px-lg py-sm rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md">
          <h3 className="text-ui-button text-on-surface font-ui-button mb-md">SEO Defaults</h3>
          <div className="space-y-md">
            <div>
              <label className="block text-ui-label text-on-surface-variant font-ui-label mb-xs">Default Meta Title</label>
              <input className="w-full px-md py-sm bg-surface-container border border-outline-variant rounded-lg font-ui-label text-ui-label focus:outline-none focus:ring-2 focus:ring-primary/50" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} type="text" />
            </div>
            <div>
              <label className="block text-ui-label text-on-surface-variant font-ui-label mb-xs">Default Meta Description</label>
              <textarea className="w-full px-md py-sm bg-surface-container border border-outline-variant rounded-lg font-ui-label text-ui-label focus:outline-none focus:ring-2 focus:ring-primary/50 h-24 resize-none" value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} placeholder="Default description for pages without a custom SEO description..." />
            </div>
          </div>
          <div className="mt-md pt-md border-t border-outline-variant">
            <button
              onClick={() => handleSave({ seoTitle, seoDescription: seoDesc })}
              disabled={saving}
              className="bg-primary text-on-primary font-ui-button text-ui-button px-lg py-sm rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md">
          <h3 className="text-ui-button text-on-surface font-ui-button mb-md">Profile</h3>
          <div className="space-y-md">
            <div>
              <label className="block text-ui-label text-on-surface-variant font-ui-label mb-xs">Admin Name</label>
              <input className="w-full px-md py-sm bg-surface-container border border-outline-variant rounded-lg font-ui-label text-ui-label focus:outline-none focus:ring-2 focus:ring-primary/50" value={adminName} onChange={(e) => setAdminName(e.target.value)} type="text" />
            </div>
            <div>
              <label className="block text-ui-label text-on-surface-variant font-ui-label mb-xs">Admin Email</label>
              <input className="w-full px-md py-sm bg-surface-container border border-outline-variant rounded-lg font-ui-label text-ui-label focus:outline-none focus:ring-2 focus:ring-primary/50" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} type="email" />
            </div>
          </div>
          <div className="mt-md pt-md border-t border-outline-variant">
            <button
              onClick={() => handleSave({ adminName, adminEmail })}
              disabled={saving}
              className="bg-primary text-on-primary font-ui-button text-ui-button px-lg py-sm rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
