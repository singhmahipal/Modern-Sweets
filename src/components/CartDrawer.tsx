'use client';

import React from 'react';
import Image from 'next/image';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, MessageCircle, Gift } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 999;
  const amountNeeded = Math.max(0, freeDeliveryThreshold - subtotal);
  const deliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  // Generate WhatsApp order message string
  const generateWhatsAppMessage = () => {
    let text = `Namaste Modern Sweets! I would like to place an order:%0a%0a`;
    items.forEach((item, idx) => {
      text += `${idx + 1}. *${item.product.name}* (${item.weightOption}) x ${item.quantity} = ₹${
        item.unitPrice * item.quantity
      }%0a`;
      if (item.customDetails) {
        text += `   - Theme: ${item.customDetails.boxTheme}%0a`;
        text += `   - Sweets: ${item.customDetails.slots.join(', ')}%0a`;
        if (item.customDetails.recipientName) {
          text += `   - For: ${item.customDetails.recipientName}%0a`;
        }
      }
    });
    text += `%0a*Total Amount: ₹${subtotal}*%0a%0aPlease confirm availability and dispatch schedule.`;
    return text;
  };

  const handleStartCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-light border-l border-gold/30 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-5 bg-dark-brown text-cream flex items-center justify-between border-b border-gold/20">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-saffron" />
              <h3 className="font-serif font-bold text-lg text-cream">
                Your Sweets Bag ({totalItems})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-cream/80 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-4 bg-cream border-b border-gold/20 text-xs text-dark-brown">
            {amountNeeded > 0 ? (
              <p className="font-medium">
                Add <strong className="text-saffron">₹{amountNeeded}</strong> more to unlock{' '}
                <strong className="text-emerald-700">FREE Express Delivery!</strong>
              </p>
            ) : (
              <p className="font-bold text-emerald-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>You have unlocked FREE Express Delivery!</span>
              </p>
            )}
            <div className="w-full bg-cream-dark h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-saffron to-gold h-full transition-all duration-500 rounded-full"
                style={{ width: `${deliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-dark-brown/60">
                <div className="w-16 h-16 rounded-full bg-cream-dark flex items-center justify-center mb-4 text-dark-brown/40">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-serif font-bold text-lg text-dark-brown mb-1">
                  Your bag is empty
                </p>
                <p className="text-xs text-dark-brown/60 mb-6 max-w-xs">
                  Explore our handcrafted Kaju Katli, Motichoor Ladoos and Desi Ghee delicacies.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-saffron text-white text-xs font-bold shadow-md hover:bg-saffron-dark transition-all"
                >
                  Browse Delicacies
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-white rounded-2xl border border-gold/20 shadow-sm flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3">
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-cream-dark shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-dark-brown truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-[11px] text-gold-dark font-medium block">
                        Pack: {item.weightOption}
                      </span>
                      <span className="text-xs font-black text-dark-brown">
                        ₹{item.unitPrice * item.quantity}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gold/30 rounded-lg bg-cream-light overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 text-xs font-bold text-dark-brown hover:bg-cream-dark"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-dark-brown">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 text-xs font-bold text-dark-brown hover:bg-cream-dark"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-dark-brown/40 hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Custom Hamper Details Tag */}
                  {item.customDetails && (
                    <div className="bg-cream/80 p-2 rounded-xl text-[10px] text-dark-brown/80 border border-gold/20 flex items-start gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-saffron shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-dark-brown">
                          {item.customDetails.boxTheme}:
                        </span>{' '}
                        <span>{item.customDetails.slots.join(', ')}</span>
                        {item.customDetails.recipientName && (
                          <span className="block italic text-gold-dark">
                            Card For: {item.customDetails.recipientName}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Checkout Actions */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-gold/30 space-y-3">
              <div className="space-y-1.5 text-xs text-dark-brown/80">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Packing & Freshness Seal:</span>
                  <span className="text-emerald-700 font-bold">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping:</span>
                  <span className="font-bold">
                    {amountNeeded === 0 ? (
                      <span className="text-emerald-700">FREE</span>
                    ) : (
                      '₹60'
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-cream-dark flex justify-between text-base font-serif font-black text-dark-brown">
                  <span>Grand Total:</span>
                  <span>₹{subtotal + (amountNeeded === 0 ? 0 : 60)}</span>
                </div>
              </div>

              {/* WhatsApp Quick Order Button */}
              <a
                href={`https://wa.me/919876543210?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Quick Order on WhatsApp</span>
              </a>

              {/* Standard Checkout Button */}
              <button
                onClick={handleStartCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-saffron hover:bg-saffron-dark text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-saffron/30 transition-all hover:scale-102"
              >
                <span>Proceed to Express Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-dark-brown/60">
                🔒 100% Secure Checkout | Same-Day Morning Batch Dispatched
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
