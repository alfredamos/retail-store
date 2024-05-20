import { z } from "zod";

export const changePasswordSchema = z
  .object({
    email: z
      .string({
        required_error: "required field!",
        invalid_type_error: "email is required field!",
      })
      .email(),
      oldPassword: z.string({
      required_error: "required field!",
      invalid_type_error: "oldPassword is required field!",
    }),
    newPassword: z.string({
      required_error: "required field!",
      invalid_type_error: "newPassword is required field!",
    }),
    confirmPassword: z.string({
      required_error: "required field!",
      invalid_type_error: "confirmPassword is required field!",
    }),
  })
  .refine((data) => data.newPassword.normalize() === data.confirmPassword.normalize(), {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

export type ChangePassword = z.infer<typeof changePasswordSchema>;
