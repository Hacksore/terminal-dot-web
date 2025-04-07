import type { Address, Card } from "./types";

export async function getAddresses(): Promise<Address[]> {
  const response = await fetch('/api/terminal/address/list');
  const data = await response.json();
  return data.data || [];
}

export async function getCards(): Promise<Card[]> {
  const response = await fetch('/api/terminal/card/list');
  const data = await response.json();
  return data.data || [];
}

export async function createAddress(address: Omit<Address, 'id'>): Promise<Address> {
  const response = await fetch('/api/terminal/address/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(address),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || 'Failed to create address');
  }
  return data;
}

export async function createCard(card: Omit<Card, 'id' | 'last4' | 'brand' | 'exp_month' | 'exp_year'> & {
  number: string;
  exp_month: number;
  exp_year: number;
  cvc: string;
}): Promise<Card> {
  const response = await fetch('/api/terminal/card/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || 'Failed to create card');
  }
  return data;
} 