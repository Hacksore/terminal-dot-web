import { CartWrapper } from "@/components/CartWrapper";
import { ProductCard } from "@/components/ProductCard";
import Terminal from "@terminaldotshop/sdk";
export { metadata } from "./metadata";

const client = new Terminal({
  bearerToken: process.env.TERMINAL_BEARER_TOKEN,
});

export default async function Home() {
  const { data } = await client.product.list();

  return (
    <CartWrapper>
      <div className="grid grid-rows-[60px_1fr] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {data.map((sku) => (
            <ProductCard key={sku.id} sku={sku} />
          ))}
        </main>
      </div>
    </CartWrapper>
  );
}
