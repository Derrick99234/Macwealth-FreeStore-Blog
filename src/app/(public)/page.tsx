import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-container-max mx-auto px-md py-lg">
        <section className="mb-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-center">
            <div className="lg:col-span-7 group cursor-pointer overflow-hidden rounded-xl bg-white border border-outline-variant">
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2DxcYuiobZbAOxzSvdABLs6yRiW6rl3LwJW9hj3Ey8E7tKPjSppoxEWg5_imr4N8QXE5gDo8wCDqn3V1Fs3rTorO3P0R4Rgv6xGPGUpDHJJHcKHvTELju-NqHW07Sl69Jo-kkLBhCk5y2v96F8fC_bjm8F9Xc6ryMSles_0lK7MDNzpCS3017-ZrXzxihQ4jEs0xZt0fld3MvX24jYqSCXc2WYU0OfuniFO1z4SQ6GJZ5BJ07SDmZeA"
                  alt=""
                />
                <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 text-meta-data font-inter rounded-full">
                  Featured
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center gap-sm">
              <span className="text-primary font-inter font-bold tracking-wider text-xs uppercase">Design &bull; 8 min read</span>
              <h1 className="font-article-title text-article-title leading-tight text-on-surface hover:text-primary cursor-pointer transition-colors">
                The Silent Evolution of Minimalist Digital Architectures
              </h1>
              <p className="font-body-main text-body-main text-on-surface-variant line-clamp-3">
                How modern interfaces are moving beyond mere aesthetics to create meaningful, high-focus environments for the digital-native generation. Discover the principles of invisible design.
              </p>
              <div className="flex items-center gap-xs mt-xs">
                <div className="w-8 h-8 rounded-full bg-surface-dim overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJvpZB1HcfdhsSKIfSPVt4_oiRFIzAdLx9zcJ32w8iX3MykXLQGlLx-tcVkT_K00Ph6fYJLnKcVMczUdZubagruo_B7qHTUhg2PgrrSNMYI8EYLdIL6xwxsPsg8Dk6TGG4afYGpNhBhAYzG4Y34u2iRnj215J3ptd0JPNvy5XjbHGF6lu9z1vBWE1kURB-eNrcvHvidxb8tKK7qqN64OHZNe7H5sPdWaSN2NaIDpdkn3PB2zSErgBEHQ"
                    alt=""
                  />
                </div>
                <span className="font-inter text-ui-label font-bold">Elena Vance</span>
                <span className="text-outline mx-1">&bull;</span>
                <span className="font-inter text-meta-data text-outline">Oct 24, 2024</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-lg overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-sm whitespace-nowrap border-b border-outline-variant pb-xs">
            <button className="px-md py-2 rounded-full bg-primary text-on-primary font-inter text-ui-label font-bold cursor-pointer transition-all active:scale-95">All Stories</button>
            <button className="px-md py-2 rounded-full bg-surface-container-low text-on-surface-variant font-inter text-ui-label hover:bg-surface-container-high transition-all cursor-pointer">Technology</button>
            <button className="px-md py-2 rounded-full bg-surface-container-low text-on-surface-variant font-inter text-ui-label hover:bg-surface-container-high transition-all cursor-pointer">Design</button>
            <button className="px-md py-2 rounded-full bg-surface-container-low text-on-surface-variant font-inter text-ui-label hover:bg-surface-container-high transition-all cursor-pointer">Lifestyle</button>
            <button className="px-md py-2 rounded-full bg-surface-container-low text-on-surface-variant font-inter text-ui-label hover:bg-surface-container-high transition-all cursor-pointer">Artificial Intelligence</button>
            <button className="px-md py-2 rounded-full bg-surface-container-low text-on-surface-variant font-inter text-ui-label hover:bg-surface-container-high transition-all cursor-pointer">Culture</button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md mb-xl">
          <article className="flex flex-col gap-sm group">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant cursor-pointer">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnMsAIp91eimZmnGHvKJ317A1kiDVA2TxajLhdE_fOupaNubUpafUZfuu65lXF8XCuuB0WRyxnFOe1eCk4Zh1v6mDeVzU3r6ApxYW6aMcR4TBwkYjtypTZwDQJvCk0k-Q2rBVT4EJkW9vVuGisyesJE7MX4tBWxc6M0q5i-Yrul9MsHHafRB3ONTBlXmg2R95Vw4X5m5icitwUz5f7HHpXyUv5ka-bVVZRO_W776ejYR32sYw0ejGixA"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-xs">
              <span className="font-inter text-meta-data text-primary font-bold uppercase tracking-tighter">Technology</span>
              <h3 className="font-article-title-mobile text-article-title-mobile text-on-surface group-hover:text-primary transition-colors cursor-pointer">Quantum Computing: Beyond the Hype</h3>
              <p className="font-body-main text-sm text-on-surface-variant line-clamp-2">Practical applications that are actually changing the landscape of cryptography and data science today.</p>
              <span className="font-inter text-meta-data text-outline mt-xs">5 min read &bull; by Julian Moss</span>
            </div>
          </article>
          <article className="flex flex-col gap-sm group">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant cursor-pointer">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLF5ABkPVptO4pXXYulaySnYhOVlWNMR2e_V4fwfhm0KmDQFfRtRYyT4nUEGWl0VIzeG-FUsUWhaHY6AjRbpQjSwU5UtcI0mbJhh-ziGbvW8cEjO9fp9XTtIgqUzH_XHgSXI__VHFRCtS3VgfCkuGHG2r5dbvINtkbrX0FuB1DjJFts4rv8XjoRAsyguxhR4x6k4jARslcESel6tfheiWW75iPclOE78L9Gc9h4muuafbCU2lpcPKKiw"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-xs">
              <span className="font-inter text-meta-data text-primary font-bold uppercase tracking-tighter">Lifestyle</span>
              <h3 className="font-article-title-mobile text-article-title-mobile text-on-surface group-hover:text-primary transition-colors cursor-pointer">The Art of Digital Slow-Living</h3>
              <p className="font-body-main text-sm text-on-surface-variant line-clamp-2">Reclaiming your attention span in an era of constant notifications and infinite scrolling loops.</p>
              <span className="font-inter text-meta-data text-outline mt-xs">7 min read &bull; by Sarah Chen</span>
            </div>
          </article>
          <article className="flex flex-col gap-sm group">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant cursor-pointer">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzZqqUctHwGYJgNpjLB022RC7W7VxN4em_D6NipZopNSNyMBQDJb9RcYr9v5lkvgEDoV-T_UpwpUmP8MNQhw7NwZOLT-6schHcSkIGSkbM4OdoioO0vxfAVKnUaCyr2EkazGJptO07Ro6mf_IT2j2c46EaOPAfhKNOW3y431oZZbmOE_wNMACYJyTaOeGdtKyNY39Y0UcT0nhXqjPrYxnQOoP8M6KUoZ1HU3Z6ZegjOZWSP2K-PM4kiw"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-xs">
              <span className="font-inter text-meta-data text-primary font-bold uppercase tracking-tighter">Technology</span>
              <h3 className="font-article-title-mobile text-article-title-mobile text-on-surface group-hover:text-primary transition-colors cursor-pointer">Generative AI: The New Creative Partner</h3>
              <p className="font-body-main text-sm text-on-surface-variant line-clamp-2">How artists and writers are using large language models to augment their creative process without losing their voice.</p>
              <span className="font-inter text-meta-data text-outline mt-xs">10 min read &bull; by Marcus Thorne</span>
            </div>
          </article>
          <article className="flex flex-col gap-sm group">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant cursor-pointer">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ7iAlVNnnPuSv86VuiONqsbmKuHF0m5awL9WJnpimohwYzKPwWUhHqMB643_l7WHZDWyF863ipo4eoJpdu5KchvCQDEAKCMOpw0ZgWIgt8DOzw1FlbI4kz5-lWxgnmWDilOab48HmF2eWFooJMGjUDShi-TP5JUkL3BeKnU22MmXYeb3rbJThDTAexYrFcUpQLk5itUqJYyKtPwhtlVJzUEakzo1rxnQh-M4hEVc9Gp0HnU2kjblNnA"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-xs">
              <span className="font-inter text-meta-data text-primary font-bold uppercase tracking-tighter">Design</span>
              <h3 className="font-article-title-mobile text-article-title-mobile text-on-surface group-hover:text-primary transition-colors cursor-pointer">Craftsmanship in the Age of Scale</h3>
              <p className="font-body-main text-sm text-on-surface-variant line-clamp-2">Why physical objects and mechanical precision still matter in an increasingly ethereal, cloud-based world.</p>
              <span className="font-inter text-meta-data text-outline mt-xs">6 min read &bull; by David Sterling</span>
            </div>
          </article>
          <article className="flex flex-col gap-sm group">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant cursor-pointer">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgNL0YPmZn7MyRdphUTUHaowLjsRXeJuS5mY-QSAHOssskbAjpzqD8jl1eZsp7nXxtXN7uwP6TOyxcl4lc7_WOCudBCt-g4_OUWUS4xydq214uW44DvWi_q2dBmj2xpph9_6vt5dW0NLb6owBZyC18AHd_5LbP89JUtT61wJvBBeaJmyl3nTjXwqehXm0DqlHQTws6hvV8g2YNPiS9P1U8uFSxIuhgT6vAWy4ZMmgT-6v3GDhhk90NNg"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-xs">
              <span className="font-inter text-meta-data text-primary font-bold uppercase tracking-tighter">Lifestyle</span>
              <h3 className="font-article-title-mobile text-article-title-mobile text-on-surface group-hover:text-primary transition-colors cursor-pointer">The Future of Gastronomy</h3>
              <p className="font-body-main text-sm text-on-surface-variant line-clamp-2">Sustainable practices and molecular techniques that are redefining what it means to dine in the 21st century.</p>
              <span className="font-inter text-meta-data text-outline mt-xs">8 min read &bull; by Helena Blake</span>
            </div>
          </article>
          <article className="flex flex-col gap-sm group">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant cursor-pointer">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoMVZtxh-23Hy2oGaksYeBUSFN-KKTPk0qT0FMq9BCl8Zr9ZQJ250DTObt_UN28FhL746q-0VlKsnsZ3KyL5dfYmtJrUK_F969e7TJXJj1YBTcJox00760mODE4HO-BflFFVli_Xg9UwYx2PQsOPUL-eRan37FV6lnYWq_5yzCdxIx5qiZD-zhITTPMIXsuPSkVQ6MqwNondTN-6bZsIsJVil6Rfoa6wMS7DP-LtfW57AfZxDGJR2smw"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-xs">
              <span className="font-inter text-meta-data text-primary font-bold uppercase tracking-tighter">Design</span>
              <h3 className="font-article-title-mobile text-article-title-mobile text-on-surface group-hover:text-primary transition-colors cursor-pointer">Urban Paradigms: Building for Community</h3>
              <p className="font-body-main text-sm text-on-surface-variant line-clamp-2">How architecture is evolving to foster human connection in the world's most densely populated cities.</p>
              <span className="font-inter text-meta-data text-outline mt-xs">12 min read &bull; by Arthur Wright</span>
            </div>
          </article>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col items-center text-center gap-md">
          <span className="material-symbols-outlined text-primary text-5xl">mail_outline</span>
          <div className="max-w-xl flex flex-col gap-xs">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">Stay Ahead of the Curve</h2>
            <p className="font-body-main text-on-surface-variant">
              Join 50,000+ thinkers and designers who receive our weekly curation of deep-focus articles, design inspiration, and technological insights.
            </p>
          </div>
          <form className="flex flex-col md:flex-row gap-xs w-full max-w-lg mt-sm">
            <input
              className="flex-grow px-md py-3 rounded-lg border border-outline-variant bg-surface-container-low font-inter focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Enter your email address"
              type="email"
            />
            <button
              className="px-xl py-3 bg-primary text-on-primary font-ui-button text-ui-button rounded-lg hover:opacity-90 transition-all cursor-pointer active:scale-95"
              type="submit"
            >
              Subscribe Now
            </button>
          </form>
          <p className="font-meta-data text-meta-data text-outline">No spam. Ever. Unsubscribe at any time.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
