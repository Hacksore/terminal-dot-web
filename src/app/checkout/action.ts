import { getAccessToken } from "@/lib/auth";
import Terminal from "@terminaldotshop/sdk";

interface CheckoutParams {
  cardID: string;
  addressID: string;
}

const checkout = async ({ cardID, addressID }: CheckoutParams) => {
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

  client.cart.convert();

  return {
    success: true,
    message: "Checkout initiated successfully",
  };
};
