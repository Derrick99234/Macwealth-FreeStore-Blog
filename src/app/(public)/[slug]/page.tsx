"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { images } from "@/lib/images";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function readTime(content: string) {
  return `${Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min read`;
}

export default function ArticlePage() {
  const params = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/posts/${params.slug}`)
      .then((r) => r.json())
      .then((data) => setPost(data.post))
      .catch(() => {});
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

  if (!post) return <div className="min-h-screen flex items-center justify-center text-on-surface-variant">Loading...</div>;

  return (
    <>
      <div className="fixed top-0 left-0 h-1 bg-primary z-[60] transition-all duration-75" id="progress-bar" />
      <Navbar />
      <main className="min-h-screen">
        <header className="max-w-container-max mx-auto px-md pt-lg md:pt-xl">
          <div className="max-w-article-max mx-auto text-center mb-lg">
            <div className="inline-flex items-center gap-xs text-primary font-ui-label text-ui-label uppercase tracking-widest mb-sm">
              <span>{post.category?.name || "Article"}</span>
            </div>
            <h1 className="text-article-title-mobile md:text-article-title text-on-surface font-article-title mb-md leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-sm md:gap-md">
              <div className="flex items-center gap-xs">
                <img
                  src={post.author?.image || images.article.authorAvatar}
                  alt={post.author?.name || ""}
                  className="w-10 h-10 rounded-full object-cover border border-outline-variant"
                />
                <div className="text-left">
                  <p className="text-ui-label text-on-surface font-bold font-ui-label">
                    {post.author?.name}
                  </p>
                </div>
              </div>
              <div className="hidden md:block w-1 h-1 bg-outline-variant rounded-full" />
              <div className="flex items-center gap-sm text-meta-data text-on-surface-variant font-meta-data">
                <span className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[18px]">
                    calendar_today
                  </span>
                  {post.publishedAt ? formatDate(post.publishedAt) : ""}
                </span>
                <span className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[18px]">
                    schedule
                  </span>
                  {readTime(post.content)}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full aspect-[21/9] rounded-xl overflow-hidden mb-lg shadow-sm border border-outline-variant">
            <img
              src={post.featuredImage || images.article.featured}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        <article className="max-w-article-max mx-auto px-md py-md">
          <div className="space-y-6 leading-[32px] text-body-main text-on-surface font-body-main">
            {post.content.split("\n\n").map((paragraph: string, i: number) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
                return (
                  <blockquote key={i} className="relative pl-lg my-lg">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                    <p className="text-article-title-mobile italic text-primary font-article-title-mobile leading-relaxed">
                      &ldquo;{trimmed.slice(1, -1)}&rdquo;
                    </p>
                  </blockquote>
                );
              }

              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-article-title-mobile text-on-surface font-article-title-mobile pt-md">
                    {trimmed.slice(3)}
                  </h2>
                );
              }

              if (i === 0) {
                return (
                  <p key={i} className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                    {trimmed}
                  </p>
                );
              }

              return <p key={i}>{trimmed}</p>;
            })}
          </div>

          <div className="mt-lg pt-md border-t border-outline-variant flex flex-wrap gap-xs">
            {["#FutureCities", "#GenerativeAI", "#SustainableDesign", "#Architecture"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-sm py-base bg-surface-container hover:bg-secondary-container transition-colors rounded-full text-meta-data text-on-surface-variant font-meta-data cursor-pointer"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <section className="mt-xl p-md bg-surface-container-low rounded-xl border border-outline-variant flex flex-col md:flex-row gap-md items-center md:items-start">
            <img
              src={images.article.authorBio}
              alt="Elena Thorne"
              className="w-24 h-24 rounded-full object-cover shrink-0 border border-outline-variant"
            />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-ui-label text-on-surface font-extrabold text-lg mb-base font-ui-label">
                About Elena Thorne
              </h3>
              <p className="text-meta-data text-on-surface-variant font-meta-data mb-sm">
                Elena is an award-winning architect and urban strategist based in
                London. With over 15 years of experience, she focuses on the
                intersection of artificial intelligence and sustainable urban
                planning. Her latest book, &ldquo;The Code of Space,&rdquo;
                explores how algorithms are reviving classical design principles.
              </p>
              <div className="flex justify-center md:justify-start gap-sm">
                <span className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity cursor-pointer">
                  public
                </span>
                <span className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity cursor-pointer">
                  alternate_email
                </span>
                <span className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity cursor-pointer">
                  share
                </span>
              </div>
            </div>
          </section>
        </article>

        <section className="bg-surface-container-lowest py-xl border-t border-outline-variant">
          <div className="max-w-container-max mx-auto px-md">
            <div className="flex justify-between items-end mb-lg">
              <div>
                <h2 className="text-display-lg-mobile text-on-surface font-display-lg">
                  Related Insights
                </h2>
                <p className="text-meta-data text-on-surface-variant font-meta-data">
                  More deep dives into technology and design.
                </p>
              </div>
              <button className="hidden md:flex items-center gap-xs text-ui-button text-primary font-ui-button hover:gap-sm transition-all">
                View All
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              {[
                {
                  category: "Innovation",
                  title: "Smart Materials: Buildings That Heal Themselves",
                  img: images.article.related1,
                },
                {
                  category: "Sustainability",
                  title: "The Psychology of Biophilic Urban Spaces",
                  img: images.article.related2,
                },
                {
                  category: "Logistics",
                  title: "Autonomous Cities: Navigating the Drone Age",
                  img: images.article.related3,
                },
              ].map((related) => (
                <div key={related.title} className="group cursor-pointer">
                  <div className="aspect-video rounded-lg overflow-hidden mb-sm border border-outline-variant relative">
                    <img
                      src={related.img}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-meta-data text-primary uppercase font-bold tracking-tight font-meta-data">
                    {related.category}
                  </span>
                  <h3 className="text-ui-label text-lg text-on-surface font-ui-label group-hover:text-primary transition-colors mt-base">
                    {related.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-lg">
          <div className="max-w-container-max mx-auto px-md text-center">
            <h2 className="text-display-lg-mobile text-on-primary font-display-lg mb-sm">
              Stay ahead of the curve.
            </h2>
            <p className="text-body-main text-on-primary-container max-w-xl mx-auto mb-md opacity-90 font-body-main">
              Join 25,000+ industry professionals receiving our weekly analysis
              on the intersection of design, tech, and humanity.
            </p>
            <form className="flex flex-col sm:flex-row gap-sm max-w-lg mx-auto">
              <input
                className="flex-1 px-sm py-xs rounded-lg border-none focus:ring-2 focus:ring-on-primary text-on-surface"
                placeholder="Enter your email"
                type="email"
              />
              <button
                type="submit"
                className="bg-on-primary text-primary font-ui-button text-ui-button px-md py-xs rounded-lg hover:bg-primary-fixed transition-colors"
              >
                Join Now
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
