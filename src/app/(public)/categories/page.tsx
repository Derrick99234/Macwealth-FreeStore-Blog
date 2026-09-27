import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const revalidate = 60;

export const metadata = {
  title: "Categories & Curated Archives | Macwealth FreeStore Blog",
  description:
    "Explore curated archives of spiritual wisdom, financial intelligence, prayer strategies, and personal development teachings by Dr. Isaiah Macwealth.",
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { postCount: "desc" },
    include: {
      _count: { select: { posts: true } },
    },
  });

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Header Hero */}
        <section className="mb-14">
          <div className="bg-gradient-to-br from-[#121622] via-[#0f121a] to-[#0c0e14] border border-white/[0.08] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl space-y-4">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Explore by <span className="text-indigo-400">Category</span>
              </h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Explore curated archives of spiritual wisdom, financial intelligence, prayer strategies, and personal development teachings by Dr. Isaiah Macwealth.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-3.5 py-1.5 bg-[#171b26] border border-white/10 rounded-full text-xs font-medium text-slate-300">
                  {categories.length} Curated Topics
                </span>
                <span className="px-3.5 py-1.5 bg-[#171b26] border border-white/10 rounded-full text-xs font-medium text-slate-300">
                  Active Archival Index
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/?category=${cat.slug}`}
                className="group bg-[#10141e] border border-white/[0.07] hover:border-indigo-500/40 hover:bg-[#141926] rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/[0.03] group-hover:bg-indigo-500/10 rounded-bl-full transition-all duration-500" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-slate-500 group-hover:text-indigo-400 transition-colors">
                      0{idx + 1}
                    </span>
                    <span className="text-xs bg-[#171b26] border border-white/10 text-slate-300 px-2.5 py-1 rounded-full">
                      {cat._count?.posts || cat.postCount} {((cat._count?.posts || cat.postCount) === 1) ? "Teaching" : "Teachings"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {cat.description || "Transformational spiritual teachings and practical wisdom."}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-medium text-indigo-400 group-hover:text-indigo-300">
                  <span>Browse Category</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-gradient-to-br from-[#121622] via-[#10131d] to-[#0c0f16] border border-indigo-500/20 rounded-3xl p-8 sm:p-12 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Grow in wisdom across every dimension of life
            </h2>
            <NewsletterForm variant="banner" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
