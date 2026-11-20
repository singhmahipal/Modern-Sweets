'use client';

import React, { useState } from 'react';
import { ShieldCheck, Clock, Thermometer, Flame, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

interface CareCategory {
  id: string;
  title: string;
  temp: string;
  shelfLife: string;
  reheatingTip: string;
  bestEnjoyed: string;
  halwaiSecret: string;
  examples: string[];
}

const CARE_CATEGORIES: CareCategory[] = [
  {
    id: 'desi-ghee',
    title: 'Pure Desi Ghee Delicacies',
    temp: 'Room Temperature (20°C - 24°C) or Cool Dry Place',
    shelfLife: '12 – 15 Days (Do NOT Freeze)',
    reheatingTip: 'If ghee solidifies in cold weather, warm the container gently in lukewarm water or microwave for 8-10 seconds. Never boil.',
    bestEnjoyed: 'At slight room warmth when the churned bilona ghee melts softly on the tongue.',
    halwaiSecret: 'Pure cow ghee acts as a natural antioxidant. As long as moisture is kept away, the aroma deepens after Day 2.',
    examples: ['Motichoor Ladoo', 'Shahi Gulab Jamun', 'Mathura Kesar Peda', 'Alwar Milk Cake'],
  },
  {
    id: 'dry-fruit',
    title: 'Royal Kaju & Dry Fruit Sweets',
    temp: 'Cool, Dry Pantry (Below 22°C) or Refrigerated',
    shelfLife: '25 – 30 Days',
    reheatingTip: 'Do not reheat. Remove from refrigerator 15 minutes before serving so the natural cashew butter softens.',
    bestEnjoyed: 'Chilled or at room temperature alongside black tea or hot milk.',
    halwaiSecret: 'Diamond-grade cashews have natural oils that preserve the silver leaf foil when kept in airtight containers.',
    examples: ['Shahi Kaju Katli', 'Anjeer Dry Fruit Barfi', 'Kaju Pista Roll', 'Almond Bites'],
  },
  {
    id: 'bengali',
    title: 'Authentic Bengali Chhena Mithai',
    temp: 'Strict Refrigeration (4°C – 8°C)',
    shelfLife: '4 – 5 Days (Fresh Daily Prep)',
    reheatingTip: 'Warm Gulab Jamun / Pantua in microwave with syrup for 12 seconds. Keep Rasgulla chilled.',
    bestEnjoyed: 'Straight from the refrigerator in its chilled cardamom-rose syrup.',
    halwaiSecret: 'Fresh cow milk cottage cheese contains active live moisture. Keep sealed in original airtight syrup tub.',
    examples: ['Spongy Bengali Rasgulla', 'Kesar Angoori Rasmalai', 'Mango Sandesh', 'Cham Cham'],
  },
  {
    id: 'namkeen',
    title: 'Spiced Namkeen & Savories',
    temp: 'Airtight Jar at Room Temperature',
    shelfLife: '60 – 90 Days',
    reheatingTip: 'If exposed to monsoon humidity, toast lightly on a dry non-stick tawa for 60 seconds to restore royal crunch.',
    bestEnjoyed: 'Paired with masala chai, sweet chutneys, or sprinkled over poha.',
    halwaiSecret: 'Whole clove and black pepper oils act as ancient natural Vedic preservatives against moisture.',
    examples: ['Ratlami Laung Sev', 'Shahi Royal Mixture', 'Bikaneri Bhujia', 'Spiced Peanuts'],
  },
];

export default function SweetCareGuide() {
  const [activeTab, setActiveTab] = useState<CareCategory>(CARE_CATEGORIES[0]);

  return (
    <section id="care-guide" className="py-16 sm:py-24 bg-cream-light/70 border-t border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/15 border border-saffron/30 text-dark-brown text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-saffron" />
            <span>Master Halwai Freshness Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-dark-brown">
            Sweet Care, Storage & Reheating Guide
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-saffron to-gold mx-auto my-3 rounded-full" />
          <p className="text-xs sm:text-sm text-dark-brown/80">
            Because our sweets contain zero artificial chemical preservatives, here is how to preserve peak aroma, softness, and royal taste.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {CARE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-sm ${
                activeTab.id === cat.id
                  ? 'bg-dark-brown text-gold-light border-2 border-gold shadow-md scale-105'
                  : 'bg-white text-dark-brown border border-gold/30 hover:border-saffron hover:bg-cream-light'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Active Care Details Card */}
        <div className="bg-white rounded-3xl border-2 border-gold/40 shadow-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Essential Metrics */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-cream/70 border border-gold/25 space-y-3">
              <span className="text-[10px] font-bold text-saffron uppercase tracking-wider block">
                Preservation Guidelines
              </span>
              <h3 className="font-serif font-black text-xl text-dark-brown">
                {activeTab.title}
              </h3>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <Thermometer className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-dark-brown block">Ideal Storage Temperature:</span>
                    <span className="text-dark-brown/75">{activeTab.temp}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-dark-brown block">Peak Freshness Shelf-Life:</span>
                    <span className="text-dark-brown/75">{activeTab.shelfLife}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gold/30 text-xs space-y-1.5">
              <span className="font-bold text-dark-brown block text-[11px] uppercase text-gold-dark">
                Covered Delicacies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeTab.examples.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-cream text-dark-brown border border-gold/20"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Culinary Reheating Secrets */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron block">
                How to Serve Like Royalty
              </span>
              <h4 className="text-2xl font-serif font-black text-dark-brown">
                Serving & Reheating Secret
              </h4>
              <p className="text-xs sm:text-sm text-dark-brown/80 leading-relaxed">
                {activeTab.reheatingTip}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cream border border-gold/30 text-xs space-y-1">
              <span className="font-bold text-dark-brown flex items-center gap-1.5 text-saffron">
                <Sparkles className="w-4 h-4 text-saffron" />
                <span>Best Enjoyed Serving Style:</span>
              </span>
              <p className="text-dark-brown/80">{activeTab.bestEnjoyed}</p>
            </div>

            <div className="p-4 rounded-2xl bg-dark-brown text-cream border border-gold/30 text-xs space-y-1.5">
              <span className="text-amber-300 font-bold uppercase text-[10px] tracking-wider block">
                40-Year Master Halwai Secret
              </span>
              <p className="text-cream/90 leading-relaxed italic">
                &ldquo;{activeTab.halwaiSecret}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Shipped in vacuum-sealed food-grade insulated packs to ensure doorstep freshness.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
