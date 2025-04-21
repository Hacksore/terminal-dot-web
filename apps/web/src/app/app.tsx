"use client";

import { ProductCard } from "@/components/product-card";
import type { Product } from "@terminaldotshop/sdk/resources/product";
import { useEffect, useState, useRef } from "react";

export const App = ({ data }: { data: Product[] }) => {
  const [activeWord, setActiveWord] = useState(0);
  const words = ["Drink.", "Code.", "Sleep.", "Repeat."];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveWord((prev) => {
        const next = (prev + 1) % words.length;
        return next;
      });
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="relative grid items-center justify-items-center min-h-screen max-w-4xl border-x border-b border-dashed border-zinc-800 mx-auto p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="absolute top-0 left-0 -translate-y-1/2 bg-zinc-900 w-full aspect-square [mask-image:radial-gradient(red,transparent_80%)] bg-grid-dots"/>
      <main className="flex flex-col gap-8 items-center sm:items-start pt-16 sm:pt-8">
        <h1 className="text-5xl font-bold text-center max-w-2xl relative text-balance">
          {words.map((word, index) => (
            <span
              key={word}
              className="relative inline-block text-black dark:text-white"
            >
              <div className={`block absolute pointer-events-none select-none transition-all duration-3000 ease-in-out bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent ${
                activeWord === index
                  ? "opacity-100"
                  : "opacity-0"
              }`}>
                {word}
              </div>
              {word}
            </span>
          ))}
        </h1>
        {data.map((sku) => (
          <ProductCard key={sku.id} sku={sku} />
        ))}
      </main>
    </div>
  );
};
