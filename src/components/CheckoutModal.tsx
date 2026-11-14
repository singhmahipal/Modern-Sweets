'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  CheckCircle2,
  CreditCard,
  QrCode,
  Truck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Tag,
  Clock,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { useCart, PlacedOrder } from '@/context/CartContext';

export default function CheckoutModal() {
  const {
    items,
    subtotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    createOrder,
    setIsOrderTrackerOpen,
    setActiveOrderId,
  } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'New Delhi',
    state: 'Delhi NCR',
    pincode: '110001',
    deliverySlot: 'Morning Fresh Batch (8:00 AM - 12:00 PM)',
    specialInstructions: '',
    paymentMethod: 'UPI',
  });

  // Coupons
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  // Placed Order state
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);

  if (!isCheckoutOpen) return null;

  const shippingCost = subtotal >= 999 ? 0 : 60;
  const grandTotal = Math.max(0, subtotal + shippingCost - appliedDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    setCouponSuccess(null);
    const code = couponCode.trim().toUpperCase();

    if (code === 'SHUBH10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      setCouponSuccess('Coupon SHUBH10 applied: 10% Festive Discount!');
    } else if (code === 'SWEET100') {
      if (subtotal < 500) {
        setCouponError('SWEET100 requires minimum order value of ₹500.');
        return;
      }
      setAppliedDiscount(100);
      setCouponSuccess('Coupon SWEET100 applied: Flat ₹100 Off!');
    } else if (code === 'FESTIVE') {
      const discount = Math.round(subtotal * 0.15);
      setAppliedDiscount(discount);
      setCouponSuccess('Coupon FESTIVE applied: 15% Royal Off!');
    } else {
      setCouponError('Invalid coupon code. Try SHUBH10 or SWEET100.');
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
        alert('Please fill all delivery address fields to proceed.');
        return;
      }
    }
    setStep((prev) => (prev + 1) as any);
  };

  const handlePlaceOrder = () => {
    const order = createOrder({
      items,
      subtotal,
      discount: appliedDiscount,
      shipping: shippingCost,
      total: grandTotal,
      deliverySlot: formData.deliverySlot,
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
      },
      paymentMethod: formData.paymentMethod,
    });

    setConfirmedOrder(order);
    setStep(4);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setConfirmedOrder(null);
  };

  const handleTrackDirectly = () => {
    if (confirmedOrder) {
      setActiveOrderId(confirmedOrder.orderId);
      setIsCheckoutOpen(false);
      setIsOrderTrackerOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-cream-light rounded-3xl overflow-hidden shadow-2xl border border-gold/40 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 bg-dark-brown text-cream flex items-center justify-between border-b border-gold/25">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-saffron" />
            <h3 className="font-serif font-bold text-lg text-cream">
              {step === 4 ? 'Order Placed Successfully!' : 'Express Fresh Checkout'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-cream/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Progress Indicator (if not confirmed) */}
        {step < 4 && (
          <div className="bg-cream px-6 py-3 border-b border-gold/20 flex items-center justify-between text-xs font-bold text-dark-brown/70">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-saffron' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-saffron text-white' : 'bg-gray-200'}`}>1</span>
              <span>Delivery Details</span>
            </div>
            <span>•</span>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-saffron' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-saffron text-white' : 'bg-gray-200'}`}>2</span>
              <span>Fresh Slot & Offers</span>
            </div>
            <span>•</span>
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-saffron' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-saffron text-white' : 'bg-gray-200'}`}>3</span>
              <span>Payment</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-dark-brown text-base">
                Recipient & Delivery Address
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-dark-brown/80 uppercase block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mahipal Singh"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold/30 text-xs font-semibold text-dark-brown focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-dark-brown/80 uppercase block mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold/30 text-xs font-semibold text-dark-brown focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-dark-brown/80 uppercase block mb-1">
                  Email Address (For receipt & live tracking)
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold/30 text-xs font-semibold text-dark-brown focus:outline-none focus:ring-2 focus:ring-saffron"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-dark-brown/80 uppercase block mb-1">
                  Full Street Address & Landmark *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="House/Flat No, Apartment/Building, Landmark..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold/30 text-xs font-semibold text-dark-brown focus:outline-none focus:ring-2 focus:ring-saffron resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-dark-brown/80 uppercase block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-gold/30 text-xs font-semibold text-dark-brown"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-dark-brown/80 uppercase block mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-gold/30 text-xs font-semibold text-dark-brown"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-dark-brown/80 uppercase block mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-gold/30 text-xs font-semibold text-dark-brown"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h4 className="font-serif font-bold text-dark-brown text-base">
                Fresh Batch Delivery Slot & Coupon
              </h4>

              {/* Delivery Slot Choice */}
              <div>
                <label className="text-xs font-bold text-dark-brown uppercase tracking-wider block mb-2">
                  Select Dispatch Batch:
                </label>
                <div className="space-y-2">
                  {[
                    'Morning Fresh Batch (8:00 AM - 12:00 PM)',
                    'Afternoon Fresh Batch (1:00 PM - 4:00 PM)',
                    'Evening Festive Batch (5:00 PM - 8:30 PM)',
                  ].map((slot) => (
                    <label
                      key={slot}
                      className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                        formData.deliverySlot === slot
                          ? 'border-saffron bg-saffron/10 font-bold text-dark-brown'
                          : 'border-gold/30 bg-white hover:border-gold text-dark-brown/80'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliverySlot"
                        checked={formData.deliverySlot === slot}
                        onChange={() => setFormData({ ...formData, deliverySlot: slot })}
                        className="text-saffron focus:ring-saffron"
                      />
                      <Clock className="w-4 h-4 text-saffron shrink-0" />
                      <span className="text-xs">{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Coupon Code Box */}
              <div className="p-4 rounded-2xl bg-white border border-gold/30">
                <div className="flex items-center gap-1.5 text-xs font-bold text-dark-brown mb-2">
                  <Tag className="w-4 h-4 text-saffron" />
                  <span>Have a Festive Promo Code?</span>
                </div>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (Try: SHUBH10, SWEET100)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-cream border border-gold/30 text-xs font-bold uppercase text-dark-brown focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-dark-brown text-gold-light text-xs font-bold hover:bg-black"
                  >
                    Apply
                  </button>
                </form>

                {couponSuccess && (
                  <p className="mt-2 text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{couponSuccess}</span>
                  </p>
                )}
                {couponError && (
                  <p className="mt-2 text-[11px] font-semibold text-red-600">
                    {couponError}
                  </p>
                )}
              </div>

              {/* Special Instructions */}
              <div>
                <label className="text-[11px] font-bold text-dark-brown/80 uppercase block mb-1">
                  Delivery Notes / Gifting Instructions:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ring bell twice, deliver in gift bag"
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gold/30 text-xs text-dark-brown"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h4 className="font-serif font-bold text-dark-brown text-base">
                Choose Payment Method
              </h4>

              <div className="space-y-2.5">
                {[
                  { id: 'UPI', label: 'UPI (GPay / PhonePe / Paytm / BHIM)', desc: 'Zero gateway charges, instant confirmation' },
                  { id: 'Card', label: 'Credit / Debit Card', desc: 'Visa, MasterCard, RuPay with 256-bit SSL' },
                  { id: 'NetBanking', label: 'Net Banking', desc: 'All major Indian banks supported' },
                  { id: 'COD', label: 'Cash on Delivery (COD)', desc: 'Pay with cash upon doorstep delivery' },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === m.id
                        ? 'border-saffron bg-saffron/10 text-dark-brown'
                        : 'border-gold/30 bg-white hover:border-gold text-dark-brown/80'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={formData.paymentMethod === m.id}
                      onChange={() => setFormData({ ...formData, paymentMethod: m.id })}
                      className="mt-0.5 text-saffron focus:ring-saffron"
                    />
                    <div>
                      <span className="text-xs font-bold block">{m.label}</span>
                      <span className="text-[10px] text-dark-brown/60 block">{m.desc}</span>
                    </div>
                  </label>
                ))}
              </div>

              {formData.paymentMethod === 'UPI' && (
                <div className="p-4 rounded-2xl bg-white border border-gold/30 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-cream border border-gold/30 flex items-center justify-center text-saffron shrink-0">
                    <QrCode className="w-10 h-10" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-dark-brown block">Official Store UPI ID:</span>
                    <span className="text-xs font-mono font-bold text-saffron block">modernsweets@upi</span>
                    <span className="text-[10px] text-dark-brown/60">QR Code will be scanned upon delivery confirmation.</span>
                  </div>
                </div>
              )}

              {/* Order Summary Recap */}
              <div className="p-4 rounded-2xl bg-cream border border-gold/30 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span>Items Total ({items.length}):</span>
                  <span>₹{subtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Festive Promo Discount:</span>
                    <span>-₹{appliedDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Fresh Packaging & Delivery:</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-700">FREE</strong> : '₹60'}</span>
                </div>
                <div className="pt-2 border-t border-gold/30 flex justify-between text-sm font-serif font-black text-dark-brown">
                  <span>Grand Total to Pay:</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
            </div>
          )}

          {step === 4 && confirmedOrder && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-saffron font-bold block mb-1">
                  Auspicious Occasion
                </span>
                <h4 className="font-serif font-black text-2xl text-dark-brown">
                  Thank You, {confirmedOrder.customer.name}!
                </h4>
                <p className="text-xs sm:text-sm text-dark-brown/70 mt-1">
                  Your order has been registered with our master halwai kitchen.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-gold/30 max-w-sm mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-cream-dark pb-1.5">
                  <span className="text-dark-brown/70">Order ID:</span>
                  <span className="font-mono font-black text-saffron">{confirmedOrder.orderId}</span>
                </div>
                <div className="flex justify-between border-b border-cream-dark pb-1.5">
                  <span className="text-dark-brown/70">Total Amount:</span>
                  <span className="font-bold">₹{confirmedOrder.total} ({confirmedOrder.paymentMethod})</span>
                </div>
                <div className="flex justify-between border-b border-cream-dark pb-1.5">
                  <span className="text-dark-brown/70">Fresh Dispatch Slot:</span>
                  <span className="font-semibold">{confirmedOrder.deliverySlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-brown/70">Delivering To:</span>
                  <span className="font-semibold text-right truncate max-w-[180px]">
                    {confirmedOrder.customer.address}, {confirmedOrder.customer.pincode}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleTrackDirectly}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-saffron hover:bg-saffron-dark text-white font-bold text-xs shadow-md transition-all"
                >
                  Track Order Timeline
                </button>
                <a
                  href={`https://wa.me/919876543210?text=Namaste!%20I%20have%20placed%20order%20*${confirmedOrder.orderId}*%20for%20₹${confirmedOrder.total}.%20Please%20confirm%20dispatch.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Receipt</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 4 && (
          <div className="p-4 bg-white border-t border-gold/30 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep((prev) => (prev - 1) as any)}
                className="px-4 py-2 rounded-xl border border-gold/40 text-dark-brown text-xs font-bold flex items-center gap-1 hover:bg-cream"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <span className="text-xs text-dark-brown/60 font-semibold">
                Total: <strong>₹{grandTotal}</strong>
              </span>
            )}

            {step < 3 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-saffron hover:bg-saffron-dark text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                className="px-7 py-3 rounded-xl bg-saffron hover:bg-saffron-dark text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-saffron/30"
              >
                <span>Confirm & Place Order (₹{grandTotal})</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
