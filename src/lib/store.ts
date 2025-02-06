import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { Product } from '../data/products';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,
  addItem: (product, quantity = 1) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
          total: state.total + product.price * quantity,
        };
      }
      return {
        items: [...state.items, { ...product, quantity }],
        total: state.total + product.price * quantity,
      };
    }),
  removeItem: (productId) =>
    set((state) => {
      const item = state.items.find((item) => item.id === productId);
      return {
        items: state.items.filter((item) => item.id !== productId),
        total: state.total - (item ? item.price * item.quantity : 0),
      };
    }),
  updateQuantity: (productId, quantity) =>
    set((state) => {
      const item = state.items.find((item) => item.id === productId);
      if (!item) return state;
      const quantityDiff = quantity - item.quantity;
      return {
        items: state.items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
        total: state.total + item.price * quantityDiff,
      };
    }),
  clearCart: () => set({ items: [], total: 0 }),
}));