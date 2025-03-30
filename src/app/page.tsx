import Terminal from "@terminaldotshop/sdk";
import { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { CartWrapper } from "@/components/CartWrapper";

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
