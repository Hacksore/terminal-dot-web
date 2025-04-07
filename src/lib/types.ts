import type { Terminal } from "@terminaldotshop/sdk";

export interface Address {
  id: string;
  name: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phone?: string;
}

export type Card = Terminal.Card; 