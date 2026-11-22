'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  HelpCircle,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Truck,
  FileText,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
} from 'lucide-react';

export default function SupportPage() {
  const [name, setName] = useState('');
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Order Tracking & Status');
  const [message, setMessage] = useState('');
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomTicket = `MS-TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(randomTicket);
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
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=60"
            alt="Customer Support & Trust"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/20 border border-saffron/40 text-saffron text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Modern Sweets Customer Care & Freshness Guarantee</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black leading-tight mb-4">
            Uncompromising <span className="text-saffron">Hospitality</span> & Support
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto leading-relaxed">
            Every box of sweets is backed by our 40-year family trust pledge. Whether you have questions regarding express dispatch, custom hamper branding, or storage guidelines, we are here for you.
          </p>
        </div>
      </section>

      {/* 4 Trust Pillars */}
      <section className="py-12 bg-dark-brown text-gold-light border-y border-gold/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-gold/20 space-y-1.5">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h4 className="font-bold text-cream text-sm">100% Freshness Guarantee</h4>
            <p className="text-cream/70">If vacuum seal is compromised during transit, we replace your order immediately with zero hassle.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-gold/20 space-y-1.5">
            <Truck className="w-6 h-6 text-saffron" />
            <h4 className="font-bold text-cream text-sm">Express Air Logistics</h4>
            <p className="text-cream/70">Same-day dispatch for Delhi NCR and 24-48 hr air shipping to Mumbai, Bengaluru, Jaipur, Kolkata and all metros.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-gold/20 space-y-1.5">
            <FileText className="w-6 h-6 text-amber-300" />
            <h4 className="font-bold text-cream text-sm">GST Input Credit Invoices</h4>
            <p className="text-cream/70">Official B2B and B2C tax invoices auto-generated with verified GSTIN and FSSAI license numbers.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-gold/20 space-y-1.5">
            <Clock className="w-6 h-6 text-emerald-400" />
            <h4 className="font-bold text-cream text-sm">7 Days Live Concierge</h4>
            <p className="text-cream/70">Our flagship store helpline and WhatsApp concierge are active 8:00 AM – 10:30 PM all 7 days of the week.</p>
          </div>
        </div>
      </section>

      {/* Interactive Support Ticket / Inquiry Form */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-gold/30 shadow-md space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron block">
                Direct Contact Channels
              </span>
              <h3 className="font-serif font-black text-2xl text-dark-brown">
                Speak With A Master Halwai Concierge
              </h3>
              <p className="text-xs text-dark-brown/70 leading-relaxed">
                Connect with our flagship store in Connaught Place for urgent festive batch dispatches, order modifications, or bulk wedding tastings.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <a
                  href="https://wa.me/919876543210?text=Namaste!%20I%20need%20assistance%20with%20my%20Modern%20Sweets%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center justify-between font-bold hover:bg-emerald-100 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                    <span>WhatsApp Concierge (+91 98765 43210)</span>
                  </div>
                  <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full">Instant</span>
                </a>

                <div className="p-3.5 rounded-2xl bg-cream/70 border border-gold/25 space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-saffron" />
                    <span className="font-bold text-dark-brown">Phone Helpline:</span>
                    <a href="tel:+919876543210" className="hover:text-saffron font-mono font-bold">
                      +91 98765 43210
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-saffron" />
                    <span className="font-bold text-dark-brown">Email Support:</span>
                    <a href="mailto:support@modernsweets.in" className="hover:text-saffron">
                      support@modernsweets.in
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold-dark" />
                    <span className="text-dark-brown/80">Active Hours: 8:00 AM – 10:30 PM (Daily)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Replacement Policy Card */}
            <div className="p-6 rounded-3xl bg-cream border border-gold/30 text-xs space-y-2">
              <span className="font-bold text-dark-brown flex items-center gap-1.5 text-saffron">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Our 100% Replacement Guarantee</span>
              </span>
              <p className="text-dark-brown/75 leading-relaxed text-[11px]">
                Because our sweets are made without artificial chemical preservatives, we guarantee fresh arrival. In the rare event of transit damage or delivery delay beyond 72 hours, simply send a photo on WhatsApp to receive an instant fresh replacement batch dispatched the very next morning.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Ticket Submission Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gold/30 shadow-xl p-6 sm:p-10">
            {ticketId ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-saffron font-bold block mb-1">
                    Ticket Registered Successfully
                  </span>
                  <h3 className="text-2xl font-serif font-black text-dark-brown">
                    Support Ticket ID: <span className="font-mono text-saffron">{ticketId}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-brown/70 max-w-sm mx-auto mt-2 leading-relaxed">
                    Thank you, <strong>{name}</strong>. Our customer concierge will reach out to you at <strong>{phone}</strong> within 30 minutes.
                  </p>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setTicketId(null);
                      setMessage('');
                    }}
                    className="px-5 py-2 rounded-xl bg-saffron text-white text-xs font-bold shadow-md hover:bg-saffron-dark"
                  >
                    Submit Another Query
                  </button>
                  <a
                    href={`https://wa.me/919876543210?text=Namaste!%20I%20have%20raised%20support%20ticket%20*${ticketId}*%20regarding%20${category}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Follow Up on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-saffron block mb-1">
                    Quick Resolution Desk
                  </span>
                  <h3 className="text-2xl font-serif font-black text-dark-brown">
                    Create a Priority Support Ticket
                  </h3>
                  <p className="text-xs text-dark-brown/70 mt-1">
                    Average response time: under 30 minutes during store hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mahipal Singh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs font-semibold text-dark-brown focus:ring-2 focus:ring-saffron"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                      Phone / WhatsApp *
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                      Order ID (If Applicable)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MS-89241"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs font-semibold text-dark-brown focus:ring-2 focus:ring-saffron uppercase font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                      Query Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs font-semibold text-dark-brown focus:ring-2 focus:ring-saffron"
                    >
                      <option value="Order Tracking & Status">Order Tracking & Dispatch Status</option>
                      <option value="Packaging & Freshness Guarantee">Packaging & Freshness Guarantee</option>
                      <option value="Corporate / Bulk Order Modification">Corporate / Bulk Order Modification</option>
                      <option value="Subscription Delivery Reschedule">Subscription Delivery Reschedule</option>
                      <option value="General Halwai Inquiry">General Halwai Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-dark-brown uppercase block mb-1">
                    Describe Your Query *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="How can our customer concierge team assist you today?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs font-semibold text-dark-brown focus:ring-2 focus:ring-saffron resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-saffron hover:bg-saffron-dark text-white font-bold text-sm shadow-md transition-all hover:scale-102 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Support Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
