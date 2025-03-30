import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";
import type {
  Product as SDKProduct,
  ProductVariant,
} from "@terminaldotshop/sdk/resources/product";

type Product = SDKProduct & {
  selectedVariant?: ProductVariant;
};

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product: Product) =>
        set(
          produce((state: CartStore) => {
            const existingItem = state.items.find(
              (item) => item.id === product.id,
            );
            if (existingItem) {
              existingItem.quantity += 1;
            } else {
              state.items.push({ ...product, quantity: 1 });
            }
          }),
        ),
      removeItem: (productId: string) =>
        set(
          produce((state: CartStore) => {
            const index = state.items.findIndex((item) => item.id === productId);
            if (index !== -1) {
              state.items.splice(index, 1);
            }
          }),
        ),
      updateQuantity: (productId: string, quantity: number) =>
        set(
          produce((state: CartStore) => {
            const item = state.items.find((item) => item.id === productId);
            if (item) {
              item.quantity = quantity;
            }
          }),
        ),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart",
    },
  ),
);
