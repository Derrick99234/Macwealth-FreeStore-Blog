"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function formatViews(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function formatTimeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) return <div className="min-h-screen bg-surface-bright p-lg text-on-surface-variant">Failed to load dashboard.</div>;
  if (!data) return (
    <div className="min-h-screen bg-surface-bright p-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-md mb-lg">
        {[1,2,3,4].map((i) => (
          <div key={i} className="bg-surface-container-lowest p-md border border-outline-variant rounded-lg h-24 animate-pulse" />
        ))}
      </div>
    </div>
  );

  const totalPosts = data.totalPosts || 0;
  const publishedPosts = data.publishedPosts || 0;
  const draftPosts = data.draftPosts || 0;
  const totalViews = data.totalViews || 0;

  const stats = [
    { label: "Total Posts", value: String(totalPosts), icon: "description", color: "bg-primary-fixed text-primary" },
    { label: "Published", value: String(publishedPosts), icon: "check_circle", color: "bg-tertiary-fixed text-tertiary" },
    { label: "Drafts", value: String(draftPosts), icon: "edit_calendar", color: "bg-secondary-container text-secondary" },
    { label: "Total Views", value: formatViews(totalViews), icon: "trending_up", color: "bg-error-container text-error" },
  ];

  type ActivityItem = { icon: string; color: string; text: string; time: string };
  const activity: ActivityItem[] = (data.recentPosts || []).map((p: any) => ({
    icon: "history_edu",
    color: "text-primary-container",
    text: `${p.author?.name || "Unknown"} published "${p.title}"`,
    time: formatTimeAgo(p.createdAt),
  }));

  type CatItem = { name: string; percent: number; color: string };
  const cats: CatItem[] = (data.categoryDistribution || []).map((c: any) => ({
    name: c.name,
    percent: totalPosts ? Math.round((c.postCount / totalPosts) * 100) : 0,
    color: c.name === "Technology" ? "bg-primary" : c.name === "Design" ? "bg-secondary" : c.name === "Philosophy & Ethics" ? "bg-tertiary" : "bg-outline-variant",
  }));

  return (
    <main className="min-h-screen bg-surface-bright p-lg">
      <header className="mb-lg">
        <h2 className="text-display-lg text-primary font-display-lg mb-xs">Dashboard</h2>
        <p className="text-on-surface-variant text-meta-data font-meta-data">Overview of your blog performance.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-md mb-lg">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface-container-lowest p-md border border-outline-variant rounded-lg flex items-center gap-md">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
            <div>
              <p className="text-meta-data text-on-surface-variant font-meta-data">{stat.label}</p>
              <p className="text-display-lg-mobile text-on-surface font-display-lg">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        <div className="md:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-lg p-md">
          <div className="flex items-center justify-between mb-md">
            <h3 className="text-ui-button text-on-surface font-ui-button">Recent Activity</h3>
            <button
              onClick={() => router.push("/admin/content")}
              className="text-primary text-meta-data font-meta-data hover:underline"
            >
              View All
            </button>
          </div>
          {activity.length === 0 ? (
            <p className="text-on-surface-variant text-meta-data font-meta-data">No recent activity.</p>
          ) : (
            <ul className="space-y-sm">
              {activity.map((item, i) => (
                <li key={i} className="flex items-start gap-sm">
                  <div className={`w-8 h-8 rounded-full bg-surface-container flex items-center justify-center shrink-0 mt-1 ${item.color}`}>
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-ui-label text-on-surface font-ui-label">{item.text}</p>
                    <p className="text-meta-data text-outline font-meta-data">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md">
          <h3 className="text-ui-button text-on-surface font-ui-button mb-md">Category Distribution</h3>
          {cats.length === 0 ? (
            <p className="text-on-surface-variant text-meta-data font-meta-data">No categories yet.</p>
          ) : (
            <div className="space-y-sm">
              {cats.map((cat) => (
                <div key={cat.name}>
                  <div className="flex justify-between text-meta-data font-meta-data mb-xs">
                    <span className="text-on-surface-variant">{cat.name}</span>
                    <span className="text-on-surface">{cat.percent}%</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2">
                    <div className={`${cat.color} h-2 rounded-full`} style={{ width: `${cat.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
