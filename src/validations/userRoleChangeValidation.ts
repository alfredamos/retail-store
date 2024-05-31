import { z } from "zod";

export const userRoleValidationSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  gender: z.enum(["Male", "Female"]).optional(),
  role: z.enum(["Admin", "Customer", "Staff"]).optional(),
});

export type UserRole = z.infer<typeof userRoleValidationSchema>;
