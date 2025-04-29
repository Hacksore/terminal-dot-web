"use client";

import { useCartStore } from "@/store/cart";
import type {
  Product,
  ProductVariant,
} from "@terminaldotshop/sdk/resources/product";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  sku: Product;
}

export const ProductCard = ({ sku }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(sku.variants[0]);

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem({ ...sku, selectedVariant });
    toast({
      title: "Added to cart",
      description: `${sku.name} has been added to your cart.`,
      onClick: (event) => {
        event.preventDefault();
        router.push("/checkout");
      },
    });
  };

  return (
    <div className="group flex flex-col gap-4 max-w-2xl p-4 border border-dashed hover:border-solid hover:border-zinc-600 border-zinc-700 relative rounded-sm bg-background">
      <div className="bg-gradient-to-t from-primary to-transparent opacity-0 duration-300 group-hover:opacity-20 absolute inset-0 w-full h-full" />
      <div className="bg-grid-lines opacity-0 duration-300 group-hover:opacity-30 absolute inset-0 h-full w-full" />
      {/* corners decoration */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute -top-1 -left-1 duration-300 group-hover:-translate-2"
      >
        <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute -top-1 -right-1 duration-300 group-hover:translate-x-2 group-hover:-translate-y-2"
      >
        <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute -bottom-1 -left-1 duration-300 group-hover:translate-y-2 group-hover:-translate-x-2"
      >
        <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute -bottom-1 -right-1 duration-300 group-hover:translate-2"
      >
        <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
      </svg>
      {/* main contents */}
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold">{sku.name}</h1>
        <div className="px-3 py-1 rounded-full font-bold text-sm text-black dark:text-white border border-zinc-700">
          ${(sku.variants[0].price / 100).toFixed(2)}
        </div>
      </div>
      <p>{sku.description}</p>
      {sku.variants.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {sku.variants.map((variant) => (
            <div
              key={variant.id}
              className="py-2 font-bold rounded-full text-sm text-white"
            >
              {variant.name}
            </div>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={handleAddToCart}
        className="opacity-90 duration-300 cut-corners py-2 font-bold cursor-pointer group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add to cart
      </button>
    </div>
  );
};
