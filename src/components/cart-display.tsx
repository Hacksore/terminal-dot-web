"use client";

import { useCartStore } from "@/store/cart";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

interface CartDisplayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDisplay({ isOpen, onClose }: CartDisplayProps) {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = items.reduce((sum, item) => {
    if (!item.selectedVariant) return sum;
    return sum + item.selectedVariant.price * item.quantity;
  }, 0);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(value) => {
        if (!value) {
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle>Shopping Cart</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {items.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    {item.selectedVariant && (
                      <p className="text-sm text-muted-foreground">
                        {item.selectedVariant.name}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(0, item.quantity - 1),
                          )
                        }
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      $
                      {(
                        ((item.selectedVariant?.price || 0) * item.quantity) /
                        100
                      ).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="border-t border-border pt-4">
                <div className="flex justify-between font-bold mb-4">
                  <span>Total</span>
                  <span>${(total / 100).toFixed(2)}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="cursor-pointer flex-1"
                  
                    onClick={() => clearCart()}
                  >
                    Clear Cart
                  </Button>
                  <Link href="/checkout" onClick={() => onClose()}>
                    <Button className="cursor-pointer flex-1">Proceed to Checkout</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
