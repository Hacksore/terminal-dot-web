"use client";

import { ProductCard } from "@/components/product-card";
import type { Product } from "@terminaldotshop/sdk/resources/product";
import { useEffect, useState, useRef } from "react";

export const App = ({ data }: { data: Product[] }) => {
  const [activeWord, setActiveWord] = useState(0);
  const words = ["Drink.", "Code.", "Sleep.", "Repeat."];
  const intervalRef = useRef<NodeJS.Timeout|null>(null);

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
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start pt-16 sm:pt-8">
        <h1 className="text-5xl font-bold text-center max-w-2xl">
          {words.map((word, index) => (
            <span
              key={word}
              className={`inline-block transition-all duration-3000 ease-in-out ${
                activeWord === index
                  ? "bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
                  : "text-white"
              }`}
            >
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
