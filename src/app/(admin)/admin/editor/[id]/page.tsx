"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPost() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [featuredImage, setFeaturedImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const postId = params.id as string;

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/posts/${postId}`).then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
    ]).then(([postData, catData]) => {
      const p = postData.post;
      if (!p) { router.push("/admin/content"); return; }
      setTitle(p.title || "");
      setContent(p.content || "");
      setExcerpt(p.excerpt || "");
      setSlug(p.slug || "");
      setFeaturedImage(p.featuredImage || "");
      setCategoryId(p.categoryId || "");
      setTags(p.tags ? p.tags.split(", ").filter(Boolean) : []);
      setSeoDescription(p.seoDescription || "");
      setStatus(p.status || "DRAFT");
      setCategories(catData.categories || catData || []);
      setLoading(false);
    }).catch(() => { router.push("/admin/content"); });
  }, [postId, router]);

  useEffect(() => {
    if (!slugEdited && title && !loading) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  }, [title, slugEdited, loading]);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const updatePost = async () => {
    if (!title.trim()) { showMessage("error", "Title is required"); return; }
    if (!content.trim()) { showMessage("error", "Content is required"); return; }
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          content,
          excerpt: excerpt.trim() || undefined,
          featuredImage: featuredImage || undefined,
          slug: slug || undefined,
          categoryId: categoryId || undefined,
          tags: tags.length > 0 ? tags.join(", ") : undefined,
          seoDescription: seoDescription.trim() || undefined,
          status,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      showMessage("success", "Post updated!");
    } catch (err: any) {
      showMessage("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const insertFormat = (prefix: string, suffix: string) => {
    const ta = document.getElementById("editor-body") as HTMLTextAreaElement;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.substring(start, end);
    setContent(content.substring(0, start) + prefix + selected + suffix + content.substring(end));
    setTimeout(() => { ta.focus(); ta.setSelectionRange(start + prefix.length, start + prefix.length + selected.length); }, 0);
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) { setTags([...tags, t]); setTagInput(""); }
  };

  const removeTag = (t: string) => setTags(tags.filter((x) => x !== t));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.set("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) setFeaturedImage(data.url);
      else showMessage("error", data.error || "Upload failed");
    } catch {
      showMessage("error", "Upload failed");
    }
  };

  if (loading) return <div className="min-h-screen bg-surface-bright flex items-center justify-center text-on-surface-variant">Loading...</div>;

  return (
    <main className="min-h-screen bg-surface-bright flex flex-col relative">
      {message && (
        <div className={`fixed top-4 right-4 z-50 px-md py-sm rounded-lg shadow-lg font-ui-label text-ui-label transition-all ${
          message.type === "success" ? "bg-tertiary text-on-tertiary" : "bg-error text-on-error"
        }`}>
          {message.text}
        </div>
      )}
      <header className="h-16 flex items-center justify-between px-lg border-b border-outline-variant bg-surface-bright sticky top-0 z-20">
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-xs border-r border-outline-variant pr-md">
            <button onClick={() => insertFormat("**", "**")} className="p-xs hover:bg-surface-container rounded transition-colors" title="Bold">
              <span className="material-symbols-outlined">format_bold</span>
            </button>
            <button onClick={() => insertFormat("*", "*")} className="p-xs hover:bg-surface-container rounded transition-colors" title="Italic">
              <span className="material-symbols-outlined">format_italic</span>
            </button>
            <button onClick={() => insertFormat("[", "](url)")} className="p-xs hover:bg-surface-container rounded transition-colors" title="Link">
              <span className="material-symbols-outlined">link</span>
            </button>
            <button onClick={() => insertFormat("\n> ", "")} className="p-xs hover:bg-surface-container rounded transition-colors" title="Quote">
              <span className="material-symbols-outlined">format_quote</span>
            </button>
          </div>
          <span className="text-on-surface-variant text-ui-label font-ui-label">
            {saving ? "Saving..." : "Syncing..."}
          </span>
        </div>
        <div className="flex items-center gap-sm">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-xs font-ui-button text-ui-button py-xs px-sm border rounded transition-colors ${
              showSettings
                ? "text-primary border-primary bg-secondary-container"
                : "text-on-surface-variant border-outline-variant hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
            Settings
          </button>
          <button
            onClick={updatePost}
            disabled={saving}
            className="bg-primary text-on-primary font-ui-button text-ui-button px-md py-xs rounded hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update"}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto py-xl">
        <div className="max-w-article-max mx-auto px-md">
          <input
            className="w-full text-article-title text-on-surface font-article-title bg-transparent border-none focus:ring-0 outline-none mb-xs"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
          <div className="flex items-center gap-sm text-on-surface-variant text-meta-data font-meta-data mb-lg border-b border-outline-variant/30 pb-xs">
            <span className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
            <span className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              {Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min read
            </span>
          </div>
          <textarea
            id="editor-body"
            className="w-full min-h-[614px] text-body-main text-on-surface font-body-main bg-transparent border-none focus:ring-0 resize-none outline-none leading-[32px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      {showSettings && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setShowSettings(false)} />
          <div className="absolute right-md top-20 w-80 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg z-40 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="p-md space-y-md">
              <div className="flex items-center justify-between border-b border-outline-variant pb-xs">
                <h3 className="text-ui-label font-bold text-on-surface font-ui-label">Post Settings</h3>
                <button onClick={() => setShowSettings(false)} className="text-on-surface-variant hover:text-error transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-xs">
                <label className="text-[12px] uppercase tracking-wider text-on-surface-variant font-bold font-ui-label">Status</label>
                <div className="flex gap-xs">
                  <button
                    onClick={() => setStatus("DRAFT")}
                    className={`px-sm py-xs rounded text-[12px] font-bold transition-colors ${status === "DRAFT" ? "bg-secondary-container text-secondary" : "bg-surface-container text-on-surface-variant"}`}
                  >
                    Draft
                  </button>
                  <button
                    onClick={() => setStatus("PUBLISHED")}
                    className={`px-sm py-xs rounded text-[12px] font-bold transition-colors ${status === "PUBLISHED" ? "bg-tertiary-fixed text-tertiary" : "bg-surface-container text-on-surface-variant"}`}
                  >
                    Published
                  </button>
                </div>
              </div>

              <div className="space-y-xs">
                <label className="text-[12px] uppercase tracking-wider text-on-surface-variant font-bold font-ui-label">Slug</label>
                <input
                  className="w-full text-meta-data font-meta-data border border-outline-variant rounded p-xs focus:ring-1 focus:ring-primary outline-none"
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }}
                  type="text"
                />
              </div>

              <div className="space-y-xs">
                <label className="text-[12px] uppercase tracking-wider text-on-surface-variant font-bold font-ui-label">Category</label>
                <select
                  className="w-full text-meta-data font-meta-data border border-outline-variant rounded p-xs focus:ring-1 focus:ring-primary outline-none bg-white"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Uncategorized</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-xs">
                <label className="text-[12px] uppercase tracking-wider text-on-surface-variant font-bold font-ui-label">Excerpt</label>
                <textarea
                  className="w-full text-meta-data font-meta-data border border-outline-variant rounded p-xs focus:ring-1 focus:ring-primary outline-none h-20 resize-none"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary for article cards..."
                />
              </div>

              <div className="space-y-xs">
                <label className="text-[12px] uppercase tracking-wider text-on-surface-variant font-bold font-ui-label">Featured Image</label>
                <div
                  className="relative group cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-outline-variant hover:border-primary transition-colors aspect-video bg-cover bg-center flex flex-col items-center justify-center"
                  style={{ backgroundImage: featuredImage ? `url(${featuredImage})` : undefined }}
                >
                  {!featuredImage && (
                    <div className="relative z-10 flex flex-col items-center text-on-surface-variant bg-surface-container-lowest/80 p-xs rounded backdrop-blur-sm group-hover:bg-primary group-hover:text-on-primary transition-all">
                      <span className="material-symbols-outlined">upload_file</span>
                      <span className="text-[12px] font-medium">Upload Image</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} />
                  {featuredImage && (
                    <button onClick={(e) => { e.stopPropagation(); setFeaturedImage(""); }} className="absolute top-1 right-1 bg-error text-on-error rounded-full w-6 h-6 flex items-center justify-center text-sm hover:opacity-80 transition-opacity">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-xs">
                <label className="text-[12px] uppercase tracking-wider text-on-surface-variant font-bold font-ui-label">Tags</label>
                <div className="flex flex-wrap gap-xs">
                  {tags.map((tag) => (
                    <span key={tag} className="bg-secondary-container text-on-secondary-fixed-variant px-xs py-[2px] rounded text-[12px] flex items-center gap-[2px]">
                      {tag}
                      <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-error" onClick={() => removeTag(tag)}>close</span>
                    </span>
                  ))}
                  <div className="flex gap-1">
                    <input className="w-20 border border-outline-variant text-meta-data font-meta-data rounded px-1 py-[2px] text-[12px] focus:ring-1 focus:ring-primary outline-none" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="Add tag" />
                    <button onClick={addTag} className="border border-outline-variant text-on-surface-variant px-1 rounded text-[12px] border-dashed hover:border-primary hover:text-primary transition-colors">+</button>
                  </div>
                </div>
              </div>

              <div className="space-y-xs">
                <label className="text-[12px] uppercase tracking-wider text-on-surface-variant font-bold font-ui-label">SEO Description</label>
                <textarea
                  className="w-full text-meta-data font-meta-data border border-outline-variant rounded p-xs focus:ring-1 focus:ring-primary outline-none h-24 resize-none"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Write a brief summary for search results..."
                />
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
