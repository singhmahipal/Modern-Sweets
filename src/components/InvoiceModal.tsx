'use client';

import React from 'react';
import { X, Printer, Download, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PlacedOrder } from '@/context/CartContext';

interface InvoiceModalProps {
  order: PlacedOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvoiceModal({ order, isOpen, onClose }: InvoiceModalProps) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const gstRate = 0.05; // 5% GST for confectionery
  const baseTaxable = Math.round(order.subtotal / (1 + gstRate));
  const totalTax = order.subtotal - baseTaxable;
  const cgst = (totalTax / 2).toFixed(2);
  const sgst = (totalTax / 2).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gold/40 flex flex-col max-h-[92vh]">
        {/* Actions Bar */}
        <div className="p-4 bg-dark-brown text-cream flex items-center justify-between border-b border-gold/30 print:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-saffron" />
            <span className="font-serif font-bold text-sm text-cream">
              Tax Invoice & Receipt • {order.orderId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-saffron hover:bg-saffron-dark text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-cream/80 hover:text-white"
              aria-label="Close invoice"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div id="invoice-sheet" className="p-8 overflow-y-auto bg-white text-dark-brown text-xs font-sans space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-gold/40 pb-5">
            <div>
              <h2 className="text-2xl font-serif font-black tracking-wide text-dark-brown">
                Modern <span className="text-saffron">Sweets</span>
              </h2>
              <p className="text-[10px] text-gold-dark font-bold uppercase tracking-widest -mt-0.5">
                Taste & Purity Since 1985 • Confectionery & Gifting
              </p>
              <p className="text-[11px] text-dark-brown/70 mt-1 max-w-xs">
                Modern Sweets Chowk, Heritage Market, Connaught Place, New Delhi - 110001
              </p>
              <p className="text-[11px] text-dark-brown/70">Phone: +91 98765 43210 | orders@modernsweets.in</p>
              <div className="flex gap-3 text-[10px] font-mono text-dark-brown/60 mt-1">
                <span>GSTIN: <strong>07AAACM9854L1Z8</strong></span>
                <span>•</span>
                <span>FSSAI: <strong>10019011006542</strong></span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-cream border border-gold/40 text-dark-brown mb-2">
                ORIGINAL TAX INVOICE
              </span>
              <p className="text-sm font-mono font-black text-dark-brown">
                {order.orderId}
              </p>
              <p className="text-[11px] text-dark-brown/70">{order.date}</p>
              <p className="text-[11px] text-emerald-700 font-bold mt-1">
                Status: Paid ({order.paymentMethod})
              </p>
            </div>
          </div>

          {/* Customer / Billed To Section */}
          <div className="grid grid-cols-2 gap-4 bg-cream/50 p-4 rounded-2xl border border-gold/20">
            <div>
              <span className="text-[10px] font-bold text-gold-dark uppercase tracking-wider block mb-1">
                Billed & Delivered To:
              </span>
              <p className="text-sm font-bold text-dark-brown">{order.customer.name}</p>
              <p className="text-dark-brown/80">{order.customer.address}</p>
              <p className="text-dark-brown/80">
                {order.customer.city}, {order.customer.pincode}
              </p>
              <p className="text-dark-brown/70 mt-0.5">Phone: {order.customer.phone}</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-gold-dark uppercase tracking-wider block mb-1">
                Dispatch Batch & Fulfillment:
              </span>
              <p className="font-semibold text-dark-brown">{order.deliverySlot}</p>
              <p className="text-dark-brown/70 mt-1">Packaging: Airtight Vacuum Seal</p>
              <p className="text-emerald-700 font-bold flex items-center justify-end gap-1 mt-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Pure Cow Ghee Certified
              </p>
            </div>
          </div>

          {/* Itemized Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gold/30 text-[10px] font-bold uppercase text-dark-brown/70">
                  <th className="py-2.5">S.No</th>
                  <th className="py-2.5">Description of Sweets</th>
                  <th className="py-2.5">HSN Code</th>
                  <th className="py-2.5">Pack / Weight</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Rate</th>
                  <th className="py-2.5 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-dark/60 text-xs">
                {order.items.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-cream/30">
                    <td className="py-2.5 font-mono">{idx + 1}</td>
                    <td className="py-2.5 font-bold">
                      {item.product.name}
                      {item.customDetails && (
                        <span className="block text-[10px] font-normal text-dark-brown/60">
                          Theme: {item.customDetails.boxTheme}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 font-mono text-dark-brown/60">2106 90 99</td>
                    <td className="py-2.5">{item.weightOption}</td>
                    <td className="py-2.5 text-center">{item.quantity}</td>
                    <td className="py-2.5 text-right font-mono">₹{item.unitPrice}</td>
                    <td className="py-2.5 text-right font-mono font-bold">
                      ₹{item.unitPrice * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Tax Calculation Breakdown */}
          <div className="border-t-2 border-gold/30 pt-4 flex justify-between items-start">
            <div className="max-w-xs text-[11px] text-dark-brown/70 space-y-1">
              <p className="font-bold text-dark-brown">Terms & Conditions:</p>
              <p>1. Keep refrigerated at 4°C - 8°C after breaking vacuum seal.</p>
              <p>2. Traditional Indian sweets contain no chemical preservatives.</p>
              <p>3. This is a computer generated tax invoice and requires no physical signature.</p>
            </div>

            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span>Taxable Value:</span>
                <span className="font-mono">₹{baseTaxable}</span>
              </div>
              <div className="flex justify-between text-dark-brown/70">
                <span>CGST (2.5%):</span>
                <span className="font-mono">₹{cgst}</span>
              </div>
              <div className="flex justify-between text-dark-brown/70">
                <span>SGST (2.5%):</span>
                <span className="font-mono">₹{sgst}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Festive Discount:</span>
                  <span className="font-mono">-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-dark-brown/70">
                <span>Express Packing & Freight:</span>
                <span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span>
              </div>
              <div className="pt-2 border-t-2 border-dark-brown flex justify-between font-serif font-black text-base text-dark-brown">
                <span>Total Amount Paid:</span>
                <span className="font-mono">₹{order.total}</span>
              </div>
            </div>
          </div>

          {/* Footer Signature Seal */}
          <div className="pt-4 border-t border-gold/20 flex justify-between items-center text-[10px] text-dark-brown/60">
            <div>
              <p>Authentic Generational Indian Mithai Since 1985</p>
              <p>Visit us online: <strong>https://modernsweets.in</strong></p>
            </div>
            <div className="text-right">
              <div className="w-20 h-8 border border-gold/40 rounded flex items-center justify-center font-serif text-[9px] text-gold-dark font-bold mb-1 ml-auto">
                SEAL OF PURITY
              </div>
              <p className="font-bold text-dark-brown">Modern Sweets Halwai Kitchen</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
