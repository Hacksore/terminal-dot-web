"use server";
import { getAccessToken } from "@/lib/auth";
import Terminal from "@terminaldotshop/sdk";
import { track } from "@vercel/analytics";

interface CheckoutParams {
  cardID: string;
  addressID: string;
  items: {
    id?: string;
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
    if (!Array.isArray(items)) {
      throw new Error("Invalid items format");
    }

    for (const item of items) {
      if (!item.id) {
        continue;
      }

      await client.cart.setItem({
        productVariantID: item.id,
        quantity: item.quantity,
      });
    }

    await client.cart.convert();

    // track any orders that succeed
    track("order-submitted", {});

    return {
      success: true,
      message: "Checkout initiated successfully",
    };
  } catch (error) {
    console.error("Checkout error:", error);
    // track any orders that failed
    track("order-failed", {});

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred during checkout",
    };
  }
};
