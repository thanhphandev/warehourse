import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  attributes: Array<{ key: string; value: string }>;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (item) => {
        const existingItem = get().items.find(i => i.id === item.id);
        if (existingItem) {
          set((state) => ({
            items: state.items.map(i => 
              i.id === item.id 
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { ...item, quantity: item.quantity || 1 }],
          }));
        }
        
        // Update totals
        const newState = get();
        set({
          totalItems: newState.items.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id),
        }));
        
        // Update totals
        const newState = get();
        set({
          totalItems: newState.items.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set((state) => ({
          items: state.items.map(item => 
            item.id === id ? { ...item, quantity } : item
          ),
        }));
        
        // Update totals
        const newState = get();
        set({
          totalItems: newState.items.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
