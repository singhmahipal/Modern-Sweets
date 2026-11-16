'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsAppCTA() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5">
      {/* Tooltip / Prompt bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-emerald-500/30 text-dark-brown shadow-xl text-xs font-semibold animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Need help choosing sweets? Chat on WhatsApp!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-dark-brown/40 hover:text-dark-brown ml-1"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919876543210?text=Namaste%20Modern%20Sweets!%20I%20would%20like%20to%20inquire%20about%20sweets%20and%20fresh%20delivery."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
      </a>
    </div>
  );
}
