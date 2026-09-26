import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@insighthub.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@insighthub.com",
      hashedPassword: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
    },
  });

  const authors = await Promise.all([
    prisma.user.upsert({
      where: { email: "elena@insighthub.com" },
      update: {},
      create: { name: "Elena Thorne", email: "elena@insighthub.com", hashedPassword: await bcrypt.hash("author123", 10), role: "AUTHOR" },
    }),
    prisma.user.upsert({
      where: { email: "marcus@insighthub.com" },
      update: {},
      create: { name: "Marcus Thorne", email: "marcus@insighthub.com", hashedPassword: await bcrypt.hash("author123", 10), role: "AUTHOR" },
    }),
    prisma.user.upsert({
      where: { email: "sarah@insighthub.com" },
      update: {},
      create: { name: "Sarah Jenkins", email: "sarah@insighthub.com", hashedPassword: await bcrypt.hash("author123", 10), role: "AUTHOR" },
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
    { title: "Generative AI: The New Creative Partner", slug: "generative-ai-new-creative-partner", content: "How artists and writers are using large language models to augment their creative process without losing their voice.\n\nArtists around the world are discovering that AI isn't replacing creativity—it's amplifying it. From DALL-E to Midjourney, the tools are reshaping how we think about artistic expression.", excerpt: "How artists and writers are using large language models to augment their creative process.", authorId: authors[1].id, categoryId: categories[0].id, status: "PUBLISHED" as const, viewCount: 42500 },
    { title: "Craftsmanship in the Age of Scale", slug: "craftsmanship-in-the-age-of-scale", content: "Why physical objects and mechanical precision still matter in an increasingly ethereal, cloud-based world.\n\nIn a world of mass production, the handmade object carries a special kind of magic. This is the story of why craftsmanship persists.", excerpt: "Why physical objects and mechanical precision still matter.", authorId: authors[1].id, categoryId: categories[1].id, status: "PUBLISHED" as const, viewCount: 28000 },
    { title: "The Future of Gastronomy", slug: "future-of-gastronomy", content: "Sustainable practices and molecular techniques that are redefining what it means to dine in the 21st century.\n\nFrom lab-grown meats to AI-designed recipes, the culinary world is undergoing a transformation as profound as any in its history.", excerpt: "Sustainable practices and molecular techniques redefining dining.", authorId: authors[2].id, categoryId: categories[3].id, status: "PUBLISHED" as const, viewCount: 19000 },
    { title: "Urban Paradigms: Building for Community", slug: "urban-paradigms-building-for-community", content: "How architecture is evolving to foster human connection in the world's most densely populated cities.\n\nCities are more than collections of buildings—they're ecosystems of human interaction. The latest architectural thinking puts community at the center.", excerpt: "How architecture is evolving to foster human connection.", authorId: authors[0].id, categoryId: categories[1].id, status: "PUBLISHED" as const, viewCount: 15000 },
    { title: "Quantum Computing: A Decadal Forecast", slug: "quantum-computing-decadal-forecast", content: "Understanding the roadmap to quantum advantage and what it means for cryptography, medicine, and climate modeling.\n\nQuantum computing is often described as being 10 years away—and has been for 30 years. But the landscape is shifting faster than ever.", excerpt: "The roadmap to quantum advantage and its implications.", authorId: authors[2].id, categoryId: categories[2].id, status: "PUBLISHED" as const, viewCount: 14200 },
    { title: "Deep Work: Why Silence is the Ultimate Luxury", slug: "deep-work-silence-ultimate-luxury", content: "Rediscovering the power of focused attention in an age of constant digital distraction and notification overload.\n\nIn a world designed to fragment our attention, the ability to focus deeply has become the new superpower.", excerpt: "Rediscovering focused attention in an age of distraction.", authorId: authors[2].id, categoryId: categories[5].id, status: "PUBLISHED" as const, viewCount: 11000 },
    { title: "The Silent Revolution: How Generative Design is Reshaping Our Cities", slug: "silent-revolution-generative-design", content: "Architecture has always been a conversation between the human imagination and the physical constraints of our world. For centuries, this dialogue was limited by the manual tools at our disposal—the compass, the ruler, and eventually, the CAD software that mirrored these physical objects in a digital space. But today, a new voice has entered the room.\n\nGenerative design is not just a tool; it is a collaborative partner that explores millions of iterations in the time it takes an architect to sketch a single floor plan.\n\nUnlike traditional modeling, where an architect defines the geometry, generative design allows the architect to define the goals. By inputting parameters such as solar exposure, wind patterns, material weight, and urban density, we can task algorithms with finding the most efficient and sustainable solutions.\n\n\"We are no longer just building structures; we are growing ecosystems that respond to their environment in real-time.\"\n\nConsider the case of the new 'Veridian District' in Copenhagen. Here, generative models were used to ensure that every single apartment received at least four hours of direct sunlight during the winter months, while simultaneously creating a wind-breaking effect for the central courtyard.\n\nThe future of our cities is not one of cold, calculated steel, but of intelligent, adaptive environments that breathe with the people who inhabit them.", excerpt: "A deep dive into how algorithms are becoming collaborative partners in architecture.", authorId: authors[0].id, categoryId: categories[2].id, status: "PUBLISHED" as const, viewCount: 9800 },
    { title: "Reimagining Productivity: Beyond the To-Do List", slug: "reimagining-productivity-beyond-todo", content: "Why the most effective systems are the ones that adapt to your cognitive rhythms.\n\nThe traditional to-do list is a relic of an industrial mindset. The future of productivity is personalized, adaptive, and human-centered.", excerpt: "Why the most effective systems adapt to your cognitive rhythms.", authorId: authors[1].id, categoryId: categories[3].id, status: "PUBLISHED" as const, viewCount: 8400 },
    { title: "The Invisible Architect: How AI Reshapes Human Agency", slug: "invisible-architect-ai-reshapes-agency", content: "An exploration of the subtle ways generative models are beginning to influence our daily decision-making processes.\n\nFrom movie recommendations to medical diagnoses, AI is quietly shaping the choices we make every day. This article explores the ethical implications.", excerpt: "How generative models influence our daily decision-making.", authorId: authors[0].id, categoryId: categories[0].id, status: "PUBLISHED" as const, viewCount: 42500 },
    { title: "Sustainable Design in a Circular Economy", slug: "sustainable-design-circular-economy", content: "Why longevity is becoming the most disruptive feature in modern product development.\n\nThe circular economy is not just about recycling—it's about rethinking the entire lifecycle of products from design to disposal.", excerpt: "Why longevity is becoming the most disruptive feature.", authorId: authors[1].id, categoryId: categories[1].id, status: "PUBLISHED" as const, viewCount: 28000 },
    { title: "The Psychology of Deep Work", slug: "psychology-of-deep-work", content: "Understanding the neurological pathways that enable peak cognitive performance.\n\nNeuroscience is revealing what happens in our brains when we enter states of deep concentration—and how we can cultivate more of it.", excerpt: "The neurological pathways that enable peak cognitive performance.", authorId: authors[2].id, categoryId: categories[5].id, status: "PUBLISHED" as const, viewCount: 19000 },
  ];

  for (const post of posts) {
    const existing = await prisma.post.findUnique({ where: { slug: post.slug } });
    if (!existing) {
      await prisma.post.create({
        data: { ...post, publishedAt: new Date() },
      });
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
