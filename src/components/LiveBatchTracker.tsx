'use client';

import React, { useState, useEffect } from 'react';
import { Flame, Clock, Award, ShieldCheck, RefreshCw, ChefHat } from 'lucide-react';

interface BatchInfo {
  id: string;
  sweet: string;
  kadhai: string;
  status: 'slow_simmer' | 'frying_boondi' | 'pistachio_garnishing' | 'cooling_setting' | 'fresh_batch_ready';
  statusLabel: string;
  statusColor: string;
  progressPercent: number;
  minutesRemaining: number;
  masterHalwai: string;
  pureGheeSource: string;
}

const INITIAL_BATCHES: BatchInfo[] = [
  {
    id: 'kadhai-01',
    sweet: 'Royal Desi Ghee Motichoor Ladoo',
    kadhai: 'Copper Kadhai #1 (Varanasi Hearth)',
    status: 'frying_boondi',
    statusLabel: 'Jhari Perforating in Cow Ghee',
    statusColor: 'text-amber-600 bg-amber-50 border-amber-200',
    progressPercent: 65,
    minutesRemaining: 18,
    masterHalwai: 'Ustad Ramkishan (38 yrs craft)',
    pureGheeSource: 'Bilona Gir Cow Ghee',
  },
  {
    id: 'kadhai-02',
    sweet: 'Saffron Angoori Gulab Jamun',
    kadhai: 'Brass Handi #3 (Awadh Hearth)',
    status: 'slow_simmer',
    statusLabel: 'Slow Khoya Simmer & Rose Infusion',
    statusColor: 'text-rose-600 bg-rose-50 border-rose-200',
    progressPercent: 40,
    minutesRemaining: 32,
    masterHalwai: 'Pandit Jagannath Sharma',
    pureGheeSource: 'Vedic Hand-Churned Makhan',
  },
  {
    id: 'kadhai-03',
    sweet: '24K Edible Silver Kaju Katli',
    kadhai: 'Marble Rolling Slab #2',
    status: 'cooling_setting',
    statusLabel: 'Diamond Cut & Chandi Vark Application',
    statusColor: 'text-purple-600 bg-purple-50 border-purple-200',
    progressPercent: 90,
    minutesRemaining: 6,
    masterHalwai: 'Master Gopi Chand',
    pureGheeSource: 'Single-Estate Cashew Milk',
  },
  {
    id: 'kadhai-04',
    sweet: 'Pista Peda & Mathura Khoya Peda',
    kadhai: 'Cast Iron Kadhai #4 (Braj Hearth)',
    status: 'fresh_batch_ready',
    statusLabel: 'Fresh Out of Hearth (Ready to Box)',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    progressPercent: 100,
    minutesRemaining: 0,
    masterHalwai: 'Halwai Badri Prasad',
    pureGheeSource: 'Mathura Buffalo A2 Whole Milk',
  },
];

export default function LiveBatchTracker() {
  const [batches, setBatches] = useState<BatchInfo[]>(INITIAL_BATCHES);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Periodic heartbeat animation
  useEffect(() => {
    const interval = setInterval(() => {
      setBatches((prev) =>
        prev.map((b) => {
          if (b.progressPercent >= 100) {
            return {
              ...b,
              progressPercent: 15,
              minutesRemaining: 45,
              status: 'slow_simmer',
              statusLabel: 'New Batch Ingredients Weighed',
              statusColor: 'text-blue-600 bg-blue-50 border-blue-200',
            };
          }
          const nextPercent = Math.min(100, b.progressPercent + 2);
          const nextMinutes = Math.max(0, b.minutesRemaining - 1);
          return {
            ...b,
            progressPercent: nextPercent,
            minutesRemaining: nextMinutes,
            status: nextPercent >= 100 ? 'fresh_batch_ready' : b.status,
            statusLabel: nextPercent >= 100 ? 'Fresh Out of Hearth (Ready to Box)' : b.statusLabel,
            statusColor: nextPercent >= 100 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : b.statusColor,
          };
        })
      );
      setLastRefreshed(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const manualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 600);
  };

  return (
    <section className="py-20 bg-dark-brown text-cream relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-saffron/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-cream/10 pb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron/20 border border-saffron/30 text-saffron text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Kitchen Broadcast
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-cream">
              Active Kadhai Batch Tracker
            </h2>
            <p className="mt-2 text-sm md:text-base text-cream/70 max-w-xl font-sans">
              Unlike industrial confectioners with cold store warehouses, our sweets are prepared continuously in micro-batches every morning & afternoon.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-cream/50">
              Updated: <span className="text-cream/90 font-mono font-medium">{lastRefreshed}</span>
            </span>
            <button
              onClick={manualRefresh}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream/10 hover:bg-cream/20 text-cream text-xs font-medium transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              Sync Hearths
            </button>
          </div>
        </div>

        {/* Batches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {batches.map((batch) => (
            <div
              key={batch.id}
              className="bg-cream/5 backdrop-blur-sm border border-cream/10 rounded-2xl p-5 hover:border-gold/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Hearth Header */}
                <div className="flex items-center justify-between text-xs text-gold/90 font-mono mb-2">
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-saffron" />
                    {batch.kadhai}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-cream mb-2 leading-snug">
                  {batch.sweet}
                </h3>

                {/* Status Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium border ${batch.statusColor}`}>
                    {batch.statusLabel}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-cream/60 mb-1.5">
                    <span>Simmering Progress</span>
                    <span className="font-mono text-saffron font-bold">{batch.progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold to-saffron rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${batch.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Detail Metrics */}
                <div className="space-y-2 text-xs text-cream/70 pt-2 border-t border-cream/10">
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span className="truncate">{batch.masterHalwai}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{batch.pureGheeSource}</span>
                  </div>
                </div>
              </div>

              {/* Time Remaining / Readiness */}
              <div className="mt-5 pt-3 border-t border-cream/10 flex items-center justify-between text-xs">
                <span className="text-cream/50 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Dispatch Buffer:
                </span>
                <span className="font-mono font-bold text-gold">
                  {batch.minutesRemaining === 0 ? (
                    <span className="text-emerald-400 font-sans">Ready for Dispatch</span>
                  ) : (
                    `~${batch.minutesRemaining} mins left`
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Guarantee Pill */}
        <div className="mt-12 p-4 rounded-2xl bg-gradient-to-r from-saffron/15 via-gold/15 to-saffron/15 border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-gold shrink-0" />
            <p className="text-xs md:text-sm text-cream/90 font-sans">
              <strong className="text-gold font-serif">The 100% Zero-Preservative Freshness Law:</strong> If an order is placed before 2:00 PM, your box is packed strictly from that day&apos;s morning kadhai batches.
            </p>
          </div>
          <span className="shrink-0 px-4 py-1.5 rounded-full bg-gold text-dark-brown text-xs font-bold uppercase tracking-wider">
            Verified Fresh
          </span>
        </div>
      </div>
    </section>
  );
}
