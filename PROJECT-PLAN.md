# Full-Stack Execution Plan — InsightHub Blog Platform

## Overview

This plan covers building **InsightHub**, a comprehensive blog management platform, from scratch using **Next.js (App Router) + TypeScript + Tailwind CSS + PostgreSQL**. Based on the Stitch design system "Clarion Perspective," there are **11 screens** split into a **public-facing blog** and a **private admin panel**.

---

## Project Architecture

**Stack:**
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + the Clarion Perspective design tokens (colors, typography, spacing)
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** NextAuth.js (email/password + magic link)
- **File Storage:** Uploadthing or Cloudinary (for featured images, author avatars)
- **Deployment:** Vercel (recommended)

**Project Structure:**
```
/
├── prisma/                    # Schema & migrations
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── (public)/          # Public-facing routes
│   │   │   ├── page.tsx               # Blog Home
│   │   │   ├── popular/page.tsx        # Popular Stories
│   │   │   ├── categories/page.tsx     # Browse Categories
│   │   │   ├── [slug]/page.tsx         # Article Detail
│   │   │   └── about/page.tsx          # About InsightHub
│   │   ├── (admin)/           # Protected admin routes
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx            # Admin Dashboard
│   │   │   │   ├── content/page.tsx    # Content Manager
│   │   │   │   ├── editor/page.tsx     # Post Editor
│   │   │   │   ├── editor/[id]/page.tsx# Edit existing post
│   │   │   │   ├── settings/page.tsx   # Admin Settings
│   │   │   │   ├── subscribers/page.tsx# Newsletter Subscribers
│   │   │   │   └── inquiries/page.tsx  # Contact Inquiries
│   ├── components/
│   │   ├── ui/                # Shared primitives (Button, Input, Card, Badge)
│   │   ├── layout/            # Navbar, Footer, Admin Sidebar
│   │   ├── public/            # Blog-specific components
│   │   └── admin/             # Admin-specific components
│   ├── lib/                   # Utilities, helpers, API client
│   ├── hooks/                 # Custom React hooks
│   └── styles/                # Global CSS + design tokens
```

---

## Phase 1 — Foundation (My Part)

### 1.1 — Project Scaffold
- Initialize Next.js 14 App Router project with TypeScript
- Install & configure Tailwind CSS
- Set up PostgreSQL + Prisma (design the data models)
- Set up folder structure as above

### 1.2 — Implement the Design System ("Clarion Perspective")
- Extract all color tokens, typography scale, spacing, border-radius into a Tailwind config extension
- Create CSS variables and utility classes for the dual-font strategy
- Build shared UI component library:
  - **Button** (Primary / Secondary / Ghost variants)
  - **Input** (with focus ring, rounded, search variant)
  - **Badge** (for status labels, tags, categories)
  - **Card** (with hover elevation, border treatment)
  - **Modal / Popover** (for editor settings)
  - **Table** (for Content Manager)
  - **Pagination** (numbered + prev/next)

### 1.3 — Database Schema (Prisma)
- **User** (id, name, email, hashedPassword, image, role: ADMIN/AUTHOR)
- **Post** (id, title, slug, content, excerpt, featuredImage, status: DRAFT/PUBLISHED, authorId, categoryId, tags, seoDescription, viewCount, createdAt, updatedAt, publishedAt)
- **Category** (id, name, slug, description, image, postCount)
- **Subscriber** (id, email, subscribedAt, status: ACTIVE/UNSUBSCRIBED)
- **ContactInquiry** (id, name, email, subject, message, read, createdAt)
- **ActivityLog** (id, action, userId, postId, createdAt)

### 1.4 — Authentication
- Set up NextAuth.js with credentials provider (email/password) for the admin
- Middleware to protect `/admin/*` routes
- Role-based access (Admin vs Author)

---

## Phase 2 — Public Blog Pages (My Part)

### 2.1 — Shared Layout Components
- **Navbar** — Sticky top bar with:
  - Brand logo "FreeStore" (Inter display font)
  - Nav links: Latest, Popular, Categories, About
  - Search bar (hidden on mobile, expands on focus)
  - Sign In / Subscribe buttons
  - Mobile hamburger menu
- **Footer** — Inversed background with:
  - Brand column (description + social icons)
  - Resource links (Newsletter, Archive, Contact)
  - Legal links (Privacy, Terms)
- **Reading Progress Bar** — Fixed thin bar at top of viewport for article pages

### 2.2 — Blog Homepage (`/`)
- **Hero Feature** — Large featured article card with full-bleed image, category badge, title, author, date
- **Article Grid** — 3-column responsive grid (12-col base) with:
  - Each card: 4:3 thumbnail, category tag, title (Merriweather), excerpt (2-line clamp), read time + author
  - Hover effect: image scale 1.05, title turns primary color
- **Newsletter CTA Banner** — Centered card with icon, headline, email input, "Subscribe Now" button
- **Footer** (as above)

### 2.3 — Article Detail Page (`/[slug]`)
- **Top Navbar** (same as homepage)
- **Header Section** — Centered, max 720px article width:
  - Category breadcrumbs (e.g. Architecture -> Future Tech)
  - H1 title (Merriweather, 40px)
  - Author avatar + name + title + date + read time
  - Full-width featured image (21:9 aspect ratio)
- **Article Body** — Max 720px column, Merriweather 18px/32px line-height:
  - Dropcap on first paragraph
  - H2 section headings (Merriweather)
  - Blockquote with indigo left border
  - Inline image with caption
  - Tag list (rounded pill badges)
  - **Author Bio Section** — Avatar, name, description, social links
- **Related Posts** — Full-width section with 3 related article cards
- **Newsletter Section** — Primary-colored banner with email signup
- **Footer**
- **Reading Progress Bar** — Updates as user scrolls

### 2.4 — Popular Stories (`/popular`)
- **Page Header** — "Popular Stories" title + subtitle
- **Bento Grid Layout** (12-column):
  - **#1 Ranked** — Large featured card (span 8 cols) with image + text split layout, "Trending" badge, view/like counts
  - **#2 & #3** — Smaller side cards (span 4 cols each) with rank badge
  - **#4-#7** — 4-column grid of compact cards with thumbnail + rank indicator
- **Rising Insights List** — 2-column list with numbered rankings (8-11), each with title, author, category, view count
- **Newsletter CTA** - secondary-container background
- **Footer**

### 2.5 — Categories (`/categories`)
- **Hero Section** — 400px tall with "Explore the World of Insight" headline, stat badges (12 topics, 450+ articles)
- **Category Bento Grid** — Asymmetric layout with:
  - **AI & ML** — Large featured card (span 8) with gradient overlay, post count
  - **Design Systems** — Medium card (span 4) with icon, article count
  - **Technology** — Card (span 4) with icon, post count, arrow
  - **Modern Lifestyle** — Card with subtle background image
  - **Global Economy** — Standard card
  - **Philosophy & Ethics** — Half-width card with image overlay
  - **Future of Work** — Half-width card with image overlay
- **Newsletter Section** — Inversed background
- **Footer**

### 2.6 — About Page (`/about`)
- Hero + mission statement
- Editorial team section
- Platform values / timeline
- Newsletter CTA
- Footer

---

## Phase 3 — Admin Panel (My Part)

### 3.1 — Admin Layout
- **Side Navbar** — Fixed left (64px width) with:
  - "Admin Panel" brand header
  - Nav items: Dashboard, Content, Editor, Settings
  - "+ New Post" button
  - Admin profile avatar + email at bottom
  - Active state: 2px indigo left border + tinted background
- **Main Content Area** — Offset by 64px left margin, surface-bright background

### 3.2 — Admin Dashboard (`/admin`)
- **Stats Bar** — 4 bento cards in a row:
  - Total Posts (with document icon)
  - Published (with green checkmark)
  - Drafts (with edit calendar icon)
  - Growth % (with trending up icon)
- **Recent Activity Feed** — Timestamped list with action icons (published, updated, purged)
- **Category Distribution** — Horizontal bar chart (Technology 42%, Psychology 28%, Design 15%, Other 15%)

### 3.3 — Content Manager (`/admin/content`)
- **Header** — Title "Content Manager" + search bar + Filter button
- **Stats Overview** — Same 4 metric cards as dashboard
- **Table** — With columns:
  - Title + Author subtitle
  - Status badge (Published = green, Draft = slate, Scheduled = muted)
  - Category
  - Date
  - Actions (Preview eye, Edit pencil, Delete trash)
  - Hover: 4px left indigo border
- **Pagination** — Showing "1-5 of 124" with numbered page buttons
- **Activity + Category widgets** below the table (same as dashboard)

### 3.4 — Post Editor (`/admin/editor` and `/admin/editor/[id]`)
- **Sidebar** (same admin layout, Editor nav item is active)
- **Toolbar** — Fixed top bar with:
  - Formatting buttons: Bold, Italic, Link, Quote
  - "Saving..." / "Saved" status indicator
  - Meta Settings toggle button
  - Publish button
- **Writing Area** — Max 720px centered column:
  - Title input (Merriweather, article title size, no border)
  - Date + read time metadata
  - Full-height textarea (Merriweather 18px body)
- **Meta Settings Popover** (absolute positioned, toggled by Settings button):
  - Featured image upload (drag & drop zone)
  - Tags (chips with remove button, "Add Tag" button)
  - SEO Description textarea
  - Save Changes button

### 3.5 — Admin Settings (`/admin/settings`)
- General settings (blog name, description, logo)
- Authors management
- SEO defaults

### 3.6 — Newsletter Subscribers (`/admin/subscribers`)
- Table with email, subscription date, status
- Export CSV button
- Search/filter

### 3.7 — Contact Inquiries (`/admin/inquiries`)
- Table with name, email, subject, message preview
- Read/unread state
- Reply or mark as resolved

---

## Phase 4 — API Layer (My Part)

### 4.1 — Public API Routes
- `GET /api/posts` — List posts (paginated, filtered by category)
- `GET /api/posts/[slug]` — Single post with author and related
- `GET /api/posts/popular` — Top posts by view count
- `GET /api/categories` — List all categories with post counts
- `POST /api/subscribers` — Subscribe email
- `POST /api/contact` — Submit contact form

### 4.2 — Admin API Routes (protected)
- `GET /api/admin/posts` — All posts (including drafts), paginated, searchable
- `POST /api/admin/posts` — Create new post
- `PUT /api/admin/posts/[id]` — Update post
- `DELETE /api/admin/posts/[id]` — Delete post
- `PUT /api/admin/posts/[id]/publish` — Toggle publish/draft
- `GET /api/admin/stats` — Dashboard stats
- `GET /api/admin/activity` — Recent activity log
- `POST /api/admin/upload` — Upload image (to Uploadthing/Cloudinary)
- `GET /api/admin/subscribers` — List subscribers
- `DELETE /api/admin/subscribers/[id]` — Remove subscriber
- `GET /api/admin/inquiries` — List inquiries
- `PUT /api/admin/inquiries/[id]` — Mark as read/resolved

---

## Phase 5 — Polish & Deployment (My Part)

- SEO meta tags for every public page
- Open Graph + Twitter card images
- RSS feed endpoint
- Sitemap generation
- 404 page
- Loading states (skeleton screens)
- Empty states for admin tables
- Error boundaries
- Responsive testing across mobile/tablet/desktop
- Performance optimization (image lazy loading, ISR for public pages)
- Vercel deployment + env vars

---

## What I Need From You (Your Part)

1. **Content strategy** — Do you want real/sample articles populated? Categories defined? Author bios?
2. **Custom branding** — The design uses "InsightHub" / "FreeStore" as brand names. Are these final or do you have other naming?
3. **Images** — The Stitch designs use AI-generated placeholder images. Will you provide real images, use Unsplash integration, or keep the AI-generated ones?
4. **Authentication** — Do you have an email provider for NextAuth (e.g. Resend, SendGrid) for magic link emails? Or just password-based login for now?
5. **Domain** — Custom domain for deployment?
6. **Features scope** — Do you want me to build ALL 11 screens in one pass, or by priority (e.g. public blog first, admin second)?
