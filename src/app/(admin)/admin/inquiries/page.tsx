"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";

type InqItem = { id: string; name: string; email: string; subject: string | null; message: string; read: boolean; createdAt: string };

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<InqItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<InqItem | null>(null);

  const fetchInq = useCallback(() => {
    fetch(`/api/admin/inquiries?page=${page}&limit=10`)
      .then((r) => r.json())
      .then((data) => { setInquiries(data.inquiries); setTotal(data.total || 0); })
      .catch(() => {});
  }, [page]);

  useEffect(() => { fetchInq(); }, [fetchInq]);

  const unread = inquiries.filter((i) => !i.read).length;
  const resolved = inquiries.filter((i) => i.read).length;

  const markRead = async (item: InqItem) => {
    await fetch(`/api/admin/inquiries/${item.id}`, {
      method: "PATCH",
      body: JSON.stringify({ read: true }),
      headers: { "Content-Type": "application/json" },
    });
    setInquiries((prev) => prev.map((i) => (i.id === item.id ? { ...i, read: true } : i)));
    if (selected?.id === item.id) setSelected({ ...item, read: true });
  };

  const deleteInq = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (item: InqItem) => (
        <div className="flex items-center gap-xs">
          {!item.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
          <span className="text-ui-label text-on-surface font-ui-label">{item.name}</span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (item: InqItem) => <span className="text-meta-data text-on-surface-variant font-meta-data">{item.email}</span>,
    },
    {
      key: "subject",
      label: "Subject",
      render: (item: InqItem) => <span className="text-ui-label text-on-surface font-ui-label">{item.subject || "—"}</span>,
    },
    {
      key: "message",
      label: "Message",
      render: (item: InqItem) => (
        <button
          onClick={() => { setSelected(item); if (!item.read) markRead(item); }}
          className="text-meta-data text-on-surface-variant font-meta-data line-clamp-1 max-w-xs text-left hover:text-primary transition-colors"
        >
          {item.message}
        </button>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item: InqItem) => (
        <Badge variant={item.read ? "draft" : "published"}>{item.read ? "Read" : "New"}</Badge>
      ),
    },
    {
      key: "actions",
      label: "",
      className: "text-right",
      render: (item: InqItem) => (
        <div className="flex items-center justify-end gap-xs">
          {!item.read && (
            <button
              onClick={() => markRead(item)}
              className="p-xs text-on-surface-variant hover:bg-surface-container-high rounded transition-all active:scale-90"
            >
              <span className="material-symbols-outlined text-[20px]">mark_email_read</span>
            </button>
          )}
          <button
            onClick={() => deleteInq(item.id)}
            className="p-xs text-error hover:bg-error-container rounded transition-all active:scale-90"
          >
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-surface-bright p-lg">
      <header className="mb-lg">
        <h2 className="text-display-lg text-primary font-display-lg mb-xs">Contact Inquiries</h2>
        <p className="text-on-surface-variant text-meta-data font-meta-data">View and respond to contact form submissions.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-lg">
        {[
          { label: "Total", value: String(inquiries.length), icon: "contact_support", color: "bg-primary-fixed text-primary" },
          { label: "Unread", value: String(unread), icon: "mark_email_unread", color: "bg-error-container text-error" },
          { label: "Resolved", value: String(resolved), icon: "check_circle", color: "bg-tertiary-fixed text-tertiary" },
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
        {inquiries.length === 0 ? (
          <div className="p-lg text-center text-on-surface-variant font-ui-label">No inquiries yet.</div>
        ) : (
          <Table columns={columns} data={inquiries} />
        )}
        <Pagination current={page} total={Math.max(1, Math.ceil(total / 10))} onPageChange={setPage} />
      </div>

      {selected && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelected(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-md">
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between p-md border-b border-outline-variant">
                <h3 className="text-ui-label font-bold text-on-surface font-ui-label">Message Details</h3>
                <button onClick={() => setSelected(null)} className="text-on-surface-variant hover:text-error transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="p-md space-y-md">
                <div className="grid grid-cols-2 gap-sm">
                  <div>
                    <p className="text-meta-data text-outline font-meta-data uppercase tracking-wider text-xs font-bold">Name</p>
                    <p className="text-ui-label text-on-surface font-ui-label">{selected.name}</p>
                  </div>
                  <div>
                    <p className="text-meta-data text-outline font-meta-data uppercase tracking-wider text-xs font-bold">Email</p>
                    <p className="text-ui-label text-on-surface font-ui-label">{selected.email}</p>
                  </div>
                </div>
                {selected.subject && (
                  <div>
                    <p className="text-meta-data text-outline font-meta-data uppercase tracking-wider text-xs font-bold">Subject</p>
                    <p className="text-ui-label text-on-surface font-ui-label">{selected.subject}</p>
                  </div>
                )}
                <div>
                  <p className="text-meta-data text-outline font-meta-data uppercase tracking-wider text-xs font-bold">Message</p>
                  <p className="text-body-main text-on-surface font-body-main whitespace-pre-wrap mt-xs">{selected.message}</p>
                </div>
              </div>
              <div className="flex justify-end gap-xs p-md border-t border-outline-variant">
                <button onClick={() => setSelected(null)} className="px-md py-sm border border-outline-variant rounded-lg text-ui-label font-ui-label text-on-surface-variant hover:bg-surface-container transition-colors">
                  Close
                </button>
                <button
                  onClick={() => { deleteInq(selected.id); }}
                  className="px-md py-sm bg-error text-on-error rounded-lg text-ui-label font-ui-label hover:opacity-90 transition-opacity"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
