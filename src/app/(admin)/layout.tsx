import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex">
      <AdminSidebar />
      <div className="ml-64 flex-1 min-h-screen bg-[#0a0c10] p-6 lg:p-10">{children}</div>
    </div>
  );
}
