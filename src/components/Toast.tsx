'use client';

import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-dark-brown text-cream border border-gold/40 shadow-2xl animate-bounce">
      <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs font-bold text-cream">{toastMessage}</p>
        <p className="text-[10px] text-gold-light">Added to your sweets bag</p>
      </div>
    </div>
  );
}
