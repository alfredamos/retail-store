import { z } from "zod";

export const customerSchema = z.object({  
  id: z.string().optional(),
  name: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  postCode: z.string(),
  country: z.string(),
  userId: z.string()
  
});

export type Customer = z.infer<typeof customerSchema>;
