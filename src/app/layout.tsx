import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://modernsweets.in"),
  title: {
    default: "Modern Sweets | Handcrafted Indian Mithai Since 1985",
    template: "%s | Modern Sweets",
  },
  description:
    "Order authentic handcrafted Indian sweets online — Kaju Katli, Motichoor Ladoo, Gulab Jamun, Anjeer Barfi, Namkeen, and Royal Festive Gift Hampers. 100% Pure Cow Desi Ghee. Fresh delivery across India.",
  keywords: [
    "Indian sweets online",
    "Kaju Katli",
    "Motichoor Ladoo",
    "desi ghee sweets",
    "festive gift hampers",
    "Gulab Jamun",
    "Bengali sweets",
    "sugar-free sweets",
    "Namkeen online",
    "traditional mithai",
    "Modern Sweets",
    "order sweets India",
    "fresh sweets delivery",
    "Diwali sweets",
    "wedding sweets",
  ],
  authors: [{ name: "Modern Sweets" }],
  creator: "Modern Sweets",
  publisher: "Modern Sweets",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://modernsweets.in",
    siteName: "Modern Sweets",
    title: "Modern Sweets | Handcrafted Indian Mithai Since 1985",
    description:
      "100% Pure Desi Ghee sweets, royal dry fruit delights, Bengali mithai, crunchy namkeen & royal festive hampers. Fresh daily. Delivered across India.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Modern Sweets — Taste & Purity Since 1985",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern Sweets | Handcrafted Indian Mithai Since 1985",
    description:
      "Order authentic Indian sweets online — 100% pure cow desi ghee, fresh daily batches, pan-India delivery.",
    images: ["/images/logo.png"],
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
  verification: {
    google: "your-google-site-verification-token",
  },
  alternates: {
    canonical: "https://modernsweets.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <meta name="theme-color" content="#FF9933" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Modern Sweets" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FoodEstablishment",
              name: "Modern Sweets",
              description:
                "Handcrafted traditional Indian sweets made with 100% pure cow desi ghee since 1985.",
              url: "https://modernsweets.in",
              telephone: "+91-98765-43210",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Modern Sweets Chowk, Heritage Market",
                addressLocality: "Connaught Place",
                addressRegion: "New Delhi",
                postalCode: "110001",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 28.6315,
                longitude: 77.2167,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "08:00",
                closes: "22:30",
              },
              servesCuisine: "Indian",
              priceRange: "₹₹",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "15420",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-cream text-dark-brown">
        {children}
      </body>
    </html>
  );
}
