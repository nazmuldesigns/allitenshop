'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Book, CartItem, Coupon } from '@/types';
import { calculateDeliveryFee } from '@/lib/data/bangladeshLocations';

interface CartContextType {
  cart: CartItem[];
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  appliedCoupon: Coupon | null;
  discountAmount: number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  selectedDivision: string;
  selectedDistrict: string;
  setLocation: (division: string, district: string) => void;
  deliveryFee: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [selectedDivision, setSelectedDivision] = useState<string>('Dhaka');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Dhaka');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('pataghor_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem('pataghor_coupon');
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch {
      // Ignore JSON parse errors
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('pataghor_cart', JSON.stringify(cart));
    }
  }, [cart, mounted]);

  const addToCart = (book: Book, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { book, quantity }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.book.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setDiscountAmount(0);
    localStorage.removeItem('pataghor_cart');
    localStorage.removeItem('pataghor_coupon');
  };

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce((total, item) => {
    const price = item.book.discount_price ?? item.book.price;
    return total + price * item.quantity;
  }, 0);

  // Recalculate coupon discount whenever subtotal changes
  useEffect(() => {
    if (!appliedCoupon) {
      setDiscountAmount(0);
      return;
    }
    if (subtotal < appliedCoupon.min_order_amount) {
      setAppliedCoupon(null);
      setDiscountAmount(0);
      return;
    }
    let disc = 0;
    if (appliedCoupon.discount_type === 'percentage') {
      disc = (subtotal * appliedCoupon.discount_value) / 100;
      if (appliedCoupon.max_discount_amount && disc > appliedCoupon.max_discount_amount) {
        disc = appliedCoupon.max_discount_amount;
      }
    } else {
      disc = appliedCoupon.discount_value;
    }
    setDiscountAmount(Math.round(Math.min(disc, subtotal)));
  }, [subtotal, appliedCoupon]);

  const applyCoupon = async (code: string) => {
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal }),
      });
      const data = await res.json();
      if (data.valid && data.coupon) {
        setAppliedCoupon(data.coupon);
        setDiscountAmount(data.discount);
        localStorage.setItem('pataghor_coupon', JSON.stringify(data.coupon));
        return { success: true, message: 'Coupon applied successfully!' };
      }
      return { success: false, message: data.message || 'Invalid coupon' };
    } catch {
      return { success: false, message: 'Failed to validate coupon' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    localStorage.removeItem('pataghor_coupon');
  };

  const setLocation = (division: string, district: string) => {
    setSelectedDivision(division);
    setSelectedDistrict(district);
  };

  const deliveryFee = calculateDeliveryFee(selectedDivision, selectedDistrict, subtotal);
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        appliedCoupon,
        discountAmount,
        applyCoupon,
        removeCoupon,
        selectedDivision,
        selectedDistrict,
        setLocation,
        deliveryFee,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

