'use client';

import React, { useState } from 'react';
import { X, Gift, Sparkles, ShoppingBag, Check, Heart, Mail, CreditCard } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface GiftCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AMOUNTS = [500, 1000, 2500, 5000];

const CARD_THEMES = [
  { id: 'royal-gold', name: 'Royal Gold Shagun', bg: 'from-[#3E2723] via-[#4E342E] to-[#2A1810]', border: 'border-amber-400', tag: 'Festive & Auspicious' },
  { id: 'wedding-crimson', name: 'Jaipur Velvet Wedding', bg: 'from-[#6B1D2F] via-[#520B1C] to-[#380410]', border: 'border-amber-300', tag: 'Wedding Shagun' },
  { id: 'emerald-bliss', name: 'Emerald Celebration', bg: 'from-[#0B4F48] via-[#063833] to-[#02201D]', border: 'border-emerald-400', tag: 'Milestone & Blessing' },
];

export default function GiftCardModal({ isOpen, onClose }: GiftCardModalProps) {
  const { addCustomHamperToCart } = useCart();

  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState(CARD_THEMES[0]);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('Wishing you divine joy, sweet moments and good health!');

  if (!isOpen) return null;

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleAddGiftCard = () => {
    if (!recipientName || !recipientEmail) {
      alert('Please provide recipient name and email for digital delivery.');
      return;
    }
    if (finalAmount < 250) {
      alert('Minimum gift card amount is ₹250.');
      return;
    }

    const randomVoucherCode = `MS-GIFT-${Math.floor(1000 + Math.random() * 9000)}`;

    addCustomHamperToCart({
      name: `Modern Sweets E-Gift Card (₹${finalAmount})`,
      boxSize: `Digital Voucher (${randomVoucherCode})`,
      boxTheme: selectedTheme.name,
      price: finalAmount,
      slots: [`Voucher Code: ${randomVoucherCode}`, `Recipient: ${recipientName} (${recipientEmail})`, `Sender: ${senderName || 'Anonymous'}`],
      giftMessage: message,
      recipientName,
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-cream-light rounded-3xl overflow-hidden shadow-2xl border border-gold/40 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-dark-brown text-cream flex items-center justify-between border-b border-gold/25">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-saffron" />
            <h3 className="font-serif font-bold text-lg text-cream">
              Digital Mithai E-Gift Card
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Live Virtual Card Preview */}
          <div
            className={`p-6 rounded-3xl bg-gradient-to-br ${selectedTheme.bg} text-cream border-2 ${selectedTheme.border} shadow-xl relative overflow-hidden transition-all duration-500`}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block">
                  {selectedTheme.tag}
                </span>
                <h4 className="text-xl sm:text-2xl font-serif font-black tracking-wide text-white">
                  Modern <span className="text-saffron">Sweets</span>
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-cream/70 block uppercase">Card Value</span>
                <span className="text-2xl font-serif font-black text-amber-300">
                  ₹{finalAmount || 0}
                </span>
              </div>
            </div>

            <p className="text-xs italic text-cream/90 max-w-md mb-6 leading-relaxed">
              &ldquo;{message || 'Wishing you sweetness and joy!'}&rdquo;
            </p>

            <div className="flex justify-between items-end border-t border-white/20 pt-4 text-[11px]">
              <div>
                <span className="text-cream/60 block text-[9px] uppercase">For:</span>
                <span className="font-bold text-white">{recipientName || 'Recipient Name'}</span>
              </div>
              <div className="text-center">
                <span className="text-cream/60 block text-[9px] uppercase">From:</span>
                <span className="font-bold text-white">{senderName || 'Your Name'}</span>
              </div>
              <div className="text-right font-mono text-amber-200">
                <span className="text-cream/60 block text-[9px] font-sans uppercase">Valid:</span>
                <span>1 Year Pan-India</span>
              </div>
            </div>
          </div>

          {/* Form Options */}
          <div className="space-y-4">
            {/* Step 1: Denomination */}
            <div>
              <label className="text-xs font-bold text-dark-brown uppercase tracking-wider block mb-2">
                1. Select Gift Amount:
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-saffron text-white border-saffron shadow-sm'
                        : 'bg-white text-dark-brown border-gold/30 hover:border-gold'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Or enter custom amount (Min. ₹250)"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-gold/30 text-xs font-semibold text-dark-brown focus:ring-2 focus:ring-saffron"
              />
            </div>

            {/* Step 2: Theme Selector */}
            <div>
              <label className="text-xs font-bold text-dark-brown uppercase tracking-wider block mb-2">
                2. Choose Card Aesthetic:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CARD_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                      selectedTheme.id === theme.id
                        ? 'border-saffron bg-saffron/10 ring-2 ring-saffron/30 text-dark-brown'
                        : 'border-gold/30 bg-white hover:border-gold text-dark-brown/70'
                    }`}
                  >
                    <span className="block truncate">{theme.name}</span>
                    <span className="text-[10px] text-gold-dark font-normal block">{theme.tag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Recipient & Sender Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pooja Sharma"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gold/30 text-xs text-dark-brown focus:ring-2 focus:ring-saffron"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                  Recipient Email (For Instant Delivery) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="pooja@example.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gold/30 text-xs text-dark-brown focus:ring-2 focus:ring-saffron"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                  Your Name (Sender)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Amit Kapoor"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gold/30 text-xs text-dark-brown focus:ring-2 focus:ring-saffron"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                  Personal Greeting Message
                </label>
                <input
                  type="text"
                  placeholder="Sweet wishes for your special day..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gold/30 text-xs text-dark-brown focus:ring-2 focus:ring-saffron"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-gold/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-dark-brown/60 block">E-Gift Card Value:</span>
            <span className="text-xl font-serif font-black text-dark-brown">₹{finalAmount}</span>
          </div>

          <button
            onClick={handleAddGiftCard}
            className="px-6 py-2.5 rounded-xl bg-saffron hover:bg-saffron-dark text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-102"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add Gift Card to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
}
