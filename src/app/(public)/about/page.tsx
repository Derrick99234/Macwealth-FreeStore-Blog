import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="bg-surface-container-low">
          <div className="max-w-container-max mx-auto px-md py-xl">
            <div className="max-w-3xl">
              <h1 className="text-display-lg text-on-surface font-display-lg mb-sm">
                About <span className="text-primary">Macwealth FreeStore</span>
              </h1>
              <p className="text-body-main text-on-surface-variant font-body-main leading-[32px]">
                A premium editorial platform dedicated to the intersection of
                technology, design, and culture. We believe in high-focus
                reading and intellectual integrity.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-container-max mx-auto px-md py-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
            <div>
              <h2 className="text-article-title text-on-surface font-article-title mb-md">
                Our Mission
              </h2>
              <p className="text-body-main text-on-surface-variant font-body-main leading-[32px] mb-md">
                Macwealth FreeStore was founded with a singular vision: to create a
                sanctuary for deep thinking in an age of endless distraction.
                We curate and commission long-form journalism, critical essays,
                and design analysis that prioritizes substance over speed.
              </p>
              <p className="text-body-main text-on-surface-variant font-body-main leading-[32px]">
                Our writers and editors are experts in their fields&mdash;not
                content mills. Every piece undergoes rigorous editorial review
                to ensure it meets our standards for accuracy, originality, and
                intellectual depth.
              </p>
            </div>
            <div className="bg-surface-container-highest rounded-xl h-[400px]" />
          </div>
        </section>

        <section className="bg-surface-container-low py-xl">
          <div className="max-w-container-max mx-auto px-md">
            <h2 className="text-article-title text-on-surface font-article-title text-center mb-xl">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              {[
                {
                  icon: "psychology",
                  title: "Depth Over Speed",
                  desc: "We prioritize thorough research and thoughtful analysis over breaking news and hot takes.",
                },
                {
                  icon: "visibility",
                  title: "Editorial Integrity",
                  desc: "Our content is independent, fact-checked, and free from corporate influence.",
                },
                {
                  icon: "group",
                  title: "Community First",
                  desc: "We build tools and experiences that empower readers and writers, not advertisers.",
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg text-center"
                >
                  <span className="material-symbols-outlined text-primary text-4xl mb-sm">
                    {value.icon}
                  </span>
                  <h3 className="text-ui-label text-lg text-on-surface font-bold font-ui-label mb-xs">
                    {value.title}
                  </h3>
                  <p className="text-meta-data text-on-surface-variant font-meta-data">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-container-max mx-auto px-md py-xl">
          <div className="bg-primary rounded-2xl p-xl text-center">
            <h2 className="text-display-lg-mobile text-on-primary font-display-lg mb-sm">
              Join our community of deep thinkers.
            </h2>
            <p className="text-body-main text-on-primary-container max-w-xl mx-auto mb-md opacity-90 font-body-main">
              Subscribe to our newsletter and receive curated insights from the
              intersection of technology, design, and culture.
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
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
