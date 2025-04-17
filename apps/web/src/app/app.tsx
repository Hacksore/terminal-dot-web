"use client";

import { ProductCard } from "@/components/product-card";
import type { Product } from "@terminaldotshop/sdk/resources/product";

export const App = ({ data }: { data: Product[] }) => {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start pt-16 sm:pt-8">
        <h1 className="text-5xl font-bold text-center sm:text-left max-w-2xl">
          Drink. Sleep. Repeat.
        </h1>
        {data.map((sku) => (
          <ProductCard key={sku.id} sku={sku} />
        ))}
      </main>
    </div>
  );
};
