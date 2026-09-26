"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { calculateReadTime } from "@/lib/utils";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

type PostItem = {
  id: string;
  title: string;
  status: "DRAFT" | "PUBLISHED";
  category: { name: string } | null;
  author: { name: string } | null;
  createdAt: string;
  slug: string;
  content?: string;
  viewCount?: number;
};

export default function ContentManager() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchPosts = useCallback(() => {
    const params = new URLSearchParams({ page: String(page), limit: "10" });
    if (search) params.set("search", search);
    if (filterStatus) params.set("status", filterStatus);
    fetch(`/api/admin/posts?${params}`)
      .then((r) => r.json())
      .then((data) => { setPosts(data.posts); setTotal(data.total || 0); })
      .catch(() => {});
  }, [page, search, filterStatus]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const showMsg = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      showMsg("success", "Post deleted");
      fetchPosts();
    } catch {
      showMsg("error", "Failed to delete post");
    }
  };

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (item: PostItem) => (
        <div className="flex flex-col">
          <span
            onClick={() => router.push(`/admin/editor/${item.id}`)}
            className="text-ui-label text-on-surface font-ui-label cursor-pointer hover:text-primary transition-colors line-clamp-1"
          >
            {item.title}
          </span>
          <div className="flex items-center gap-2 text-meta-data text-outline font-meta-data">
            <span>By {item.author?.name || "Unknown"}</span>
            <span>·</span>
            <span>{calculateReadTime(item.content || "")}</span>
            <span>·</span>
            <span>{(item.viewCount || 0).toLocaleString()} views</span>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item: PostItem) => (
        <Badge variant={item.status === "PUBLISHED" ? "published" : "draft"}>
          {item.status === "PUBLISHED" ? "Published" : "Draft"}
        </Badge>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (item: PostItem) => (
        <span className="text-on-surface-variant text-ui-label font-ui-label">{item.category?.name || "Uncategorized"}</span>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (item: PostItem) => (
        <span className="text-on-surface-variant text-meta-data font-meta-data">{formatDate(item.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (item: PostItem) => (
        <div className="flex items-center justify-end gap-xs">
          <button
            onClick={() => window.open(`/${item.slug}`, "_blank")}
            className="p-xs text-on-surface-variant hover:bg-surface-container-high rounded transition-all active:scale-90"
            title="Preview"
          >
            <span className="material-symbols-outlined text-[20px]">visibility</span>
          </button>
          <button
            onClick={() => router.push(`/admin/editor/${item.id}`)}
            className="p-xs text-on-surface-variant hover:bg-surface-container-high rounded transition-all active:scale-90"
            title="Edit"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
          <button
            onClick={() => deletePost(item.id)}
            className="p-xs text-error hover:bg-error-container rounded transition-all active:scale-90"
            title="Delete"
          >
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-surface-bright p-lg">
      {message && (
        <div className={`fixed top-4 right-4 z-50 px-md py-sm rounded-lg shadow-lg font-ui-label text-ui-label ${
          message.type === "success" ? "bg-tertiary text-on-tertiary" : "bg-error text-on-error"
        }`}>
          {message.text}
        </div>
      )}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-lg gap-md">
        <div>
          <h2 className="text-display-lg text-primary font-display-lg mb-xs">Content Manager</h2>
          <p className="text-on-surface-variant text-meta-data font-meta-data">Manage and organize your published articles and drafts.</p>
        </div>
        <div className="flex items-center gap-sm">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className="pl-xl pr-md py-sm bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-ui-label text-ui-label w-64"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              type="text"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-xs bg-surface-container-lowest border border-outline-variant px-md py-sm rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant font-ui-button text-ui-button"
            >
              <span className="material-symbols-outlined">filter_list</span>
              Filter{filterStatus ? `: ${filterStatus}` : ""}
            </button>
            {showFilter && (
              <div className="absolute right-0 top-full mt-xs bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg z-10 w-48">
                {["", "PUBLISHED", "DRAFT"].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setFilterStatus(s); setShowFilter(false); setPage(1); }}
                    className={`w-full text-left px-md py-sm text-ui-label font-ui-label hover:bg-surface-container transition-colors ${
                      filterStatus === s ? "text-primary" : "text-on-surface-variant"
                    }`}
                  >
                    {s || "All"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-md mb-lg">
        {[
          { label: "Total Posts", value: stats?.totalPosts ?? "—", icon: "description", color: "bg-primary-fixed text-primary" },
          { label: "Published", value: stats?.publishedPosts ?? "—", icon: "check_circle", color: "bg-tertiary-fixed text-tertiary" },
          { label: "Drafts", value: stats?.draftPosts ?? "—", icon: "edit_calendar", color: "bg-secondary-container text-secondary" },
          { label: "Total Views", value: stats?.totalViews != null ? `${(stats.totalViews / 1000).toFixed(1)}k` : "—", icon: "trending_up", color: "bg-error-container text-error" },
        ].map((s) => (
          <div key={s.label} className="bg-surface-container-lowest p-md border border-outline-variant rounded-lg flex items-center gap-md">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${s.color}`}>
              <span className="material-symbols-outlined">{s.icon}</span>
            </div>
            <div>
              <p className="text-meta-data text-on-surface-variant font-meta-data">{s.label}</p>
              <p className="text-display-lg-mobile text-on-surface font-display-lg">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-[0px_10px_15px_-3px_rgba(15,23,42,0.04)]">
        {posts.length === 0 ? (
          <div className="p-lg text-center text-on-surface-variant font-ui-label">No posts found.</div>
        ) : (
          <Table columns={columns} data={posts} />
        )}
        <Pagination current={page} total={Math.max(1, Math.ceil(total / 10))} onPageChange={setPage} />
      </div>
    </main>
  );
}
