'use client';

import React, { useState } from 'react';
import { X, Sparkles, Check, Crown, Palette, Type } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface BoxPersonalizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SLEEVE_THEMES = [
  { id: 'royal-maroon', name: 'Awadhi Maroon & Zari Gold', bgClass: 'from-amber-900 via-rose-950 to-amber-950', borderClass: 'border-amber-400' },
  { id: 'rajputana-saffron', name: 'Mewari Kesar Gold', bgClass: 'from-amber-600 via-orange-700 to-amber-800', borderClass: 'border-amber-300' },
  { id: 'emerald-mughal', name: 'Nawabi Panna Emerald', bgClass: 'from-emerald-900 via-teal-950 to-green-950', borderClass: 'border-emerald-400' },
  { id: 'midnight-shahi', name: 'Jaipur Midnight Blue & Silver', bgClass: 'from-slate-900 via-indigo-950 to-blue-950', borderClass: 'border-slate-300' },
];

const RIBBON_MATERIALS = [
  { id: 'raw-silk', name: 'Banarasi Raw Silk Ribbon', fee: 50 },
  { id: 'golden-zari', name: 'Hand-Woven Zari Thread', fee: 80 },
  { id: 'velvet-crimson', name: 'Royal Crimson Velvet Ribbon', fee: 100 },
];

export default function BoxPersonalizerModal({ isOpen, onClose }: BoxPersonalizerModalProps) {
  const { addCustomHamperToCart } = useCart();
  const [selectedTheme, setSelectedTheme] = useState(SLEEVE_THEMES[0]);
  const [familyCrest, setFamilyCrest] = useState('THE SHARMA DYNASTY');
  const [personalMessage, setPersonalMessage] = useState('With Best Compliments & Sweetest Blessings');
  const [selectedRibbon, setSelectedRibbon] = useState(RIBBON_MATERIALS[0]);
  const [isEngraved, setIsEngraved] = useState(false);

  if (!isOpen) return null;

  const handleApplyPersonalization = () => {
    // Add bespoke customized keepsake box
    addCustomHamperToCart({
      name: `Bespoke Monogrammed Keepsake Mithai Box (${selectedTheme.name})`,
      boxSize: '16-Slot Royal Keepsake Box',
      boxTheme: `${selectedTheme.name} with ${selectedRibbon.name}`,
      price: 1250 + selectedRibbon.fee,
      slots: ['Swarna Kaju Katli', 'Kesar Peda', 'Pista Roll', 'Badam Halwa'],
      giftMessage: personalMessage,
      recipientName: familyCrest,
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600',
    });

    setIsEngraved(true);
    setTimeout(() => {
      setIsEngraved(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gold/20 flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-dark-brown via-amber-950 to-dark-brown p-6 text-cream rounded-t-3xl border-b border-gold/20">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-cream/80 hover:text-cream bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-semibold uppercase tracking-wider mb-2">
            <Crown className="w-3.5 h-3.5 text-gold" />
            Royal Atelier
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-cream">
            Bespoke Box & Monogram Studio
          </h2>
          <p className="text-xs md:text-sm text-cream/80 mt-1">
            Design an opulent heirloom keepsake box with hot-stamped gold foil family crest, customized ribbon, and greeting sleeve.
          </p>
        </div>

        {isEngraved ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-gold/20 text-gold rounded-full flex items-center justify-center mx-auto border border-gold/40">
              <Sparkles className="w-8 h-8 text-saffron" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-dark-brown">Heirloom Box Tailored!</h3>
            <p className="text-sm text-dark-brown/70 max-w-md mx-auto">
              Your customized box with crest <strong>&ldquo;{familyCrest}&rdquo;</strong> has been added to your bag. Our artisan bookbinders will engrave it before packing.
            </p>
          </div>
        ) : (
          <div className="p-6 md:p-8 space-y-8">
            {/* Live Interactive 3D/Box Preview */}
            <div className="relative rounded-2xl p-8 overflow-hidden shadow-2xl border-2 border-gold/40 transition-all duration-500 bg-gradient-to-br min-h-[220px] flex flex-col items-center justify-center text-center">
              {/* Dynamic Theme Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${selectedTheme.bgClass} opacity-95`} />
              
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Ribbon Graphic */}
              <div className="absolute top-0 bottom-0 left-12 w-8 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-lg border-x border-amber-300 opacity-90" />

              <div className="relative z-10 max-w-md mx-auto px-6 py-4 rounded-xl border border-gold/40 bg-black/40 backdrop-blur-md text-cream shadow-xl">
                <Crown className="w-6 h-6 text-gold mx-auto mb-2" />
                <h3 className="font-serif font-bold text-lg md:text-xl tracking-widest text-gold uppercase border-b border-gold/30 pb-2">
                  {familyCrest || 'YOUR CREST / MONOGRAM'}
                </h3>
                <p className="text-xs text-cream/90 italic mt-2.5 font-serif">
                  &ldquo;{personalMessage || 'Your bespoke blessing or gift note...'}&rdquo;
                </p>
                <div className="mt-3 text-[10px] uppercase font-mono tracking-wider text-gold/80 flex items-center justify-center gap-2">
                  <span>Theme: {selectedTheme.name}</span>
                  <span>•</span>
                  <span>Ribbon: {selectedRibbon.name}</span>
                </div>
              </div>
            </div>

            {/* Customizer Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Theme & Ribbon */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-dark-brown/70 flex items-center gap-1.5 mb-2">
                    <Palette className="w-4 h-4 text-saffron" />
                    Sleeve Silk Finish
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SLEEVE_THEMES.map((theme) => {
                      const isSelected = selectedTheme.id === theme.id;
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => setSelectedTheme(theme)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                            isSelected
                              ? 'border-saffron bg-saffron/10 font-bold ring-2 ring-saffron/20'
                              : 'border-amber-200 hover:border-amber-300 bg-cream/30'
                          }`}
                        >
                          <span className="block truncate">{theme.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-dark-brown/70 flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-4 h-4 text-gold" />
                    Tie Ribbon Material
                  </label>
                  <div className="space-y-1.5">
                    {RIBBON_MATERIALS.map((ribbon) => {
                      const isSelected = selectedRibbon.id === ribbon.id;
                      return (
                        <button
                          key={ribbon.id}
                          type="button"
                          onClick={() => setSelectedRibbon(ribbon)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                            isSelected
                              ? 'border-saffron bg-saffron/10 font-bold'
                              : 'border-amber-200 hover:border-amber-300'
                          }`}
                        >
                          <span>{ribbon.name}</span>
                          <span className="text-[11px] font-mono text-dark-brown/60">+₹{ribbon.fee}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Crest Text & Message */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-dark-brown/70 flex items-center gap-1.5 mb-1.5">
                    <Type className="w-4 h-4 text-saffron" />
                    Hot-Stamped Gold Crest / Name
                  </label>
                  <input
                    type="text"
                    maxLength={32}
                    value={familyCrest}
                    onChange={(e) => setFamilyCrest(e.target.value)}
                    placeholder="e.g. THE KAPOOR FAMILY, AAKASH & MEERA"
                    className="w-full px-3 py-2.5 rounded-xl border border-amber-200 text-xs font-bold uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                  <span className="text-[10px] text-dark-brown/50 mt-1 block">
                    Max 32 characters in embossed gold leaf
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-dark-brown/70 flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-4 h-4 text-saffron" />
                    Sleeve Blessing / Gift Note
                  </label>
                  <textarea
                    rows={3}
                    maxLength={100}
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    placeholder="e.g. Celebrating the beginning of lifetime memories together..."
                    className="w-full px-3 py-2 rounded-xl border border-amber-200 text-xs focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                  <span className="text-[10px] text-dark-brown/50 mt-1 block">
                    Printed on ivory textured deckle-edge card inside sleeve
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-dark-brown/60 block">Complete Bespoke Hamper</span>
                <div className="text-2xl font-serif font-bold text-dark-brown">
                  ₹{1250 + selectedRibbon.fee}
                </div>
              </div>

              <button
                onClick={handleApplyPersonalization}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dark-brown hover:bg-saffron text-gold hover:text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <Check className="w-4 h-4" />
                Add Monogrammed Box to Bag
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
