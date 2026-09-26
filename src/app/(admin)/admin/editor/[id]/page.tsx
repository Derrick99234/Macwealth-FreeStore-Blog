"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { calculateReadTime, slugify } from "@/lib/utils";

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
    ])
      .then(([postData, catData]) => {
        const p = postData.post;
        if (!p) {
          router.push("/admin/content");
          return;
        }
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
      })
      .catch(() => {
        router.push("/admin/content");
      });
  }, [postId, router]);

  useEffect(() => {
    if (!slugEdited && title && !loading) {
      setSlug(slugify(title));
    }
  }, [title, slugEdited, loading]);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const updatePost = async (newStatus?: "DRAFT" | "PUBLISHED") => {
    if (!title.trim()) {
      showMessage("error", "Please enter a post title");
      return;
    }
    const cleanContent = content.replace(/<[^>]*>/g, "").trim();
    if (!cleanContent) {
      showMessage("error", "Post content cannot be empty");
      return;
    }

    const currentStatus = newStatus || status;
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
          status: currentStatus,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      if (newStatus) setStatus(newStatus);
      showMessage("success", "Post updated successfully!");
    } catch (err: any) {
      showMessage("error", err.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput("");
    }
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
      if (res.ok && data.url) {
        setFeaturedImage(data.url);
        showMessage("success", "Image uploaded to Supabase Storage!");
      } else {
        showMessage("error", data.error || "Upload failed");
      }
    } catch {
      showMessage("error", "Upload failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading perspective...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0c10] flex flex-col relative text-slate-100">
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

      {/* Top Action Header */}
      <header className="h-16 flex items-center justify-between px-4 sm:px-8 border-b border-white/[0.08] bg-[#0f131d]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/content"
            className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
            title="Back to Content"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </Link>
          <div className="h-5 w-px bg-white/[0.1] hidden sm:block" />
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                status === "PUBLISHED"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/20"
              }`}
            >
              {status === "PUBLISHED" ? "Published" : "Draft"}
            </span>
            {slug && (
              <a
                href={`/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <span>View Live</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all ${
              showSettings
                ? "bg-indigo-600/20 text-indigo-300 border-indigo-500/40"
                : "bg-white/[0.04] text-slate-300 border-white/[0.1] hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-base">tune</span>
            Settings
          </button>

          {status === "DRAFT" ? (
            <>
              <button
                type="button"
                onClick={() => updatePost("DRAFT")}
                disabled={saving}
                className="text-xs font-semibold px-4 py-2 rounded-xl border border-white/[0.1] bg-white/[0.03] text-slate-300 hover:bg-white/[0.08] hover:text-white transition-all disabled:opacity-50"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={() => updatePost("PUBLISHED")}
                disabled={saving}
                className="text-xs font-semibold px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">publish</span>
                Publish Now
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => updatePost("DRAFT")}
                disabled={saving}
                className="text-xs font-semibold px-4 py-2 rounded-xl border border-white/[0.1] bg-white/[0.03] text-amber-400 hover:bg-amber-500/10 transition-all disabled:opacity-50"
                title="Switch back to draft"
              >
                Unpublish to Draft
              </button>
              <button
                type="button"
                onClick={() => updatePost("PUBLISHED")}
                disabled={saving}
                className="text-xs font-semibold px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">save</span>
                {saving ? "Updating..." : "Update Live"}
              </button>
            </>
          )}
        </div>
      </header>

      {/* Editor Main Canvas */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-6">
        {/* Title Input */}
        <div>
          <input
            className="w-full text-3xl sm:text-5xl font-extrabold tracking-tight text-white bg-transparent border-none focus:ring-0 placeholder-slate-600 outline-none leading-tight"
            placeholder="Title of your perspective..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
        </div>

        {/* Dynamic Metadata Indicator */}
        <div className="flex items-center gap-4 text-xs text-slate-400 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-slate-500">schedule</span>
            <span className="text-indigo-300 font-medium">{calculateReadTime(content)}</span>
          </div>
        </div>

        {/* Visual WYSIWYG Rich Text Editor */}
        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="Start editing your story... Highlight text to make it bold or insert links visually without raw markdown symbols."
        />
      </div>

      {/* Post Settings Drawer */}
      {showSettings && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs" onClick={() => setShowSettings(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-88 sm:w-96 bg-[#131824] border-l border-white/[0.1] shadow-2xl z-50 overflow-y-auto p-6 space-y-6 animate-slideLeft">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400">tune</span>
                Post Settings
              </h3>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* URL Slug */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Slug</label>
                <button
                  type="button"
                  onClick={() => {
                    setSlug(slugify(title));
                    setSlugEdited(false);
                  }}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Sync from title
                </button>
              </div>
              <input
                className="w-full px-3.5 py-2 bg-[#0a0d14] border border-white/[0.1] rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugEdited(true);
                }}
                placeholder="post-url-slug"
                type="text"
              />
              <p className="text-[11px] text-slate-500">
                Live URL: <span className="text-indigo-400/90 font-mono">/{slug || "slug"}</span>
              </p>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Category</label>
              <select
                className="w-full px-3.5 py-2 bg-[#0a0d14] border border-white/[0.1] rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="" className="bg-[#0a0d14] text-slate-400">Uncategorized</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#0a0d14] text-white">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Excerpt</label>
              <textarea
                className="w-full px-3.5 py-2 bg-[#0a0d14] border border-white/[0.1] rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 h-20 resize-none"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary for article cards and search results..."
              />
            </div>

            {/* Featured Image (Supabase Storage) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Featured Image</label>
              <div
                className="relative group overflow-hidden rounded-xl border-2 border-dashed border-white/[0.15] hover:border-indigo-500/50 transition-colors aspect-video bg-[#0a0d14] flex flex-col items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: featuredImage ? `url(${featuredImage})` : undefined }}
              >
                {!featuredImage && (
                  <div className="flex flex-col items-center text-slate-400 group-hover:text-indigo-400 transition-colors p-4 text-center">
                    <span className="material-symbols-outlined text-3xl mb-1">cloud_upload</span>
                    <span className="text-xs font-semibold">Upload to Supabase Storage</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">PNG, JPG, WEBP</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                />
                {featuredImage && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFeaturedImage("");
                    }}
                    className="absolute top-2 right-2 bg-rose-600/90 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-rose-500 transition-colors shadow-lg"
                    title="Remove Image"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                )}
              </div>
              <input
                className="w-full px-3 py-1.5 bg-[#0a0d14] border border-white/[0.08] rounded-lg text-[11px] text-slate-400 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="or paste direct image URL..."
                type="text"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tags</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-rose-400"
                    >
                      <span className="material-symbols-outlined text-[13px]">close</span>
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  className="flex-grow px-3 py-1.5 bg-[#0a0d14] border border-white/[0.1] rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Add a tag..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-1.5 bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold rounded-lg text-slate-300"
                >
                  Add
                </button>
              </div>
            </div>

            {/* SEO Description */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">SEO Description</label>
              <textarea
                className="w-full px-3.5 py-2 bg-[#0a0d14] border border-white/[0.1] rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 h-24 resize-none"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Meta description for search engine previews..."
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
