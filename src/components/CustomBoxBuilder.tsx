'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Gift, Sparkles, Plus, Trash2, Check, RefreshCw, ShoppingBag, Heart } from 'lucide-react';
import { PRODUCTS, SweetProduct } from '@/data/sweetsData';
import { useCart } from '@/context/CartContext';

interface BoxOption {
  id: string;
  name: string;
  slotsCount: number;
  price: number;
  weightDesc: string;
}

const BOX_OPTIONS: BoxOption[] = [
  { id: 'box-4', name: '4-Slot Royal Classic', slotsCount: 4, price: 649, weightDesc: '~500g' },
  { id: 'box-6', name: '6-Slot Shahi Celebration', slotsCount: 6, price: 899, weightDesc: '~750g' },
  { id: 'box-9', name: '9-Slot Maharaja Imperial', slotsCount: 9, price: 1299, weightDesc: '~1.2kg' },
];

const BOX_THEMES = [
  { id: 'velvet-maroon', name: 'Royal Velvet Maroon', color: 'from-[#6B1D2F] to-[#450A19]', border: 'border-amber-400' },
  { id: 'jaipur-gold', name: 'Jaipur Gold Leaf', color: 'from-[#B38600] to-[#664C00]', border: 'border-amber-200' },
  { id: 'peacock-teal', name: 'Emerald Peacock', color: 'from-[#0B4F48] to-[#042824]', border: 'border-emerald-300' },
];

export default function CustomBoxBuilder() {
  const { addCustomHamperToCart } = useCart();
  const [selectedBox, setSelectedBox] = useState<BoxOption>(BOX_OPTIONS[1]); // Default 6 slots
  const [selectedTheme, setSelectedTheme] = useState(BOX_THEMES[0]);
  const [slots, setSlots] = useState<(SweetProduct | null)[]>(
    Array(BOX_OPTIONS[1].slotsCount).fill(null)
  );
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(0);
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [giftMessage, setGiftMessage] = useState('Wishing you abundant happiness, sweetness and health!');

  // Filter available sweets for the box
  const availableSweets = PRODUCTS.filter((p) => p.category !== 'hampers');

  // Handle Box Size Change
  const handleBoxChange = (box: BoxOption) => {
    setSelectedBox(box);
    setSlots(Array(box.slotsCount).fill(null));
    setActiveSlotIndex(0);
  };

  // Assign Sweet to Active Slot
  const handleSelectSweet = (sweet: SweetProduct) => {
    let targetIndex = activeSlotIndex;
    if (targetIndex === null || targetIndex >= selectedBox.slotsCount) {
      targetIndex = slots.findIndex((s) => s === null);
      if (targetIndex === -1) targetIndex = 0;
    }

    const newSlots = [...slots];
    newSlots[targetIndex] = sweet;
    setSlots(newSlots);

    // Auto advance to next empty slot
    const nextEmpty = newSlots.findIndex((s, idx) => s === null && idx > targetIndex);
    if (nextEmpty !== -1) {
      setActiveSlotIndex(nextEmpty);
    } else {
      const anyEmpty = newSlots.findIndex((s) => s === null);
      setActiveSlotIndex(anyEmpty !== -1 ? anyEmpty : null);
    }
  };

  // Remove sweet from slot
  const handleRemoveSlot = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
    setActiveSlotIndex(index);
  };

  // Auto-fill all slots with bestsellers
  const handleAutoFill = () => {
    const filled = Array(selectedBox.slotsCount)
      .fill(null)
      .map((_, i) => availableSweets[i % availableSweets.length]);
    setSlots(filled);
    setActiveSlotIndex(null);
  };

  // Clear all slots
  const handleClearAll = () => {
    setSlots(Array(selectedBox.slotsCount).fill(null));
    setActiveSlotIndex(0);
  };

  const filledCount = slots.filter(Boolean).length;
  const isComplete = filledCount === selectedBox.slotsCount;

  // Add to Bag
  const handleAddHamperToBag = () => {
    if (!isComplete) {
      alert(`Please fill all ${selectedBox.slotsCount} slots before adding to bag!`);
      return;
    }

    const slotNames = slots.map((s) => s?.name || 'Assorted Sweet');

    addCustomHamperToCart({
      name: `Custom ${selectedBox.name} (${selectedTheme.name})`,
      boxSize: `${selectedBox.name} (${selectedBox.weightDesc})`,
      boxTheme: selectedTheme.name,
      price: selectedBox.price,
      slots: slotNames,
      giftMessage: giftMessage || 'Warmest Wishes',
      recipientName: recipientName || 'Valued Family',
      image: slots[0]?.image || 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    });
  };

  return (
    <section id="custom-builder" className="py-16 sm:py-24 bg-gradient-to-b from-cream via-[#FFF7E3] to-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/15 border border-saffron/30 text-dark-brown text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-saffron" />
            <span>Interactive Hamper Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-dark-brown">
            Build Your Own Custom Mithai Box
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-saffron to-gold mx-auto my-3 rounded-full" />
          <p className="text-sm sm:text-base text-dark-brown/80">
            Handpick your family’s favorite sweets, choose an imperial velvet box finish, and add a personalized digital greeting card.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Box Visualizer & Greeting Card */}
          <div className="lg:col-span-7 space-y-6">
            {/* Box Exterior Container */}
            <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${selectedTheme.color} text-cream shadow-2xl border-4 ${selectedTheme.border} relative overflow-hidden transition-all duration-500`}>
              
              {/* Box Top Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/20">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-amber-300" />
                  <span className="font-serif font-bold text-sm sm:text-base text-amber-100">
                    Modern Sweets • {selectedTheme.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider text-amber-300/80 font-bold block">
                    {filledCount} of {selectedBox.slotsCount} Slots Filled
                  </span>
                  <span className="text-lg font-serif font-bold text-white">
                    ₹{selectedBox.price}
                  </span>
                </div>
              </div>

              {/* Slots Grid */}
              <div
                className={`grid gap-3.5 ${
                  selectedBox.slotsCount === 4
                    ? 'grid-cols-2'
                    : selectedBox.slotsCount === 6
                    ? 'grid-cols-2 sm:grid-cols-3'
                    : 'grid-cols-3'
                }`}
              >
                {slots.map((sweet, index) => {
                  const isActive = activeSlotIndex === index;

                  return (
                    <div
                      key={index}
                      onClick={() => setActiveSlotIndex(index)}
                      className={`relative aspect-square rounded-2xl p-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center overflow-hidden border-2 ${
                        isActive
                          ? 'border-amber-300 scale-102 ring-4 ring-amber-400/40 bg-white/20'
                          : sweet
                          ? 'border-white/30 bg-black/25 hover:border-amber-200'
                          : 'border-dashed border-white/40 bg-white/10 hover:bg-white/15'
                      }`}
                    >
                      {sweet ? (
                        <>
                          <div className="relative w-full h-full rounded-xl overflow-hidden">
                            <Image
                              src={sweet.image}
                              alt={sweet.name}
                              fill
                              sizes="120px"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          </div>

                          <div className="absolute bottom-2 inset-x-2">
                            <p className="text-[11px] font-bold text-cream line-clamp-1 leading-tight">
                              {sweet.name}
                            </p>
                            <span className="text-[9px] text-amber-300 font-medium">Slot #{index + 1}</span>
                          </div>

                          <button
                            onClick={(e) => handleRemoveSlot(index, e)}
                            className="absolute top-2 right-2 p-1 rounded-full bg-black/60 hover:bg-red-600 text-white transition-colors"
                            title="Remove from slot"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-amber-300">
                            <Plus className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-semibold text-cream/80">
                            Slot #{index + 1}
                          </span>
                          <span className="text-[9px] text-amber-300/80">Click to fill</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Box Footer Actions */}
              <div className="mt-6 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAutoFill}
                    className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-amber-200 flex items-center gap-1.5 font-bold transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Auto-Fill Bestsellers</span>
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-cream/80 font-bold transition-colors"
                  >
                    Clear Box
                  </button>
                </div>

                <span className="text-amber-200 font-bold">
                  {isComplete ? '✨ Box is Ready!' : `⚠️ Fill ${selectedBox.slotsCount - filledCount} more slot(s)`}
                </span>
              </div>
            </div>

            {/* Personalized Gift Message Card */}
            <div className="p-6 rounded-3xl bg-white border border-gold/30 shadow-md">
              <h4 className="font-serif font-bold text-dark-brown text-base mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-saffron" />
                <span>Personalized Greetings & Gifting Tag</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-[11px] font-bold text-dark-brown/70 uppercase block mb-1">
                    Recipient Name / Family:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Verma Family / Riya & Kunal"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-cream border border-gold/30 text-xs text-dark-brown focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-dark-brown/70 uppercase block mb-1">
                    Sent By (Sender Name):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. With love from Rajat & Family"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-cream border border-gold/30 text-xs text-dark-brown focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-dark-brown/70 uppercase block mb-1">
                  Card Message (Printed on gold-embossed card):
                </label>
                <textarea
                  rows={2}
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Your sweet heartfelt wishes..."
                  className="w-full px-3.5 py-2 rounded-xl bg-cream border border-gold/30 text-xs text-dark-brown focus:outline-none focus:ring-2 focus:ring-saffron resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls & Sweet Selector */}
          <div className="lg:col-span-5 space-y-6">
            {/* Step 1: Choose Box Size */}
            <div className="p-5 rounded-3xl bg-white border border-gold/30 shadow-md">
              <span className="text-[11px] font-bold text-saffron uppercase tracking-wider block mb-2">
                Step 1: Choose Box Size
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {BOX_OPTIONS.map((box) => (
                  <button
                    key={box.id}
                    onClick={() => handleBoxChange(box)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      selectedBox.id === box.id
                        ? 'border-saffron bg-saffron/10 text-dark-brown font-bold shadow-sm'
                        : 'border-gold/30 bg-cream-light/60 hover:border-gold text-dark-brown/80'
                    }`}
                  >
                    <span className="text-sm font-black block font-serif">{box.slotsCount} Sweets</span>
                    <span className="text-[11px] text-gold-dark font-bold block">{box.weightDesc}</span>
                    <span className="text-xs font-bold text-dark-brown block mt-1">₹{box.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Box Velvet Theme */}
            <div className="p-5 rounded-3xl bg-white border border-gold/30 shadow-md">
              <span className="text-[11px] font-bold text-saffron uppercase tracking-wider block mb-2">
                Step 2: Choose Box Cover Finish
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {BOX_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center ${
                      selectedTheme.id === theme.id
                        ? 'border-saffron ring-2 ring-saffron/40 bg-saffron/5'
                        : 'border-gold/30 hover:border-gold'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${theme.color} mb-1.5 shadow-sm border border-white`} />
                    <span className="text-[11px] font-bold text-dark-brown line-clamp-1">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Pick Sweets to Fill */}
            <div className="p-5 rounded-3xl bg-white border border-gold/30 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-[11px] font-bold text-saffron uppercase tracking-wider block">
                    Step 3: Select Delicacy to Add
                  </span>
                  <p className="text-xs text-dark-brown/70">
                    Filling {activeSlotIndex !== null ? `Slot #${activeSlotIndex + 1}` : 'Any Available Slot'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {availableSweets.map((sweet) => (
                  <button
                    key={sweet.id}
                    onClick={() => handleSelectSweet(sweet)}
                    className="p-2 rounded-2xl border border-gold/25 hover:border-saffron hover:bg-cream/60 transition-all flex items-center gap-2.5 text-left group"
                  >
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 bg-cream">
                      <Image
                        src={sweet.image}
                        alt={sweet.name}
                        fill
                        sizes="44px"
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h5 className="text-xs font-bold text-dark-brown truncate group-hover:text-saffron">
                        {sweet.name}
                      </h5>
                      <span className="text-[10px] text-gold-dark font-medium block">
                        {sweet.categoryLabel}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add Custom Hamper to Bag CTA */}
            <div className="p-5 rounded-3xl bg-dark-brown text-cream border border-gold/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-300 font-bold uppercase block">
                    Hamper Total
                  </span>
                  <span className="text-2xl font-serif font-black text-white">
                    ₹{selectedBox.price}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-cream/70 block">
                    {filledCount} of {selectedBox.slotsCount} items
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    {isComplete ? 'Ready to Add' : 'Incomplete'}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddHamperToBag}
                disabled={!isComplete}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                  isComplete
                    ? 'bg-saffron hover:bg-saffron-dark text-white shadow-saffron/30 hover:scale-102'
                    : 'bg-white/20 text-cream/50 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {isComplete
                    ? `Add Custom Box to Bag (₹${selectedBox.price})`
                    : `Fill All ${selectedBox.slotsCount} Slots to Add`}
                </span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
