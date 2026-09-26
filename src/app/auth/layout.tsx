import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="mb-6 text-center z-10">
        <Link href="/" className="inline-block">
          <span className="text-2xl font-bold tracking-tight text-white hover:text-indigo-400 transition-colors">
            Macwealth <span className="text-indigo-400">FreeStore</span>
          </span>
        </Link>
      </div>

      <div className="w-full max-w-md z-10">{children}</div>
    </div>
  );
}
