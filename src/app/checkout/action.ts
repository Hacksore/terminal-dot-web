"use server";
import { getAccessToken } from "@/lib/auth";
import Terminal from "@terminaldotshop/sdk";
import { Product } from "@terminaldotshop/sdk/resources/index.mjs";

interface CheckoutParams {
  cardID: string;
  addressID: string;
  items: {
    id: string; // productVariantID
    quantity: number;
  }[];
}

export const checkout = async ({
  cardID,
  addressID,
  items,
}: CheckoutParams) => {
  // diable for now
  console.log("Checkout function called with params:", {
    cardID,
    addressID,
    items,
  });
  return "NOT IMPLEMENTED";

  const bearerToken = await getAccessToken();
  const client = new Terminal({
    bearerToken,
  });

  client.cart.setCard({
    cardID,
  });

  client.cart.setAddress({
    addressID,
  });

  // add the items from the cart
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("No items provided for checkout");
  }

  for (const item of items) {
    client.cart.setItem({
      productVariantID: item.id,
      quantity: item.quantity,
    });
  }

  // client.cart.convert();

  return {
    success: true,
    message: "Checkout initiated successfully",
  };
};
