import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Macwealth FreeStore Blog",
  description: "The requested teaching or page could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-2xl mx-auto">
          <span className="material-symbols-outlined text-3xl">menu_book</span>
        </div>
        <h1 className="text-5xl font-extrabold text-white tracking-tight">404</h1>
        <h2 className="text-xl font-bold text-slate-200">Teaching or Page Not Found</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          The publication or page you are looking for may have been moved, updated, or is no longer available.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20"
          >
            <span className="material-symbols-outlined text-base">home</span>
            Return to Teachings
          </Link>
        </div>
      </div>
    </div>
  );
}
