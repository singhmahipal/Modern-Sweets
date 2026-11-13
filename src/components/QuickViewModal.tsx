'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Star, ShoppingBag, ShieldCheck, Clock, Check } from 'lucide-react';
import { SweetProduct } from '@/data/sweetsData';
import { useCart } from '@/context/CartContext';

interface QuickViewProps {
  product: SweetProduct | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewProps) {
  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState(
    product ? product.weightOptions[0].label : ''
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const currentOption =
    product.weightOptions.find((w) => w.label === selectedWeight) || product.weightOptions[0];
  const dynamicPrice = Math.round(product.price * currentOption.multiplier);
  const dynamicOriginalPrice = product.originalPrice
    ? Math.round(product.originalPrice * currentOption.multiplier)
    : null;

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-cream-light rounded-3xl overflow-hidden shadow-2xl border border-gold/40 flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-dark-brown shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Section */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[260px] bg-dark-brown/10">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            {product.badge && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-saffron text-white shadow-md">
                {product.badge}
              </span>
            )}
            {product.isPureGhee && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-dark-brown text-gold-light border border-gold/40 shadow-md">
                100% Desi Ghee
              </span>
            )}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gold-dark uppercase tracking-wider mb-1">
              <span>{product.categoryLabel}</span>
              <span>•</span>
              <span className="text-dark-brown/60">{product.hindiName}</span>
            </div>

            <h3 className="text-2xl font-serif font-black text-dark-brown mb-2">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-gold' : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-dark-brown">{product.rating}</span>
              <span className="text-xs text-dark-brown/60">({product.reviewsCount} reviews)</span>
            </div>

            {/* Description */}
            <p className="text-sm text-dark-brown/80 mb-5 leading-relaxed">
              {product.description}
            </p>

            {/* Weight Option Selector */}
            <div className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-brown mb-2">
                Select Weight / Pack:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.weightOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedWeight(opt.label)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      selectedWeight === opt.label
                        ? 'bg-saffron text-white border-saffron shadow-sm'
                        : 'bg-white text-dark-brown border-gold/30 hover:border-saffron'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients & Shelf Life */}
            <div className="bg-cream p-3 rounded-2xl border border-gold/20 mb-5 space-y-1.5 text-xs text-dark-brown/80">
              <div className="flex items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Ingredients:</strong> {product.ingredients.join(', ')}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-saffron shrink-0" />
                <span>
                  <strong>Shelf Life:</strong> {product.shelfLife}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing & Add to Cart Controls */}
          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-black text-dark-brown">₹{dynamicPrice}</span>
              {dynamicOriginalPrice && (
                <span className="text-sm text-dark-brown/50 line-through">
                  ₹{dynamicOriginalPrice}
                </span>
              )}
              <span className="text-xs text-emerald-600 font-bold">Inclusive of all taxes</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-gold/40 rounded-xl bg-white overflow-hidden shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-sm font-bold text-dark-brown hover:bg-cream-dark transition-colors"
                >
                  -
                </button>
                <span className="px-3 text-sm font-bold text-dark-brown">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-sm font-bold text-dark-brown hover:bg-cream-dark transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-5 rounded-xl bg-saffron hover:bg-saffron-dark text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag (₹{dynamicPrice * quantity})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
