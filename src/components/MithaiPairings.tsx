'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Coffee, Plus, Check, Sparkles, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface PairingItem {
  id: string;
  name: string;
  sweetName: string;
  sweetImage: string;
  complementName: string;
  complementImage: string;
  complementType: 'beverage' | 'savory' | 'accompaniment';
  description: string;
  tastingNote: string;
  sweetPrice: number;
  complementPrice: number;
  comboDiscount: number; // percentage
  tag: string;
}

const PAIRINGS: PairingItem[] = [
  {
    id: 'pair-1',
    name: 'The Banarasi Dusk Ritual',
    sweetName: 'Kaju Katli (500g)',
    sweetImage: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=600',
    complementName: 'Kulhad Royal Masala Chai Blend (150g)',
    complementImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=600',
    complementType: 'beverage',
    description: 'The subtle, velvety cashew fudge contrasts with the warm punch of green cardamom, cloves, and ginger-infused Assam CTC tea.',
    tastingNote: 'Silky nuttiness cut cleanly by brisk, spiced tannins.',
    sweetPrice: 520,
    complementPrice: 280,
    comboDiscount: 15,
    tag: 'All-Time Classic',
  },
  {
    id: 'pair-2',
    name: 'Malwa Meetha & Teekha Harmony',
    sweetName: 'Desi Ghee Motichoor Ladoo (500g)',
    sweetImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600',
    complementName: 'Artisanal Ratlami Laung Sev (250g)',
    complementImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600',
    complementType: 'savory',
    description: 'The golden melt-in-mouth sweetness of saffron-soaked boondi beads paired with the sharp, clove-fired crunch of traditional Ratlami sev.',
    tastingNote: 'Sweet saffron warmth followed by a crisp peppery crescendo.',
    sweetPrice: 380,
    complementPrice: 190,
    comboDiscount: 12,
    tag: 'Halwai Favorite',
  },
  {
    id: 'pair-3',
    name: 'Nawabi Shahi Jugalbandi',
    sweetName: 'Warm Angoori Gulab Jamun (12 pcs)',
    sweetImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600',
    complementName: 'Slow-Simmered Malai Rabdi (300g)',
    complementImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600',
    complementType: 'accompaniment',
    description: 'Freshly fried khoya spheres soaked in rose-cardamom syrup crowned with thick, chilled layers of condensed whole-milk laccha malai.',
    tastingNote: 'Hot rose caramel meets cold, unctuous clotted cream.',
    sweetPrice: 340,
    complementPrice: 260,
    comboDiscount: 15,
    tag: 'Royal Feast',
  },
  {
    id: 'pair-4',
    name: 'The Sattvic Mindfulness Duo',
    sweetName: 'Sugar-Free Anjeer Barfi (400g)',
    sweetImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    complementName: 'First-Flush Makaibari Darjeeling Green Tea',
    complementImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600',
    complementType: 'beverage',
    description: 'Sun-dried Afghani figs pounded with roasted California almonds and pistachios, paired with crisp floral spring-plucked green tea.',
    tastingNote: 'Dense, natural fig crunch paired with light floral botanicals.',
    sweetPrice: 580,
    complementPrice: 350,
    comboDiscount: 10,
    tag: 'Sattvic & Clean',
  },
];

export default function MithaiPairings() {
  const { addCustomHamperToCart } = useCart();
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const handleAddPairing = (pair: PairingItem) => {
    const rawTotal = pair.sweetPrice + pair.complementPrice;
    const finalPrice = Math.round(rawTotal * (1 - pair.comboDiscount / 100));

    // Add as a special combo bundle item using addCustomHamperToCart
    addCustomHamperToCart({
      name: `${pair.name} [Combo Pairing]`,
      boxSize: `${pair.sweetName} + ${pair.complementName}`,
      boxTheme: 'Royal Pairing Hamper',
      price: finalPrice,
      slots: [pair.sweetName, pair.complementName],
      giftMessage: pair.tastingNote,
      recipientName: 'Gourmet Mithai Enthusiast',
      image: pair.sweetImage,
    });

    setAddedIds((prev) => [...prev, pair.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== pair.id));
    }, 2500);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-cream to-amber-50/50 border-t border-b border-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/10 border border-saffron/20 text-saffron text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Culinary Alchemy
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-dark-brown tracking-tight">
            Royal Mithai & Chai Pairings
          </h2>
          <p className="mt-4 text-base md:text-lg text-dark-brown/70 leading-relaxed font-sans">
            Centuries of royal banquets taught our halwais that sweetness reaches perfection when paired with contrasting warmth, savory crunch, and brisk mountain leaves.
          </p>
        </div>

        {/* Pairings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PAIRINGS.map((pair) => {
            const rawTotal = pair.sweetPrice + pair.complementPrice;
            const finalPrice = Math.round(rawTotal * (1 - pair.comboDiscount / 100));
            const isAdded = addedIds.includes(pair.id);

            return (
              <div
                key={pair.id}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-amber-100 flex flex-col justify-between group"
              >
                <div>
                  {/* Tag & Discount Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/70 text-dark-brown">
                      {pair.tag}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Save {pair.comboDiscount}% as Combo
                    </span>
                  </div>

                  {/* Dual Visual Showcase */}
                  <div className="relative grid grid-cols-2 gap-3 mb-6">
                    <div className="relative h-44 rounded-2xl overflow-hidden shadow-inner bg-cream">
                      <Image
                        src={pair.sweetImage}
                        alt={pair.sweetName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                        <span className="text-xs font-medium text-white line-clamp-1">{pair.sweetName}</span>
                      </div>
                    </div>

                    <div className="relative h-44 rounded-2xl overflow-hidden shadow-inner bg-cream">
                      <Image
                        src={pair.complementImage}
                        alt={pair.complementName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                        <span className="text-xs font-medium text-white line-clamp-1">{pair.complementName}</span>
                      </div>
                    </div>

                    {/* Plus Icon Junction */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-saffron text-white flex items-center justify-center font-bold text-base shadow-md border-2 border-white">
                      +
                    </div>
                  </div>

                  {/* Title & Notes */}
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-dark-brown mb-2">
                    {pair.name}
                  </h3>
                  <p className="text-sm text-dark-brown/75 leading-relaxed mb-4">
                    {pair.description}
                  </p>

                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 mb-6 flex items-start gap-2.5">
                    <Coffee className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-saffron block">Tasting Harmony</span>
                      <p className="text-xs text-dark-brown/80 italic mt-0.5">{pair.tastingNote}</p>
                    </div>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold font-serif text-dark-brown">
                        ₹{finalPrice}
                      </span>
                      <span className="text-sm text-dark-brown/40 line-through">
                        ₹{rawTotal}
                      </span>
                    </div>
                    <span className="text-[11px] text-dark-brown/60 block">Includes both paired delicacies</span>
                  </div>

                  <button
                    onClick={() => handleAddPairing(pair)}
                    disabled={isAdded}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 shadow-sm ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-dark-brown hover:bg-saffron text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        Pairing Added!
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Add Pairing to Bag
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
