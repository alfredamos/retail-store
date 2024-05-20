import {z} from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "required field!",
      invalid_type_error: "email is required field!",
    })
    .email(),
  password: z.string({
    required_error: "required field!",
    invalid_type_error: "password is required field!",
  }),
});

export type Login = z.infer<typeof loginSchema>