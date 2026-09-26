import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { images } from "@/lib/images";
import prisma from "@/lib/prisma";

export default async function CategoriesPage() {
  const allCats = await prisma.category.findMany({ orderBy: { postCount: "desc" } });
  const featured = allCats[0];
  const rest = allCats.slice(1);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="relative min-h-[400px] flex items-center bg-surface-container-low">
          <div className="relative z-10 max-w-container-max mx-auto px-md w-full">
            <div className="max-w-2xl">
              <h1 className="text-display-lg text-on-surface font-display-lg mb-sm">
                Explore the World of <span className="text-primary">Insight</span>
              </h1>
              <p className="text-body-main text-on-surface-variant font-body-main mb-lg">
                Dive deep into specialized knowledge. Browse our curated
                categories and find the perspectives that matter to you.
              </p>
              <div className="flex gap-xs">
                <span className="px-sm py-xs bg-primary-fixed text-on-primary-fixed-variant rounded-full text-meta-data font-semibold">
                  7 Active Topics
                </span>
                <span className="px-sm py-xs bg-secondary-fixed text-on-secondary-fixed-variant rounded-full text-meta-data font-semibold">
                  450+ Articles
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-container-max mx-auto px-md py-xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-lg gap-md">
            <div>
              <h2 className="text-article-title text-on-surface font-article-title">
                Browse by Topic
              </h2>
              <p className="text-ui-label text-on-surface-variant font-ui-label">
                Carefully organized for intellectual curiosity.
              </p>
            </div>
            <div className="flex bg-surface-container rounded-full p-1 border border-outline-variant">
              <button className="px-lg py-2 bg-surface-container-lowest text-primary rounded-full shadow-sm text-ui-label font-bold transition-all">
                Grid View
              </button>
              <button className="px-lg py-2 text-on-surface-variant hover:text-on-surface rounded-full text-ui-label transition-all">
                List Directory
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-md">
            <div className="md:col-span-8 group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest h-[400px] cursor-pointer transition-all hover:shadow-[0px_10px_15px_-3px_rgba(15,23,42,0.08)]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${images.categories.ai})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-lg w-full flex justify-between items-end text-white">
                <div>
                  <span className="text-meta-data bg-primary px-sm py-1 rounded mb-xs inline-block font-meta-data">
                    Featured
                  </span>
                  <h3 className="text-article-title font-article-title mb-xs">
                    {featured.name}
                  </h3>
                  <p className="text-ui-label font-ui-label opacity-90 max-w-md">
                    {featured.description}
                  </p>
                </div>
                <div className="text-right">
                  <span className="block text-display-lg-mobile font-display-lg leading-none">
                    {featured.postCount}
                  </span>
                  <span className="text-meta-data uppercase tracking-widest opacity-80 font-meta-data">
                    Posts
                  </span>
                </div>
              </div>
            </div>

            {/* Design Systems */}
            <div className="md:col-span-4 group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest h-[400px] cursor-pointer transition-all hover:shadow-[0px_10px_15px_-3px_rgba(15,23,42,0.08)]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${images.categories.design})` }} />
              <div className="absolute inset-0 bg-primary-fixed-dim/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              <div className="absolute inset-0 p-lg flex flex-col justify-between items-start">
                <span className="material-symbols-outlined text-4xl text-on-primary drop-shadow-md">
                  {rest[0].icon}
                </span>
                <div>
                  <h3 className="text-article-title-mobile text-white font-article-title-mobile mb-xs">
                    {rest[0].name}
                  </h3>
                  <span className="text-ui-label text-white/90 font-ui-label">
                    {rest[0].postCount} Articles
                  </span>
                </div>
              </div>
            </div>

            {/* Technology */}
            <div className="md:col-span-4 group rounded-xl border border-outline-variant bg-surface-container-lowest p-lg flex flex-col justify-between h-[300px] cursor-pointer transition-all hover:shadow-[0px_10px_15px_-3px_rgba(15,23,42,0.08)]">
              <div>
                <span className="material-symbols-outlined text-primary text-3xl mb-sm">
                  {rest[1].icon}
                </span>
                <h3 className="text-article-title-mobile text-on-surface font-article-title-mobile mb-xs">
                  {rest[1].name}
                </h3>
                <p className="text-ui-label text-on-surface-variant font-ui-label">
                  {rest[1].description}
                </p>
              </div>
              <div className="flex justify-between items-center pt-md border-t border-outline-variant">
                <span className="text-meta-data text-on-surface-variant font-meta-data">
                  {rest[1].postCount} Posts
                </span>
                <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Modern Lifestyle */}
            <div className="md:col-span-4 group relative rounded-xl border border-outline-variant bg-surface-container-lowest p-lg flex flex-col justify-between h-[300px] cursor-pointer overflow-hidden transition-all hover:shadow-[0px_10px_15px_-3px_rgba(15,23,42,0.08)]">
              <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${images.categories.lifestyle})` }} />
              <div className="relative z-10">
                <span className="material-symbols-outlined text-tertiary text-3xl mb-sm">
                  {rest[2].icon}
                </span>
                <h3 className="text-article-title-mobile text-on-surface font-article-title-mobile mb-xs">
                  {rest[2].name}
                </h3>
                <p className="text-ui-label text-on-surface-variant font-ui-label">
                  {rest[2].description}
                </p>
              </div>
              <div className="relative z-10 flex justify-between items-center pt-md border-t border-outline-variant">
                <span className="text-meta-data text-on-surface-variant font-meta-data">
                  {rest[2].postCount} Posts
                </span>
                <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Global Economy */}
            <div className="md:col-span-4 group rounded-xl border border-outline-variant bg-surface-container-lowest p-lg flex flex-col justify-between h-[300px] cursor-pointer transition-all hover:shadow-[0px_10px_15px_-3px_rgba(15,23,42,0.08)]">
              <div>
                <span className="material-symbols-outlined text-secondary text-3xl mb-sm">
                  {rest[3].icon}
                </span>
                <h3 className="text-article-title-mobile text-on-surface font-article-title-mobile mb-xs">
                  {rest[3].name}
                </h3>
                <p className="text-ui-label text-on-surface-variant font-ui-label">
                  {rest[3].description}
                </p>
              </div>
              <div className="flex justify-between items-center pt-md border-t border-outline-variant">
                <span className="text-meta-data text-on-surface-variant font-meta-data">
                  {rest[3].postCount} Posts
                </span>
                <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Philosophy & Ethics */}
            <div className="md:col-span-6 group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest h-[350px] cursor-pointer transition-all hover:shadow-[0px_10px_15px_-3px_rgba(15,23,42,0.08)]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${images.categories.philosophy})` }} />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 p-lg flex flex-col justify-end">
                <h3 className="text-article-title text-white font-article-title mb-xs">
                  {rest[4].name}
                </h3>
                <p className="text-ui-label text-white/80 font-ui-label mb-sm">
                  {rest[4].description}
                </p>
                <span className="text-meta-data text-white/60 font-meta-data">
                  {rest[4].postCount} Articles
                </span>
              </div>
            </div>

            {/* Future of Work */}
            <div className="md:col-span-6 group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest h-[350px] cursor-pointer transition-all hover:shadow-[0px_10px_15px_-3px_rgba(15,23,42,0.08)]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${images.categories.futureOfWork})` }} />
              <div className="absolute inset-0 bg-primary/20" />
              <div className="absolute inset-0 p-lg flex flex-col justify-end">
                <h3 className="text-article-title text-white font-article-title mb-xs">
                  {rest[5].name}
                </h3>
                <p className="text-ui-label text-white/80 font-ui-label mb-sm">
                  {rest[5].description}
                </p>
                <span className="text-meta-data text-white/60 font-meta-data">
                  {rest[5].postCount} Articles
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-inverse-surface py-xl">
          <div className="max-w-container-max mx-auto px-md">
            <div className="flex flex-col md:flex-row items-center gap-lg">
              <div className="md:w-1/2">
                <h2 className="text-display-lg-mobile text-on-primary font-display-lg mb-sm">
                  Never miss an update.
                </h2>
                <p className="text-body-main text-on-secondary-fixed-variant opacity-80 font-body-main">
                  Get the best of Macwealth FreeStore delivered to your inbox every
                  Thursday. No spam, just deep-dives.
                </p>
              </div>
              <div className="md:w-1/2 w-full">
                <form className="flex flex-col sm:flex-row gap-xs">
                  <input
                    className="flex-grow px-lg py-3 rounded bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary text-ui-label"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <button
                    type="submit"
                    className="px-xl py-3 bg-primary text-on-primary font-ui-button text-ui-button rounded hover:brightness-110 transition-all"
                  >
                    Subscribe Now
                  </button>
                </form>
                <p className="mt-xs text-meta-data text-on-secondary-fixed-variant opacity-60 font-meta-data">
                  By subscribing, you agree to our Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
