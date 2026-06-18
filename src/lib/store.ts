
'use client';

import { useState, useEffect } from 'react';
import { Product } from './data';

export type CartItem = Product & { quantity: number };

let listeners: Array<(cart: CartItem[]) => void> = [];

const getInitialCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('nexora-cart');
  return saved ? JSON.parse(saved) : [];
};

let currentCart = getInitialCart();

const notify = () => {
  listeners.forEach(l => l([...currentCart]));
  if (typeof window !== 'undefined') {
    localStorage.setItem('nexora-cart', JSON.stringify(currentCart));
  }
};

export const cartStore = {
  subscribe: (listener: (cart: CartItem[]) => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot: () => currentCart,
  addItem: (product: Product) => {
    const existing = currentCart.find(item => item.id === product.id);
    if (existing) {
      currentCart = currentCart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      currentCart = [...currentCart, { ...product, quantity: 1 }];
    }
    notify();
  },
  removeItem: (productId: string) => {
    currentCart = currentCart.filter(item => item.id !== productId);
    notify();
  },
  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      cartStore.removeItem(productId);
      return;
    }
    currentCart = currentCart.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );
    notify();
  },
  clear: () => {
    currentCart = [];
    notify();
  }
};

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(currentCart);

  useEffect(() => {
    setCart([...currentCart]);
    return cartStore.subscribe(setCart);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return { 
    cart, 
    total, 
    itemCount,
    addItem: cartStore.addItem,
    removeItem: cartStore.removeItem,
    updateQuantity: cartStore.updateQuantity,
    clear: cartStore.clear
  };
}
