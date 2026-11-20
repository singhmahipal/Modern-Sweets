'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpen,
  Sparkles,
  ArrowLeft,
  Clock,
  User,
  ShoppingBag,
  Heart,
  Flame,
  Award,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/sweetsData';

interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  author: string;
  authorRole: string;
  date: string;
  image: string;
  content: string[];
  sweetRecommendationId: string;
}

const ARTICLES: Article[] = [
  {
    id: 'art-bilona-ghee',
    title: 'The Sacred Art of Bilona Cow Desi Ghee in Royal Mithai',
    subtitle: 'Why industrial butter oil can never replicate the caramel aroma of hand-churned curd butter.',
    category: 'Vedic Culinary Wisdom',
    readTime: '4 min read',
    author: 'Pandit Ramchandra Ji Legacy',
    authorRole: 'Founder Halwai Philosophy',
    date: 'Heritage Archives',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    content: [
      'In modern commercial confectionery, most manufacturers use industrial butter oil or hydrogenated vegetable fats to reduce costs and extend shelf life. But at Modern Sweets, our kitchen still adheres strictly to the ancient bilona method.',
      'Unlike commercial ghee made by heating raw cream, bilona ghee starts with whole cow milk cultured into natural dahi (curd). This curd is then hand-churned with a two-way wooden beater to extract makkhan (butter), which is then simmered slowly over brass cauldrons until golden.',
      'This slow caramelization releases rich short-chain fatty acids (butyric acid) that give our Motichoor Ladoos, Gulab Jamuns, and Kesar Pedas their iconic melt-in-mouth texture. It melts precisely at 37°C — human body temperature — leaving no greasy residue behind on the palate.',
    ],
    sweetRecommendationId: 'sw-2', // Motichoor Ladoo
  },
  {
    id: 'art-veg-vark',
    title: 'Why 100% Vegetarian Silver Leaf (Vark) Matters to Sacred Purity',
    subtitle: 'How Modern Sweets pioneered cruelty-free certified edible silver foil in Delhi NCR.',
    category: 'Purity Standards',
    readTime: '3 min read',
    author: 'Suresh Chandra Sharma',
    authorRole: 'Head Halwai & Quality Director',
    date: 'Purity Series',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    content: [
      'For centuries, traditional silver leaf (chandi ka vark) was manufactured by hammering pure silver between layers of animal gut or leather books. For a pure vegetarian Indian family offering bhog to God, this process compromised the sacred holiness of mithai.',
      'Over 20 years ago, Modern Sweets made a bold pledge: we rejected traditional leather-hammered foil and partnered with state-of-the-art German precision beating machinery.',
      'Today, every single leaf of silver vark on our Kaju Katli and dry fruit rolls is certified 100% vegetarian, 99.9% pure silver, and completely untouched by animal skin. Purity must remain pure from start to finish.',
    ],
    sweetRecommendationId: 'sw-1', // Kaju Katli
  },
  {
    id: 'art-ghevar-chemistry',
    title: 'The Thermal Shock & Honeycomb Physics of Rajasthani Ghevar',
    subtitle: 'The monsoon culinary secret behind India’s most intricate honeycombed sweet disc.',
    category: 'Halwai Culinary Physics',
    readTime: '5 min read',
    author: 'Suresh Chandra Sharma',
    authorRole: 'Head Halwai',
    date: 'Monsoon Special',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    content: [
      'Few sweets in the world require as much mastery of physics as the Rajasthani Ghevar. A single disc contains millions of microscopic honeycomb chambers that absorb warm saffron syrup while remaining exquisitely crisp.',
      'The secret lies in the batter temperature. Master halwais knead flour with chilled ice and pure desi ghee until emulsified into a batter resembling thick cream. When this ice-cold batter is dripped into a deep copper kadhai of boiling ghee (190°C), thermal shock takes over.',
      'The sudden vaporization of water droplets violently forces the batter outwards against the sides of the circular mould, creating thousands of interconnected honeycomb tunnels. Monsoon air moisture is crucial — without it, the lattice crumbles.',
    ],
    sweetRecommendationId: 'sw-7', // Milk Cake / Kalakand
  },
  {
    id: 'art-sugar-free-fig',
    title: 'Sun-Dried Afghan Figs: The Art of Sugar-Free Royal Indulgence',
    subtitle: 'Crafting luxury Indian confectionery for diabetic elders without synthetic sweeteners.',
    category: 'Wellness & Ayurveda',
    readTime: '4 min read',
    author: 'Priya Sharma',
    authorRole: 'Gifting & Recipe Design Director',
    date: 'Wellness Journal',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    content: [
      'When families come to Modern Sweets, elders often look longing at the counter, saddened that diabetes prevents them from enjoying their grandson’s wedding or Diwali prasad. Chemical artificial sweeteners like sucralose leave a synthetic, bitter aftertaste.',
      'We spent three years formulating our Sugar-Free Anjeer Barfi. We source whole sun-dried Afghan figs and slow-roast them with crushed California almonds, Goan cashews, and golden pistachios.',
      'The natural concentrated fructose of the fig binds the roasted nuts together with zero refined cane sugar, zero corn syrup, and zero chemical additives. It provides dietary fiber, iron, and a rich chewy caramel flavor that even non-diabetics reach for first.',
    ],
    sweetRecommendationId: 'sw-6', // Anjeer Barfi
  },
];

export default function JournalPage() {
  const { addToCart } = useCart();
  const [activeArticle, setActiveArticle] = useState<Article>(ARTICLES[0]);

  const recommendedSweet = PRODUCTS.find((p) => p.id === activeArticle.sweetRecommendationId) || PRODUCTS[0];

  return (
    <div className="min-h-screen bg-cream text-dark-brown">
      {/* Back to Home */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-dark-brown/70 hover:text-saffron transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <section className="relative py-20 overflow-hidden text-center text-cream mt-4">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-brown via-[#4E342E] to-dark-brown" />
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1600&q=60"
            alt="Halwai Culinary Heritage"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/20 border border-saffron/40 text-saffron text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Modern Sweets Culinary Journal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black leading-tight mb-4">
            Generational <span className="text-saffron">Halwai Secrets</span> & Culinary Lore
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto leading-relaxed">
            Exploring the Vedic science of bilona cow ghee, cruelty-free silver leaf, honeycomb physics, and healthy natural sweetness.
          </p>
        </div>
      </section>

      {/* Main Journal Reader */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Article Selector Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron block mb-2">
              Featured Articles ({ARTICLES.length})
            </span>

            {ARTICLES.map((art) => {
              const isActive = activeArticle.id === art.id;

              return (
                <div
                  key={art.id}
                  onClick={() => setActiveArticle(art)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white border-saffron ring-2 ring-saffron/30 shadow-md'
                      : 'bg-white/60 border-gold/25 hover:border-gold hover:bg-white'
                  }`}
                >
                  <span className="text-[10px] font-bold text-saffron uppercase block mb-1">
                    {art.category} • {art.readTime}
                  </span>
                  <h4 className="font-serif font-bold text-dark-brown text-sm line-clamp-2">
                    {art.title}
                  </h4>
                  <p className="text-[11px] text-dark-brown/65 mt-1 line-clamp-1">
                    {art.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Article Reading Canvas */}
          <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-gold/40 shadow-xl p-6 sm:p-10 space-y-6">
            {/* Article Visual */}
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md">
              <Image
                src={activeArticle.image}
                alt={activeArticle.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-cream">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-saffron text-white inline-block mb-1.5 shadow-sm">
                  {activeArticle.category}
                </span>
                <p className="font-serif font-bold text-lg sm:text-xl text-cream leading-snug">
                  {activeArticle.subtitle}
                </p>
              </div>
            </div>

            {/* Title & Metadata */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-dark-brown leading-tight">
                {activeArticle.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-dark-brown/70 mt-3 pt-3 border-t border-cream-dark">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-saffron" />
                  <span>By <strong>{activeArticle.author}</strong> ({activeArticle.authorRole})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>
            </div>

            {/* Article Prose Content */}
            <div className="space-y-4 text-sm sm:text-base text-dark-brown/85 leading-relaxed pt-2">
              {activeArticle.content.map((paragraph, idx) => (
                <p key={idx} className="first-letter:text-3xl first-letter:font-serif first-letter:font-black first-letter:text-saffron first-letter:float-left first-letter:mr-2">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Embedded "Taste This Delicacy" Card */}
            <div className="mt-8 p-5 rounded-2xl bg-cream border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 text-left">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-gold/30">
                  <Image
                    src={recommendedSweet.image}
                    alt={recommendedSweet.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gold-dark tracking-wider block">
                    Featured Culinary Delicacy
                  </span>
                  <h4 className="font-serif font-bold text-dark-brown text-base">
                    {recommendedSweet.name}
                  </h4>
                  <p className="text-xs font-black text-dark-brown">
                    ₹{recommendedSweet.price} ({recommendedSweet.weightOptions[0].label})
                  </p>
                </div>
              </div>

              <button
                onClick={() => addToCart(recommendedSweet, recommendedSweet.weightOptions[0].label, 1)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-saffron hover:bg-saffron-dark text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-saffron/20 transition-all hover:scale-105"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Taste This Sweet</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
