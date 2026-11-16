'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, Flame } from 'lucide-react';

export default function SeasonalBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-saffron-dark via-saffron to-gold text-white py-2.5 px-4 shadow-sm z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold">
        <div className="flex items-center gap-2 flex-1 justify-center sm:justify-start">
          <span className="p-1 rounded-full bg-white/20 text-white animate-pulse">
            <Flame className="w-3.5 h-3.5 fill-white" />
          </span>
          <span>
            <strong>Winter Royal Special:</strong> Fresh batches of Desi Ghee Gond Ladoo, Kesar Peda & Dry Fruit Halwa are simmering!
          </span>
          <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-dark-brown/25 text-[11px] font-bold">
            Code: SHUBH10 (10% OFF)
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#custom-builder"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-brown hover:bg-black text-gold-light text-xs font-bold transition-all hover:scale-105"
          >
            <span>Build Festive Box</span>
            <ArrowRight className="w-3 h-3" />
          </a>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
