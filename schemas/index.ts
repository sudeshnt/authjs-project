import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({
      message: "A valid email address is required",
    })
    .min(1, {
      message: "This field is required",
    }),
  password: z.string().min(1, {
    message: "This field is required",
  }),
});
