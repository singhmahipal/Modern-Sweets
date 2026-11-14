'use client';

import React from 'react';
import Image from 'next/image';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export default function WishlistDrawer() {
  const { wishlistProducts, toggleWishlist, isWishlistOpen, setIsWishlistOpen, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const handleAddAndRemove = (product: any) => {
    addToCart(product, product.weightOptions[0].label, 1);
    toggleWishlist(product);
  };

  const handleMoveAllToBag = () => {
    wishlistProducts.forEach((p) => {
      addToCart(p, p.weightOptions[0].label, 1);
      toggleWishlist(p);
    });
    setIsWishlistOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-light border-l border-gold/30 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 bg-dark-brown text-cream flex items-center justify-between border-b border-gold/20">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-saffron fill-saffron" />
              <h3 className="font-serif font-bold text-lg text-cream">
                Your Saved Favorites ({wishlistCount})
              </h3>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-cream/80 hover:text-white transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-dark-brown/60">
                <div className="w-16 h-16 rounded-full bg-cream-dark flex items-center justify-center mb-4 text-dark-brown/40">
                  <Heart className="w-8 h-8" />
                </div>
                <p className="font-serif font-bold text-lg text-dark-brown mb-1">
                  Your wishlist is empty
                </p>
                <p className="text-xs text-dark-brown/60 mb-6 max-w-xs">
                  Tap the heart icon on any mithai or namkeen to save it for quick ordering later.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-saffron text-white text-xs font-bold shadow-md hover:bg-saffron-dark transition-all"
                >
                  Explore Sweets
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3 bg-white rounded-2xl border border-gold/20 shadow-sm flex items-center gap-3"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-cream-dark shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-dark-brown truncate">
                      {product.name}
                    </h4>
                    <span className="text-[11px] text-gold-dark font-medium block">
                      {product.categoryLabel}
                    </span>
                    <span className="text-xs font-black text-dark-brown">
                      ₹{product.price} ({product.weightOptions[0].label})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAddAndRemove(product)}
                      className="p-2 rounded-xl bg-saffron hover:bg-saffron-dark text-white shadow-sm transition-all text-xs font-bold flex items-center gap-1"
                      title="Move to bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="p-2 text-dark-brown/40 hover:text-red-600 transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {wishlistProducts.length > 0 && (
            <div className="p-4 bg-white border-t border-gold/30">
              <button
                onClick={handleMoveAllToBag}
                className="w-full py-3 px-4 rounded-xl bg-dark-brown hover:bg-black text-gold-light font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Bag ({wishlistCount} items)</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
