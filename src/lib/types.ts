import type Terminal from "@terminaldotshop/sdk";

export type Card = Terminal.Card;
export type Address = Terminal.Address;

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  variant?: {
    name: string;
  };
}

export interface Order {
  id: string;
  created_at: string;
  total: number;
  status: string;
  items: OrderItem[];
}
