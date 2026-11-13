'use client';

import React, { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoriesSection from '@/components/CategoriesSection';
import ProductCatalog from '@/components/ProductCatalog';
import HeritageSection from '@/components/HeritageSection';
import FestiveGifting from '@/components/FestiveGifting';
import PurityPromise from '@/components/PurityPromise';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import Toast from '@/components/Toast';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-cream text-dark-brown selection:bg-saffron selection:text-white">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* Categories Section */}
          <CategoriesSection onSelectCategory={setSelectedCategory} />

          {/* Full Interactive Product Catalog */}
          <ProductCatalog
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* 40-Year Heritage & Story */}
          <HeritageSection />

          {/* Royal Festive & Corporate Gifting Section */}
          <FestiveGifting />

          {/* Purity & Hygiene Promise */}
          <PurityPromise />

          {/* Customer Reviews & Social Proof */}
          <Testimonials />

          {/* FAQs Accordion */}
          <FAQSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Slide-out Cart Drawer */}
        <CartDrawer />

        {/* Notification Toast */}
        <Toast />
      </div>
    </CartProvider>
  );
}
