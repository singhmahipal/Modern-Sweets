'use client';

import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Truck, ShieldCheck, Heart, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function OrderTrackerModal() {
  const { isOrderTrackerOpen, setIsOrderTrackerOpen, activeOrderId, orders } = useCart();
  const [searchId, setSearchId] = useState(activeOrderId || '');
  const [searchedOrder, setSearchedOrder] = useState<any | null>(null);

  if (!isOrderTrackerOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toUpperCase();
    if (!query) return;

    // Check existing stored orders
    const found = orders.find((o) => o.orderId.toUpperCase() === query);
    if (found) {
      setSearchedOrder(found);
    } else {
      // Mock order for demo / testing
      setSearchedOrder({
        orderId: query,
        date: 'Today, 8:30 AM',
        status: 'Kitchen Fresh Prep',
        total: 1240,
        customer: { name: 'Valued Customer', address: 'Connaught Place, New Delhi', city: 'Delhi NCR' },
        items: [{ product: { name: 'Shahi Kaju Katli (500g)' }, quantity: 1 }],
      });
    }
  };

  const steps = [
    { title: 'Order Received', desc: 'Recipe requisition sent to master halwai.', time: '8:30 AM', done: true },
    { title: 'Fresh Desi Ghee Preparation', desc: 'Simmered slow in pure cow ghee and khoya.', time: '9:15 AM', done: true, current: true },
    { title: 'Vacuum Freshness Sealing', desc: 'Airtight packaging & gold-embossed ribboning.', time: 'Est. 10:45 AM', done: false },
    { title: 'Out For Express Delivery', desc: 'Temperature-controlled dispatch van dispatched.', time: 'Est. 11:30 AM', done: false },
    { title: 'Doorstep Delivered Fresh', desc: 'Handed over with traditional festive wishes.', time: 'Est. 1:00 PM', done: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-cream-light rounded-3xl overflow-hidden shadow-2xl border border-gold/40 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-dark-brown text-cream flex items-center justify-between border-b border-gold/25">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-saffron" />
            <h3 className="font-serif font-bold text-lg text-cream">
              Live Fresh Order Tracking
            </h3>
          </div>
          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-cream/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-dark-brown/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. MS-12345)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gold/30 text-xs font-bold text-dark-brown uppercase focus:outline-none focus:ring-2 focus:ring-saffron"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-saffron hover:bg-saffron-dark text-white font-bold text-xs shadow-sm transition-all"
            >
              Track
            </button>
          </form>

          {/* Active Order Card & Progress Stepper */}
          <div className="p-5 rounded-2xl bg-white border border-gold/30 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-cream-dark pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-saffron font-bold block">
                  Tracking Order
                </span>
                <h4 className="font-mono font-black text-dark-brown text-base">
                  {searchedOrder?.orderId || searchId || 'MS-89241'}
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                Fresh Prep In Progress
              </span>
            </div>

            {/* Stepper */}
            <div className="space-y-4 pt-2">
              {steps.map((st, idx) => (
                <div key={st.title} className="flex items-start gap-3 relative">
                  {idx < steps.length - 1 && (
                    <div
                      className={`absolute left-3.5 top-7 bottom-0 w-0.5 ${
                        st.done ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}
                    />
                  )}

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      st.current
                        ? 'bg-saffron text-white ring-4 ring-saffron/20 animate-pulse'
                        : st.done
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {st.done ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="text-[11px] font-bold">{idx + 1}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className={`text-xs font-bold ${st.current ? 'text-saffron' : 'text-dark-brown'}`}>
                        {st.title}
                      </h5>
                      <span className="text-[10px] text-dark-brown/50 font-medium">{st.time}</span>
                    </div>
                    <p className="text-[11px] text-dark-brown/70 mt-0.5">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-cream border border-gold/30 text-xs text-dark-brown/80 flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Purity Guarantee:</strong> Prepared with certified 100% cow desi ghee and zero preservatives. Vacuum-sealed to preserve crispness and aroma.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
