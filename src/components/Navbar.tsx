'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingBag, Phone, Menu, X, Sparkles, MessageCircle, Heart, Truck, Gift } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function Navbar() {
  const { totalItems, setIsCartOpen, setIsOrderTrackerOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Sweets & Savories', href: '#products' },
    { label: 'Categories', href: '#categories' },
    { label: 'Custom Box Studio', href: '#custom-builder' },
    { label: 'Festive Hampers', href: '#festive-gifting' },
    { label: 'Our Legacy', href: '#legacy' },
    { label: 'Purity Promise', href: '#purity' },
    { label: 'Customer Reviews', href: '#reviews' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-dark-brown via-[#4E342E] to-dark-brown text-gold-light py-2 px-4 text-xs sm:text-sm font-medium border-b border-gold/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-saffron animate-pulse" />
            <span>
              <strong>Festive Season Special:</strong> Free Express Delivery on orders above ₹999 across India!
            </span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-cream/90 text-xs">
            <button
              onClick={() => setIsOrderTrackerOpen(true)}
              className="flex items-center gap-1.5 hover:text-saffron transition-colors"
            >
              <Truck className="w-3.5 h-3.5 text-saffron" />
              <span>Track Live Order</span>
            </button>
            <span className="text-gold/40">|</span>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1.5 hover:text-saffron transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-saffron" />
              <span>Orders: +91 98765 43210</span>
            </a>
            <span className="text-gold/40">|</span>
            <span className="text-saffron font-semibold">100% Shuddh Cow Desi Ghee</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 backdrop-blur-md ${
          isScrolled
            ? 'bg-cream/95 shadow-md border-b border-gold/20 py-3'
            : 'bg-cream/80 border-b border-cream-dark py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-gold shadow-sm bg-white p-0.5 group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo.png"
                alt="Modern Sweets Logo"
                fill
                sizes="44px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-black tracking-wide text-dark-brown">
                Modern <span className="text-saffron">Sweets</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-gold-dark -mt-1">
                Taste & Purity Since 1985
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-bold text-dark-brown/90 hover:text-saffron transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-saffron hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-full bg-cream hover:bg-gold/20 text-dark-brown transition-all shadow-sm border border-gold/30"
              aria-label="View Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-saffron/15 hover:bg-saffron text-dark-brown hover:text-white transition-all shadow-sm border border-saffron/40"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-saffron text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-md">
                  {totalItems}
                </span>
              )}
            </button>

            {/* WhatsApp Quick Order Button */}
            <a
              href="https://wa.me/919876543210?text=Hello%20Modern%20Sweets,%20I%20would%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-dark-brown hover:bg-cream-dark transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-cream-light border-b border-gold/30 px-6 py-5 shadow-xl transition-all">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-dark-brown hover:text-saffron py-2 border-b border-cream-dark/60"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsOrderTrackerOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-cream border border-gold/40 text-dark-brown"
                >
                  <Truck className="w-4 h-4 text-saffron" />
                  <span>Track Live Order</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-cream border border-gold/40 text-dark-brown"
                >
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>View Wishlist ({wishlistCount})</span>
                </button>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Modern%20Sweets,%20I%20would%20like%20to%20place%20an%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order on WhatsApp (+91 98765 43210)
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
