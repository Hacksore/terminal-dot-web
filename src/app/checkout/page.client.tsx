"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { CheckoutFormData } from "@/lib/schemas/checkout";
import { checkoutSchema } from "@/lib/schemas/checkout";
import {
  createAddress,
  createCard,
  getAddresses,
  getCards,
  collectCard,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/store/cart";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [cardError, setCardError] = useState<string | null>(null);
  const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const { data: addresses, isLoading: isLoadingAddresses } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });

  const { data: cards, isLoading: isLoadingCards } = useQuery({
    queryKey: ["cards"],
    queryFn: getCards,
  });

  const createAddressMutation = useMutation({
    mutationFn: createAddress,
    onSuccess: (data) => {
      setValue("addressId", data.id);
      setAddressError(null);
    },
    onError: (error) => {
      setAddressError(
        error instanceof Error ? error.message : "Failed to create address",
      );
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      // Handle checkout logic here
      console.log("Checkout data:", data);

    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  const selectedAddressId = watch("addressId");
  const selectedCardId = watch("cardId");

  const total = items.reduce((sum, item) => {
    if (!item.selectedVariant) return sum;
    return sum + item.selectedVariant.price * item.quantity;
  }, 0);

  if (isLoadingAddresses || isLoadingCards) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="bg-zinc-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  {item.selectedVariant && (
                    <p className="text-sm text-zinc-400">
                      {item.selectedVariant.name} x {item.quantity}
                    </p>
                  )}
                </div>
                <p className="font-medium">
                  $
                  {(
                    ((item.selectedVariant?.price || 0) * item.quantity) /
                    100
                  ).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="border-t border-zinc-700 pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${(total / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={session.data?.user?.email || ""}
              disabled
            />
          </div>

          {/* Address Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Shipping Information</h2>

            {addresses && addresses.length > 0 && (
              <div className="space-y-2">
                <Label>Saved Addresses</Label>
                <div className="space-y-2">
                  {addresses.map((address) => (
                    <button
                      type="button"
                      key={address.id}
                      className={`w-full text-left p-4 rounded-lg border ${
                        selectedAddressId === address.id
                          ? "border-primary bg-primary/10"
                          : "border-zinc-700 hover:border-zinc-600"
                      }`}
                      onClick={() => setValue("addressId", address.id)}
                    >
                      <p className="font-medium">{address.name}</p>
                      <p>{address.street1}</p>
                      <p>
                        {address.city}, {address.province} {address.zip}
                      </p>
                    </button>
                  ))}
                </div>
                {selectedAddressId && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setValue("addressId", "")}
                  >
                    Use Different Address
                  </Button>
                )}
              </div>
            )}

            {!selectedAddressId && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" {...register("name")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="street1">Address</Label>
                    <Input id="street1" {...register("street1")} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" {...register("city")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="province">State</Label>
                    <Input id="province" {...register("province")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" {...register("zip")} />
                  </div>
                </div>
                {addressError && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="text-sm text-red-500">{addressError}</p>
                  </div>
                )}
                <Button
                  type="button"
                  className="w-full"
                  onClick={() =>
                    createAddressMutation.mutate({
                      name: watch("name") || "",
                      street1: watch("street1") || "",
                      city: watch("city") || "",
                      province: watch("province") || "",
                      country: "US",
                      zip: watch("zip") || "",
                    })
                  }
                  disabled={createAddressMutation.isPending}
                >
                  {createAddressMutation.isPending ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Creating Address...
                    </div>
                  ) : (
                    "Save Address"
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Card Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Payment Information</h2>

            {cards && cards.length > 0 && (
              <div className="space-y-2">
                <Label>Saved Cards</Label>
                <div className="space-y-2">
                  {cards.map((card) => (
                    <button
                      type="button"
                      key={card.id}
                      className={`w-full text-left p-4 rounded-lg border ${
                        selectedCardId === card.id
                          ? "border-primary bg-primary/10"
                          : "border-zinc-700 hover:border-zinc-600"
                      }`}
                      onClick={() => setValue("cardId", card.id)}
                    >
                      <p className="font-medium">
                        {card.brand} ending in {card.last4}
                      </p>
                      <p className="text-sm text-zinc-400">
                        Expires {card.expiration.month}/{card.expiration.year}
                      </p>
                    </button>
                  ))}
                </div>
                {selectedCardId && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setValue("cardId", "")}
                  >
                    Use Different Card
                  </Button>
                )}
              </div>
            )}

            {!selectedCardId && (
              <div className="space-y-4">
                <Button
                  type="button"
                  className="w-full"
                  onClick={async () => {
                    try {
                      const { url } = await collectCard();
                      window.open(url, "_blank");
                    } catch (error) {
                      setCardError(
                        error instanceof Error
                          ? error.message
                          : "Failed to collect card",
                      );
                    }
                  }}
                >
                  Add New Card
                </Button>
                {cardError && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="text-sm text-red-500">{cardError}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !selectedAddressId || !selectedCardId}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Processing...
              </div>
            ) : !selectedAddressId || !selectedCardId ? (
              "Please select an address and payment method"
            ) : (
              "Place Order"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
