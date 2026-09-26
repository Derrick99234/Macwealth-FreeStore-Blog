import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@macwealthfreestore.com" },
    update: {
      name: "Dr. Isaiah Macwealth",
      role: "ADMIN",
    },
    create: {
      name: "Dr. Isaiah Macwealth",
      email: "admin@macwealthfreestore.com",
      hashedPassword: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
    },
  });

  const categoryDefs = [
    {
      name: "Wealth & Stewardship",
      slug: "wealth-stewardship",
      description: "Biblical and practical wisdom for financial growth, investing, and resource stewardship.",
      icon: "account_balance_wallet",
    },
    {
      name: "Spiritual Growth",
      slug: "spiritual-growth",
      description: "Deepening your walk with God, quiet time, prayer alignment, and divine favor.",
      icon: "auto_awesome",
    },
    {
      name: "Mindset & Success",
      slug: "mindset-success",
      description: "Renewing your mind, overcoming fear, and building mental discipline for excellence.",
      icon: "psychology",
    },
    {
      name: "Vision & Purpose",
      slug: "vision-purpose",
      description: "Seeing what God sees, dreaming boldly, and walking toward your destiny.",
      icon: "lightbulb",
    },
    {
      name: "Discipline & Order",
      slug: "discipline-order",
      description: "Establishing divine order, decisive living, and building systems for the next level.",
      icon: "military_tech",
    },
  ];

  const categoryMap: Record<string, any> = {};
  for (const def of categoryDefs) {
    const cat = await prisma.category.upsert({
      where: { slug: def.slug },
      update: {
        name: def.name,
        description: def.description,
        icon: def.icon,
      },
      create: {
        name: def.name,
        slug: def.slug,
        description: def.description,
        icon: def.icon,
        postCount: 0,
      },
    });
    categoryMap[def.slug] = cat;
  }

  const SUPABASE_BASE = "https://gmmbxzqgjjecvjmodaag.supabase.co/storage/v1/object/public/blog_image";
  const images = {
    moneyHabits: `${SUPABASE_BASE}/7-money-habits-editorial.jpg`,
    quietTime: `${SUPABASE_BASE}/deepening-quiet-time-editorial.jpg`,
    dreams2025: `${SUPABASE_BASE}/harnessing-dreams-2025-editorial.jpg`,
    settingOrder: `${SUPABASE_BASE}/setting-order-next-level-editorial.jpg`,
    yesRealm: `${SUPABASE_BASE}/the-yes-realm-editorial.jpg`,
    tradingIncrease: `${SUPABASE_BASE}/trading-wisely-increase-editorial.jpg`,
    trainingMind: `${SUPABASE_BASE}/training-mind-success-editorial.jpg`,
  };

  const posts = [
    {
      title: "7 Money Habits: Building Habits That Produce Financial Growth",
      slug: "7-money-habits-financial-growth",
      featuredImage: images.moneyHabits,
      categoryId: categoryMap["wealth-stewardship"].id,
      authorId: admin.id,
      status: "PUBLISHED" as const,
      viewCount: 0,
      excerpt: "Your life is largely shaped by what you repeatedly do. Discover practical wisdom for building habits that support financial growth and long-term stewardship.",
      seoDescription: "Learn the 7 money and wisdom habits that produce financial growth, intentional stewardship, and sustainable prosperity.",
      tags: "Wealth, Stewardship, Financial Growth, Wisdom, Habits",
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      content: `
<p>Your life is largely shaped by what you repeatedly do.</p>
<p>A habit is an unconscious, routine behaviour that develops through repetition. What we repeatedly do eventually becomes easier, more automatic, and part of the way we live. This is why our habits deserve careful attention—they can either support the life we desire or work against it.</p>

<h2>Your Habits Are Building Your Life</h2>
<p>Many people focus on their efforts while overlooking their habits. But consistent habits can have a greater influence on our everyday results than occasional bursts of effort.</p>
<p>For example, if a person consistently arrives late, fails to respond on time, does not save, does not plan, and struggles to keep their word, these behaviours can eventually create patterns that make success more difficult.</p>
<p>On the other hand, habits such as gratitude, dependability, responsiveness, keeping your word, planning, and learning can become part of your normal way of living.</p>
<p>The important question is not only, <em>“What am I trying to achieve?”</em> It is also: <strong>“What habits are producing the life I currently have?”</strong></p>
<p>Before rushing to look for another solution, it is worth examining what has become routine in your life.</p>

<h2>Wisdom Must Be Put to Work</h2>
<p>There is an essential relationship between wisdom and financial resources.</p>
<blockquote><p>“Wisdom is good with an inheritance: and by it there is profit to them that see the sun.” &mdash; Ecclesiastes 7:11</p></blockquote>
<p>Wisdom should not remain merely as passive knowledge; it should be applied in ways that produce tangible results. Having knowledge without developing the capacity to apply it can severely limit its impact.</p>
<p>This means that financial growth requires more than simply knowing what to do. It requires developing habits that help you manage, apply, and multiply what you have.</p>

<h2>Stop Working Only With Strength</h2>
<p>One of the key lessons is the difference between working merely with physical strength and working with wisdom. Sometimes, the answer is not simply to work harder. It may be to stop, think, plan, and find a wiser way to approach the task.</p>
<p>This is what it means to become a <strong>“mind executioner”</strong>—someone who thinks ahead and prepares before the moment arrives. Instead of waiting until a problem appears before responding, think ahead:</p>
<ul>
  <li>What will I need?</li>
  <li>What could go wrong?</li>
  <li>What should I prepare now?</li>
  <li>How can I do this more effectively?</li>
</ul>
<p>Wisdom allows you to prepare before the moment of execution.</p>

<h2>Pay Attention to Your Money</h2>
<p>Financial growth requires constant awareness. You need to know what is happening with your money, how you are using it, and what habits are influencing your financial situation.</p>
<p>It is difficult to improve something you consistently ignore. Therefore, developing healthy money habits requires intentionality. Pay attention. Plan. Learn. Think ahead. Look for ways to put your knowledge and ideas to work.</p>
<p>The goal is not simply to desire financial increase, but to develop habits that support it.</p>

<h2>Build Habits That Support Your Future</h2>
<p>Your financial future is not only determined by how much money you earn. The way you think, plan, spend, save, learn, and respond to opportunities also matters.</p>
<p>Small habits repeated consistently become powerful patterns over time. So, examine your routines:</p>
<ul>
  <li>What are you doing repeatedly?</li>
  <li>What financial habits are helping you?</li>
  <li>Which ones need to change?</li>
  <li>What wisdom do you already have that you are not applying?</li>
  <li>What new habits do you need to develop for the next level?</li>
</ul>
<p>Financial growth begins with intentionality. Do not only pray for a different result. Examine the habits that are producing your current results and begin building better ones.</p>

<h2>Listen to the Full Message</h2>
<p>There is much more to learn from the full teaching on developing <strong>7 Wisdom Habits and 7 Money Habits</strong> and understanding how intentional habits can help you approach money and success differently.</p>
<p>Listen to the full message, <em>“7 Money Habits,”</em> and discover practical wisdom for building habits that support your growth and financial future.</p>
<p><a href="https://macwealthfreestore.com" target="_blank" rel="noopener noreferrer" class="text-indigo-400 font-semibold underline">👉 Listen to the full message on Macwealth FreeStore</a></p>
<p><em>Your habits are shaping your life. Start building the ones that will support where you are going.</em></p>
      `.trim(),
    },
    {
      title: "Deepening Your Quiet Time: Preparing Yourself for the Next Level",
      slug: "deepening-your-quiet-time",
      featuredImage: images.quietTime,
      categoryId: categoryMap["spiritual-growth"].id,
      authorId: admin.id,
      status: "PUBLISHED" as const,
      viewCount: 0,
      excerpt: "Quiet time is a deliberate period of stillness and learning—an opportunity to withdraw from distractions and give attention to what God is preparing you for.",
      seoDescription: "Discover how deepening your quiet time creates the spiritual stillness, capacity, and learning required for your next level of growth.",
      tags: "Quiet Time, Spiritual Growth, Prayer, Meditation, Capacity",
      publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      content: `
<p>As we prepare for a new season, one of the most important things we can do is intentionally create time to become still, think, learn, and grow.</p>
<p>Quiet time is often associated with prayer, Bible reading, or morning devotion. While these can be part of it, quiet time is much broader. It is a deliberate period of stillness and learning—an opportunity to withdraw from distractions and give attention to what is happening within you and what God is preparing you for.</p>

<h2>Your Thoughts Matter</h2>
<p>The condition of your thoughts has a significant effect on the way you live.</p>
<blockquote><p>“For as he thinketh in his heart, so is he.” &mdash; Proverbs 23:7</p></blockquote>
<p>Our thoughts influence our mindset, our actions, and eventually our character. This means that what constantly occupies your mind matters. Thoughts of fear, anxiety, anger, bitterness, regret, envy, and constant worry can drain your inner strength. On the other hand, learning, meditation, reflection, prayer, and meaningful study can increase your capacity.</p>
<p>This is why we must learn to pay attention to our thoughts and deliberately choose what we allow to occupy our minds.</p>

<h2>Quiet Time Is More Than Prayer</h2>
<p>One of the common misconceptions about quiet time is that it is simply prayer time. It is not limited to prayer.</p>
<p>Quiet time can include meditation, reading, praying, worshipping, resting, studying, listening, learning, and analyzing. Stillness comes first. When the mind is constantly distracted and reacting to everything around it, it becomes difficult to think deeply or learn effectively.</p>
<p>Stillness creates room for you to process, reflect, listen, and receive. Your devotional time may become part of your quiet time, but quiet time is not restricted to devotion.</p>

<h2>Learning Increases Your Capacity</h2>
<p>Growth requires learning. Learning does not only happen in a classroom; you can learn through books, conversations, work, observation, study, challenges, and experiences.</p>
<p>Every time you learn something you did not know before, you increase your capacity. This is why you should not be afraid of challenges. A difficult assignment may introduce you to a skill you have never developed. A new responsibility may require you to think at a higher level. A new season may demand that you become more knowledgeable and prepared.</p>
<p>Instead of always asking, <em>“How can I avoid this challenge?”</em> ask, <strong>“What can this challenge teach me?”</strong></p>

<h2>Expose Your Mind to Where You Are Going</h2>
<p>If you want to increase your capacity, you must expose yourself to new ideas and higher levels of thinking. Read books. Listen to teachings. Study people who are doing what you desire to do. Observe systems and ideas outside your immediate environment.</p>
<p>Exposure gives your mind something to work with. When you continually expose yourself to new information, your thinking expands and new possibilities become available to you.</p>
<p>This is especially important when preparing for a new year or a new season. Do not only think about what you want to achieve. Think about who you need to become and what you need to learn to achieve it.</p>

<h2>Create Time for Stillness</h2>
<p>Quiet time does not have to happen only in the morning or beside your bed. You can create it:</p>
<ul>
  <li>Early in the morning</li>
  <li>Before going to bed</li>
  <li>During your lunch break</li>
  <li>In the middle of the night</li>
  <li>During a full day of separation</li>
  <li>During a personal retreat</li>
  <li>While commuting</li>
</ul>
<p>Even time spent travelling can become an opportunity to listen to teachings, audiobooks, or other useful materials instead of allowing those hours to simply pass. The key is intentionality. You have to create time for the things that will build you.</p>

<h2>Prepare for What Is Ahead</h2>
<p>As you look toward the next season, do not spend all your energy reacting to what is happening around you. Take time to ask yourself:</p>
<ul>
  <li>What is ahead of me?</li>
  <li>What do I need to learn?</li>
  <li>What skills do I need to develop?</li>
  <li>What capacity do I need to build?</li>
  <li>How am I preparing for what I am praying for?</li>
</ul>
<p>Quiet time gives you the space to think through these questions. It allows you to step away from the noise, examine your thoughts, strengthen your understanding, and prepare yourself for what lies ahead.</p>
<p>Your next level will require a greater capacity than your current level. Therefore, make room to grow.</p>

<h2>Listen to the Full Message</h2>
<p>There is much more to discover about developing your quiet time, strengthening your thought life, increasing your capacity, and preparing yourself for the next season.</p>
<p>🎧 Listen to the full message, <em>“Strategy for Deepening Quiet Time for 2025,”</em> by Prophet Isaiah Macwealth and learn how to intentionally create time for stillness, learning, reflection, and growth.</p>
<p><a href="https://macwealthfreestore.com/music/track/prophet_isaiah_macwealth-early_strategy_to_win_in_2025-strategy_for_deepening_quiet_time_for_2025" target="_blank" rel="noopener noreferrer" class="text-indigo-400 font-semibold underline">👉 Listen to “Strategy for Deepening Quiet Time for 2025” on Macwealth FreeStore</a></p>
<p><em>Don’t just prepare for a new season—prepare yourself for it.</em></p>
      `.trim(),
    },
    {
      title: "Harnessing Your Dreams for 2025",
      slug: "harnessing-your-dreams-2025",
      featuredImage: images.dreams2025,
      categoryId: categoryMap["vision-purpose"].id,
      authorId: admin.id,
      status: "PUBLISHED" as const,
      viewCount: 0,
      excerpt: "Every new season presents an opportunity to grow, but growth requires vision followed by movement. Discover how to dream big and walk toward your vision.",
      seoDescription: "Step into your next season with clarity and purpose. Learn how to dream with vision, take decisive action, and steward your God-given goals.",
      tags: "Vision, Dreams, Purpose, Action, Growth, 2025",
      publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      content: `
<p>Every new season presents an opportunity to grow, but growth does not happen simply because the calendar changes. If you want different results, you must be willing to do things differently.</p>
<p>One of the first steps is to <strong>dream again</strong>.</p>
<p>As a child of God, you should have a vision for your life. What are you expecting God to do? What do you desire to accomplish? What do you see yourself becoming?</p>

<h2>The Power of Divine Vision</h2>
<p>The Bible tells us in Genesis 13:14–15 that God spoke clearly to Abraham about lifting his perspective:</p>
<blockquote><p>“Lift up now thine eyes, and look from the place where thou art northward, and southward, and eastward, and westward: For all the land which thou seest, to thee will I give it, and to thy seed for ever.” &mdash; Genesis 13:14–15</p></blockquote>
<p>This shows us the fundamental importance of vision. You must be able to see it before you can walk towards it.</p>

<h2>Dreaming Is Not Enough: You Must Move</h2>
<p>Dreaming alone is not enough. You must take action. If you want greater results, improve what you are already doing. Work harder. Deliver better. Communicate more effectively. Become more innovative. Instead of constantly looking for something new, learn to maximize what is already in your hands.</p>
<p><strong>Your dream should produce movement.</strong></p>
<p>God told Abraham not only to look at the land but to walk through it. In the same way, don't just admire the future you desire—prepare for it. Develop the skills you need. Make the necessary changes. Take the steps that move you closer to your vision.</p>

<h2>Steward What You Receive</h2>
<p>Another crucial lesson is the need to steward what you receive. It is not enough to pray for increase; you must learn how to manage and multiply what comes into your hands.</p>
<p>As you move into this season, ask yourself:</p>
<ul>
  <li>What am I seeing?</li>
  <li>What am I expecting?</li>
  <li>What must I do differently?</li>
  <li>What can I improve?</li>
  <li>What am I building?</li>
</ul>
<p>Don't be afraid to dream. Dream big. Expect more. Prepare well. Work diligently. Walk toward your vision.</p>

<h2>Listen to the Full Message</h2>
<p>Want to go deeper into this message?</p>
<p>Listen to <em>“Harnessing Your Dreams for 2025”</em> by Prophet Isaiah Macwealth and discover more insights on developing your vision, embracing growth, and moving toward the things God has placed in your heart.</p>
<p><a href="https://macwealthfreestore.com/music/album/prophet_isaiah_macwealth-harnessing_your_dreams_for_2025" target="_blank" rel="noopener noreferrer" class="text-indigo-400 font-semibold underline">👉 Listen to “Harnessing Your Dreams for 2025” Album on Macwealth FreeStore</a></p>
<p><em>Don't just dream about your next level. Prepare for it. Walk toward it. And possess it.</em></p>
      `.trim(),
    },
    {
      title: "Setting the Order for Your Next Level",
      slug: "setting-the-order-for-your-next-level",
      featuredImage: images.settingOrder,
      categoryId: categoryMap["discipline-order"].id,
      authorId: admin.id,
      status: "PUBLISHED" as const,
      viewCount: 0,
      excerpt: "Every new level requires a new order. Discover the power of decisiveness, discipline, and aligning your lifestyle with the truth of God’s Word.",
      seoDescription: "Your next level requires you to make clear decisions and remain faithful to them. Learn how to set divine order in your habits, systems, and thoughts.",
      tags: "Discipline, Order, Next Level, Decision Making, Systems",
      publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      content: `
<p>Every new level requires a new order.</p>

<h2>Standing by Your Decisions</h2>
<p>In Matthew 5:37, Jesus said:</p>
<blockquote><p>“Let your communication be, Yea, yea; Nay, nay: for whatsoever is more than these cometh of evil.” &mdash; Matthew 5:37</p></blockquote>
<p>This teaches us the crucial importance of standing firmly by our decisions. It is not enough to say what we intend to do; we must possess the discipline to follow through.</p>
<p>Many people spend more time declaring what they will do than actually doing it. We say, <em>“I will pray more,”</em> <em>“I will change,”</em> <em>“I will stop this habit,”</em> or <em>“I will pursue this goal.”</em> But the real test comes when it is time to act.</p>

<h2>Saying Yes and Saying No</h2>
<p>Your next level requires you to make clear decisions and remain faithful to them:</p>
<ul>
  <li>Say <strong>no</strong> to the pleasures and distractions you must leave behind.</li>
  <li>Say <strong>yes</strong> to the discipline, knowledge, instructions, and work required for your growth.</li>
  <li>Say <strong>no</strong> to fear, unhealthy relationships, weaknesses, and lies that keep you tied to old patterns.</li>
</ul>

<h2>Upgrading Broken Systems</h2>
<p>You must also be willing to change systems that are not producing the results you desire. If the same routine continually makes you late, change it. If your approach to saving money is not working, change it. If a method has produced poor results for years, it is time to find a better way.</p>
<p>Most importantly, allow God's Word to reshape your thinking. <em>“Thy word is truth.”</em> Old thoughts and beliefs can pull us back into old experiences, but when we replace them with the truth of God's Word, we begin to develop a new mindset for a new season.</p>
<p>Your next level will require more than desire. It will require discipline, obedience, consistency, and action.</p>
<p>So ask yourself: <strong>What must I say yes to? What must I say no to? What needs to change?</strong></p>
<p>Set your life in order, stay true to your decisions, and take the steps required for the next level.</p>

<h2>Listen to the Full Message</h2>
<p>🎧 Listen to <em>“Setting the Orders for Your Next Level”</em> by Dr. Isaiah Macwealth and gain strategic spiritual insight on ordering your life for elevated impact.</p>
<p><a href="https://macwealthfreestore.com" target="_blank" rel="noopener noreferrer" class="text-indigo-400 font-semibold underline">👉 Listen Now on Macwealth FreeStore</a></p>
      `.trim(),
    },
    {
      title: "The Yes Realm: Understanding God’s Yes",
      slug: "the-yes-realm",
      featuredImage: images.yesRealm,
      categoryId: categoryMap["spiritual-growth"].id,
      authorId: admin.id,
      status: "PUBLISHED" as const,
      viewCount: 0,
      excerpt: "God’s answer to His children is yes. Understand how deeply the Father loves you, and how His answers align with His eternal goodness and divine timing.",
      seoDescription: "Enter the Yes Realm: Understanding God's unconditional love, the power of prayer alignment, and how God answers our deepest petitions.",
      tags: "Faith, Prayer, God's Love, Yes Realm, Divine Favor, Promises",
      publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      content: `
<p>God’s answer to His children is yes. This begins with understanding how deeply and personally God loves you. You are not an accident or a product of chance. God thought about you, planned you, and formed you out of His love.</p>
<p>Jesus made this abundantly clear in John 16:26–27:</p>
<blockquote><p>“At that day ye shall ask in my name: and I say not unto you, that I will pray the Father for you: For the Father himself loveth you, because ye have loved me, and have believed that I came out from God.” &mdash; John 16:26–27</p></blockquote>
<p>You do not need an intermediary title or worldly status for God to hear you. Your relationship with Him is not based on status, but on your walk with Him.</p>

<h2>God Knows What You Need</h2>
<p>Isaiah 65:23–24 shows us that God knows what His children need even before they call:</p>
<blockquote><p>“And it shall come to pass, that before they call, I will answer; and while they are yet speaking, I will hear.” &mdash; Isaiah 65:24</p></blockquote>
<p>Prayer is not about informing God of something He does not know. Prayer brings our hearts into alignment, gives us spiritual strength, and helps us receive what we are asking for. God already knows our desires and understands our thoughts.</p>
<p>This is why Psalm 139 is so powerful. God does not only hear our spoken words; He understands the innermost thoughts and intents of our hearts.</p>

<h2>God’s Yes May Look Different</h2>
<p>One of the vital lessons in this teaching is that God’s “yes” does not always look like an immediate or predictable answer.</p>
<p>Consider the illustration of a child asking to swim in a pool. If it is late, dark, or cold, the father may say, <em>“You will swim tomorrow.”</em> That may look like a “no” to the child because they cannot swim at that exact moment, but it is actually a <strong>yes with a promise and a different timing</strong>.</p>
<p>Sometimes God’s answer is not “no”; it is <em>“yes, but not now,”</em> <em>“yes, but not here,”</em> or <em>“yes, but not this way.”</em> His love causes Him to consider what is truly right and beneficial for us.</p>

<h2>God’s Promises Are Yes and Amen</h2>
<blockquote><p>“For all the promises of God in him are yea, and in him Amen, unto the glory of God by us.” &mdash; 2 Corinthians 1:20</p></blockquote>
<p>God’s character is consistent, and His goodness never wavers. James 1 also reminds us that every good and perfect gift comes from above, from the Father of lights, with whom is no variableness neither shadow of turning.</p>
<p>So when an answer seems delayed or different from what you expected, do not immediately interpret it as rejection. God may be answering the deeper desire behind your request.</p>

<h2>Live With the Consciousness That You Are Loved</h2>
<p>The central message is simple but life-changing: <strong>the Father Himself loves you</strong>.</p>
<p>He knows you more deeply than your earthly parents, friends, leaders, or anyone else. You can come to Him confidently in the name of Jesus, knowing that you are personally cherished by the Father.</p>
<p>When you understand this, your relationship with God transforms. You begin to pray from confidence rather than fear, trust rather than anxiety, and the serene assurance that God knows you and cares about what concerns you.</p>

<h2>Listen to the Full Message</h2>
<p>Go deeper into this powerful teaching, <em>“The Yes Realm,”</em> and discover more about God’s love, His promises, and how to understand His answers.</p>
<p><a href="https://macwealthfreestore.com/music/album/prophet_isaiah_macwealth-the_yes_realm" target="_blank" rel="noopener noreferrer" class="text-indigo-400 font-semibold underline">👉 Listen to “The Yes Realm” Album on Macwealth FreeStore</a></p>
      `.trim(),
    },
    {
      title: "Trading Wisely for Increase",
      slug: "trading-wisely-for-increase",
      featuredImage: images.tradingIncrease,
      categoryId: categoryMap["wealth-stewardship"].id,
      authorId: admin.id,
      status: "PUBLISHED" as const,
      viewCount: 0,
      excerpt: "God has given every one of us valuable gifts, skills, and opportunities. The question is: what are you doing with what is in your hands?",
      seoDescription: "Discover practical and spiritual keys for trading wisely, stewarding resources, investing in yourself, and experiencing sustained financial increase.",
      tags: "Stewardship, Increase, Investment, Wisdom, Wealth, Growth",
      publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      content: `
<p>God has given every one of us something valuable—gifts, skills, knowledge, opportunities, and abilities. The question is not only what God has given you, but what you are doing with it.</p>
<blockquote><p>“And dwell with us: and the land shall be before you; dwell and trade ye therein, and get you possessions therein.” &mdash; Genesis 34:10</p></blockquote>
<p>This reminds us that our work should produce value and that we should learn to build from what is already in our hands.</p>

<h2>Start Where You Are</h2>
<p>Growth does not happen all at once. It happens level by level.</p>
<p>Sometimes, we think investment must immediately mean buying acres of land, owning a large commercial property, or having vast sums of capital. But your next investment may simply be a better laptop for your work, a more suitable workspace, useful tools, savings, or a course that improves your skills.</p>
<p>The important thing is to recognize what you need at your current level.</p>
<p>Don't compare your journey with someone else's. Build according to your capacity, and allow each level to faithfully prepare you for the next.</p>

<h2>Value What You Have</h2>
<p>Stewardship begins with the little things. Take care of your clothes, shoes, gadgets, furniture, and everyday tools. When you learn to properly manage what you already have, you develop the spiritual and practical discipline to handle more.</p>
<p>Don't despise small beginnings. What looks small today can become the foundation for something extraordinary tomorrow.</p>

<h2>Invest in Yourself</h2>
<p>Beyond material possessions, one of the greatest investments you can ever make is in yourself.</p>
<p>Invest in knowledge. Develop your skills. Read books. Take courses. Learn from seasoned mentors. Seek experiences that expand your mind and increase your capacity.</p>
<p>Investing in yourself builds durable capacity, because what you develop within your mind and character continues to produce value wherever you go.</p>
<p>So, instead of constantly asking, <em>“What should I buy next?”</em>, ask yourself:</p>
<blockquote><p><strong>“What do I need to build next?”</strong></p></blockquote>
<p>Know your level. Steward what you have. Invest wisely. Keep growing.</p>
<p>Your next level may not require you to have everything—it may simply require you to make better, wiser use of what you already have.</p>

<h2>Go Deeper</h2>
<p>Want to learn more about building wisely, managing what you have, and growing from one level to another?</p>
<p>Listen to <em>“Trading Wisely for Increase”</em> by Prophet Isaiah Macwealth for the complete, transformational teaching.</p>
<p><a href="https://macwealthfreestore.com/music/album/19-02-2025-trading-wisely-for-increase" target="_blank" rel="noopener noreferrer" class="text-indigo-400 font-semibold underline">👉 Listen to “Trading Wisely for Increase” on Macwealth FreeStore</a></p>
      `.trim(),
    },
    {
      title: "Training Your Mind for Success",
      slug: "training-your-mind-for-success",
      featuredImage: images.trainingMind,
      categoryId: categoryMap["mindset-success"].id,
      authorId: admin.id,
      status: "PUBLISHED" as const,
      viewCount: 0,
      excerpt: "Success begins with the mind. Having a recreated spirit is foundational, but your mind must be renewed daily to produce good success.",
      seoDescription: "Train your mind for success through biblical renewal, overcoming fear, and setting your thoughts on higher things. Principles from Dr. Isaiah Macwealth.",
      tags: "Mindset, Success, Mental Discipline, Romans 12, Transformation",
      publishedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      content: `
<p>Success begins with the mind.</p>
<blockquote><p>“For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.” &mdash; 2 Timothy 1:7</p></blockquote>
<p>This means that fear does not have to control your decisions, your actions, or your future. God has already given you the spiritual ability to think clearly, act boldly, love genuinely, and excel.</p>

<h2>Spirit Recreated, Mind Renewed</h2>
<p>However, having the right spirit does not automatically mean having the right mindset. Your spirit may be recreated in Christ, but your mind still needs to be actively renewed.</p>
<blockquote><p>“And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.” &mdash; Romans 12:2</p></blockquote>
<p>This is why training your mind is essential for enduring success.</p>
<p>Your mind is shaped by your past experiences, what you have learned, what you have seen, and what you have allowed yourself to believe. If you do not deliberately renew your mind with God's Word, old patterns of doubt and defeat can continue to influence your decisions even after your spiritual life has changed.</p>

<h2>Your Mind Can Be Trained</h2>
<p>The good news is that your mind can be trained.</p>
<blockquote><p>“Set your affection on things above, not on things on the earth.” &mdash; Colossians 3:2</p></blockquote>
<p>You have the God-given ability to set your mind on what matters. You can choose what you focus on, what you meditate on, and what you allow to influence your thinking.</p>
<p>Joshua 1:8 also connects meditation on God's Word with observing and doing what it says, leading to a prosperous way and good success. Success therefore requires more than knowing the Word; it requires training your mind to observe, understand, and act upon it.</p>
<p>Your circumstances may change, but if your thinking remains the same, you will continue producing the same old results.</p>

<h2>Take Charge of Your Thoughts</h2>
<p>So, pay intentional attention to your mind:</p>
<ul>
  <li>What are you thinking about every day?</li>
  <li>What beliefs are shaping your critical decisions?</li>
  <li>What have you allowed to occupy your mental space?</li>
</ul>
<p>Train your mind. Renew it with God's Word. Set it on things above. Develop your capacity to learn, think, observe, and act wisely.</p>
<p>There is more inside you than you may currently see. But what God has placed in you must be expressed through a renewed and trained mind.</p>

<h2>Listen to the Full Message</h2>
<p>🎧 Listen to <em>“The Necessity of Hard Work – Training Your Mind for Success”</em> and discover practical principles for developing a mind that is prepared for victory.</p>
<p><a href="https://macwealthfreestore.com/music/album/prophet_isaiah_macwealth-training_your_mind_for_success" target="_blank" rel="noopener noreferrer" class="text-indigo-400 font-semibold underline">👉 Listen to “Training Your Mind for Success” on Macwealth FreeStore</a></p>
      `.trim(),
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
    console.log(`Seeded post: ${post.title}`);
  }

  for (const cat of Object.values(categoryMap)) {
    const count = await prisma.post.count({ where: { categoryId: cat.id } });
    await prisma.category.update({
      where: { id: cat.id },
      data: { postCount: count },
    });
  }

  console.log("Database seeded successfully with the 7 real blogs!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
