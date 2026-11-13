'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Star, ShoppingBag, Eye, Search, Filter, Sparkles, Check } from 'lucide-react';
import { PRODUCTS, SweetProduct } from '@/data/sweetsData';
import { useCart } from '@/context/CartContext';
import QuickViewModal from './QuickViewModal';

interface ProductCatalogProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function ProductCatalog({
  selectedCategory,
  onSelectCategory,
}: ProductCatalogProps) {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<SweetProduct | null>(null);

  // Maintain selected weight per product in state
  const [selectedWeights, setSelectedWeights] = useState<Record<string, string>>({});

  const filterTabs = [
    { label: 'All Delicacies', key: 'all' },
    { label: 'Pure Desi Ghee', key: 'pure-ghee' },
    { label: 'Royal Dry Fruit', key: 'dry-fruit' },
    { label: 'Bengali Sweets', key: 'bengali' },
    { label: 'Namkeen & Savories', key: 'namkeen' },
    { label: 'Festive Hampers', key: 'hampers' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.hindiName.includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const getActiveWeight = (product: SweetProduct) => {
    return selectedWeights[product.id] || product.weightOptions[0].label;
  };

  const handleWeightChange = (productId: string, weightLabel: string) => {
    setSelectedWeights((prev) => ({ ...prev, [productId]: weightLabel }));
  };

  const getComputedPrice = (product: SweetProduct) => {
    const activeLabel = getActiveWeight(product);
    const option = product.weightOptions.find((w) => w.label === activeLabel) || product.weightOptions[0];
    const price = Math.round(product.price * option.multiplier);
    const originalPrice = product.originalPrice ? Math.round(product.originalPrice * option.multiplier) : null;
    return { price, originalPrice, activeLabel };
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-saffron text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Signature Handcrafted Mithai</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-dark-brown">
              Freshly Prepared Delicacies
            </h2>
            <p className="text-sm sm:text-base text-dark-brown/75 mt-2 max-w-xl">
              Each piece is prepared by master karigars with uncompromising hygiene and the purest of ingredients.
            </p>
          </div>

          {/* Search Bar & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-dark-brown/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Kaju, Ladoo, Peda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-full bg-white border border-gold/40 text-xs sm:text-sm text-dark-brown placeholder:text-dark-brown/50 focus:outline-none focus:ring-2 focus:ring-saffron shadow-sm"
              />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-white border border-gold/40 text-xs sm:text-sm text-dark-brown font-semibold focus:outline-none focus:ring-2 focus:ring-saffron shadow-sm cursor-pointer"
              >
                <option value="featured">Sort: Featured & Bestsellers</option>
                <option value="rating">Sort: Highest Customer Rating</option>
                <option value="price-asc">Sort: Price (Low to High)</option>
                <option value="price-desc">Sort: Price (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onSelectCategory(tab.key)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-sm ${
                selectedCategory === tab.key
                  ? 'bg-saffron text-white shadow-saffron/30 shadow-md'
                  : 'bg-white text-dark-brown border border-gold/30 hover:border-saffron hover:bg-cream-light'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white/70 rounded-3xl border border-gold/20 p-8">
            <p className="text-lg font-serif font-bold text-dark-brown mb-2">No delicacies found</p>
            <p className="text-sm text-dark-brown/60 mb-4">
              Try adjusting your search query or switching categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="px-6 py-2.5 rounded-full bg-saffron text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const { price, originalPrice, activeLabel } = getComputedPrice(product);

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-gold/30 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
                >
                  {/* Image Container with Badges */}
                  <div className="relative w-full h-52 bg-dark-brown/5 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Veg Symbol (Green Dot inside Square) */}
                    <div className="absolute top-3 left-3 w-5 h-5 bg-white rounded border border-emerald-600 flex items-center justify-center shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                      {product.badge && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-saffron text-white shadow-sm">
                          {product.badge}
                        </span>
                      )}
                      {product.isPureGhee && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-dark-brown text-gold-light border border-gold/40 shadow-sm">
                          Desi Ghee
                        </span>
                      )}
                    </div>

                    {/* Quick View Hover Button */}
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="absolute inset-x-4 bottom-3 py-2 rounded-xl bg-white/90 backdrop-blur-md text-dark-brown font-bold text-xs flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View & Details</span>
                    </button>
                  </div>

                  {/* Product Content Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Hindi Name & Rating */}
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-gold-dark">{product.hindiName}</span>
                        <div className="flex items-center gap-1 text-gold">
                          <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                          <span className="font-bold text-dark-brown text-xs">{product.rating}</span>
                          <span className="text-dark-brown/40 text-[10px]">({product.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-serif font-black text-lg text-dark-brown group-hover:text-saffron transition-colors line-clamp-1">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-dark-brown/70 mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Weight Selector Tabs */}
                      <div className="mt-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-dark-brown/60 block mb-1.5">
                          Select Pack:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {product.weightOptions.map((opt) => (
                            <button
                              key={opt.label}
                              onClick={() => handleWeightChange(product.id, opt.label)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border ${
                                activeLabel === opt.label
                                  ? 'bg-dark-brown text-gold-light border-dark-brown'
                                  : 'bg-cream-light text-dark-brown/80 border-gold/30 hover:border-saffron'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Price and Add to Cart Action */}
                    <div className="pt-4 mt-4 border-t border-cream-dark flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-dark-brown">₹{price}</span>
                          {originalPrice && (
                            <span className="text-xs text-dark-brown/40 line-through">
                              ₹{originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-emerald-700 font-semibold block">
                          Inclusive of taxes
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(product, activeLabel, 1)}
                        className="py-2.5 px-4 rounded-xl bg-saffron hover:bg-saffron-dark text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-saffron/20 transition-all hover:scale-105 active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick View Modal */}
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />

      </div>
    </section>
  );
}
