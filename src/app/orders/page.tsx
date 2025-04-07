import OrdersPage from "./page.client";
import { metadata as allMetadata } from "../metadata";

export const metadata = {
  ...allMetadata,
  title: "Your Orders",
};

export default function Orders() {
  return <OrdersPage />;
}
