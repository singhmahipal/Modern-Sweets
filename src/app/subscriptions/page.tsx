'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Gift,
  RefreshCw,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Plan {
  id: string;
  name: string;
  hindiName: string;
  basePrice: number;
  weightDesc: string;
  badge: string;
  desc: string;
  items: string[];
  image: string;
}

const PLANS: Plan[] = [
  {
    id: 'plan-pooja',
    name: 'Shubh Pooja & Mandir Box',
    hindiName: 'शुभ पूजा एवं भोग थाली',
    basePrice: 699,
    weightDesc: '750g Fresh Batch',
    badge: 'Most Revered',
    desc: 'Pure cow desi ghee sweets delivered on Ekadashi & Purnima for sacred home mandir bhog and auspicious beginnings.',
    items: ['Desi Ghee Motichoor Ladoo (300g)', 'Mathura Kesar Peda (250g)', 'Panchamrit Mawa Bites (200g)', 'Complimentary Camphor & Wick Box'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'plan-royal',
    name: 'Royal Mithai of the Month Club',
    hindiName: 'शाही मिठाई ऑफ द मंथ क्लब',
    basePrice: 1199,
    weightDesc: '1.2 kg Master Halwai Selection',
    badge: 'Connoisseur Choice',
    desc: 'Exclusive seasonal off-menu delicacies crafted by our head halwai — winter Gond Ladoo, spring Gujiya, monsoon Ghevar & royal dry fruit rolls.',
    items: ['Curated Seasonal Delicacy (400g)', 'Shahi Kaju Katli (300g)', 'Anjeer Dry Fruit Barfi (300g)', 'Ratlami Sev Mixture (200g)', 'Brass Diya Keepsake'],
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'plan-wellness',
    name: 'Sugar-Free Wellness Subscription',
    hindiName: 'शुगर-फ्री वैलनेस बॉक्स',
    basePrice: 1399,
    weightDesc: '850g Pure Nut & Fig',
    badge: '100% Zero Sugar',
    desc: 'Sweetened solely with sun-dried Afghan figs, dates, and California almonds. Nutrient-rich energy bites for health-conscious and diabetic families.',
    items: ['Afghan Anjeer Barfi (350g)', 'Roasted Almond & Pista Rolls (250g)', 'Seed & Fig Energy Bites (250g)', 'Silver Embossed Greeting Card'],
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80',
  },
];

export default function SubscriptionsPage() {
  const { addCustomHamperToCart } = useCart();
  const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS[1]);
  const [frequency, setFrequency] = useState<'biweekly' | 'monthly' | 'quarterly'>('monthly');

  let discountMultiplier = 1;
  let discountLabel = '';
  if (frequency === 'biweekly') {
    discountMultiplier = 0.85; // 15% off
    discountLabel = '15% Off (Best Value)';
  } else if (frequency === 'monthly') {
    discountMultiplier = 0.9; // 10% off
    discountLabel = '10% Off';
  }

  const finalPrice = Math.round(selectedPlan.basePrice * discountMultiplier);

  const handleSubscribe = () => {
    addCustomHamperToCart({
      name: `${selectedPlan.name} (${frequency.toUpperCase()} Subscription)`,
      boxSize: `${selectedPlan.weightDesc} - ${frequency.toUpperCase()}`,
      boxTheme: 'Shahi Club Subscription',
      price: finalPrice,
      slots: selectedPlan.items,
      giftMessage: `Recurring ${frequency} subscription - cancel or pause anytime.`,
      recipientName: 'Valued Club Subscriber',
      image: selectedPlan.image,
    });
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
            src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1600&q=60"
            alt="Royal Sweets Subscription"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/20 border border-saffron/40 text-saffron text-xs font-bold uppercase tracking-wider mb-4">
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
            <span>Modern Sweets Shahi Club</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black leading-tight mb-4">
            Auspicious Recurring Deliveries & <span className="text-saffron">Seasonal Surprises</span>
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto leading-relaxed">
            Never run out of pure desi ghee mithai for home poojas, surprise festival guests, or daily healthy cravings. Delivered fresh to your doorstep on your schedule.
          </p>
        </div>
      </section>

      {/* Club Benefits Banner */}
      <section className="py-6 bg-dark-brown text-gold-light border-y border-gold/30">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-around gap-4 text-xs font-bold">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-saffron" />
            <span>FREE Pan-India Express Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-300" />
            <span>Free Handcrafted Brass Diya in Every Box</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Pause, Skip or Cancel with 1 Click</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-saffron" />
            <span>100% Churned Cow Ghee Guaranteed</span>
          </div>
        </div>
      </section>

      {/* Plan Selection Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Frequency Tabs */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-saffron block mb-2">
            Choose Delivery Rhythm
          </span>
          <div className="inline-flex p-1.5 rounded-full bg-white border border-gold/30 shadow-md">
            {[
              { id: 'biweekly', label: 'Every 2 Weeks (15% Off)' },
              { id: 'monthly', label: 'Monthly Delivery (10% Off)' },
              { id: 'quarterly', label: 'Quarterly Seasonal' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFrequency(f.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  frequency === f.id
                    ? 'bg-saffron text-white shadow-md'
                    : 'text-dark-brown hover:text-saffron'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => {
            const isSelected = selectedPlan.id === plan.id;
            const price = Math.round(plan.basePrice * discountMultiplier);

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`rounded-3xl bg-white border-2 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-saffron ring-4 ring-saffron/20 scale-102'
                    : 'border-gold/30 hover:border-gold'
                }`}
              >
                <div>
                  {/* Card Visual */}
                  <div className="relative h-48 bg-cream-dark overflow-hidden">
                    <Image
                      src={plan.image}
                      alt={plan.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-saffron text-white shadow-sm">
                      {plan.badge}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-gold-dark uppercase tracking-wider block">
                        {plan.hindiName}
                      </span>
                      <h3 className="font-serif font-black text-xl text-dark-brown mt-0.5">
                        {plan.name}
                      </h3>
                      <span className="text-xs font-semibold text-dark-brown/60 block">
                        {plan.weightDesc}
                      </span>
                    </div>

                    <p className="text-xs text-dark-brown/75 leading-relaxed">
                      {plan.desc}
                    </p>

                    {/* What's Inside */}
                    <div className="pt-3 border-t border-cream-dark space-y-1.5">
                      <span className="text-[10px] font-bold uppercase text-dark-brown/60 block">
                        Included in Each Delivery:
                      </span>
                      {plan.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-dark-brown/85">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Pricing & CTA */}
                <div className="p-6 pt-0">
                  <div className="border-t border-cream-dark pt-4 mb-4 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-serif font-black text-dark-brown">
                        ₹{price}
                      </span>
                      <span className="text-xs text-dark-brown/60"> / delivery</span>
                    </div>
                    {discountMultiplier < 1 && (
                      <span className="text-xs font-bold text-emerald-700">
                        {discountLabel}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlan(plan);
                      handleSubscribe();
                    }}
                    className="w-full py-3 rounded-xl bg-saffron hover:bg-saffron-dark text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:scale-102"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Subscribe to {plan.name}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shahi Club FAQ */}
        <div className="mt-16 bg-cream-light/60 p-8 rounded-3xl border border-gold/30 max-w-3xl mx-auto space-y-4">
          <h4 className="font-serif font-bold text-xl text-dark-brown text-center mb-6">
            Frequently Asked Subscription Questions
          </h4>

          <div className="space-y-3 text-xs sm:text-sm text-dark-brown/80">
            <div>
              <p className="font-bold text-dark-brown">Q: Can I pause or skip a delivery when traveling?</p>
              <p className="text-dark-brown/70 mt-0.5">Yes! You can pause, reschedule, or change the delivery address to send sweets to a relative anytime via WhatsApp or your order link.</p>
            </div>
            <div className="pt-2 border-t border-cream-dark">
              <p className="font-bold text-dark-brown">Q: How do you guarantee freshness for recurring boxes?</p>
              <p className="text-dark-brown/70 mt-0.5">Every subscription box is packaged from that exact morning’s fresh kadhai batch, vacuum-sealed with food-grade moisture absorbers, and dispatched via express air courier.</p>
            </div>
            <div className="pt-2 border-t border-cream-dark">
              <p className="font-bold text-dark-brown">Q: Is there any long-term contract or cancellation fee?</p>
              <p className="text-dark-brown/70 mt-0.5">None whatsoever. You can cancel with 1 click before the next cycle starts with zero cancellation penalties.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
