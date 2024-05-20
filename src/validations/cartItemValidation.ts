import {z} from "zod";

export const cartItemSchema = z.object({
  id: z.string().optional(),
  orderId: z.string().optional(),
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),

});

export type CartItem = z.infer<typeof cartItemSchema>;