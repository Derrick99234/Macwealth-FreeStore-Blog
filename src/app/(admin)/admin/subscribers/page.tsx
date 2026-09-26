"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

type SubItem = { id: string; email: string; status: "ACTIVE" | "UNSUBSCRIBED"; createdAt: string };

export default function SubscribersPage() {
  const [subs, setSubs] = useState<SubItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchSubs = useCallback(() => {
    fetch(`/api/admin/subscribers?page=${page}&limit=10`)
      .then((r) => r.json())
      .then((data) => { setSubs(data.subscribers); setTotal(data.total || 0); })
      .catch(() => {});
  }, [page]);

  useEffect(() => { fetchSubs(); }, [fetchSubs]);

  const showMsg = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const activeCount = subs.filter((s) => s.status === "ACTIVE").length;
  const unsubCount = subs.filter((s) => s.status === "UNSUBSCRIBED").length;

  const toggleStatus = async (item: SubItem) => {
    const newStatus = item.status === "ACTIVE" ? "UNSUBSCRIBED" : "ACTIVE";
    try {
      const res = await fetch(`/api/admin/subscribers/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubs((prev) => prev.map((s) => (s.id === item.id ? { ...s, status: newStatus } : s)));
      showMsg("success", `${item.email} marked as ${newStatus}`);
    } catch {
      showMsg("error", "Failed to update subscriber");
    }
  };

  const deleteSub = async (id: string, email: string) => {
    if (!confirm(`Delete subscriber "${email}"?`)) return;
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setSubs((prev) => prev.filter((s) => s.id !== id));
      setTotal((t) => t - 1);
      showMsg("success", "Subscriber deleted");
    } catch {
      showMsg("error", "Failed to delete subscriber");
    }
  };

  const exportCsv = () => {
    const header = "Email,Status,Subscribed Date\n";
    const rows = subs.map((s) => `${s.email},${s.status},${formatDate(s.createdAt)}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const columns = [
    {
      key: "email",
      label: "Email",
      render: (item: SubItem) => <span className="text-ui-label text-on-surface font-ui-label">{item.email}</span>,
    },
    {
      key: "date",
      label: "Subscribed",
      render: (item: SubItem) => <span className="text-meta-data text-on-surface-variant font-meta-data">{formatDate(item.createdAt)}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (item: SubItem) => (
        <Badge variant={item.status === "ACTIVE" ? "published" : "draft"}>
          {item.status === "ACTIVE" ? "Active" : "Unsubscribed"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "",
      className: "text-right",
      render: (item: SubItem) => (
        <div className="flex items-center justify-end gap-xs">
          <button
            onClick={() => toggleStatus(item)}
            className="p-xs text-on-surface-variant hover:bg-surface-container-high rounded transition-all active:scale-90"
            title={item.status === "ACTIVE" ? "Unsubscribe" : "Reactivate"}
          >
            <span className="material-symbols-outlined text-[20px]">
              {item.status === "ACTIVE" ? "person_remove" : "person_add"}
            </span>
          </button>
          <button
            onClick={() => deleteSub(item.id, item.email)}
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
          <h2 className="text-display-lg text-primary font-display-lg mb-xs">Newsletter Subscribers</h2>
          <p className="text-on-surface-variant text-meta-data font-meta-data">Manage your email subscribers.</p>
        </div>
        <button
          onClick={exportCsv}
          className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg font-ui-button text-ui-button hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined">download</span>
          Export CSV
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-lg">
        {[
          { label: "Total Subscribers", value: String(total), icon: "mail", color: "bg-primary-fixed text-primary" },
          { label: "Active", value: String(activeCount), icon: "check_circle", color: "bg-tertiary-fixed text-tertiary" },
          { label: "Unsubscribed", value: String(unsubCount), icon: "person_remove", color: "bg-error-container text-error" },
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

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
        {subs.length === 0 ? (
          <div className="p-lg text-center text-on-surface-variant font-ui-label">No subscribers found.</div>
        ) : (
          <Table columns={columns} data={subs} />
        )}
        <Pagination current={page} total={Math.max(1, Math.ceil(total / 10))} onPageChange={setPage} />
      </div>
    </main>
  );
}
