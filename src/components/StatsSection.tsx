'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const intervalMs = (duration * 1000) / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

const STATS = [
  { target: 40, suffix: '+', label: 'Years of Heritage', sublabel: 'Purity loved by generations' },
  { target: 15000, suffix: '+', label: 'Families Served', sublabel: 'Trusted across all of India' },
  { target: 50, suffix: '+', label: 'Signature Recipes', sublabel: 'Time-tested traditional craft' },
  { target: 99, suffix: '%', label: 'Fresh Daily Prep', sublabel: 'Morning batch, zero stale stock' },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function StatsSection() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (inView) controls.start('show');
  }, [inView, controls]);

  return (
    <section className="py-16 sm:py-20 bg-dark-brown relative overflow-hidden" ref={ref}>
      {/* Decorative gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-saffron/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center p-6 rounded-3xl bg-white/5 border border-gold/20 hover:border-gold/50 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-saffron mb-2 group-hover:scale-105 transition-transform duration-300">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gold-light mb-1">
                {stat.label}
              </h3>
              <p className="text-[11px] sm:text-xs text-cream/60">{stat.sublabel}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </section>
  );
}
