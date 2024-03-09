"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
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

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "Email already in use!",
    };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // TODO: Send verification token email

  return { success: "Email sent!" };
};
