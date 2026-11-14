'use client';

import React, { useState } from 'react';
import { X, Star, Sparkles, CheckCircle2 } from 'lucide-react';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (review: {
    name: string;
    location: string;
    comment: string;
    rating: number;
    occasion: string;
  }) => void;
}

export default function AddReviewModal({ isOpen, onClose, onAddReview }: AddReviewModalProps) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [occasion, setOccasion] = useState('Diwali & Festival');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    onAddReview({
      name,
      location: location || 'India',
      comment,
      rating,
      occasion,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-cream-light rounded-3xl overflow-hidden shadow-2xl border border-gold/40 flex flex-col">
        {/* Header */}
        <div className="p-5 bg-dark-brown text-cream flex items-center justify-between border-b border-gold/25">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-saffron" />
            <h3 className="font-serif font-bold text-lg text-cream">
              Share Your Sweet Story
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-cream/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-xl text-dark-brown">
                Thank You for the Love!
              </h4>
              <p className="text-xs text-dark-brown/70 mt-1">
                Your review has been shared with the Modern Sweets community.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                  Overall Rating *
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'fill-gold text-gold' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-dark-brown ml-2">
                    {rating} out of 5 Stars
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Meera Kapoor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-gold/30 text-xs text-dark-brown focus:ring-2 focus:ring-saffron focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                    City / State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jaipur, Rajasthan"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-gold/30 text-xs text-dark-brown focus:ring-2 focus:ring-saffron focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                  Celebration Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gold/30 text-xs font-bold text-dark-brown focus:ring-2 focus:ring-saffron focus:outline-none"
                >
                  <option value="Diwali & Festive Gifting">Diwali & Festive Gifting</option>
                  <option value="Royal Wedding Celebration">Royal Wedding Celebration</option>
                  <option value="Family Birthday / Anniversary">Family Birthday / Anniversary</option>
                  <option value="Corporate Appreciation Gift">Corporate Appreciation Gift</option>
                  <option value="Everyday Sweet Craving">Everyday Sweet Craving</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                  Your Experience / Review *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us what you loved about the taste, aroma, desi ghee purity, or packaging..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gold/30 text-xs text-dark-brown focus:ring-2 focus:ring-saffron focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-saffron hover:bg-saffron-dark text-white font-bold text-xs shadow-md transition-all mt-2"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
