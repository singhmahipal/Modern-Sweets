"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Heart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-dark-brown text-cream pt-16 pb-10 border-t-2 border-gold/40 relative overflow-hidden">
      {/* Decorative Top Accent Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-gold/20">
          {/* Brand & Story */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold bg-white p-0.5">
                <Image
                  src="/images/logo.png"
                  alt="Modern Sweets"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-serif font-black tracking-wide text-cream">
                  Modern <span className="text-saffron">Sweets</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-gold-light block">
                  Taste & Purity Since 2006
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed mb-6">
              Handcrafted Indian confectionery preserving authentic generational
              recipes. We take pride in 100% pure cow desi ghee, organic whole
              milk, and royal dry fruit delicacies.
            </p>

            <div className="flex items-center gap-3 text-xs text-gold-light">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>FSSAI Certified | ISO 22000 Food Safety Standards</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif font-bold text-sm text-gold uppercase tracking-wider mb-4">
              Our Delicacies
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-cream/80">
              <li>
                <a
                  href="#products"
                  className="hover:text-saffron transition-colors"
                >
                  Pure Ghee Sweets
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="hover:text-saffron transition-colors"
                >
                  Royal Kaju Katli
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="hover:text-saffron transition-colors"
                >
                  Sugar-Free Anjeer Barfi
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="hover:text-saffron transition-colors"
                >
                  Bengali Rasgulla
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="hover:text-saffron transition-colors"
                >
                  Crunchy Namkeen & Sev
                </a>
              </li>
              <li>
                <a
                  href="#festive-gifting"
                  className="hover:text-saffron transition-colors"
                >
                  Festive Gift Hampers
                </a>
              </li>
            </ul>
          </div>

          {/* Store Location & Timings */}
          <div className="lg:col-span-3">
            <h4 className="font-serif font-bold text-sm text-gold uppercase tracking-wider mb-4">
              Visit Flagship Store
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-cream/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
                <span>
                  Modern Sweets Chowk, Heritage Market, Connaught Place, New
                  Delhi - 110001
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-saffron shrink-0" />
                <a href="tel:+919876543210" className="hover:text-saffron">
                  +91 98765 43210 / 011-23456789
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-saffron shrink-0" />
                <a
                  href="mailto:orders@modernsweets.com"
                  className="hover:text-saffron"
                >
                  orders@modernsweets.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span>Open All 7 Days: 8:00 AM – 10:30 PM</span>
              </div>
            </div>
          </div>

          {/* Festive Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="font-serif font-bold text-sm text-gold uppercase tracking-wider mb-4">
              Festive Club
            </h4>
            <p className="text-xs text-cream/75 mb-4 leading-relaxed">
              Subscribe to receive special festive discount codes, new seasonal
              batch alerts (Ghevar, Gujiya, Gond Ladoo), and royal wedding
              gifting catalogues.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-2xl bg-emerald-900/60 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Thank you! Welcome to the Modern Sweets family.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-gold/30 text-xs text-cream placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-saffron hover:bg-saffron-dark text-white transition-colors"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-cream/50 block">
                  We respect your privacy. No spam ever.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <p>
            © {new Date().getFullYear()} Modern Sweets. Handcrafted With Purity
            & Tradition Since 2006.
          </p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-saffron fill-saffron" />
            <span>for authentic Indian taste lovers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
