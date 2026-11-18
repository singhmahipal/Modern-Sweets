'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Coffee,
  Car,
  Gift,
  Flame,
} from 'lucide-react';

interface StoreLocation {
  id: string;
  name: string;
  city: 'Delhi NCR' | 'Mumbai' | 'Jaipur' | 'Bengaluru';
  type: string;
  address: string;
  pincode: string;
  phone: string;
  hours: string;
  amenities: string[];
  image: string;
  mapsUrl: string;
}

const STORES: StoreLocation[] = [
  {
    id: 'store-1',
    name: 'Flagship Chowk & Heritage Kitchen (Since 1985)',
    city: 'Delhi NCR',
    type: 'Heritage Flagship Store',
    address: 'Modern Sweets Chowk, Block A, Inner Circle, Connaught Place, New Delhi',
    pincode: '110001',
    phone: '+91 98765 43210',
    hours: '8:00 AM – 10:30 PM (All 7 Days)',
    amenities: ['Live Desi Ghee Kitchen', 'Tasting Counter', 'Gifting Concierge Lounge', 'Valet Parking'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    mapsUrl: 'https://maps.google.com/?q=Connaught+Place+New+Delhi',
  },
  {
    id: 'store-2',
    name: 'South Extension Royal Lounge',
    city: 'Delhi NCR',
    type: 'Boutique Store & Hamper Studio',
    address: 'Main Market, South Extension Part II, New Delhi',
    pincode: '110049',
    phone: '+91 98765 43211',
    hours: '9:00 AM – 10:00 PM (All 7 Days)',
    amenities: ['Custom Box Studio', 'Chhai & Mithai Tasting', 'Curbside Pickup'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    mapsUrl: 'https://maps.google.com/?q=South+Extension+Part+2+New+Delhi',
  },
  {
    id: 'store-3',
    name: 'Bandra Heritage Emporium',
    city: 'Mumbai',
    type: 'Luxury Sweet Boutique',
    address: 'Near National College, Linking Road, Bandra West, Mumbai',
    pincode: '400050',
    phone: '+91 98765 43212',
    hours: '8:30 AM – 11:00 PM (All 7 Days)',
    amenities: ['Air-Conditioned Tasting Lounge', 'Wedding Gifting Studio', 'Express Air Pickup'],
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80',
    mapsUrl: 'https://maps.google.com/?q=Linking+Road+Bandra+West+Mumbai',
  },
  {
    id: 'store-4',
    name: 'Rajputana Palace Flagship',
    city: 'Jaipur',
    type: 'Heritage Experience Store',
    address: 'Near Panch Batti, Mirza Ismail (MI) Road, Jaipur, Rajasthan',
    pincode: '302001',
    phone: '+91 98765 43213',
    hours: '8:00 AM – 10:30 PM (All 7 Days)',
    amenities: ['Wood-Fired Mawa Live Kadhai', 'Traditional Ghevar Counter', 'Valet Parking'],
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=600&q=80',
    mapsUrl: 'https://maps.google.com/?q=MI+Road+Jaipur',
  },
  {
    id: 'store-5',
    name: 'Indiranagar Pavilion',
    city: 'Bengaluru',
    type: 'Modern Mithai Cafe & Lounge',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka',
    pincode: '560038',
    phone: '+91 98765 43214',
    hours: '9:00 AM – 10:30 PM (All 7 Days)',
    amenities: ['Artisanal Tasting Bar', 'Sugar-Free Special Counter', 'Curbside Pickup'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
    mapsUrl: 'https://maps.google.com/?q=Indiranagar+100+Feet+Road+Bangalore',
  },
];

export default function StoresPage() {
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const filteredStores = STORES.filter(
    (s) => selectedCity === 'All' || s.city === selectedCity
  );

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
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=60"
            alt="Modern Sweets Flagship Stores"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/20 border border-saffron/40 text-saffron text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin className="w-4 h-4" />
            <span>5 Flagship Emporiums & Tasting Lounges</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black leading-tight mb-4">
            Experience Our <span className="text-saffron">Living Heritage</span> in Person
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto leading-relaxed">
            Walk into our live desi ghee kitchens, sample fresh morning batches, and craft custom festive boxes with our master halwais.
          </p>
        </div>
      </section>

      {/* City Filters & Store Directory */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* City Filter Pills */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap mb-12">
          {['All', 'Delhi NCR', 'Mumbai', 'Jaipur', 'Bengaluru'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCity(c)}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
                selectedCity === c
                  ? 'bg-saffron text-white shadow-saffron/30 shadow-md scale-105'
                  : 'bg-white text-dark-brown border border-gold/30 hover:border-saffron hover:bg-cream-light'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-3xl overflow-hidden border border-gold/30 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Store Visual */}
                <div className="relative h-52 bg-cream-dark overflow-hidden">
                  <Image
                    src={store.image}
                    alt={store.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-dark-brown text-gold-light border border-gold/40 shadow-sm">
                    {store.type}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>Open Now</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-saffron tracking-wider block">
                      {store.city}
                    </span>
                    <h3 className="font-serif font-black text-dark-brown text-lg group-hover:text-saffron transition-colors mt-0.5">
                      {store.name}
                    </h3>
                  </div>

                  <div className="space-y-2 text-xs text-dark-brown/80 pt-1">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
                      <span>{store.address} (PIN: {store.pincode})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-saffron shrink-0" />
                      <a href={`tel:${store.phone}`} className="hover:text-saffron font-semibold">
                        {store.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold-dark shrink-0" />
                      <span>{store.hours}</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="pt-3 border-t border-cream-dark">
                    <span className="text-[10px] uppercase font-bold text-dark-brown/60 block mb-1.5">
                      Store Amenities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {store.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-cream text-dark-brown border border-gold/25"
                        >
                          ✓ {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 flex gap-2">
                <a
                  href={store.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-saffron hover:bg-saffron-dark text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
                <a
                  href={`tel:${store.phone}`}
                  className="py-2.5 px-3.5 rounded-xl border border-gold/40 hover:bg-cream text-dark-brown font-bold text-xs flex items-center justify-center"
                  title="Call Store"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
