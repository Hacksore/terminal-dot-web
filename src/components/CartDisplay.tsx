"use client";

import { useCartStore } from "@/store/cart";
import type { CartItem } from "@/store/cart";

export const CartDisplay = () => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return null;
  }

  const total = items.reduce((sum, item) => {
    if (!item.selectedVariant) return sum;
    return sum + item.selectedVariant.price * item.quantity;
  }, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-700 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Cart</h3>
          <button
            onClick={clearCart}
            className="text-sm text-zinc-400 hover:text-white"
          >
            Clear Cart
          </button>
        </div>
        <div className="space-y-2">
          {items.map((item: CartItem) => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                {item.selectedVariant && (
                  <p className="text-sm text-zinc-400">
                    {item.selectedVariant.name} - $
                    {(item.selectedVariant.price / 100).toFixed(2)}
                  </p>
                )}
                <p className="text-sm text-zinc-400">
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(0, item.quantity - 1))
                    }
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 text-sm bg-zinc-800 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 text-sm bg-zinc-800 rounded hover:bg-zinc-700"
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
        <div className="mt-4 pt-4 border-t border-zinc-700">
          <p className="text-right font-bold">
            Total: ${(total / 100).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
