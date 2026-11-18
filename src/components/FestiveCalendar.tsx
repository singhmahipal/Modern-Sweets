'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, Sparkles, ArrowRight, Flame, Sun, CloudRain, Snowflake, Leaf, Flower2 } from 'lucide-react';

interface Season {
  id: string;
  ritu: string;
  months: string;
  english: string;
  icon: any;
  title: string;
  desc: string;
  heritageInsight: string;
  sweets: string[];
  image: string;
}

const SEASONS: Season[] = [
  {
    id: 'winter',
    ritu: 'Shishir & Hemant',
    months: 'Nov – Feb',
    english: 'Winter Celebrations',
    icon: Snowflake,
    title: 'Desi Ghee Gond Ladoo, Til Rewari & Gur Halwa',
    desc: 'Prepared with warming sun-dried gum (gond), dry ginger, Rajasthan gur, and crushed California almonds to nourish immunity through chilly mornings.',
    heritageInsight: 'Our 40-year halwai rule: Gond must be fried slowly in cow ghee until it puffs like pure white pearls.',
    sweets: ['Edible Gond Ladoo', 'Dry Fruit Moong Dal Halwa', 'Gur Til Rewari', 'Kesar Peda'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'spring',
    ritu: 'Vasant',
    months: 'Mar – Apr',
    english: 'Holi & Spring Harvest',
    icon: Flower2,
    title: 'Golden Mawa Gujiya & Thandai Barfi',
    desc: 'Crispy flaky pockets stuffed with slow-reduced khoya, fragrant green cardamom, chirongi nuts, and dipped in saffron nectar for vibrant Holi festivities.',
    heritageInsight: 'Fried in pure ghee over low flame to achieve the legendary bubble-textured golden crust.',
    sweets: ['Shahi Khoya Gujiya', 'Kashmiri Thandai Barfi', 'Chandrakala', 'Pista Roll'],
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'summer',
    ritu: 'Grishma',
    months: 'May – Jun',
    english: 'Summer Refreshment',
    icon: Sun,
    title: 'Alphonso Mango Sandesh & Chhena Delights',
    desc: 'Light, feather-soft Bengali cottage cheese infused with the pulp of Ratnagiri Alphonso mangoes and cooling rose water.',
    heritageInsight: 'Light on digestion, providing natural cooling nourishment during scorching summer days.',
    sweets: ['Mango Sandesh', 'Spongy Rasgulla', 'Kesar Angoori Rasmalai', 'Rose Chum Chum'],
    image: 'https://images.unsplash.com/photo-1505253758473-96b3d5ebcd96?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'monsoon',
    ritu: 'Varsha',
    months: 'Jul – Aug',
    english: 'Monsoon, Teej & Rakhi',
    icon: CloudRain,
    title: 'Honeycomb Malai Ghevar & Paneer Jalebi',
    desc: 'The crown jewel of Rajasthan. Honeycombed flour discs fried golden in pure ghee, topped with thickened saffron rabdi, silver leaf, and pistachios.',
    heritageInsight: 'The monsoon moisture in the air is essential to create the delicate honeycomb lattice of authentic Ghevar.',
    sweets: ['Rabdi Malai Ghevar', 'Kaju Katli (Rakhi Special)', 'Paneer Jalebi', 'Dry Fruit Barfi'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'autumn',
    ritu: 'Sharad',
    months: 'Sep – Oct',
    english: 'Diwali & Navratri',
    icon: Leaf,
    title: 'Motichoor Ladoos & Imperial Shahi Hampers',
    desc: 'India’s most auspicious festival of lights celebrated with tiny saffron gram flour pearls, diamond-grade Kaju Katli, and royal brass diya gift hampers.',
    heritageInsight: 'Over 50,000 festive boxes prepared during Diwali week, every box packed fresh on dispatch morning.',
    sweets: ['Pure Desi Ghee Motichoor', 'Shahi Kaju Katli', 'Anjeer Dry Fruit Barfi', 'Ratlami Sev'],
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
  },
];

export default function FestiveCalendar() {
  const [activeSeason, setActiveSeason] = useState<Season>(SEASONS[0]); // Default winter

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-cream via-[#FFF7E3] to-cream border-t border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/15 border border-saffron/30 text-dark-brown text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-4 h-4 text-saffron" />
            <span>Living Ayurvedic Mithai Traditions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-dark-brown">
            Sweets Across The Indian Seasons
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-saffron to-gold mx-auto my-3 rounded-full" />
          <p className="text-xs sm:text-sm text-dark-brown/80">
            For 40 years, our halwai calendar has honored the 6 Indian Ritus — pairing seasonal ingredients, weather wisdom, and sacred festivities.
          </p>
        </div>

        {/* Season Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {SEASONS.map((season) => {
            const Icon = season.icon;
            const isActive = activeSeason.id === season.id;

            return (
              <button
                key={season.id}
                onClick={() => setActiveSeason(season)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
                  isActive
                    ? 'bg-dark-brown text-gold-light border-2 border-gold shadow-md scale-105'
                    : 'bg-white text-dark-brown border border-gold/30 hover:border-saffron hover:bg-cream-light'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-saffron' : 'text-gold-dark'}`} />
                <div className="text-left">
                  <span className="block leading-tight">{season.english}</span>
                  <span className="text-[10px] opacity-75 font-normal block">{season.months}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Season Feature Showcase */}
        <div className="bg-white rounded-3xl border-2 border-gold/40 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
          {/* Left Column: Imagery & Seasonal Tag */}
          <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-gold/30">
            <Image
              src={activeSeason.image}
              alt={activeSeason.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/75 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-cream">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-saffron text-white shadow-sm inline-block mb-1.5">
                {activeSeason.ritu} Season Special
              </span>
              <p className="font-serif font-bold text-base leading-snug">
                {activeSeason.title}
              </p>
            </div>
          </div>

          {/* Right Column: Descriptions & In-Season Sweets */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-saffron block mb-1">
                Seasonal Significance & Heritage Wisdom
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-dark-brown">
                {activeSeason.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-dark-brown/80 leading-relaxed">
              {activeSeason.desc}
            </p>

            <div className="p-3.5 rounded-2xl bg-cream border border-gold/25 text-xs text-dark-brown/85 italic">
              💡 <strong>Halwai Secret:</strong> {activeSeason.heritageInsight}
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-dark-brown block mb-2">
                Delicacies Simmered in this Season:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {activeSeason.sweets.map((sweet) => (
                  <div
                    key={sweet}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-cream-light border border-gold/20 text-xs font-semibold text-dark-brown"
                  >
                    <span className="w-2 h-2 rounded-full bg-saffron shrink-0" />
                    <span>{sweet}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href="#products"
                className="px-6 py-2.5 rounded-xl bg-saffron hover:bg-saffron-dark text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-saffron/20 transition-all"
              >
                <span>Order In-Season Sweets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#custom-builder"
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-cream border border-gold/40 text-dark-brown font-bold text-xs"
              >
                <span>Add to Custom Box</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
