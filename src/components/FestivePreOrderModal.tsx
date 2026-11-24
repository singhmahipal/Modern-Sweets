'use client';

import React, { useState } from 'react';
import { Calendar, Sparkles, X, Check, Gift, ShieldAlert, Clock, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface FestiveEvent {
  id: string;
  name: string;
  dateStr: string;
  season: string;
  badge: string;
  sweetRecommendation: string;
  minimumAdvanceDays: number;
  perks: string[];
}

const UPCOMING_FESTIVALS: FestiveEvent[] = [
  {
    id: 'diwali-vault',
    name: 'Maha Diwali & Govardhan Puja 2026',
    dateStr: 'November 8 - 12, 2026',
    season: 'Autumn / Shubh Deepawali',
    badge: 'Pre-Orders Open',
    sweetRecommendation: 'Swarna Kaju Katli & Royal Dry Fruit Laddoo Hamper',
    minimumAdvanceDays: 5,
    perks: ['Guaranteed Same-Day Delivery Slot', 'Complimentary Shubh Deepawali Gold Coin', 'Bespoke Velvet Box Sleeve'],
  },
  {
    id: 'raksha-bandhan',
    name: 'Raksha Bandhan Mahotsav 2026',
    dateStr: 'August 28, 2026',
    season: 'Monsoon / Shravan',
    badge: 'Pre-Order Slot Booking',
    sweetRecommendation: 'Artisanal Kesar Ghewar & Besan Ladoo Box',
    minimumAdvanceDays: 4,
    perks: ['Complimentary Handmade Silk Rakhi', 'Roli Chawal Tika Kit', 'Fresh Malai Ghewar Temperature Lock'],
  },
  {
    id: 'ganesh-utsav',
    name: 'Ganesh Chaturthi Utsav 2026',
    dateStr: 'September 14 - 24, 2026',
    season: 'Bhadrapada Shukla Chaturthi',
    badge: 'Pooja Bhog Pre-Reserve',
    sweetRecommendation: '21 Ukadiche Steamed Modak & Mawa Modak Platter',
    minimumAdvanceDays: 3,
    perks: ['Pure A2 Gir Cow Ghee Bhog Guarantee', 'Brahmin Sanctified Cooking Slot', 'Early Morning 6:00 AM Delivery'],
  },
  {
    id: 'holi-spring',
    name: 'Braj Phoolon Ki Holi 2027',
    dateStr: 'March 22 - 23, 2027',
    season: 'Vasant Ritu / Spring',
    badge: 'Limited Thandai Reserve',
    sweetRecommendation: 'Khoya Mawa Chandrakala & Kesar Gujiya Vault',
    minimumAdvanceDays: 4,
    perks: ['Organic Gulal Pouch Included', 'Thandai Shahi Masala Blend', 'Ultra-crispy air-sealed tins'],
  },
];

interface FestivePreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FestivePreOrderModal({ isOpen, onClose }: FestivePreOrderModalProps) {
  const { addCustomHamperToCart } = useCart();
  const [selectedFestival, setSelectedFestival] = useState<FestiveEvent>(UPCOMING_FESTIVALS[0]);
  const [targetDate, setTargetDate] = useState<string>('');
  const [recipientPincode, setRecipientPincode] = useState<string>('');
  const [boxQuantity, setBoxQuantity] = useState<number>(2);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleBookPreOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetDate || !recipientPincode) return;

    // Add Festive Pre-Order Voucher to Cart
    addCustomHamperToCart({
      name: `Festival Pre-Order: ${selectedFestival.name} (${boxQuantity} Luxury Boxes)`,
      boxSize: `${boxQuantity} Gift Hampers (Date: ${targetDate})`,
      boxTheme: selectedFestival.name,
      price: boxQuantity * 950,
      slots: [selectedFestival.sweetRecommendation, 'Handcrafted Festive Treats'],
      giftMessage: `Pre-Order for ${selectedFestival.name}. Dispatch target: ${targetDate} to Pincode ${recipientPincode}.`,
      recipientName: `Festive Guest (Pincode: ${recipientPincode})`,
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600',
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gold/20 flex flex-col">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-saffron via-amber-600 to-dark-brown p-6 text-white rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-black/20 hover:bg-black/30 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-gold text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Zero-Panic Guaranteed Delivery
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold">
            Festival Pre-Order Vault
          </h2>
          <p className="text-sm text-white/85 mt-1">
            Reserve your fresh auspicious mithai slots ahead of festive rushes. We lock your hearth time in advance.
          </p>
        </div>

        {isSuccess ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-dark-brown">Festival Slot Reserved!</h3>
            <p className="text-sm text-dark-brown/70 max-w-md mx-auto">
              Your festival batch order for <strong>{selectedFestival.name}</strong> has been added to your cart with guaranteed dispatch on <strong>{targetDate}</strong>.
            </p>
            <div className="inline-block px-4 py-2 bg-emerald-50 text-emerald-800 text-xs font-mono rounded-lg border border-emerald-200">
              PRIORITY-PREORDER-CONFIRMED
            </div>
          </div>
        ) : (
          <div className="p-6 md:p-8 space-y-6">
            {/* Festival Selector Tabs */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-brown/70 mb-3">
                1. Select Festival Mahotsav
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {UPCOMING_FESTIVALS.map((fest) => {
                  const isSelected = selectedFestival.id === fest.id;
                  return (
                    <button
                      key={fest.id}
                      type="button"
                      onClick={() => setSelectedFestival(fest)}
                      className={`text-left p-3.5 rounded-2xl border transition-all ${
                        isSelected
                          ? 'border-saffron bg-saffron/10 ring-2 ring-saffron/30'
                          : 'border-amber-200/70 hover:border-saffron/50 bg-cream/30'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold text-saffron mb-1">
                        <span>{fest.season}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-saffron/30">
                          {fest.badge}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-dark-brown">{fest.name}</h4>
                      <p className="text-xs text-dark-brown/60 mt-1">{fest.dateStr}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Festival Perks & Recommendation */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
              <div className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-dark-brown">
                    Featured Delicacy: {selectedFestival.sweetRecommendation}
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {selectedFestival.perks.map((perk, idx) => (
                      <li key={idx} className="text-xs text-dark-brown/80 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleBookPreOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-dark-brown mb-1.5">
                    Target Delivery Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="w-full pl-3 pr-3 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron bg-white text-dark-brown"
                    />
                  </div>
                  <span className="text-[11px] text-dark-brown/50 mt-1 block">
                    Must be min. {selectedFestival.minimumAdvanceDays} days ahead
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-dark-brown mb-1.5">
                    Destination Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 110001, 400050"
                    value={recipientPincode}
                    onChange={(e) => setRecipientPincode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron bg-white text-dark-brown"
                  />
                  <span className="text-[11px] text-dark-brown/50 mt-1 block">
                    Pan-India temperature-controlled express
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-dark-brown mb-1.5">
                  Number of Hampers / Gift Boxes
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 5, 10, 25].map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setBoxQuantity(qty)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        boxQuantity === qty
                          ? 'bg-dark-brown text-gold shadow-sm'
                          : 'bg-amber-100/50 text-dark-brown hover:bg-amber-100'
                      }`}
                    >
                      {qty} {qty === 1 ? 'Box' : 'Boxes'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total & Submit */}
              <div className="pt-4 border-t border-amber-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-dark-brown/60 block">Estimated Pre-Order Deposit</span>
                  <div className="text-2xl font-serif font-bold text-dark-brown">
                    ₹{boxQuantity * 950}
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-saffron hover:bg-saffron/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  Confirm Pre-Order Slot
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
