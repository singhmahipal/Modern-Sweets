'use client';

import React, { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoriesSection from '@/components/CategoriesSection';
import ProductCatalog from '@/components/ProductCatalog';
import CustomBoxBuilder from '@/components/CustomBoxBuilder';
import HeritageSection from '@/components/HeritageSection';
import FestiveGifting from '@/components/FestiveGifting';
import PurityPromise from '@/components/PurityPromise';
import PincodeEstimator from '@/components/PincodeEstimator';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import OrderTrackerModal from '@/components/OrderTrackerModal';
import Toast from '@/components/Toast';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col bg-cream text-dark-brown selection:bg-saffron selection:text-white">
          {/* Navigation Bar (now includes wishlist & order tracker triggers) */}
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

            {/* ✨ Day 3: Custom Box Builder Studio */}
            <CustomBoxBuilder />

            {/* 40-Year Heritage & Story */}
            <HeritageSection />

            {/* Royal Festive & Corporate Gifting */}
            <FestiveGifting />

            {/* Purity & Hygiene Promise */}
            <PurityPromise />

            {/* ✨ Day 3: Pincode Delivery Estimator */}
            <section className="py-12 bg-cream">
              <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <PincodeEstimator />
              </div>
            </section>

            {/* Customer Reviews & Social Proof (now with Add Review modal) */}
            <Testimonials />

            {/* FAQs Accordion */}
            <FAQSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* ── Global Overlay UI ── */}
          {/* Slide-out Cart Drawer */}
          <CartDrawer />

          {/* ✨ Day 3: Slide-out Wishlist Drawer */}
          <WishlistDrawer />

          {/* ✨ Day 3: Multi-step Checkout Modal */}
          <CheckoutModal />

          {/* ✨ Day 3: Live Order Tracker Modal */}
          <OrderTrackerModal />

          {/* Notification Toast */}
          <Toast />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
