import CheckoutPage from "./page.client";
import { metadata as allMetadata } from "../metadata";
import { getAuthSession } from "@/lib/auth";
import { SignIn } from "./sign-in";

export const metadata = {
  ...allMetadata,
  title: "Checkout",
};

export default async function Checkout() {
  const session = await getAuthSession();

  if (!session) {
    return (
      <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <SignIn />
        </div>
      </div>
    );
  }

  return <CheckoutPage />;
}
