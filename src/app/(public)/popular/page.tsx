import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { DEFAULT_POST_IMAGE } from "@/lib/images";
import { calculateReadTime } from "@/lib/utils";

export const revalidate = 60;

export const metadata = {
  title: "Impactful Teachings & Popular Messages | Macwealth FreeStore Blog",
  description:
    "Read the most impactful, widely discussed teachings on spiritual growth, financial wisdom, and purposeful living by Dr. Isaiah Macwealth.",
};

function formatViews(count: number) {
  if (!count || count <= 0) return null;
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k views`;
  }
  return count === 1 ? "1 view" : `${count} views`;
}

export default async function PopularPage() {
  const trending = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { viewCount: "desc" },
    take: 12,
    include: {
      author: { select: { name: true } },
      category: { select: { name: true, slug: true } },
    },
  });

  const topPost = trending[0];
  const sidePosts = trending.slice(1, 3);
  const remaining = trending.slice(3);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Header */}
        <section className="mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Impactful Teachings
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            The most widely read messages and practical wisdom on spiritual growth, financial stewardship, and purposeful living.
          </p>
        </section>

        {/* Top Bento Section */}
        {topPost && (
          <section className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* #1 Trending Card */}
            <article className="lg:col-span-8 bg-[#10141e] border border-white/[0.08] rounded-3xl overflow-hidden hover:border-indigo-500/40 transition-all flex flex-col md:flex-row group shadow-2xl">
              <div className="md:w-1/2 relative aspect-[16/10] md:aspect-auto overflow-hidden">
                <img
                  src={topPost.featuredImage || DEFAULT_POST_IMAGE}
                  alt={topPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-amber-500/90 backdrop-blur-md text-black font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                  Rank 01
                </div>
              </div>

              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {topPost.category && (
                      <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full">
                        {topPost.category.name}
                      </span>
                    )}
                    {formatViews(topPost.viewCount) && (
                      <>
                        <span className="text-xs text-amber-400 font-mono">
                          {formatViews(topPost.viewCount)}
                        </span>
                        <span className="text-xs text-slate-500">·</span>
                      </>
                    )}
                    <span className="text-xs text-indigo-300 font-medium">
                      {calculateReadTime(topPost.content)}
                    </span>
                  </div>

                  <Link href={`/${topPost.slug}`}>
                    <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors leading-snug">
                      {topPost.title}
                    </h2>
                  </Link>

                  <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {topPost.excerpt || topPost.content.slice(0, 150)}...
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500">
                  <span className="text-slate-300 font-medium">
                    {topPost.author.name}
                  </span>
                  <Link
                    href={`/${topPost.slug}`}
                    className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
                  >
                    Read story
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </article>

            {/* Side Highlights (#2 & #3) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {sidePosts.map((post, idx) => (
                <article
                  key={post.id}
                  className="bg-[#10141e] border border-white/[0.08] rounded-3xl p-6 hover:border-indigo-500/40 transition-all flex flex-col justify-between group shadow-xl flex-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-slate-400 bg-[#161a26] px-2.5 py-1 rounded-full border border-white/5">
                        Rank 0{idx + 2}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                        {formatViews(post.viewCount) && (
                          <>
                            <span>{formatViews(post.viewCount)}</span>
                            <span>·</span>
                          </>
                        )}
                        <span className="text-indigo-400/90">{calculateReadTime(post.content)}</span>
                      </div>
                    </div>

                    <Link href={`/${post.slug}`}>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {post.excerpt || post.content.slice(0, 100)}...
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500">
                    <span className="text-slate-300">{post.author.name}</span>
                    <Link href={`/${post.slug}`} className="text-indigo-400 hover:underline">
                      Read
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Ranked Leaderboard Grid */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-white mb-6">More Trending Reads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remaining.map((post, idx) => (
              <article
                key={post.id}
                className="bg-[#10141e] border border-white/[0.07] rounded-2xl p-5 hover:border-indigo-500/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      #{idx + 4}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      {formatViews(post.viewCount) && (
                        <>
                          <span>{formatViews(post.viewCount)}</span>
                          <span>·</span>
                        </>
                      )}
                      <span className="text-indigo-400/90">{calculateReadTime(post.content)}</span>
                    </div>
                  </div>

                  <Link href={`/${post.slug}`}>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                    {post.excerpt || post.content.slice(0, 100)}...
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500">
                  <span className="text-slate-300">{post.author.name}</span>
                  <Link href={`/${post.slug}`} className="text-indigo-400 hover:underline">
                    Read
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Callout Banner */}
        <section className="bg-gradient-to-br from-[#121622] via-[#10131d] to-[#0c0f16] border border-indigo-500/20 rounded-3xl p-8 sm:p-12 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Don&apos;t miss a trending insight.
            </h2>
            <NewsletterForm variant="banner" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
