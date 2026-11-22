'use client';

import React, { useState } from 'react';
import { X, Sparkles, Gift, Check, ArrowRight, Trophy, Flame } from 'lucide-react';

interface ShagunWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon?: (code: string) => void;
}

interface Prize {
  label: string;
  code: string;
  desc: string;
  color: string;
}

const PRIZES: Prize[] = [
  { label: '10% OFF', code: 'KESAR10', desc: '10% Royal Festive Discount', color: '#FF9933' },
  { label: 'FREE DIYA', code: 'FREE-DIYA', desc: 'Handcrafted Brass Diya Pair', color: '#D4A017' },
  { label: '₹75 OFF', code: 'MITHAI75', desc: 'Flat ₹75 Off Any Mithai Box', color: '#E68019' },
  { label: '15% VIP', code: 'ROYAL15', desc: '15% Shahi Celebration Discount', color: '#B38600' },
  { label: 'FREE AIR SHIP', code: 'FREESHIP', desc: 'Complimentary Express Air Delivery', color: '#FF9933' },
  { label: '20% OFF', code: 'FESTIVE20', desc: '20% Off Festive Gift Hampers', color: '#D4A017' },
];

export default function ShagunWheelModal({ isOpen, onClose, onApplyCoupon }: ShagunWheelModalProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setWonPrize(null);
    setCopied(false);

    // Pick a winning slice randomly
    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const sliceAngle = 360 / PRIZES.length;
    // Extra 5 full rotations + slice offset
    const randomExtraSpins = 5 * 360;
    const targetAngle = randomExtraSpins + (PRIZES.length - prizeIndex - 0.5) * sliceAngle;

    setRotation(targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setWonPrize(PRIZES[prizeIndex]);
    }, 4000);
  };

  const handleCopyCode = () => {
    if (!wonPrize) return;
    navigator.clipboard?.writeText(wonPrize.code);
    setCopied(true);
    if (onApplyCoupon) {
      onApplyCoupon(wonPrize.code);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-cream-light rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/40 flex flex-col items-center p-6 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-dark-brown shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron/15 text-saffron text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Auspicious Shagun Blessing</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-black text-dark-brown">
            Spin the Shubh Shagun Wheel
          </h3>
          <p className="text-xs text-dark-brown/70 max-w-xs mx-auto mt-1">
            Every spin wins an auspicious festive blessing, discount code, or complimentary brass diya!
          </p>
        </div>

        {/* The Royal Wheel Visualizer */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 my-3 flex items-center justify-center">
          {/* Wheel Pointer Indicator */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-red-600 drop-shadow-md" />

          {/* Rotating Wheel Disc */}
          <div
            className="w-full h-full rounded-full border-4 border-gold shadow-2xl relative overflow-hidden transition-transform duration-[4000ms] cubic-bezier(0.15, 0.9, 0.25, 1)"
            style={{
              transform: `rotate(${rotation}deg)`,
              background: 'conic-gradient(#FF9933 0deg 60deg, #3E2723 60deg 120deg, #D4A017 120deg 180deg, #E68019 180deg 240deg, #4E342E 240deg 300deg, #B38600 300deg 360deg)',
            }}
          >
            {PRIZES.map((prize, idx) => {
              const angle = (360 / PRIZES.length) * idx + 30;
              return (
                <div
                  key={prize.code}
                  className="absolute inset-0 flex items-start justify-center pt-5 text-white font-serif font-black text-xs sm:text-sm tracking-wider"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: '50% 50%',
                  }}
                >
                  <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {prize.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Golden Center Hub */}
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-gold-dark via-gold to-amber-200 border-4 border-white shadow-xl flex items-center justify-center text-dark-brown font-serif font-black text-xs z-10">
            <Sparkles className="w-6 h-6 text-dark-brown" />
          </div>
        </div>

        {/* Won Prize Notification */}
        {wonPrize && (
          <div className="w-full mt-2 p-4 rounded-2xl bg-white border border-gold/40 shadow-md animate-bounce space-y-2">
            <div className="flex items-center justify-center gap-2 text-saffron font-bold text-sm">
              <Trophy className="w-5 h-5 text-gold-dark" />
              <span>Auspicious Shagun Won: {wonPrize.desc}!</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono font-black text-base px-3 py-1 bg-cream rounded-xl border border-gold/40 text-dark-brown">
                {wonPrize.code}
              </span>
              <button
                onClick={handleCopyCode}
                className="px-4 py-1.5 rounded-xl bg-saffron hover:bg-saffron-dark text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{copied ? 'Copied & Applied!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Spin CTA Button */}
        <button
          onClick={handleSpin}
          disabled={spinning}
          className={`w-full max-w-xs mt-4 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
            spinning
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-saffron hover:bg-saffron-dark text-white shadow-saffron/30 hover:scale-105 active:scale-95'
          }`}
        >
          <Flame className="w-4 h-4 fill-white" />
          <span>{spinning ? 'Seeking Halwai Shagun...' : 'Spin Auspicious Wheel'}</span>
        </button>

        <p className="text-[10px] text-dark-brown/60 mt-3">
          1 Free Spin Per Customer Session • Valid on All Online Delicacies & Hampers
        </p>
      </div>
    </div>
  );
}
