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
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold">{sku.name}</h1>
        <div className="px-3 py-1 rounded-full font-bold text-sm text-white border border-zinc-700">
          ${(sku.variants[0].price / 100).toFixed(2)}
        </div>
      </div>
      <p>{sku.description}</p>
      {sku.variants.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {sku.variants.map((variant) => (
            <div
              key={variant.id}
              className="px-3 py-1 rounded-full text-sm text-white border border-zinc-700"
            >
              {variant.name}
            </div>
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
