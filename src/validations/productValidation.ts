import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  brand: z.string(),
  image: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export type Product = z.infer<typeof productSchema>;
