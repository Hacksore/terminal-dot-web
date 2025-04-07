"use server";
import { getAccessToken } from "@/lib/auth";
import Terminal from "@terminaldotshop/sdk";

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
  try {
    const bearerToken = await getAccessToken();
    const client = new Terminal({
      bearerToken,
    });

    await client.cart.setCard({
      cardID,
    });

    await client.cart.setAddress({
      addressID,
    });

    // add the items from the cart
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("No items provided for checkout");
    }

    for (const item of items) {
      await client.cart.setItem({
        productVariantID: item.id,
        quantity: item.quantity,
      });
    }

    await client.cart.convert();

    return {
      success: true,
      message: "Checkout initiated successfully",
    };
  } catch (error) {
    console.error("Checkout error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred during checkout",
    };
  }
};
