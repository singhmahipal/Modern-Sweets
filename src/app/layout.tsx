import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Modern Sweets | Taste & Purity Since 2006",
  description:
    "Handcrafted traditional Indian sweets, namkeen, bakery delicacies, and festive gift boxes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-cream text-dark-brown">
        {children}
      </body>
    </html>
  );
}
