"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function readTime(content: string) {
  return `${Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min read`;
}

export default function ArticlePage() {
  const params = useParams();
  const [post, setPost] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${params.slug}`)
      .then((r) => r.json())
      .then((data) => {
        setPost(data.post);
        setRelated(data.related || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.slug]);

  useEffect(() => {
    const bar = document.getElementById("progress-bar");
    if (!bar) return;

    const onScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      bar.style.width = `${(winScroll / height) * 100}%`;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-2xl font-bold text-white mb-2">Article Not Found</h1>
          <p className="text-slate-400 mb-6">The story you are looking for does not exist or has been moved.</p>
          <Link href="/" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-500 transition-colors">
            Return Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col">
      {/* Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-sky-400 z-[60] transition-all duration-75"
        id="progress-bar"
      />

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

            {/* Author and Metadata Bar - NO DOTS */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                  {post.author?.name?.charAt(0) || "M"}
                </div>
                <span className="font-semibold text-slate-200">
                  {post.author?.name || "Macwealth Editorial"}
                </span>
              </div>

              <div className="bg-[#151924] border border-white/[0.08] px-3 py-1 rounded-full text-slate-300">
                {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
              </div>

              <div className="bg-[#151924] border border-white/[0.08] px-3 py-1 rounded-full text-slate-300">
                {readTime(post.content)}
              </div>
            </div>
          </div>

          {/* Featured Hero Image */}
          <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-white/[0.08] bg-[#121620]">
            <img
              src={post.featuredImage || "/images/hero-illustration.jpg"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Article Body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-slate-300">
            {post.content.split("\n\n").map((paragraph: string, i: number) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
                return (
                  <blockquote
                    key={i}
                    className="relative pl-6 py-3 my-8 border-l-4 border-indigo-500 bg-[#121622] rounded-r-xl"
                  >
                    <p className="text-xl italic text-indigo-300 font-serif leading-relaxed">
                      &ldquo;{trimmed.slice(1, -1)}&rdquo;
                    </p>
                  </blockquote>
                );
              }

              if (trimmed.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="text-2xl font-bold tracking-tight text-white pt-6 mb-2"
                  >
                    {trimmed.slice(3)}
                  </h2>
                );
              }

              if (i === 0) {
                return (
                  <p
                    key={i}
                    className="first-letter:text-5xl first-letter:font-bold first-letter:text-indigo-400 first-letter:mr-3 first-letter:float-left first-letter:leading-none text-slate-200"
                  >
                    {trimmed}
                  </p>
                );
              }

              return <p key={i}>{trimmed}</p>;
            })}
          </div>

          {/* Author Box */}
          <div className="mt-14 p-6 sm:p-8 bg-[#10141e] border border-white/[0.08] rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg shadow-indigo-600/20">
              {post.author?.name?.charAt(0) || "M"}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-base font-bold text-white mb-1">
                Written by {post.author?.name || "Macwealth Editorial"}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Contributor and editorial researcher covering technology, deep work, and human-centric software paradigms.
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
            <h2 className="text-xl font-bold text-white mb-6">Related Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <article
                  key={item.id}
                  className="bg-[#10141e] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all group"
                >
                  <Link href={`/${item.slug}`} className="block aspect-[16/10] overflow-hidden">
                    <img
                      src={item.featuredImage || "/images/ai-creative.jpg"}
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
