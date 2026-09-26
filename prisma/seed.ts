import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@macwealthfreestore.com" },
    update: {
      name: "Admin",
      hashedPassword: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
    },
    create: {
      name: "Admin",
      email: "admin@macwealthfreestore.com",
      hashedPassword: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
    },
  });

  const authors = await Promise.all([
    prisma.user.upsert({
      where: { email: "elena@macwealthfreestore.com" },
      update: {},
      create: { name: "Elena Thorne", email: "elena@macwealthfreestore.com", hashedPassword: await bcrypt.hash("author123", 10), role: "AUTHOR" },
    }),
    prisma.user.upsert({
      where: { email: "marcus@macwealthfreestore.com" },
      update: {},
      create: { name: "Marcus Thorne", email: "marcus@macwealthfreestore.com", hashedPassword: await bcrypt.hash("author123", 10), role: "AUTHOR" },
    }),
    prisma.user.upsert({
      where: { email: "sarah@macwealthfreestore.com" },
      update: {},
      create: { name: "Sarah Jenkins", email: "sarah@macwealthfreestore.com", hashedPassword: await bcrypt.hash("author123", 10), role: "AUTHOR" },
    }),
  ]);

  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: "ai-machine-learning" }, update: { postCount: 124 }, create: { name: "AI & Machine Learning", slug: "ai-machine-learning", description: "Understanding the algorithms shaping our tomorrow.", postCount: 124, icon: "psychology" } }),
    prisma.category.upsert({ where: { slug: "design-systems" }, update: { postCount: 86 }, create: { name: "Design Systems", slug: "design-systems", description: "The principles and patterns behind great interfaces.", postCount: 86, icon: "architecture" } }),
    prisma.category.upsert({ where: { slug: "technology" }, update: { postCount: 92 }, create: { name: "Technology", slug: "technology", description: "The hardware and software revolution.", postCount: 92, icon: "terminal" } }),
    prisma.category.upsert({ where: { slug: "modern-lifestyle" }, update: { postCount: 64 }, create: { name: "Modern Lifestyle", slug: "modern-lifestyle", description: "Living with intention in a digital age.", postCount: 64, icon: "self_improvement" } }),
    prisma.category.upsert({ where: { slug: "global-economy" }, update: { postCount: 42 }, create: { name: "Global Economy", slug: "global-economy", description: "Data-driven insights into world markets.", postCount: 42, icon: "trending_up" } }),
    prisma.category.upsert({ where: { slug: "philosophy-ethics" }, update: { postCount: 31 }, create: { name: "Philosophy & Ethics", slug: "philosophy-ethics", description: "Navigating the moral landscape of the 21st century.", postCount: 31, icon: "account_balance" } }),
    prisma.category.upsert({ where: { slug: "future-of-work" }, update: { postCount: 55 }, create: { name: "Future of Work", slug: "future-of-work", description: "Remote trends, automation, and the modern career.", postCount: 55, icon: "work" } }),
  ]);

  const posts = [
    {
      title: "The Silent Revolution: How Generative Design is Reshaping Our Cities",
      slug: "silent-revolution-generative-design",
      featuredImage: "/images/hero-illustration.jpg",
      content: "Architecture has always been a conversation between the human imagination and the physical constraints of our world. For centuries, this dialogue was limited by the manual tools at our disposal—the compass, the ruler, and eventually, the CAD software that mirrored these physical objects in a digital space. But today, a new voice has entered the room.\n\nGenerative design is not just a tool; it is a collaborative partner that explores millions of iterations in the time it takes an architect to sketch a single floor plan.\n\nUnlike traditional modeling, where an architect defines the geometry, generative design allows the architect to define the goals. By inputting parameters such as solar exposure, wind patterns, material weight, and urban density, we can task algorithms with finding the most efficient and sustainable solutions.\n\n\"We are no longer just building structures; we are growing ecosystems that respond to their environment in real-time.\"\n\nConsider the case of the new 'Veridian District' in Copenhagen. Here, generative models were used to ensure that every single apartment received at least four hours of direct sunlight during the winter months, while simultaneously creating a wind-breaking effect for the central courtyard.\n\nThe future of our cities is not one of cold, calculated steel, but of intelligent, adaptive environments that breathe with the people who inhabit them.",
      excerpt: "How algorithms and parametric intelligence are becoming collaborative partners in modern urban architecture.",
      authorId: authors[0].id,
      categoryId: categories[2].id,
      status: "PUBLISHED" as const,
      viewCount: 48500,
    },
    {
      title: "Generative AI: The New Creative Partner",
      slug: "generative-ai-new-creative-partner",
      featuredImage: "/images/ai-creative.jpg",
      content: "How artists and writers are using large language models to augment their creative process without losing their voice.\n\nArtists around the world are discovering that AI isn't replacing creativity—it's amplifying it. From synthetic visual art to assisted narrative construction, modern tools offer unexpected creative detours that expand human imagination.\n\nThe key is treating AI as a mirror and a sparring partner, rather than an automated producer.",
      excerpt: "How artists and writers are using large models to augment their creative process without losing their human voice.",
      authorId: authors[1].id,
      categoryId: categories[0].id,
      status: "PUBLISHED" as const,
      viewCount: 42500,
    },
    {
      title: "Deep Work: Why Silence is the Ultimate Luxury",
      slug: "deep-work-silence-ultimate-luxury",
      featuredImage: "/images/deep-focus.jpg",
      content: "Rediscovering the power of focused attention in an age of constant digital distraction and notification overload.\n\nIn an attention economy designed to fragment human awareness, deep contemplation has become the rarest and most valuable cognitive commodity.\n\nTo think clearly is to create space where incoming stimuli cannot reach you.",
      excerpt: "Rediscovering the immense power of focused contemplation in an age of notification overload.",
      authorId: authors[2].id,
      categoryId: categories[3].id,
      status: "PUBLISHED" as const,
      viewCount: 39100,
    },
    {
      title: "Craftsmanship in the Age of Scale",
      slug: "craftsmanship-in-the-age-of-scale",
      featuredImage: "/images/hero-illustration.jpg",
      content: "Why physical objects and mechanical precision still matter in an increasingly ethereal, cloud-based world.\n\nIn a world of ephemeral software and throwaway devices, the deliberate hand-crafted artifact commands profound respect.",
      excerpt: "Why physical objects and mechanical precision still matter in an ethereal world.",
      authorId: authors[1].id,
      categoryId: categories[1].id,
      status: "PUBLISHED" as const,
      viewCount: 28000,
    },
    {
      title: "The Invisible Architect: How AI Reshapes Human Agency",
      slug: "invisible-architect-ai-reshapes-agency",
      featuredImage: "/images/ai-creative.jpg",
      content: "An exploration of the subtle ways generative models are beginning to influence our daily decision-making processes.\n\nFrom automated recommendation filters to predictive workflows, algorithmic suggestions gradually steer user preferences.",
      excerpt: "An exploration of the subtle ways generative models influence our everyday decision-making.",
      authorId: authors[0].id,
      categoryId: categories[0].id,
      status: "PUBLISHED" as const,
      viewCount: 24300,
    },
    {
      title: "Quantum Computing: A Decadal Forecast",
      slug: "quantum-computing-decadal-forecast",
      featuredImage: "/images/hero-illustration.jpg",
      content: "Understanding the roadmap to quantum advantage and what it means for cryptography, medicine, and climate modeling.",
      excerpt: "The realistic roadmap to quantum advantage and its near-term commercial implications.",
      authorId: authors[2].id,
      categoryId: categories[2].id,
      status: "PUBLISHED" as const,
      viewCount: 18200,
    },
    {
      title: "The Psychology of Deep Work",
      slug: "psychology-of-deep-work",
      featuredImage: "/images/deep-focus.jpg",
      content: "Understanding the neurological pathways that enable peak cognitive performance and sustained flow states.",
      excerpt: "Understanding the neurological pathways that enable peak cognitive performance.",
      authorId: authors[2].id,
      categoryId: categories[5].id,
      status: "PUBLISHED" as const,
      viewCount: 16800,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        featuredImage: post.featuredImage,
        content: post.content,
        excerpt: post.excerpt,
        viewCount: post.viewCount,
      },
      create: {
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        featuredImage: post.featuredImage,
        authorId: post.authorId,
        categoryId: post.categoryId,
        status: post.status,
        viewCount: post.viewCount,
        publishedAt: new Date(),
      },
    });
  }

  // Update Settings
  await prisma.setting.upsert({
    where: { key: "blogName" },
    update: { value: "Macwealth FreeStore" },
    create: { key: "blogName", value: "Macwealth FreeStore" },
  });

  console.log("Seeding complete with custom illustrations and Macwealth FreeStore branding!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
