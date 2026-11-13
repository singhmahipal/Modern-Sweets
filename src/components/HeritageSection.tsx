"use client";

import React from "react";
import Image from "next/image";
import { Award, Flame, Users, Sparkles } from "lucide-react";

export default function HeritageSection() {
  const milestones = [
    {
      number: "2006",
      label: "Established",
      desc: "Starting with 1 master halwai and 5 authentic recipes.",
    },
    {
      number: "100%",
      label: "Shuddh Desi Ghee",
      desc: "No hydrogenated oils, only churned cow ghee.",
    },
    {
      number: "40+",
      label: "Years of Trust",
      desc: "Serving royal celebrations across 3 generations.",
    },
    {
      number: "50k+",
      label: "Festive Hampers",
      desc: "Delivering warmth & joy to homes and corporates.",
    },
  ];

  return (
    <section
      id="legacy"
      className="py-16 sm:py-24 bg-gradient-to-b from-cream via-[#FFF5DE] to-cream border-y border-gold/30 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold-dark text-xs font-bold uppercase tracking-wider mb-4">
              <Award className="w-4 h-4 text-gold" />
              <span>Authentic Generational Legacy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-dark-brown leading-tight mb-6">
              Four Decades of Purity, Passion & Unmatched Mithai Heritage.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-dark-brown/80 leading-relaxed">
              <p>
                In the winter of 2006, Modern Sweets was born from a simple
                belief: that Indian sweets are not merely confectionery, but a
                symbol of sacred hospitality, joyous family unions, and
                auspicious beginnings.
              </p>
              <p>
                While commercial sweets transitioned to palm oil and synthetic
                colors, our master halwais held firm to generational
                disciplines: hand-churned cow desi ghee, whole milk reduced
                slowly over simmered fires, hand-cracked green cardamom, and raw
                Kashmiri saffron.
              </p>
              <p className="font-semibold text-dark-brown">
                Today, every single batch continues to follow those very
                foundational principles: zero preservatives, uncompromised
                hygiene, and sweetness crafted to melt upon your tongue.
              </p>
            </div>

            {/* Milestones Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gold/30">
              {milestones.map((m) => (
                <div
                  key={m.label}
                  className="p-3 bg-white/70 rounded-2xl border border-gold/25"
                >
                  <span className="text-2xl sm:text-3xl font-serif font-black text-saffron block">
                    {m.number}
                  </span>
                  <span className="text-xs font-bold text-dark-brown block mt-0.5">
                    {m.label}
                  </span>
                  <p className="text-[11px] text-dark-brown/65 mt-1 leading-snug">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Imagery of Craft */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square max-w-[420px] mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-gold/40">
              <Image
                src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80"
                alt="Traditional Sweets Preparation"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                <span className="text-xs uppercase tracking-widest text-gold-light font-bold">
                  Generational Halwai Craft
                </span>
                <p className="font-serif text-xl font-bold mt-1">
                  “Purity is our sacred tradition, never a compromise.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
