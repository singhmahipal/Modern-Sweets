'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Star, ShoppingBag, Eye, Heart } from 'lucide-react';
import { PRODUCTS } from '@/data/sweetsData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function RecentlyViewed() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (inView) controls.start('show');
  }, [inView, controls]);

  // Show top-rated / featured items as "trending" picks
  const trendingProducts = PRODUCTS.filter((p) => p.rating >= 4.85).slice(0, 5);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="py-14 bg-cream-light/60 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-saffron block mb-1">
              Most Loved This Week
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-dark-brown">
              Trending Delicacies 🔥
            </h2>
          </div>
          <a
            href="#products"
            className="text-xs font-bold text-saffron hover:text-saffron-dark transition-colors hidden sm:block"
          >
            View All →
          </a>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex gap-5 overflow-x-auto pb-3 scrollbar-none"
        >
          {trendingProducts.map((product) => {
            const price = Math.round(product.price * product.weightOptions[0].multiplier);

            return (
              <motion.div
                key={product.id}
                variants={cardVariants}
                className="group flex-shrink-0 w-52 bg-white rounded-2xl overflow-hidden border border-gold/30 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-44 overflow-hidden bg-cream-dark">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="208px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md shadow-sm transition-all ${
                      isInWishlist(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 hover:bg-white text-dark-brown/70 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? 'fill-white' : ''}`} />
                  </button>
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-saffron text-white shadow-sm">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="p-3.5">
                  <h3 className="font-serif font-bold text-dark-brown text-sm leading-tight line-clamp-1 group-hover:text-saffron transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1 mb-2.5">
                    <Star className="w-3 h-3 fill-gold text-gold" />
                    <span className="text-[11px] font-bold text-dark-brown">{product.rating}</span>
                    <span className="text-[10px] text-dark-brown/50">({product.reviewsCount})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-dark-brown">₹{price}</span>
                    <button
                      onClick={() => addToCart(product, product.weightOptions[0].label, 1)}
                      className="p-2 rounded-xl bg-saffron hover:bg-saffron-dark text-white shadow-sm transition-all hover:scale-110 active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
