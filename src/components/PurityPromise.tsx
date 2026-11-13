'use client';

import React from 'react';
import { Flame, Award, ShieldCheck, Truck } from 'lucide-react';
import { PURITY_PILLARS } from '@/data/sweetsData';

export default function PurityPromise() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-6 h-6 text-saffron" />;
      case 'Award':
        return <Award className="w-6 h-6 text-gold-dark" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-saffron" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-gold" />;
    }
  };

  return (
    <section id="purity" className="py-16 sm:py-20 bg-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-saffron">
            Uncompromising Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-dark-brown mt-2">
            The Modern Sweets Purity Promise
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-saffron to-gold mx-auto my-3 rounded-full" />
          <p className="text-sm sm:text-base text-dark-brown/75">
            Every bite carries the integrity of four decades. Here is how we ensure pristine purity from kitchen to your home.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PURITY_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 bg-white rounded-3xl border border-gold/30 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center border border-gold/20 mb-4 shadow-sm">
                  {getIcon(pillar.icon)}
                </div>
                <h3 className="font-serif font-bold text-dark-brown text-lg mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-dark-brown/70 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cream-dark text-[11px] font-bold text-gold-dark flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Certified Pure</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
