'use client';

import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '@/data/sweetsData';

export default function Testimonials() {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-saffron">
            Loved Across Generations
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-dark-brown mt-2">
            Stories of Sweetness & Joy
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-saffron to-gold mx-auto my-3 rounded-full" />
          <p className="text-sm sm:text-base text-dark-brown/75">
            Over 15,000+ families trust Modern Sweets for their most sacred celebrations and everyday cravings.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 bg-white rounded-3xl border border-gold/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Quote Icon & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gold">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-gold/30" />
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-dark-brown/85 italic leading-relaxed mb-6">
                  “{t.comment}”
                </p>
              </div>

              {/* Author & Occasion */}
              <div className="pt-4 border-t border-cream-dark flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-dark-brown text-sm">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-dark-brown/60">{t.location}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cream text-dark-brown border border-gold/30">
                  {t.occasion}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate Social Proof Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-dark-brown text-gold-light border border-gold/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-saffron/20 border border-saffron/40 flex items-center justify-center text-saffron font-black text-2xl font-serif shrink-0">
              4.9
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-gold mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <span className="text-xs text-cream/80 ml-2 font-bold">15,420+ Verified Reviews</span>
              </div>
              <p className="text-xs text-cream/70">
                Rated #1 Traditional Confectionery for Purity & Packaging across Delhi NCR, Mumbai & Jaipur.
              </p>
            </div>
          </div>

          <a
            href="#products"
            className="px-6 py-3 rounded-full bg-saffron hover:bg-saffron-dark text-white text-xs font-bold whitespace-nowrap shadow-md transition-all hover:scale-105"
          >
            Taste The Purity
          </a>
        </div>

      </div>
    </section>
  );
}
