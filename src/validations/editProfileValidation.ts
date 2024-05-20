import { z } from "zod";

export const editProfileSchema = z.object({
  name: z.string({
    required_error: "required field!",
    invalid_type_error: "Name is required field!",
  }),
  email: z.string({
    required_error: "required field!",
    invalid_type_error: "Email is required field!",
  }),
  phone: z.string({
    required_error: "required field!",
    invalid_type_error: "Phone is required field!",
  }),
  role: z.string().optional(),
  password: z.string({
    required_error: "required field!",
    invalid_type_error: "Password is required field!",
  }),
});

export type EditProfile = z.infer<typeof editProfileSchema>;
