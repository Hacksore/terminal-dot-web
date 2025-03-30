import Terminal from "@terminaldotshop/sdk";
import { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { CartDisplay } from "@/components/CartDisplay";

const client = new Terminal({
  bearerToken: process.env["TERMINAL_BEARER_TOKEN"],
});

const title = "terminal coffee";
const description = "all the products from terminal coffee";
const BASE_URL = process.env.VERCEL_ENV
  ? "https://terminal-dot-web.vercel.app"
  : "http://localhost:3000";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      {
        url: `${BASE_URL}/og.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    title,
    description,
    images: [`${BASE_URL}/og.png`],
    card: "summary_large_image",
  },
};

export default async function Home() {
  const { data } = await client.product.list();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center gap-2">
        <h2 className="text-5xl font-bold">terminal</h2>
        <div className="w-5 h-10 bg-primary blink" />
      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {data.map((sku) => (
          <ProductCard key={sku.id} sku={sku} />
        ))}
      </main>
      <CartDisplay />
    </div>
  );
}
