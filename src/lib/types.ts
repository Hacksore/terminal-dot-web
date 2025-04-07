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

export interface Card {
  id: string;
  last4: string;
  brand: string;
  exp_month: number;
  exp_year: number;
} 