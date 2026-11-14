'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SweetProduct } from '@/data/sweetsData';

export interface CartItem {
  id: string; // composite id
  product: SweetProduct;
  weightOption: string;
  quantity: number;
  unitPrice: number;
  customDetails?: {
    boxTheme: string;
    slots: string[];
    giftMessage: string;
    recipientName: string;
  };
}

export interface PlacedOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  deliverySlot: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
  };
  paymentMethod: string;
  status: 'Received' | 'Kitchen Fresh Prep' | 'Vacuum Packed' | 'Out for Delivery' | 'Delivered';
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: SweetProduct, weightOption: string, quantity?: number) => void;
  addCustomHamperToCart: (hamperData: {
    name: string;
    boxSize: string;
    boxTheme: string;
    price: number;
    slots: string[];
    giftMessage: string;
    recipientName: string;
    image: string;
  }) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderTrackerOpen: boolean;
  setIsOrderTrackerOpen: (open: boolean) => void;
  activeOrderId: string | null;
  setActiveOrderId: (id: string | null) => void;
  orders: PlacedOrder[];
  createOrder: (orderData: Omit<PlacedOrder, 'orderId' | 'date' | 'status'>) => PlacedOrder;
  totalItems: number;
  subtotal: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [orders, setOrders] = useState<PlacedOrder[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('modern_sweets_cart');
      if (savedCart) setItems(JSON.parse(savedCart));

      const savedOrders = localStorage.getItem('modern_sweets_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch {
      // Local storage fallback
    }
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('modern_sweets_cart', JSON.stringify(items));
    } catch {
      // Local storage fallback
    }
  }, [items]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('modern_sweets_orders', JSON.stringify(orders));
    } catch {
      // Local storage fallback
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  const addToCart = (product: SweetProduct, weightOption: string, quantity: number = 1) => {
    const selectedWeight = product.weightOptions.find((w) => w.label === weightOption) || product.weightOptions[0];
    const unitPrice = Math.round(product.price * selectedWeight.multiplier);
    const cartItemId = `${product.id}-${selectedWeight.label}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          weightOption: selectedWeight.label,
          quantity,
          unitPrice,
        },
      ];
    });

    showToast(`Added ${product.name} (${selectedWeight.label}) to cart!`);
  };

  const addCustomHamperToCart = (hamper: {
    name: string;
    boxSize: string;
    boxTheme: string;
    price: number;
    slots: string[];
    giftMessage: string;
    recipientName: string;
    image: string;
  }) => {
    const customProduct: SweetProduct = {
      id: `custom-hamper-${Date.now()}`,
      name: hamper.name,
      hindiName: 'कस्टम मिठाई थाली / हैंपर',
      category: 'hampers',
      categoryLabel: 'Custom Hamper',
      price: hamper.price,
      weightOptions: [{ label: hamper.boxSize, multiplier: 1 }],
      rating: 5.0,
      reviewsCount: 1,
      image: hamper.image,
      badge: 'Custom Crafted',
      isBestSeller: true,
      isPureGhee: true,
      description: `Custom box with ${hamper.slots.join(', ')}. Gift message: "${hamper.giftMessage || 'Warm Wishes'}"`,
      ingredients: hamper.slots,
      shelfLife: '15 Days',
    };

    const cartItemId = `${customProduct.id}-${hamper.boxSize}`;

    setItems((prev) => [
      ...prev,
      {
        id: cartItemId,
        product: customProduct,
        weightOption: hamper.boxSize,
        quantity: 1,
        unitPrice: hamper.price,
        customDetails: {
          boxTheme: hamper.boxTheme,
          slots: hamper.slots,
          giftMessage: hamper.giftMessage,
          recipientName: hamper.recipientName,
        },
      },
    ]);

    showToast(`Custom Hamper "${hamper.name}" added to bag!`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const createOrder = (orderData: Omit<PlacedOrder, 'orderId' | 'date' | 'status'>): PlacedOrder => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder: PlacedOrder = {
      ...orderData,
      orderId: `MS-${randomNum}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Received',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setActiveOrderId(newOrder.orderId);
    return newOrder;
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        addCustomHamperToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        activeOrderId,
        setActiveOrderId,
        orders,
        createOrder,
        totalItems,
        subtotal,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
