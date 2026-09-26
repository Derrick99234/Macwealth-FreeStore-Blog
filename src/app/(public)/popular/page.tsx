import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { images } from "@/lib/images";
import prisma from "@/lib/prisma";

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function readTime(content: string) {
  return `${Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min read`;
}

export default async function PopularPage() {
  const allTrending = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { viewCount: "desc" },
    take: 15,
    include: { author: { select: { id: true, name: true, image: true } }, category: true },
  });

  const featured = allTrending[0];
  const side = allTrending.slice(1, 3);
  const grid = allTrending.slice(3, 7);
  const rising = allTrending.slice(7, 15);

  return (
    <>
      <Navbar />
      <main className="max-w-container-max mx-auto px-md py-lg">
        <section className="mb-lg border-b border-outline-variant pb-md">
          <h1 className="text-display-lg text-on-surface font-display-lg mb-xs">
            Popular Stories
          </h1>
          <p className="text-ui-label text-on-surface-variant font-ui-label max-w-2xl">
            The most influential perspectives and deeply researched insights
            trending this month in our community.
          </p>
        </section>

        <div className="bento-grid grid grid-cols-12 gap-md">
          <article className="col-span-12 lg:col-span-8 group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="grid md:grid-cols-2 h-full">
              <div className="relative h-64 md:h-full overflow-hidden">
                <img
                  src={images.popular.trending1}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-sm left-sm bg-primary text-on-primary px-3 py-1 rounded-full font-ui-label text-xs font-bold uppercase tracking-widest shadow-md">
                  #1 Trending
                </div>
              </div>
              <div className="p-lg flex flex-col justify-center">
                <div className="flex items-center gap-xs mb-sm">
                  <span className="text-meta-data text-primary font-bold font-meta-data">
                    {featured.category?.name || "Featured"}
                  </span>
                  <span className="text-outline-variant">&bull;</span>
                  <span className="text-meta-data text-on-surface-variant font-meta-data">
                    {readTime(featured.content)}
                  </span>
                </div>
                <h2 className="text-article-title text-on-surface font-article-title mb-sm group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="text-body-main text-on-surface-variant font-body-main line-clamp-3 mb-md">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-md border-t border-outline-variant">
                  <div className="flex items-center gap-xs">
                    <img
                      src={featured.author?.image || images.popular.trending1Author}
                      alt={featured.author?.name || ""}
                      className="w-8 h-8 rounded-full object-cover border border-outline-variant"
                    />
                    <span className="text-ui-label text-ui-label font-bold font-ui-label">
                      {featured.author?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-md text-on-surface-variant">
                    <span className="flex items-center gap-1 text-meta-data font-meta-data">
                      <span className="material-symbols-outlined text-sm">
                        visibility
                      </span>
                      {(featured.viewCount / 1000).toFixed(1)}k
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {side.map((item, i) => (
            <article
              key={item.id}
              className="col-span-12 sm:col-span-6 lg:col-span-2 group bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col hover:shadow-md transition-all"
            >
              <div className="mb-sm flex items-center justify-between">
                <span className="bg-surface-container-high px-2 py-0.5 rounded font-ui-label text-[10px] font-bold uppercase text-on-surface-variant">
                  #{i + 2} Trending
                </span>
                <span className="text-meta-data text-on-surface-variant font-meta-data">
                  {readTime(item.content)}
                </span>
              </div>
              <h3 className="text-article-title-mobile text-on-surface font-article-title-mobile mb-xs group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-meta-data text-on-surface-variant font-meta-data line-clamp-2 mb-md">
                {item.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-ui-label text-ui-label text-primary font-bold font-ui-label">
                  {item.category?.name || "Featured"}
                </span>
                <div className="flex items-center gap-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">
                    visibility
                  </span>
                  <span className="text-meta-data font-meta-data">
                    {(item.viewCount / 1000).toFixed(1)}k
                  </span>
                </div>
              </div>
            </article>
          ))}

          <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
            {grid.map((item, i) => {
              const bg = [images.popular.card4, images.popular.card5, images.popular.card6, images.popular.card7][i];
              return (
              <article key={item.id} className="group cursor-pointer">
                <div className="aspect-video rounded-lg overflow-hidden border border-outline-variant mb-sm relative">
                  <img
                    src={bg}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-surface-container-lowest/90 px-2 py-1 rounded text-[10px] font-bold">
                    #{i + 4}
                  </div>
                </div>
                <h4 className="text-ui-label text-ui-label text-on-surface font-ui-label group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <div className="mt-xs flex items-center gap-sm text-on-surface-variant">
                  <span className="text-meta-data font-meta-data">
                    {(item.viewCount / 1000).toFixed(1)}k views
                  </span>
                  <span className="text-outline-variant">&bull;</span>
                  <span className="text-meta-data font-meta-data">{readTime(item.content)}</span>
                </div>
              </article>
            );
          })}
          </div>
        </div>

        {rising.length > 0 && (
          <section className="mt-xl">
            <div className="flex justify-between items-end mb-lg">
              <div>
                <h2 className="text-display-lg-mobile text-on-surface font-display-lg">
                  Rising Insights
                </h2>
                <p className="text-meta-data text-on-surface-variant font-meta-data">
                  Fresh perspectives gaining traction in our community.
                </p>
              </div>
            </div>
            <div className="space-y-md">
              {rising.map((item, i) => {
                const risingImg = [images.popular.card4, images.popular.card5, images.popular.card6, images.popular.card7,
                  images.popular.trending1, images.popular.trending1Author, images.categories.ai, images.categories.design][i % 8];
                return (
                  <a
                    key={item.id}
                    href={`/${item.slug}`}
                    className="flex items-center gap-md group bg-surface-container-lowest border border-outline-variant rounded-xl p-md hover:shadow-md transition-all"
                  >
                    <span className="text-display-lg-mobile text-outline font-display-lg font-bold w-10 shrink-0">
                      #{i + 8}
                    </span>
                    <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-outline-variant">
                      <img
                        src={item.featuredImage || risingImg}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-xs mb-xs">
                        <span className="text-meta-data text-primary font-bold font-meta-data uppercase tracking-tight">
                          {item.category?.name || "Featured"}
                        </span>
                        <span className="text-outline-variant">&bull;</span>
                        <span className="text-meta-data text-outline font-meta-data">
                          {readTime(item.content)}
                        </span>
                      </div>
                      <h3 className="text-article-title-mobile text-on-surface font-article-title-mobile group-hover:text-primary transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-meta-data text-on-surface-variant font-meta-data line-clamp-1 mt-xs">
                        {item.excerpt}
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-md text-on-surface-variant shrink-0">
                      <span className="flex items-center gap-1 text-meta-data font-meta-data">
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        {(item.viewCount / 1000).toFixed(1)}k
                      </span>
                      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                        arrow_forward
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        <section className="mt-xl bg-secondary-container rounded-2xl p-lg flex flex-col md:flex-row items-center gap-lg">
          <div className="flex-1">
            <h3 className="text-display-lg-mobile text-on-secondary-container font-display-lg mb-xs">
              Don&apos;t miss a trending insight.
            </h3>
            <p className="text-ui-label text-on-secondary-fixed-variant font-ui-label">
              Join 50,000+ readers getting the most popular stories delivered
              every Sunday morning.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-xs">
            <input
              className="px-md py-2.5 rounded-lg border-none focus:ring-2 focus:ring-primary outline-none min-w-[280px]"
              placeholder="email@example.com"
              type="email"
            />
            <button className="bg-primary text-on-primary px-lg py-2.5 rounded-lg font-ui-button text-ui-button whitespace-nowrap hover:shadow-lg transition-all active:scale-95">
              Sign Up Now
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
