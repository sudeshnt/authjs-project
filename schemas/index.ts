import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({
      message: "A valid email address is required",
    })
    .min(1, {
      message: "Email is required",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z
    .string()
    .email({
      message: "A valid email address is required",
    })
    .min(1, {
      message: "Email is required",
    }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;
