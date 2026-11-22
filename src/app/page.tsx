'use client';

import React, { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import SeasonalBanner from '@/components/SeasonalBanner';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import RecentlyViewed from '@/components/RecentlyViewed';
import CategoriesSection from '@/components/CategoriesSection';
import ProductCatalog from '@/components/ProductCatalog';
import CustomBoxBuilder from '@/components/CustomBoxBuilder';
import HeritageSection from '@/components/HeritageSection';
import HalwaiReels from '@/components/HalwaiReels';
import StatsSection from '@/components/StatsSection';
import FestiveGifting from '@/components/FestiveGifting';
import FestiveCalendar from '@/components/FestiveCalendar';
import PurityPromise from '@/components/PurityPromise';
import SweetCareGuide from '@/components/SweetCareGuide';
import PincodeEstimator from '@/components/PincodeEstimator';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import OrderTrackerModal from '@/components/OrderTrackerModal';
import FloatingWhatsAppCTA from '@/components/FloatingWhatsAppCTA';
import Toast from '@/components/Toast';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col bg-cream text-dark-brown selection:bg-saffron selection:text-white">
          {/* ✨ Day 4: Seasonal Festive Announcement Strip */}
          <SeasonalBanner />

          {/* Navigation Bar (includes wishlist & order tracker triggers) */}
          <Navbar />

          {/* Main Content Sections */}
          <main className="flex-1">
            {/* Hero Section */}
            <Hero />

            {/* ✨ Day 4: Trending / Most-Loved Delicacies Strip */}
            <RecentlyViewed />

            {/* Categories Section */}
            <CategoriesSection onSelectCategory={setSelectedCategory} />

            {/* Full Interactive Product Catalog */}
            <ProductCatalog
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Custom Box Builder Studio */}
            <CustomBoxBuilder />

            {/* 40-Year Heritage & Story */}
            <HeritageSection />

            {/* ✨ Day 4: Animated Heritage & Purity Stats Counter */}
            <StatsSection />

            {/* ✨ Day 7: Master Halwai Kitchen Reels */}
            <HalwaiReels />

            {/* Royal Festive & Corporate Gifting */}
            <FestiveGifting />

            {/* ✨ Day 5: Traditional Sweets Across the 6 Indian Seasons */}
            <FestiveCalendar />

            {/* Purity & Hygiene Promise */}
            <PurityPromise />

            {/* ✨ Day 6: Master Halwai Sweet Care, Storage & Reheating Guide */}
            <SweetCareGuide />

            {/* Pincode Delivery Estimator */}
            <section className="py-12 bg-cream">
              <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <PincodeEstimator />
              </div>
            </section>

            {/* Customer Reviews & Social Proof */}
            <Testimonials />

            {/* FAQs Accordion */}
            <FAQSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* ── Global Overlay UI ── */}
          {/* Slide-out Cart Drawer */}
          <CartDrawer />

          {/* Slide-out Wishlist Drawer */}
          <WishlistDrawer />

          {/* Multi-step Checkout Modal */}
          <CheckoutModal />

          {/* Live Order Tracker Modal */}
          <OrderTrackerModal />

          {/* ✨ Day 4: Floating WhatsApp Support CTA */}
          <FloatingWhatsAppCTA />

          {/* Notification Toast */}
          <Toast />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
