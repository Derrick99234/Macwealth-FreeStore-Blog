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
  const [adminImage, setAdminImage] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
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
        setAdminImage(data.adminImage || "");
      })
      .catch(() => {});
  }, []);

  const showMsg = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleFileUpload = async (file: File, type: "logo" | "avatar") => {
    const isLogo = type === "logo";
    if (isLogo) setUploadingLogo(true);
    else setUploadingAvatar(true);

    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        if (isLogo) {
          setBlogLogo(data.url);
          showMsg("success", "Logo uploaded to Supabase Storage!");
        } else {
          setAdminImage(data.url);
          showMsg("success", "Avatar uploaded to Supabase Storage!");
        }
      } else {
        showMsg("error", data.error || "Upload failed");
      }
    } catch {
      showMsg("error", "Image upload failed. Please try again.");
    } finally {
      if (isLogo) setUploadingLogo(false);
      else setUploadingAvatar(false);
    }
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
      showMsg("success", "Settings saved successfully!");
    } catch {
      showMsg("error", "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    return (
      <div className="min-h-screen bg-[#0d1117] p-8 text-slate-400 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading settings...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d1117] p-6 lg:p-10 text-slate-100">
      {message && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-2xl font-medium text-sm flex items-center gap-2 transition-all ${
            message.type === "success"
              ? "bg-emerald-600/90 text-white border border-emerald-400/30 backdrop-blur-md"
              : "bg-rose-600/90 text-white border border-rose-400/30 backdrop-blur-md"
          }`}
        >
          <span className="material-symbols-outlined text-base">
            {message.type === "success" ? "check_circle" : "error"}
          </span>
          {message.text}
        </div>
      )}

      <header className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Settings</h2>
        <p className="text-slate-400 text-sm">Configure your blog platform, metadata, and administrator profile.</p>
      </header>

      <div className="max-w-4xl space-y-8">
        {/* General Settings */}
        <section className="bg-[#131824] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">General Information</h3>
              <p className="text-xs text-slate-400 mt-1">Platform branding, description, and visual identity.</p>
            </div>
            <span className="material-symbols-outlined text-slate-500">tune</span>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Blog Name
              </label>
              <input
                className="w-full px-4 py-2.5 bg-[#0a0d14] border border-white/[0.1] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                value={blogName}
                onChange={(e) => setBlogName(e.target.value)}
                type="text"
                placeholder="Macwealth FreeStore"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2.5 bg-[#0a0d14] border border-white/[0.1] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 h-24 resize-none transition-all"
                value={blogDesc}
                onChange={(e) => setBlogDesc(e.target.value)}
                placeholder="A sanctuary for deep thinking in an age of fragmented attention..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Blog Logo (Supabase Storage)
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {blogLogo ? (
                  <div className="relative group w-20 h-20 rounded-xl overflow-hidden border border-white/[0.1] bg-[#0a0d14] flex-shrink-0 flex items-center justify-center">
                    <img src={blogLogo} alt="Blog Logo" className="w-full h-full object-contain p-2" />
                    <button
                      onClick={() => setBlogLogo("")}
                      type="button"
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-rose-400 hover:text-rose-300"
                      title="Remove Logo"
                    >
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-xl border-2 border-dashed border-white/[0.15] bg-[#0a0d14] flex items-center justify-center text-slate-500 flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">image</span>
                  </div>
                )}

                <div className="flex-grow space-y-2 w-full">
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold rounded-lg border border-indigo-500/30 transition-all">
                      <span className="material-symbols-outlined text-base">
                        {uploadingLogo ? "hourglass_top" : "upload"}
                      </span>
                      {uploadingLogo ? "Uploading to Supabase..." : "Upload Logo"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingLogo}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleFileUpload(f, "logo");
                        }}
                      />
                    </label>
                    <span className="text-xs text-slate-500">or enter direct URL below</span>
                  </div>
                  <input
                    className="w-full px-4 py-2 bg-[#0a0d14] border border-white/[0.1] rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    value={blogLogo}
                    onChange={(e) => setBlogLogo(e.target.value)}
                    placeholder="https://gmmbxzqgjjecvjmodaag.supabase.co/storage/v1/object/public/blog_image/logo.png"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.08] flex justify-end">
            <button
              onClick={() => handleSave({ blogName, blogDescription: blogDesc, blogLogo })}
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-6 py-2.5 rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-indigo-600/20"
            >
              <span className="material-symbols-outlined text-base">save</span>
              {saving ? "Saving..." : "Save General Settings"}
            </button>
          </div>
        </section>

        {/* SEO Defaults */}
        <section className="bg-[#131824] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">SEO & Social Metadata</h3>
              <p className="text-xs text-slate-400 mt-1">Search engine indexing and OpenGraph social previews.</p>
            </div>
            <span className="material-symbols-outlined text-slate-500">search</span>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Default Meta Title
              </label>
              <input
                className="w-full px-4 py-2.5 bg-[#0a0d14] border border-white/[0.1] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                type="text"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Default Meta Description
              </label>
              <textarea
                className="w-full px-4 py-2.5 bg-[#0a0d14] border border-white/[0.1] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 h-24 resize-none transition-all"
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                placeholder="Default description for pages without a custom SEO summary..."
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.08] flex justify-end">
            <button
              onClick={() => handleSave({ seoTitle, seoDescription: seoDesc })}
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-6 py-2.5 rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-indigo-600/20"
            >
              <span className="material-symbols-outlined text-base">save</span>
              {saving ? "Saving..." : "Save SEO Defaults"}
            </button>
          </div>
        </section>

        {/* Admin Profile */}
        <section className="bg-[#131824] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Administrator Profile</h3>
              <p className="text-xs text-slate-400 mt-1">Manage admin credentials and author avatar stored in Supabase.</p>
            </div>
            <span className="material-symbols-outlined text-slate-500">badge</span>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Admin Avatar (Supabase Storage)
              </label>
              <div className="flex items-center gap-4">
                {adminImage ? (
                  <div className="relative group w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500/40 bg-[#0a0d14] flex-shrink-0">
                    <img src={adminImage} alt={adminName} className="w-full h-full object-cover" />
                    <button
                      onClick={() => setAdminImage("")}
                      type="button"
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-rose-400 hover:text-rose-300"
                      title="Remove Avatar"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/[0.15] bg-[#0a0d14] flex items-center justify-center text-slate-500 flex-shrink-0">
                    <span className="material-symbols-outlined text-xl">person</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold rounded-lg border border-indigo-500/30 transition-all">
                    <span className="material-symbols-outlined text-base">
                      {uploadingAvatar ? "hourglass_top" : "upload"}
                    </span>
                    {uploadingAvatar ? "Uploading to Supabase..." : "Upload New Avatar"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingAvatar}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFileUpload(f, "avatar");
                      }}
                    />
                  </label>
                  <p className="text-[11px] text-slate-500">Stored directly in your Supabase &lsquo;blog_image&rsquo; bucket.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Admin Display Name
                </label>
                <input
                  className="w-full px-4 py-2.5 bg-[#0a0d14] border border-white/[0.1] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  type="text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Admin Email
                </label>
                <input
                  className="w-full px-4 py-2.5 bg-[#0a0d14] border border-white/[0.1] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  type="email"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.08] flex justify-end">
            <button
              onClick={() => handleSave({ adminName, adminEmail, adminImage })}
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-6 py-2.5 rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-indigo-600/20"
            >
              <span className="material-symbols-outlined text-base">save</span>
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
