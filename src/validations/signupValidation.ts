import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string({
      required_error: "required field!",
      invalid_type_error: "Name is required field!",
    }),   
    email: z
      .string({
        required_error: "required field!",
        invalid_type_error: "Email is required field!",
      })
      .email(),
    phone: z.string({
      required_error: "required field!",
      invalid_type_error: "Phone is required field!",
    }),   
    role: z.enum(['Admin', 'Staff', 'User']).optional(),
    adminUser: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      role: z.enum(['Admin']).optional()
    }).optional(),
    password: z.string({
      required_error: "required field!",
      invalid_type_error: "Password is required field!",
    }),
    confirmPassword: z.string({
      required_error: "required field!",
      invalid_type_error: "ConfirmPassword is required field!",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

export type Signup = z.infer<typeof signupSchema>;
