import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/user";
import { LoginSchema } from "./schemas";

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user?.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;

          return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
