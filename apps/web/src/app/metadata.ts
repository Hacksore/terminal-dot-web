import type { Metadata } from "next";

const title = "terminalcoffee.shop";
const description = "Order terminal coffee from your WEB BROWSER 🤯";
const BASE_URL = process.env.VERCEL_ENV
  ? "https://terminalcoffee.shop"
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
