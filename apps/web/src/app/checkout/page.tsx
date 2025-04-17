import CheckoutPage from "./page.client";
import { metadata as allMetadata } from "../metadata";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  ...allMetadata,
  title: "Checkout",
};

export default async function Checkout() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/");
  }

  return <CheckoutPage />;
}
