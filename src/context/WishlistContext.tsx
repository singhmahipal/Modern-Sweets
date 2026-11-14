'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SweetProduct } from '@/data/sweetsData';

interface WishlistContextType {
  wishlistIds: string[];
  wishlistProducts: SweetProduct[];
  toggleWishlist: (product: SweetProduct) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistProducts, setWishlistProducts] = useState<SweetProduct[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('modern_sweets_wishlist');
      if (saved) {
        setWishlistProducts(JSON.parse(saved));
      }
    } catch {
      // Local storage fallback
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('modern_sweets_wishlist', JSON.stringify(wishlistProducts));
    } catch {
      // Local storage fallback
    }
  }, [wishlistProducts]);

  const toggleWishlist = (product: SweetProduct) => {
    setWishlistProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlistProducts.some((p) => p.id === productId);
  };

  const wishlistIds = wishlistProducts.map((p) => p.id);
  const wishlistCount = wishlistProducts.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
