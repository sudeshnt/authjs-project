"use server";

import {
  LoginFormData,
  LoginSchema,
  RegisterFormData,
  RegisterSchema,
} from "../schemas";

export const login = async (values: LoginFormData) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  return { success: "Email sent!" };
};

export const register = async (values: RegisterFormData) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  return { success: "Email sent!" };
};
