import type { Metadata } from "next";

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
