'use client';

import React from 'react';
import Image from 'next/image';
import { Gift, Sparkles, MessageCircle, CheckCircle2 } from 'lucide-react';

export default function FestiveGifting() {
  const giftingFeatures = [
    'Handcrafted royal velvet and gold foil embossed gift boxes',
    'Customized greeting cards with family or corporate branding',
    'Complimentary brass diyas or silver coins with luxury hampers',
    'Direct pan-India dispatch to multiple addresses on exact chosen dates',
    'Special corporate & bulk wedding celebration volume discounts',
  ];

  return (
    <section id="festive-gifting" className="py-16 sm:py-24 bg-dark-brown text-cream relative overflow-hidden">
      {/* Decorative Gold Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-saffron/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Gift Hamper Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-gold/40 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
                alt="Modern Sweets Royal Gift Hamper"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-gold/30 text-white">
                <span className="text-xs font-bold text-saffron uppercase tracking-wider block">
                  Limited Festive Edition
                </span>
                <h4 className="text-lg font-serif font-bold text-cream mt-1">
                  The Shahi Darbar Royal Gift Hamper
                </h4>
                <p className="text-xs text-cream/70 mt-1">
                  Includes Kaju Katli, Anjeer Barfi, Motichoor Ladoo, and 2 Handcrafted Brass Diyas.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Corporate Inquiry CTA */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffron/20 border border-saffron/30 text-saffron text-xs font-bold uppercase tracking-wider mb-4">
              <Gift className="w-4 h-4" />
              <span>Royal Festive & Corporate Gifting</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-cream leading-tight mb-6">
              Celebrate Every Sacred Occasion With Royal Elegance.
            </h2>

            <p className="text-sm sm:text-base text-cream/80 mb-6 leading-relaxed">
              Whether celebrating Diwali, Raksha Bandhan, a destination wedding, or expressing gratitude to valued business clients, our bespoke gifting service delivers memorable impressions wrapped in gold foil and royal warmth.
            </p>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              {giftingFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-cream/90">{feat}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/919876543210?text=Hello%20Modern%20Sweets,%20I%20am%20interested%20in%20Festive/Corporate%20Gifting%20Hampers."
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-saffron hover:bg-saffron-dark text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-saffron/30 transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire For Bulk / Wedding Gifting</span>
              </a>

              <a
                href="#products"
                className="px-7 py-3.5 rounded-full bg-transparent border border-gold/40 hover:bg-white/10 text-gold-light font-bold text-sm transition-colors"
              >
                <span>View Ready Hampers</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
