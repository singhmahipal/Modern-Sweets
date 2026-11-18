'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Gift,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  Calculator,
  ShieldCheck,
  Building2,
  Heart,
  Send,
  Star,
  Download,
} from 'lucide-react';

interface TierOption {
  id: string;
  name: string;
  basePrice: number;
  weight: string;
  desc: string;
  contents: string[];
  image: string;
}

const HAMPERS: TierOption[] = [
  {
    id: 'silver',
    name: 'Shubh Shuruat Silver Hamper',
    basePrice: 499,
    weight: '600g Assorted',
    desc: 'Classic gold foil keepsake box designed for festive return gifts and pooja offerings.',
    contents: ['Shahi Kaju Katli (200g)', 'Desi Ghee Motichoor Ladoo (200g)', 'Ratlami Sev Crisp (200g)', 'Custom Greeting Card'],
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'gold',
    name: 'Rajwada Gold Heritage Hamper',
    basePrice: 899,
    weight: '1.0 kg Luxury',
    desc: 'Embossed emerald & gold lacquer box with silk ribbon ties for wedding invitations & executives.',
    contents: ['Kaju Katli (250g)', 'Motichoor Ladoo (250g)', 'Anjeer Dry Fruit Barfi (250g)', 'Roasted Salted Cashews & Almonds (250g)', 'Brass Diya Pair'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'maharaja',
    name: 'Maharaja Imperial Velvet Box',
    basePrice: 1499,
    weight: '1.8 kg Imperial',
    desc: 'Heavy velvet handcrafted chest with royal brass corners and silk lining. The zenith of luxury gifting.',
    contents: ['Kaju Pista Roll (300g)', 'Kesar Mathura Peda (300g)', 'Shahi Milk Cake (300g)', 'California Almonds & Afghan Figs (400g)', 'Silver Plated Coin', 'Handcrafted Brass Diya Pair'],
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
  },
];

export default function GiftingPage() {
  const [selectedTier, setSelectedTier] = useState<TierOption>(HAMPERS[1]); // Gold default
  const [quantity, setQuantity] = useState<number>(100);
  const [includeBrassDiya, setIncludeBrassDiya] = useState<boolean>(true);
  const [includeCustomSleeve, setIncludeCustomSleeve] = useState<boolean>(true);
  const [includeSilverCoin, setIncludeSilverCoin] = useState<boolean>(false);

  // Form State
  const [clientName, setClientName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [occasion, setOccasion] = useState('Royal Wedding Gifting');
  const [submitted, setSubmitted] = useState(false);

  // Volume discount rules
  let discountPercent = 0;
  if (quantity >= 1000) discountPercent = 25;
  else if (quantity >= 500) discountPercent = 20;
  else if (quantity >= 250) discountPercent = 15;
  else if (quantity >= 100) discountPercent = 10;
  else if (quantity >= 50) discountPercent = 5;

  let unitAddons = 0;
  if (includeCustomSleeve) unitAddons += 35;
  if (includeBrassDiya) unitAddons += 60;
  if (includeSilverCoin) unitAddons += 220;

  const unitBase = selectedTier.basePrice + unitAddons;
  const unitDiscount = Math.round((unitBase * discountPercent) / 100);
  const effectiveUnitPrice = unitBase - unitDiscount;
  const totalCost = effectiveUnitPrice * quantity;
  const totalSavings = unitDiscount * quantity;

  const generateWhatsAppInquiry = () => {
    const text = `Namaste Modern Sweets! I would like to inquire about Bulk Gifting:%0a%0a` +
      `*Hamper:* ${selectedTier.name}%0a` +
      `*Quantity:* ${quantity} boxes%0a` +
      `*Occasion:* ${occasion}%0a` +
      `*Custom Logo Sleeve:* ${includeCustomSleeve ? 'Yes' : 'No'}%0a` +
      `*Brass Diya:* ${includeBrassDiya ? 'Yes' : 'No'}%0a` +
      `*Estimated Total:* ₹${totalCost.toLocaleString('en-IN')}%0a%0a` +
      `Please connect with the corporate gifting concierge.`;
    return text;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=60"
            alt="Royal Festive Hampers"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/20 border border-saffron/40 text-saffron text-xs font-bold uppercase tracking-wider mb-4">
            <Gift className="w-4 h-4" />
            <span>Royal Wedding & Corporate Gifting Concierge</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black leading-tight mb-4">
            Where Sacred Unions & Gratitude Meet <span className="text-saffron">Imperial Sweetness</span>
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto leading-relaxed">
            Delivering bespoke festive hampers, gold-foil custom branded boxes, and fresh pure desi ghee delicacies across India and overseas.
          </p>
        </div>
      </section>

      {/* Corporate Clients & Wedding Venues Trust Bar */}
      <section className="py-8 bg-dark-brown/95 text-gold-light border-y border-gold/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-cream/60 block mb-4">
            Trusted by Prestigious Families & Corporate Enterprises Since 1985
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 font-serif text-sm sm:text-base font-bold text-cream/80">
            <span>Tata Consultancy Services</span>
            <span>•</span>
            <span>Reliance Industries</span>
            <span>•</span>
            <span>Infosys Executive</span>
            <span>•</span>
            <span>The Oberoi & Taj Hotels</span>
            <span>•</span>
            <span>Royal Rajputana Weddings</span>
          </div>
        </div>
      </section>

      {/* Main Interactive Bulk Calculator Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/15 text-saffron text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-4 h-4" />
            <span>Interactive Cost & Savings Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-dark-brown">
            Bulk Gifting Calculator
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-saffron to-gold mx-auto my-3 rounded-full" />
          <p className="text-xs sm:text-sm text-dark-brown/75">
            Select your hamper tier, customize additions with company branding, and view instant volume-tiered wholesale savings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Hamper Selection & Customizations */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Select Hamper Tier */}
            <div className="p-6 rounded-3xl bg-white border border-gold/30 shadow-md">
              <span className="text-xs font-bold text-saffron uppercase tracking-wider block mb-3">
                1. Choose Hamper Tier
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {HAMPERS.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedTier.id === tier.id
                        ? 'border-saffron bg-saffron/10 ring-2 ring-saffron/30'
                        : 'border-gold/25 bg-cream/30 hover:border-gold'
                    }`}
                  >
                    <span className="text-xs font-black font-serif text-dark-brown block">
                      {tier.name}
                    </span>
                    <span className="text-[10px] text-gold-dark font-bold block mt-0.5">
                      {tier.weight}
                    </span>
                    <span className="text-sm font-black text-dark-brown mt-2 block">
                      ₹{tier.basePrice} / box
                    </span>
                  </button>
                ))}
              </div>

              {/* Selected Tier Details Preview */}
              <div className="mt-4 p-4 rounded-2xl bg-cream/60 border border-gold/20 flex gap-4 items-center">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={selectedTier.image}
                    alt={selectedTier.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-xs space-y-1 min-w-0">
                  <h4 className="font-bold text-dark-brown">{selectedTier.name}</h4>
                  <p className="text-dark-brown/70 text-[11px] line-clamp-1">{selectedTier.desc}</p>
                  <p className="text-[11px] text-gold-dark font-medium">
                    Includes: {selectedTier.contents.join(' • ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Quantity Selector */}
            <div className="p-6 rounded-3xl bg-white border border-gold/30 shadow-md">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-saffron uppercase tracking-wider block">
                  2. Quantity of Boxes
                </span>
                <span className="text-lg font-serif font-black text-dark-brown">
                  {quantity} Boxes
                </span>
              </div>

              <input
                type="range"
                min={25}
                max={2500}
                step={25}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-saffron cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-dark-brown/50 font-bold mt-1">
                <span>25 Boxes</span>
                <span>250 Boxes</span>
                <span>500 Boxes</span>
                <span>1,000 Boxes</span>
                <span>2,500+ Boxes</span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[50, 100, 250, 500, 1000].map((qty) => (
                  <button
                    key={qty}
                    onClick={() => setQuantity(qty)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                      quantity === qty
                        ? 'bg-dark-brown text-gold-light border-dark-brown'
                        : 'bg-cream text-dark-brown border-gold/30 hover:border-saffron'
                    }`}
                  >
                    {qty} Boxes
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Bespoke Custom Branding Add-ons */}
            <div className="p-6 rounded-3xl bg-white border border-gold/30 shadow-md">
              <span className="text-xs font-bold text-saffron uppercase tracking-wider block mb-3">
                3. Branding & Luxury Add-ons
              </span>
              <div className="space-y-2.5">
                {[
                  {
                    checked: includeCustomSleeve,
                    toggle: () => setIncludeCustomSleeve(!includeCustomSleeve),
                    title: 'Hot-Foil Embossed Custom Name / Corporate Logo Sleeve',
                    price: '+₹35 / box',
                  },
                  {
                    checked: includeBrassDiya,
                    toggle: () => setIncludeBrassDiya(!includeBrassDiya),
                    title: 'Handcrafted Heritage Brass Diya Pair with Festive Wick',
                    price: '+₹60 / box',
                  },
                  {
                    checked: includeSilverCoin,
                    toggle: () => setIncludeSilverCoin(!includeSilverCoin),
                    title: '99.9% Pure Silver Coin (Auspicious Lakshmi-Ganesh / 10g)',
                    price: '+₹220 / box',
                  },
                ].map((addon, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                      addon.checked
                        ? 'border-saffron bg-saffron/10 font-bold text-dark-brown'
                        : 'border-gold/25 bg-cream/20 text-dark-brown/70 hover:border-gold'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-xs">
                      <input
                        type="checkbox"
                        checked={addon.checked}
                        onChange={addon.toggle}
                        className="rounded text-saffron focus:ring-saffron"
                      />
                      <span>{addon.title}</span>
                    </div>
                    <span className="text-xs font-bold text-gold-dark shrink-0 ml-2">
                      {addon.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Calculation Summary & Action CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-dark-brown text-cream border-2 border-gold/40 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-gold/30 pb-4">
                <div>
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                    Instant Wholesale Quote
                  </span>
                  <h3 className="text-xl font-serif font-black text-cream">
                    Calculation Summary
                  </h3>
                </div>
                {discountPercent > 0 && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400 text-xs font-bold">
                    {discountPercent}% Volume Off
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-cream/80">Selected Box:</span>
                  <span className="font-bold text-cream">{selectedTier.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/80">Quantity:</span>
                  <span className="font-bold text-cream">{quantity} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/80">Unit Gross Rate:</span>
                  <span className="font-mono">₹{unitBase} / box</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Wholesale Tier Discount ({discountPercent}%):</span>
                    <span className="font-mono">-₹{unitDiscount} / box</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-gold/20 pt-2 font-bold">
                  <span className="text-cream/80">Net Unit Rate:</span>
                  <span className="text-amber-300 font-mono text-sm">₹{effectiveUnitPrice} / box</span>
                </div>
                {totalSavings > 0 && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex justify-between items-center font-bold">
                    <span>Total Volume Savings:</span>
                    <span>₹{totalSavings.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="pt-3 border-t-2 border-gold/40 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs text-cream/70 block">Estimated Final Budget:</span>
                    <span className="text-2xl font-serif font-black text-cream">
                      ₹{totalCost.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[10px] text-gold-light">Inclusive of GST</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={`https://wa.me/919876543210?text=${generateWhatsAppInquiry()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Quote on WhatsApp</span>
                </a>

                <a
                  href="#inquiry-form"
                  className="w-full py-3.5 px-4 rounded-xl bg-saffron hover:bg-saffron-dark text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-saffron/30 transition-all hover:scale-102"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Official Proposal</span>
                </a>
              </div>

              <div className="text-[10px] text-cream/60 text-center space-y-0.5 pt-1">
                <p>✓ Pan-India Temperature-Controlled Delivery</p>
                <p>✓ Dedicated Concierge Manager for Corporate & Weddings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-16 sm:py-20 bg-cream-light/60 border-t border-gold/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-saffron block mb-1">
              Bespoke Inquiries
            </span>
            <h3 className="text-3xl font-serif font-black text-dark-brown">
              Connect With Our Gifting Director
            </h3>
            <p className="text-xs sm:text-sm text-dark-brown/75 mt-1">
              Receive free digital mockups of your branded box within 2 business hours.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-gold/30 shadow-xl">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-2xl text-dark-brown">
                  Proposal Request Received!
                </h4>
                <p className="text-xs sm:text-sm text-dark-brown/70 max-w-sm mx-auto">
                  Our Gifting Director will contact you on <strong>{phone}</strong> with customized digital mockups and wholesale terms.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-full bg-saffron text-white text-xs font-bold"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                      Your Name / Family Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Rathore"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs font-semibold text-dark-brown focus:ring-2 focus:ring-saffron"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tata Consultancy Services"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs font-semibold text-dark-brown focus:ring-2 focus:ring-saffron"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs font-semibold text-dark-brown focus:ring-2 focus:ring-saffron"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                      Delivery Destination City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. New Delhi / Mumbai / Jaipur"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs font-semibold text-dark-brown focus:ring-2 focus:ring-saffron"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                    Gifting Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs font-semibold text-dark-brown focus:ring-2 focus:ring-saffron"
                  >
                    <option value="Royal Wedding Gifting">Royal Wedding Gifting & Invitations</option>
                    <option value="Corporate Festival Celebration">Corporate Festival Celebration (Diwali/New Year)</option>
                    <option value="Executive Client Appreciation">Executive Client Appreciation</option>
                    <option value="Baby Announcement / Milestone">Baby Announcement / Family Milestone</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-saffron hover:bg-saffron-dark text-white font-bold text-sm shadow-md transition-all hover:scale-102"
                >
                  Request Official Proposal & Mockup
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
