import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import Link from "next/link";
import { DEFAULT_POST_IMAGE, DEFAULT_AI_IMAGE } from "@/lib/images";
import { calculateReadTime, formatArticleHtml } from "@/lib/utils";

export const revalidate = 60;

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true, category: true },
  });

  if (!post || post.status !== "PUBLISHED") {
    return {
      title: "Article Not Found | Macwealth FreeStore Blog",
    };
  }

  const title = `${post.title} | Macwealth FreeStore Blog`;
  const description =
    post.seoDescription ||
    post.excerpt ||
    "Free life-transforming spiritual teaching and kingdom wisdom by Dr. Isaiah Macwealth.";
  const ogImage = post.featuredImage || DEFAULT_POST_IMAGE;

  return {
    title,
    description,
    keywords: post.tags ? post.tags.split(",").map((t) => t.trim()) : undefined,
    authors: [{ name: post.author?.name || "Dr. Isaiah Macwealth" }],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://macwealthfreestore.com/${post.slug}`,
      siteName: "Macwealth FreeStore",
      publishedTime: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
      authors: [post.author?.name || "Dr. Isaiah Macwealth"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 675,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: { select: { id: true, name: true, image: true } },
      category: true,
    },
  });

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  // Increment view count
  await prisma.post.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } },
  });

  // Fetch related posts in same category
  const related = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      id: { not: post.id },
      ...(post.categoryId ? { categoryId: post.categoryId } : {}),
    },
    take: 3,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      featuredImage: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col">
      <ReadingProgressBar />

      <Navbar />

      <main className="flex-grow">
        {/* Header Section */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8">
          <div className="text-center mb-10">
            {post.category && (
              <div className="inline-block mb-4">
                <Link
                  href={`/?category=${post.category.slug}`}
                  className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors"
                >
                  {post.category.name}
                </Link>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author and Metadata Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                  {post.author?.name?.charAt(0) || "M"}
                </div>
                <span className="font-semibold text-slate-200">
                  {post.author?.name || "Dr. Isaiah Macwealth"}
                </span>
              </div>

              <div className="bg-[#151924] border border-white/[0.08] px-3 py-1 rounded-full text-slate-300">
                {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
              </div>

              <div className="bg-[#151924] border border-white/[0.08] px-3 py-1 rounded-full text-slate-300">
                {calculateReadTime(post.content)}
              </div>

              {post.viewCount > 0 && (
                <div className="bg-[#151924] border border-white/[0.08] px-3 py-1 rounded-full text-slate-300">
                  {post.viewCount === 1 ? "1 view" : `${post.viewCount.toLocaleString()} views`}
                </div>
              )}
            </div>
          </div>

          {/* Featured Hero Image */}
          <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-white/[0.08] bg-[#121620]">
            <img
              src={post.featuredImage || DEFAULT_POST_IMAGE}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Article Body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div
            className="article-prose text-base sm:text-lg leading-relaxed text-slate-300"
            dangerouslySetInnerHTML={{ __html: formatArticleHtml(post.content) }}
          />

          {/* Author Box */}
          <div className="mt-14 p-6 sm:p-8 bg-[#10141e] border border-white/[0.08] rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg shadow-indigo-600/20">
              {post.author?.name?.charAt(0) || "M"}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-base font-bold text-white mb-1">
                Written by {post.author?.name || "Dr. Isaiah Macwealth"}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {post.author?.name === "Dr. Isaiah Macwealth"
                  ? "Prophet, author, and founder of Macwealth FreeStore, dedicated to empowering believers globally with free access to kingdom teachings, financial wisdom, and spiritual illumination."
                  : "Macwealth FreeStore Editorial Contributor sharing transformational insights on kingdom stewardship, spiritual growth, and biblical wisdom."}
              </p>
              <div className="flex justify-center sm:justify-start gap-3 text-xs text-indigo-400">
                <Link href="/" className="hover:underline">
                  More articles from this author
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts Section */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-white/[0.06]">
            <h2 className="text-xl font-bold text-white mb-6">Related Teachings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <article
                  key={item.id}
                  className="bg-[#10141e] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all group"
                >
                  <Link href={`/${item.slug}`} className="block aspect-[16/10] overflow-hidden">
                    <img
                      src={item.featuredImage || DEFAULT_AI_IMAGE}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <div className="p-5">
                    <Link href={`/${item.slug}`}>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                      {item.excerpt || item.content.slice(0, 100)}...
                    </p>
                    <span className="text-[11px] text-slate-500">
                      {item.publishedAt ? formatDate(item.publishedAt) : formatDate(item.createdAt)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
