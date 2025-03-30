"use client";

import { useCartStore } from "@/store/cart";
import type { CartItem } from "@/store/cart";
import { X } from "lucide-react";

interface CartDisplayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDisplay = ({ isOpen, onClose }: CartDisplayProps) => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => {
    if (!item.selectedVariant) return sum;
    return sum + item.selectedVariant.price * item.quantity;
  }, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-zinc-900 border-l border-zinc-700 p-4 z-50 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Cart</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={clearCart}
              className="text-sm text-zinc-400 hover:text-white"
            >
              Clear Cart
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {items.map((item: CartItem) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
              <div>
                <p className="font-medium">{item.name}</p>
                {item.selectedVariant && (
                  <p className="text-sm text-zinc-400">
                    {item.selectedVariant.name} - ${(item.selectedVariant.price / 100).toFixed(2)}
                  </p>
                )}
                <p className="text-sm text-zinc-400">Quantity: {item.quantity}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 text-sm bg-zinc-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-600"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 text-sm bg-zinc-700 rounded hover:bg-zinc-600"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="mt-4 pt-4 border-t border-zinc-700">
            <p className="text-right font-bold">
              Total: ${(total / 100).toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </>
  );
};
