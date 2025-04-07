import type { Address, Card, Order } from "./types";

export async function getAddresses(): Promise<Address[]> {
  const response = await fetch("/api/terminal/address/list");
  const data = await response.json();
  return data.data || [];
}

export async function getCards(): Promise<Card[]> {
  const response = await fetch("/api/terminal/card/list");
  const data = await response.json();
  return data.data || [];
}

export async function getOrders(): Promise<Order[]> {
  const response = await fetch("/api/terminal/order/list");
  const data = await response.json();
  return data.data || [];
}

export async function createAddress(
  address: Omit<Address, "id">,
): Promise<Address> {
  const response = await fetch("/api/terminal/address/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Failed to create address");
  }
  return data;
}

export async function collectCard(): Promise<{ url: string }> {
  const response = await fetch("/api/terminal/card/collect", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Failed to collect card");
  }
  return data.data;
}
