import { z } from "zod";

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  role: z.enum(["Admin", "Staff", "Customer"]).optional(),
  gender: z.enum(["Female", "Male"]).optional()
}); 

export type User = z.infer<typeof userSchema>;
