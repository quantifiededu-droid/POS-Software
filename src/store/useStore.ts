import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  business_id: string;
  full_name: string;
  role: 'owner' | 'shopkeeper';
  profile_picture_path?: string;
}

interface Business {
  id: string;
  name: string;
  logo_path?: string;
  owner_name: string;
  email: string;
  phone: string;
  address: string;
}

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalStock: number;
}

interface POSState {
  user: User | null;
  business: Business | null;
  cart: CartItem[];
  isOnboarded: boolean;
  
  setUser: (user: User | null) => void;
  setBusiness: (business: Business | null) => void;
  setOnboarded: (val: boolean) => void;
  
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  logout: () => void;
}

export const useStore = create<POSState>()(
  persist(
    (set) => ({
      user: null,
      business: null,
      cart: [],
      isOnboarded: false,

      setUser: (user) => set({ user }),
      setBusiness: (business) => set({ business }),
      setOnboarded: (val) => set({ isOnboarded: val }),

      addToCart: (item) => set((state) => {
        const existing = state.cart.find((i) => i.productId === item.productId);
        if (existing) {
          return {
            cart: state.cart.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: Math.min(i.quantity + 1, i.totalStock) }
                : i
            ),
          };
        }
        return { cart: [...state.cart, { ...item, quantity: 1 }] };
      }),

      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((i) => i.productId !== productId),
      })),

      updateQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map((i) =>
          i.productId === productId ? { ...i, quantity: Math.max(1, Math.min(quantity, i.totalStock)) } : i
        ),
      })),

      clearCart: () => set({ cart: [] }),
      
      logout: () => set({ user: null, cart: [] }),
    }),
    {
      name: 'clemtrix-storage',
    }
  )
);
