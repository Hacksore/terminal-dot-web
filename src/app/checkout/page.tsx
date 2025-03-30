import CheckoutPage from "./page.client";
import { metadata as allMetadata } from "../metadata";

export const metadata = {
  ...allMetadata,
  title: "Checkout",
};

export default function Checkout() {
  return <CheckoutPage />;
}
