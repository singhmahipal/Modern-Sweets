"use client";

import React from "react";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Star,
  ShieldCheck,
  Heart,
  Gift,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-cream via-cream-light to-cream">
      {/* Subtle Decorative Background Circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-saffron/10 via-gold/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-saffron/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/15 border border-saffron/30 text-dark-brown text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-saffron" />
              <span>
                Celebrating 40 Years of Traditional Indian Purity (Since 2006)
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-dark-brown leading-[1.15] mb-6">
              Handcrafted in{" "}
              <span className="text-saffron">Pure Desi Ghee</span>, Steeped in
              Royal Heritage.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-dark-brown/80 mb-8 max-w-2xl leading-relaxed">
              Experience authentic Indian mithai prepared every dawn using
              slow-cooked organic milk khoya, golden Kashmiri saffron, and
              handpicked California dry fruits. Zero preservatives. 100% Pure
              Bliss.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#products"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-saffron hover:bg-saffron-dark text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-saffron/30 hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                <span>Order Fresh Sweets</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#festive-gifting"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-cream-dark text-dark-brown border border-gold/40 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all hover:-translate-y-0.5"
              >
                <Gift className="w-4 h-4 text-gold-dark" />
                <span>Festive Hampers</span>
              </a>
            </div>

            {/* Trust Highlights Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gold/25 w-full">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 rounded-xl bg-saffron/15 text-saffron">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-saffron" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-dark-brown">
                    100% Cow Ghee
                  </h4>
                  <p className="text-[11px] text-dark-brown/70 hidden sm:block">
                    No palm oil or fats
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 rounded-xl bg-gold/20 text-gold-dark">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-gold text-gold" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-dark-brown">
                    4.9 / 5 Rating
                  </h4>
                  <p className="text-[11px] text-dark-brown/70 hidden sm:block">
                    15,000+ happy homes
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-700">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-dark-brown">
                    Fresh Daily
                  </h4>
                  <p className="text-[11px] text-dark-brown/70 hidden sm:block">
                    Vacuum sealed freshness
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Floating Cards */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Main Showcase Image Card */}
            <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-gold/40 bg-dark-brown/5">
              <Image
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80"
                alt="Modern Sweets Motichoor and Delicacies"
                fill
                sizes="(max-width: 768px) 100vw, 440px"
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-saffron text-white mb-2 shadow-sm">
                  Signature Delicacy
                </span>
                <h3 className="text-2xl font-serif font-bold text-cream">
                  Kashmiri Kesar Motichoor Ladoo
                </h3>
                <p className="text-xs text-cream/80 mt-1">
                  Fried in pure desi ghee, kissed with saffron threads & roasted
                  pistachios.
                </p>
              </div>
            </div>

            {/* Floating Trust Card 1: Top Right */}
            <div className="absolute -top-4 -right-4 sm:top-4 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-gold/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-saffron/15 flex items-center justify-center text-saffron font-bold text-sm">
                40+
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-dark-brown">
                  Years of Legacy
                </p>
                <p className="text-[10px] text-dark-brown/70">
                  Purity Loved By Generations
                </p>
              </div>
            </div>

            {/* Floating Trust Card 2: Bottom Left */}
            <div className="absolute -bottom-6 -left-4 sm:bottom-4 sm:-left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-gold/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-dark-brown">
                  Zero Preservatives
                </p>
                <p className="text-[10px] text-dark-brown/70">
                  100% Natural Ingredients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
