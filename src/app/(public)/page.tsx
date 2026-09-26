import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { DEFAULT_POST_IMAGE, DEFAULT_AI_IMAGE } from "@/lib/images";

export const revalidate = 60; // Revalidate every 60s

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params.category;
  const searchQuery = params.search;

  // Fetch categories
  const categories = await prisma.category.findMany({
    orderBy: { postCount: "desc" },
  });

  // Query conditions
  const where: any = { status: "PUBLISHED" };
  if (selectedCategory) {
    where.category = { slug: selectedCategory };
  }
  if (searchQuery) {
    where.OR = [
      { title: { contains: searchQuery, mode: "insensitive" } },
      { content: { contains: searchQuery, mode: "insensitive" } },
      { excerpt: { contains: searchQuery, mode: "insensitive" } },
    ];
  }

  // Fetch posts from database
  const posts = await prisma.post.findMany({
    where,
    include: {
      author: { select: { name: true, image: true } },
      category: { select: { name: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Search / Filter Notification Banner if active */}
        {(selectedCategory || searchQuery) && (
          <div className="mb-8 flex items-center justify-between bg-[#121620] border border-white/[0.08] px-4 py-3 rounded-xl">
            <div className="text-sm text-slate-300">
              {searchQuery && (
                <span>
                  Search results for <strong className="text-white">"{searchQuery}"</strong>
                </span>
              )}
              {selectedCategory && (
                <span>
                  Filtered by category: <strong className="text-indigo-400 capitalize">{selectedCategory.replace(/-/g, " ")}</strong>
                </span>
              )}
            </div>
            <Link
              href="/"
              className="text-xs font-medium text-slate-400 hover:text-white underline decoration-slate-600 transition-colors"
            >
              Clear filter
            </Link>
          </div>
        )}

        {/* Hero Section: Featured Story */}
        {featuredPost && !selectedCategory && !searchQuery && (
          <section className="mb-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#10141e] border border-white/[0.08] rounded-3xl p-4 sm:p-6 lg:p-8 hover:border-indigo-500/30 transition-all duration-300 shadow-2xl">
              <div className="lg:col-span-7 overflow-hidden rounded-2xl relative aspect-[16/9] group">
                <img
                  src={featuredPost.featuredImage || DEFAULT_POST_IMAGE}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-indigo-600/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                  Featured Story
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-3">
                  {featuredPost.category && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                      {featuredPost.category.name}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-full">
                    8 min read
                  </span>
                </div>

                <Link href={`/${featuredPost.slug}`}>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white hover:text-indigo-400 transition-colors leading-tight cursor-pointer">
                    {featuredPost.title}
                  </h1>
                </Link>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {featuredPost.excerpt || featuredPost.content.slice(0, 180)}...
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-xs text-slate-300">
                      {featuredPost.author.name?.charAt(0) || "M"}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        {featuredPost.author.name || "Macwealth Editorial"}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {new Date(featuredPost.publishedAt || featuredPost.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Read article
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Categories Bar */}
        <section className="mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2.5 whitespace-nowrap">
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                !selectedCategory
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-[#121620] text-slate-400 hover:text-white border border-white/[0.06] hover:bg-[#181d2a]"
              }`}
            >
              All Articles
            </Link>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={`/?category=${cat.slug}`}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "bg-[#121620] text-slate-400 hover:text-white border border-white/[0.06] hover:bg-[#181d2a]"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold tracking-tight text-white">
              {selectedCategory
                ? `Articles in ${selectedCategory.replace(/-/g, " ")}`
                : "Latest Perspectives"}
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Showing {posts.length} {posts.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20 bg-[#10141e] rounded-2xl border border-white/[0.06]">
              <span className="material-symbols-outlined text-4xl text-slate-600 mb-2">
                article
              </span>
              <p className="text-slate-400 text-base">No articles found matching your criteria.</p>
              <Link href="/" className="mt-4 inline-block text-xs font-medium text-indigo-400 hover:underline">
                View all stories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedCategory || searchQuery ? posts : gridPosts).map((post) => (
                <article
                  key={post.id}
                  className="bg-[#10141e] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-indigo-500/30 hover:bg-[#141926] transition-all duration-300 flex flex-col group shadow-lg"
                >
                  <Link href={`/${post.slug}`} className="block aspect-[16/10] overflow-hidden relative">
                    <img
                      src={post.featuredImage || DEFAULT_AI_IMAGE}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {post.category && (
                      <span className="absolute bottom-3 left-3 bg-[#0a0c10]/80 backdrop-blur-md text-slate-200 text-[11px] font-medium px-2.5 py-1 rounded-md border border-white/10">
                        {post.category.name}
                      </span>
                    )}
                  </Link>

                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <Link href={`/${post.slug}`}>
                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2 mb-2.5">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">
                        {post.excerpt || post.content.slice(0, 120)}...
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-800 text-[10px] text-slate-300 flex items-center justify-center font-bold">
                          {post.author.name?.charAt(0) || "M"}
                        </div>
                        <span className="text-slate-300 font-medium">
                          {post.author.name}
                        </span>
                      </div>
                      <span>
                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter Callout Banner */}
        <section className="bg-gradient-to-br from-[#121622] via-[#10131d] to-[#0c0f16] border border-indigo-500/20 rounded-3xl p-8 sm:p-12 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Thoughtful writing on architecture, intelligence, and modern culture
            </h2>
            <NewsletterForm variant="banner" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
