'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/data/sweetsData';

interface CategoriesProps {
  onSelectCategory: (filterKey: string) => void;
}

export default function CategoriesSection({ onSelectCategory }: CategoriesProps) {
  const handleCategoryClick = (filterKey: string) => {
    onSelectCategory(filterKey);
    const catalogElement = document.getElementById('products');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-16 sm:py-20 bg-cream-light/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-saffron">
            Artisanal Collections
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-dark-brown mt-2">
            Explore Sweets By Category
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-saffron to-gold mx-auto my-3 rounded-full" />
          <p className="text-sm sm:text-base text-dark-brown/75">
            From slow-simmered desi ghee halwas to royal dry fruit rolls and crunchy spiced namkeens, curated for every palate.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.filterKey)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white border border-gold/30 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
            >
              {/* Category Image */}
              <div className="relative w-full h-44 overflow-hidden bg-dark-brown/5">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/70 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cream/90 text-dark-brown backdrop-blur-sm">
                  {cat.itemCount}+ Varieties
                </span>
              </div>

              {/* Card Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-dark-brown text-base group-hover:text-saffron transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-dark-brown/70 mt-1 line-clamp-2">
                    {cat.tagline}
                  </p>
                </div>
                
                <div className="pt-3 mt-3 border-t border-cream-dark flex items-center justify-between text-xs font-bold text-saffron group-hover:text-saffron-dark">
                  <span>Browse Delights</span>
                  <div className="w-6 h-6 rounded-full bg-saffron/10 flex items-center justify-center group-hover:bg-saffron group-hover:text-white transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
