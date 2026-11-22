'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Sparkles, ShoppingBag, Eye, Heart, Clock, Award, ShieldCheck, Flame, X } from 'lucide-react';
import { PRODUCTS } from '@/data/sweetsData';
import { useCart } from '@/context/CartContext';

interface HalwaiReel {
  id: string;
  title: string;
  hindiTitle: string;
  duration: string;
  halwai: string;
  craftSecret: string;
  thumbnail: string;
  sweetId: string;
}

const REELS: HalwaiReel[] = [
  {
    id: 'reel-1',
    title: 'The Slow-Simmered Mawa Kadhai',
    hindiTitle: 'धीमी आंच पर कढ़ाही में शुद्ध मावा',
    duration: '0:45',
    halwai: 'Pandit Ramchandra Ji Kitchen',
    craftSecret: 'Whole organic cow milk reduced over 4 hours until caramelized into golden khoya.',
    thumbnail: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    sweetId: 'sw-7', // Milk Cake
  },
  {
    id: 'reel-2',
    title: 'Saffron Pearls in Churned Desi Ghee',
    hindiTitle: 'शुद्ध देसी घी में केसरिया बूंदी',
    duration: '0:38',
    halwai: 'Head Halwai Suresh Chandra',
    craftSecret: 'Tiny gram flour droplets fried golden in 100% cow ghee, infused with Kashmiri saffron threads.',
    thumbnail: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    sweetId: 'sw-2', // Motichoor Ladoo
  },
  {
    id: 'reel-3',
    title: 'The Vegan Silver Vark Delicate Touch',
    hindiTitle: '100% शाकाहारी चांदी का वर्क',
    duration: '0:42',
    halwai: 'Master Karigar Ramakant',
    craftSecret: 'Feather-light vegetarian silver leaf delicately draped over freshly rolled Goan cashew fudge.',
    thumbnail: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
    sweetId: 'sw-1', // Kaju Katli
  },
  {
    id: 'reel-4',
    title: 'Honeycomb Lattice of Royal Ghevar',
    hindiTitle: 'जालीदार घेवर की शाही तकनीक',
    duration: '0:55',
    halwai: 'Jaipur Master Halwai Mangilal',
    craftSecret: 'Thermal shock between ice-cold emulsified batter and smoking hot ghee creates thousands of honeycomb pores.',
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    sweetId: 'sw-5', // Kesar Peda
  },
  {
    id: 'reel-5',
    title: 'Handcrafted Velvet Gift Chest Sealing',
    hindiTitle: 'शाही मखमली हैंपर पैकेजिंग',
    duration: '0:48',
    halwai: 'Gifting Director Priya Sharma',
    craftSecret: 'Vacuum freshness sealing, festive gold ribboning, and pairing with handcrafted brass diyas.',
    thumbnail: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    sweetId: 'sw-10', // Maharaja Hamper
  },
];

export default function HalwaiReels() {
  const { addToCart } = useCart();
  const [activeReel, setActiveReel] = useState<HalwaiReel | null>(null);

  const getSweet = (sweetId: string) => {
    return PRODUCTS.find((p) => p.id === sweetId) || PRODUCTS[0];
  };

  return (
    <section className="py-16 sm:py-24 bg-dark-brown text-cream relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/20 border border-saffron/40 text-saffron text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-4 h-4 fill-saffron" />
            <span>Behind The Kadhais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-cream">
            Master Halwai Kitchen Reels
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-saffron to-gold mx-auto my-3 rounded-full" />
          <p className="text-xs sm:text-sm text-cream/80">
            Witness the time-honored techniques of slow wood-fired simmering, hand-churned ghee frying, and artisanal silver leaf finishing.
          </p>
        </div>

        {/* Reels Horizontal Scroll Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {REELS.map((reel) => {
            const sweet = getSweet(reel.sweetId);

            return (
              <div
                key={reel.id}
                onClick={() => setActiveReel(reel)}
                className="group relative cursor-pointer rounded-3xl overflow-hidden bg-black/40 border border-gold/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-[9/14] w-full overflow-hidden">
                  <Image
                    src={reel.thumbnail}
                    alt={reel.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-brown via-black/30 to-black/50" />

                  {/* Top Duration & Play Badge */}
                  <div className="absolute top-3 inset-x-3 flex justify-between items-center text-[10px] font-bold">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-gold-light border border-gold/30">
                      {reel.duration}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-saffron text-white shadow-sm">
                      Kitchen Craft
                    </span>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-saffron/90 group-hover:bg-saffron text-white flex items-center justify-center shadow-lg group-hover:scale-115 transition-all">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Captions */}
                  <div className="absolute bottom-3 inset-x-3 text-left">
                    <span className="text-[10px] text-amber-300 font-bold block">
                      {reel.hindiTitle}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-cream leading-tight mt-0.5">
                      {reel.title}
                    </h4>
                    <p className="text-[10px] text-cream/70 mt-1 line-clamp-2">
                      {reel.craftSecret}
                    </p>
                  </div>
                </div>

                {/* Direct Taste Sweet Quick CTA */}
                <div className="p-3 bg-dark-brown/95 border-t border-gold/25 flex items-center justify-between">
                  <span className="text-xs font-serif font-black text-amber-300 truncate">
                    ₹{sweet.price} ({sweet.weightOptions[0].label})
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(sweet, sweet.weightOptions[0].label, 1);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-saffron hover:bg-saffron-dark text-white text-[11px] font-bold flex items-center gap-1 shadow-sm transition-all"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Taste</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Reel Interactive Player Modal */}
        {activeReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-lg bg-dark-brown rounded-3xl overflow-hidden border-2 border-gold/40 shadow-2xl p-6 text-cream">
              <button
                onClick={() => setActiveReel(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-cream transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-gold/30">
                <Image
                  src={activeReel.thumbnail}
                  alt={activeReel.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-saffron text-white flex items-center justify-center animate-pulse shadow-xl">
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  {activeReel.hindiTitle}
                </span>
                <h3 className="text-xl font-serif font-black text-cream mt-1">
                  {activeReel.title}
                </h3>
                <p className="text-xs text-cream/70 mt-1">
                  Demonstrated by <strong>{activeReel.halwai}</strong>
                </p>
                <p className="text-xs text-cream/90 mt-3 p-3 rounded-xl bg-white/5 border border-gold/20 leading-relaxed">
                  💡 <strong>Generational Halwai Note:</strong> {activeReel.craftSecret}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gold/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-cream/60 block">Prepared Fresh Daily:</span>
                  <span className="text-base font-serif font-black text-amber-300">
                    {getSweet(activeReel.sweetId).name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    const sweet = getSweet(activeReel.sweetId);
                    addToCart(sweet, sweet.weightOptions[0].label, 1);
                    setActiveReel(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-saffron hover:bg-saffron-dark text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-saffron/30 transition-all hover:scale-105"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order This Sweet</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
