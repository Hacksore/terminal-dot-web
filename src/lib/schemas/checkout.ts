import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().min(1, "Name is required"),
  street1: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().default("US"),
  zip: z.string().min(1, "ZIP code is required"),
});

export const checkoutSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    addressId: z.string(),
    cardId: z.string(),
    name: z.string().optional(),
    street1: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    zip: z.string().optional(),
  })
  .refine(
    (data) =>
      data.addressId ||
      (data.name && data.street1 && data.city && data.province && data.zip),
    {
      message: "Either select a saved address or fill in all address fields",
      path: ["address"],
    },
  );

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
