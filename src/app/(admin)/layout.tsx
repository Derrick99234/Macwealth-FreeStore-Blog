import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-bright">
      <AdminSidebar />
      <div className="ml-64">{children}</div>
    </div>
  );
}
