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

export type Order = Terminal.Order;
