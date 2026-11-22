'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ShieldCheck, Heart, Sparkles, Filter, AlertCircle, ShoppingBag, Check } from 'lucide-react';
import { PRODUCTS, SweetProduct } from '@/data/sweetsData';
import { useCart } from '@/context/CartContext';

interface NutritionalItem {
  id: string;
  name: string;
  calories: number; // kcal per 100g
  protein: number; // g
  fats: number; // g (predominantly cow ghee / nuts)
  carbs: number; // g
  sugar: number; // g (natural or cane)
  fiber: number; // g
  isGlutenFree: boolean;
  isSugarFree: boolean;
  allergens: string[];
  keyBenefit: string;
}

const NUTRITION_DATA: NutritionalItem[] = [
  {
    id: 'sw-1',
    name: 'Shahi Kaju Katli',
    calories: 440,
    protein: 9.8,
    fats: 24.5,
    carbs: 52.0,
    sugar: 38.0,
    fiber: 3.2,
    isGlutenFree: true,
    isSugarFree: false,
    allergens: ['Cashew Nuts'],
    keyBenefit: 'Rich in heart-healthy monounsaturated fats from Goan cashews',
  },
  {
    id: 'sw-2',
    name: 'Pure Desi Ghee Motichoor Ladoo',
    calories: 420,
    protein: 6.5,
    fats: 22.0,
    carbs: 58.0,
    sugar: 42.0,
    fiber: 2.1,
    isGlutenFree: true,
    isSugarFree: false,
    allergens: ['Milk Ghee', 'Pistachios'],
    keyBenefit: 'Pure cow ghee provides natural vitamin A, D, and short-chain butyric acid',
  },
  {
    id: 'sw-3',
    name: 'Royal Gulab Jamun',
    calories: 320,
    protein: 5.2,
    fats: 14.0,
    carbs: 48.0,
    sugar: 39.0,
    fiber: 1.0,
    isGlutenFree: false, // contains a touch of refined flour for binding
    isSugarFree: false,
    allergens: ['Milk Mawa', 'Wheat (Trace)'],
    keyBenefit: 'Slow-simmered whole milk mawa gives authentic calcium density',
  },
  {
    id: 'sw-4',
    name: 'Spongy Bengali Rasgulla',
    calories: 185,
    protein: 6.8,
    fats: 3.5,
    carbs: 34.0,
    sugar: 28.0,
    fiber: 0.5,
    isGlutenFree: true,
    isSugarFree: false,
    allergens: ['Cow Milk Chhena'],
    keyBenefit: 'Lowest calories per serving; light cottage cheese protein',
  },
  {
    id: 'sw-5',
    name: 'Kesar Peda (Mathura Style)',
    calories: 390,
    protein: 8.2,
    fats: 18.0,
    carbs: 51.0,
    sugar: 36.0,
    fiber: 1.8,
    isGlutenFree: true,
    isSugarFree: false,
    allergens: ['Milk Khoya', 'Pistachios'],
    keyBenefit: 'Caramelized milk solids infused with Kashmiri saffron antioxidant crocin',
  },
  {
    id: 'sw-6',
    name: 'Anjeer Dry Fruit Barfi',
    calories: 375,
    protein: 8.9,
    fats: 19.5,
    carbs: 46.0,
    sugar: 22.0, // Natural fructose only
    fiber: 7.8,
    isGlutenFree: true,
    isSugarFree: true,
    allergens: ['Almonds', 'Cashews', 'Pistachios'],
    keyBenefit: '100% Zero Refined Sugar; high dietary fiber and iron from sun-dried Afghan figs',
  },
  {
    id: 'sw-7',
    name: 'Shahi Milk Cake (Kalakand)',
    calories: 410,
    protein: 9.1,
    fats: 20.0,
    carbs: 49.0,
    sugar: 34.0,
    fiber: 1.2,
    isGlutenFree: true,
    isSugarFree: false,
    allergens: ['Whole Cow Milk', 'Desi Ghee'],
    keyBenefit: 'High bioavailable protein and bone-strengthening natural dairy minerals',
  },
  {
    id: 'sw-8',
    name: 'Kaju Pista Roll',
    calories: 460,
    protein: 10.5,
    fats: 26.0,
    carbs: 49.0,
    sugar: 32.0,
    fiber: 4.1,
    isGlutenFree: true,
    isSugarFree: false,
    allergens: ['Cashews', 'Iranian Pistachios'],
    keyBenefit: 'Highest natural nut protein; double-layered pistachio core',
  },
  {
    id: 'sw-9',
    name: 'Ratlami Sev & Shahi Mixture',
    calories: 520,
    protein: 12.0,
    fats: 32.0,
    carbs: 44.0,
    sugar: 2.5,
    fiber: 6.2,
    isGlutenFree: true,
    isSugarFree: true,
    allergens: ['Gram Flour (Besan)', 'Peanuts'],
    keyBenefit: 'High plant protein from gram flour; clove & black pepper digestive spices',
  },
  {
    id: 'sw-10',
    name: 'Maharaja Heritage Gift Hamper',
    calories: 420,
    protein: 9.2,
    fats: 22.5,
    carbs: 50.0,
    sugar: 34.0,
    fiber: 4.5,
    isGlutenFree: true,
    isSugarFree: false,
    allergens: ['Tree Nuts', 'Desi Ghee', 'Milk'],
    keyBenefit: 'Balanced assortment of royal dry fruits, pure ghee mithai and savories',
  },
];

interface NutritionalMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NutritionalMatrixModal({ isOpen, onClose }: NutritionalMatrixModalProps) {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState<'all' | 'gluten-free' | 'sugar-free' | 'high-protein'>('all');

  if (!isOpen) return null;

  const filteredItems = NUTRITION_DATA.filter((item) => {
    if (filter === 'gluten-free') return item.isGlutenFree;
    if (filter === 'sugar-free') return item.isSugarFree;
    if (filter === 'high-protein') return item.protein >= 8.5;
    return true;
  });

  const getProduct = (id: string) => {
    return PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-cream-light rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/40 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-dark-brown text-cream flex items-center justify-between border-b border-gold/30">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-saffron" />
            <h3 className="font-serif font-bold text-lg text-cream">
              Nutritional Intelligence & Allergen Matrix
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-cream/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="p-4 bg-cream border-b border-gold/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'all', label: 'All Delicacies (10)' },
              { id: 'gluten-free', label: '100% Gluten-Free' },
              { id: 'sugar-free', label: 'Diabetic-Friendly / Zero Sugar' },
              { id: 'high-protein', label: 'High Protein (8.5g+)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  filter === f.id
                    ? 'bg-dark-brown text-gold-light border border-gold shadow-sm'
                    : 'bg-white text-dark-brown border border-gold/30 hover:border-saffron'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-dark-brown/60 italic hidden sm:block">
            *All values measured per 100g serving size
          </span>
        </div>

        {/* Nutrition Table */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-gold/30 text-[10px] font-bold uppercase text-dark-brown/70 bg-cream/40">
                  <th className="py-3 px-3">Mithai</th>
                  <th className="py-3 px-2 text-right">Calories</th>
                  <th className="py-3 px-2 text-right">Protein</th>
                  <th className="py-3 px-2 text-right">Ghee/Fats</th>
                  <th className="py-3 px-2 text-right">Carbs</th>
                  <th className="py-3 px-2 text-right">Sugar</th>
                  <th className="py-3 px-2 text-right">Fiber</th>
                  <th className="py-3 px-3">Allergens</th>
                  <th className="py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-dark/60">
                {filteredItems.map((item) => {
                  const product = getProduct(item.id);

                  return (
                    <tr key={item.id} className="hover:bg-cream/40 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-serif font-bold text-dark-brown block text-sm">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-medium line-clamp-1">
                          {item.keyBenefit}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right font-mono font-bold text-dark-brown">
                        {item.calories} kcal
                      </td>
                      <td className="py-3 px-2 text-right font-mono text-emerald-800 font-bold">
                        {item.protein}g
                      </td>
                      <td className="py-3 px-2 text-right font-mono text-dark-brown">
                        {item.fats}g
                      </td>
                      <td className="py-3 px-2 text-right font-mono text-dark-brown/80">
                        {item.carbs}g
                      </td>
                      <td className="py-3 px-2 text-right font-mono font-bold">
                        {item.isSugarFree ? (
                          <span className="text-emerald-700 font-bold">0g Cane</span>
                        ) : (
                          `${item.sugar}g`
                        )}
                      </td>
                      <td className="py-3 px-2 text-right font-mono text-dark-brown">
                        {item.fiber}g
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          {item.allergens.map((alg) => (
                            <span
                              key={alg}
                              className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-300"
                            >
                              {alg}
                            </span>
                          ))}
                          {item.isGlutenFree && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              Gluten-Free
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => {
                            addToCart(product, product.weightOptions[0].label, 1);
                          }}
                          className="p-2 rounded-xl bg-saffron hover:bg-saffron-dark text-white text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all mx-auto"
                          title="Add to bag"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Educational Note */}
          <div className="p-4 rounded-2xl bg-white border border-gold/30 text-xs text-dark-brown/80 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-dark-brown block">FSSAI & Halwai Purity Standards:</span>
              <p className="text-[11px] text-dark-brown/70 leading-relaxed mt-0.5">
                Modern Sweets products are 100% vegetarian. Our ghee fats come from churned cow milk rich in linoleic and butyric acids, not trans-fats or hydrogenated palm stearin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
