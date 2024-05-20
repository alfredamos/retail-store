import {z} from "zod";

export const orderSchema = z.object({
  id: z.string().optional(), 
  customerId: z.string(), 
  totalQuantity: z.number().optional(),
  totalPrice: z.number().optional(),
  isShipped: z.boolean().optional(),
  isDelivered: z.boolean().optional(),
  status: z.enum(["Delivered","Pending", "Shipped"]).optional()
});

export type Order = z.infer<typeof orderSchema>;