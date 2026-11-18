'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Sparkles, ArrowRight, ArrowLeft, Check, ShoppingBag, Heart, Star, RefreshCw } from 'lucide-react';
import { PRODUCTS, SweetProduct } from '@/data/sweetsData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface MithaiRecommenderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MithaiRecommenderModal({ isOpen, onClose }: MithaiRecommenderModalProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [answers, setAnswers] = useState({
    occasion: '',
    tastePreference: '',
    sweetnessLevel: '',
  });

  if (!isOpen) return null;

  const handleSelect = (key: 'occasion' | 'tastePreference' | 'sweetnessLevel', value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (step < 3) {
      setStep((prev) => (prev + 1) as any);
    } else {
      setStep(4);
    }
  };

  const resetQuiz = () => {
    setAnswers({ occasion: '', tastePreference: '', sweetnessLevel: '' });
    setStep(1);
  };

  // Compute matched recommendations based on user answers
  const getRecommendations = (): { product: SweetProduct; matchPercent: number; matchReason: string }[] => {
    return PRODUCTS.filter((p) => p.category !== 'hampers')
      .map((product) => {
        let score = 70;
        let reasons: string[] = [];

        // Match taste
        if (answers.tastePreference === 'dry-fruit' && product.category === 'dry-fruit') {
          score += 20;
          reasons.push('Rich in California almonds & cashews');
        } else if (answers.tastePreference === 'pure-ghee' && product.isPureGhee) {
          score += 20;
          reasons.push('100% Churned Cow Desi Ghee');
        } else if (answers.tastePreference === 'bengali' && product.category === 'bengali') {
          score += 20;
          reasons.push('Fresh chhena & rose-cardamom syrup');
        } else if (answers.tastePreference === 'namkeen' && product.category === 'namkeen') {
          score += 20;
          reasons.push('Crunchy spiced Rajasthani sev');
        }

        // Match sweetness / health
        if (answers.sweetnessLevel === 'sugar-free') {
          if (product.badge === 'Zero Sugar' || product.name.includes('Anjeer')) {
            score += 25;
            reasons.push('Zero refined sugar, naturally fig-sweetened');
          } else {
            score -= 30;
          }
        } else if (answers.sweetnessLevel === 'mild' && (product.category === 'bengali' || product.category === 'dry-fruit')) {
          score += 15;
          reasons.push('Balanced, delicate sweetness');
        } else if (answers.sweetnessLevel === 'traditional' && product.isPureGhee) {
          score += 15;
          reasons.push('Authentic royal festive sweetness');
        }

        // Match occasion
        if (answers.occasion === 'wedding-gifting' && (product.isBestSeller || product.badge)) {
          score += 10;
          reasons.push('Top choice for festive gift boxes');
        } else if (answers.occasion === 'health' && product.badge === 'Zero Sugar') {
          score += 15;
          reasons.push('Healthy & guilt-free indulgence');
        }

        const matchPercent = Math.min(99, Math.max(65, score));
        const matchReason = reasons.length > 0 ? reasons[0] : 'Handcrafted generational recipe';
        return { product, matchPercent, matchReason };
      })
      .sort((a, b) => b.matchPercent - a.matchPercent)
      .slice(0, 3);
  };

  const recommendations = getRecommendations();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-cream-light rounded-3xl overflow-hidden shadow-2xl border border-gold/40 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-dark-brown text-cream flex items-center justify-between border-b border-gold/25">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-saffron" />
            <h3 className="font-serif font-bold text-lg text-cream">
              Mithai Sommelier • Find Your Sweet Match
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-cream/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-cream px-6 py-2 border-b border-gold/20 flex items-center justify-between text-xs font-bold text-dark-brown/70">
          <span>Question {step > 3 ? '3' : step} of 3</span>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`w-6 h-1.5 rounded-full transition-all ${
                  step >= s ? 'bg-saffron' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quiz Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-saffron font-bold block">
                Step 1 of 3
              </span>
              <h4 className="text-2xl font-serif font-black text-dark-brown">
                Who are you ordering these sweets for?
              </h4>
              <p className="text-xs sm:text-sm text-dark-brown/75">
                Tell us the occasion so we can tailor the texture, packaging, and shelf-life.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'self-treat', title: 'Personal Treat & Cravings', desc: 'Indulgent, comforting sweets for home' },
                  { id: 'family-celebration', title: 'Family Festival / Puja', desc: 'Auspicious prasad & traditional mithai' },
                  { id: 'wedding-gifting', title: 'Wedding & Royal Gifting', desc: 'Luxury presentation, silver leaf, royal boxes' },
                  { id: 'health', title: 'Health Conscious / Diabetic', desc: 'Guilt-free, zero refined sugar, nutritious figs' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect('occasion', opt.id)}
                    className="p-4 rounded-2xl border border-gold/30 bg-white hover:border-saffron hover:bg-cream/60 transition-all text-left group shadow-sm"
                  >
                    <h5 className="font-serif font-bold text-dark-brown text-sm group-hover:text-saffron">
                      {opt.title}
                    </h5>
                    <p className="text-[11px] text-dark-brown/65 mt-1 leading-snug">
                      {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-dark-brown/60 hover:text-saffron flex items-center gap-1 font-bold mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <span className="text-xs uppercase tracking-wider text-saffron font-bold block">
                Step 2 of 3
              </span>
              <h4 className="text-2xl font-serif font-black text-dark-brown">
                What flavor & texture profile do you crave?
              </h4>
              <p className="text-xs sm:text-sm text-dark-brown/75">
                Every sweet has its own signature halwai technique.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'pure-ghee', title: '100% Desi Ghee Melt-in-Mouth', desc: 'Golden Motichoor, Gulab Jamun, slow-simmered khoya' },
                  { id: 'dry-fruit', title: 'Royal Nutty Crunch & Fudge', desc: 'Goan Cashews, California Almonds, Iranian Pistachios' },
                  { id: 'bengali', title: 'Light, Spongy & Syrupy', desc: 'Fresh cottage cheese chhena soaked in rose & cardamom' },
                  { id: 'namkeen', title: 'Crispy & Spicy Savory Contrast', desc: 'Ratlami clove sev, roasted peanuts & spiced mixture' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect('tastePreference', opt.id)}
                    className="p-4 rounded-2xl border border-gold/30 bg-white hover:border-saffron hover:bg-cream/60 transition-all text-left group shadow-sm"
                  >
                    <h5 className="font-serif font-bold text-dark-brown text-sm group-hover:text-saffron">
                      {opt.title}
                    </h5>
                    <p className="text-[11px] text-dark-brown/65 mt-1 leading-snug">
                      {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-dark-brown/60 hover:text-saffron flex items-center gap-1 font-bold mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <span className="text-xs uppercase tracking-wider text-saffron font-bold block">
                Step 3 of 3
              </span>
              <h4 className="text-2xl font-serif font-black text-dark-brown">
                What is your preferred sweetness level?
              </h4>
              <p className="text-xs sm:text-sm text-dark-brown/75">
                From zero-sugar figs to rich traditional Mughal recipes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { id: 'traditional', title: 'Authentic Traditional', desc: 'Rich, celebratory sweetness for true mithai connoisseurs' },
                  { id: 'mild', title: 'Mild & Balanced', desc: 'Subtle sweetness allowing the pure milk & nuts to shine' },
                  { id: 'sugar-free', title: '100% Sugar-Free', desc: 'Naturally sweetened with sun-dried Afghan figs, zero sugar' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect('sweetnessLevel', opt.id)}
                    className="p-4 rounded-2xl border border-gold/30 bg-white hover:border-saffron hover:bg-cream/60 transition-all text-left group shadow-sm"
                  >
                    <h5 className="font-serif font-bold text-dark-brown text-sm group-hover:text-saffron">
                      {opt.title}
                    </h5>
                    <p className="text-[11px] text-dark-brown/65 mt-1 leading-snug">
                      {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-saffron font-bold block">
                    Curated For You
                  </span>
                  <h4 className="text-2xl font-serif font-black text-dark-brown">
                    Your Personalized Sweet Matches
                  </h4>
                </div>
                <button
                  onClick={resetQuiz}
                  className="px-3 py-1.5 rounded-full bg-cream hover:bg-gold/20 text-dark-brown border border-gold/30 text-xs font-bold flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3 text-saffron" />
                  <span>Retake Quiz</span>
                </button>
              </div>

              <div className="space-y-3.5">
                {recommendations.map(({ product, matchPercent, matchReason }) => (
                  <div
                    key={product.id}
                    className="p-3.5 bg-white rounded-2xl border border-gold/30 shadow-md flex items-center gap-3.5 group hover:border-saffron transition-all"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-dark shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-saffron text-white shadow-sm">
                        {matchPercent}% Match
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gold-dark font-bold uppercase">
                          {product.categoryLabel}
                        </span>
                        <span className="text-[10px] text-dark-brown/40">•</span>
                        <span className="text-[10px] text-dark-brown/60">{product.hindiName}</span>
                      </div>
                      <h5 className="font-serif font-bold text-dark-brown text-sm sm:text-base truncate group-hover:text-saffron">
                        {product.name}
                      </h5>
                      <p className="text-[11px] text-emerald-700 font-medium">
                        ✓ {matchReason}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-black text-dark-brown">
                          ₹{product.price} ({product.weightOptions[0].label})
                        </span>
                        <div className="flex items-center text-gold text-[10px]">
                          <Star className="w-3 h-3 fill-gold" />
                          <span className="font-bold ml-0.5">{product.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          addToCart(product, product.weightOptions[0].label, 1);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-saffron hover:bg-saffron-dark text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                      <button
                        onClick={() => toggleWishlist(product)}
                        className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center transition-all ${
                          isInWishlist(product.id)
                            ? 'bg-red-50 border-red-200 text-red-600'
                            : 'border-gold/30 hover:border-saffron text-dark-brown/70'
                        }`}
                        title="Save to Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? 'fill-red-600' : ''}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step < 4 && (
          <div className="p-4 bg-white border-t border-gold/30 flex items-center justify-between text-xs text-dark-brown/60">
            <span>Takes under 30 seconds • 100% Desi Ghee</span>
            <button
              onClick={() => setStep(4)}
              className="text-saffron font-bold hover:underline"
            >
              Skip to recommendations →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
