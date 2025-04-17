"use client";

import { useCartStore } from "@/store/cart";
import type {
  Product,
  ProductVariant,
} from "@terminaldotshop/sdk/resources/product";
import { useState } from "react";

interface ProductCardProps {
  sku: Product;
}

export const ProductCard = ({ sku }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(sku.variants[0]);

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem({ ...sku, selectedVariant });
  };

  return (
    <div className="flex flex-col gap-2 max-w-2xl rounded-2xl px-4 py-2 border border-zinc-700">
      <h1 className="text-3xl font-bold">{sku.name}</h1>
      <p>{sku.description}</p>
      {sku.variants.length > 0 && (
        <div className="flex gap-2">
          {sku.variants.map((variant) => (
            <button
              type="button"
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              className="py-1 rounded-lg text-sm text-white"
            >
              {variant.name} - ${(variant.price / 100).toFixed(2)}
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={handleAddToCart}
        className="bg-primary my-2 py-2 font-bold cursor-pointer rounded-2xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add to cart
      </button>
    </div>
  );
};
