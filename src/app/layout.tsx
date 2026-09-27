import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: {
    default: "Macwealth FreeStore Blog | Spiritual Teachings & Kingdom Wisdom",
    template: "%s | Macwealth FreeStore Blog",
  },
  description:
    "Free life-transforming spiritual teachings, kingdom financial wisdom, prayer strategies, mindset renewal, and books by Prophet Dr. Isaiah Macwealth.",
  keywords: [
    "Macwealth FreeStore",
    "Macwealth FreeStore Blog",
    "Prophet Isaiah Macwealth",
    "Dr Isaiah Macwealth",
    "Christian Bookstore",
    "Free Christian Books",
    "Spiritual Growth",
    "Quiet Time",
    "Kingdom Wealth",
    "Financial Increase",
    "Wisdom Habits",
    "Mindset for Success",
    "Christian Teachings",
    "Faith",
    "Gospel Pillars",
  ],
  authors: [{ name: "Dr. Isaiah Macwealth" }],
  creator: "Macwealth FreeStore",
  publisher: "Macwealth FreeStore",
  metadataBase: new URL("https://macwealthfreestore.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Macwealth FreeStore Blog | Spiritual Teachings & Kingdom Wisdom",
    description:
      "Free life-transforming spiritual teachings, kingdom financial wisdom, prayer strategies, mindset renewal, and books by Prophet Dr. Isaiah Macwealth.",
    url: "https://macwealthfreestore.com",
    siteName: "Macwealth FreeStore",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://gmmbxzqgjjecvjmodaag.supabase.co/storage/v1/object/public/blog_image/7-money-habits-editorial.jpg",
        width: 1200,
        height: 675,
        alt: "Macwealth FreeStore Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Macwealth FreeStore Blog",
    description:
      "Free life-transforming spiritual teachings, kingdom financial wisdom, prayer strategies, and books by Prophet Dr. Isaiah Macwealth.",
    images: [
      "https://gmmbxzqgjjecvjmodaag.supabase.co/storage/v1/object/public/blog_image/7-money-habits-editorial.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="light scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
