'use client';

import React, { useState } from 'react';
import { MapPin, CheckCircle, Clock, Truck, AlertCircle } from 'lucide-react';

export default function PincodeEstimator() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<{
    status: 'success' | 'express' | 'invalid' | null;
    message: string;
    deliveryTime: string;
    badge: string;
  }>({ status: null, message: '', deliveryTime: '', badge: '' });

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();

    if (!/^\d{6}$/.test(cleanPin)) {
      setResult({
        status: 'invalid',
        message: 'Please enter a valid 6-digit Indian Pincode.',
        deliveryTime: '',
        badge: 'Invalid Pin',
      });
      return;
    }

    const firstTwo = cleanPin.substring(0, 2);

    // Delhi NCR (11, 12, 20)
    if (['11', '12', '20'].includes(firstTwo)) {
      setResult({
        status: 'success',
        message: 'Same-day morning/evening fresh batch dispatch available in your area!',
        deliveryTime: 'Today within 3-5 Hours (Fresh Dispatch)',
        badge: 'Same-Day Superfast',
      });
    } else if (['40', '30', '56', '50', '60', '70'].includes(firstTwo)) {
      // Mumbai, Jaipur, Bengaluru, Hyderabad, Chennai, Kolkata
      setResult({
        status: 'express',
        message: 'Express Temperature-Controlled Air Delivery available.',
        deliveryTime: 'Next Day Morning (Within 24 Hours)',
        badge: 'Express Air 24-Hr',
      });
    } else {
      setResult({
        status: 'express',
        message: 'Vacuum-sealed freshness delivery serviced by premium air logistics.',
        deliveryTime: 'Within 48-72 Hours',
        badge: 'Pan-India Air Service',
      });
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-gold/30 shadow-md">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-5 h-5 text-saffron" />
        <h4 className="font-serif font-bold text-dark-brown text-base">
          Check Freshness & Delivery Timeline
        </h4>
      </div>
      <p className="text-xs text-dark-brown/70 mb-4">
        Enter your 6-digit delivery pincode to check same-day or 24-hr express air availability.
      </p>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit Pincode (e.g. 110001)"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
          className="flex-1 px-4 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs font-semibold text-dark-brown focus:outline-none focus:ring-2 focus:ring-saffron"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-dark-brown hover:bg-black text-gold-light font-bold text-xs shadow-sm transition-all"
        >
          Check
        </button>
      </form>

      {result.status && (
        <div
          className={`mt-4 p-3.5 rounded-2xl border text-xs flex items-start gap-2.5 ${
            result.status === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : result.status === 'express'
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-red-50 border-red-200 text-red-900'
          }`}
        >
          {result.status === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : result.status === 'express' ? (
            <Truck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{result.badge}</span>
              {result.deliveryTime && (
                <span className="text-[11px] opacity-80">({result.deliveryTime})</span>
              )}
            </div>
            <p className="mt-0.5 text-[11px] opacity-90">{result.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
