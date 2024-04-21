import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import { getUserById } from "./data/user";
import { db } from "./lib/db";
import { ExtendedUser } from "./next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      if (!user.id) return false;

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = (await getUserById(
        token.sub
      )) as unknown as ExtendedUser;

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
    async session({ token, session }) {
      // token passed from the jwt callback
      console.log("🚀 ~ session ~ token:", token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
  },
  ...authConfig,
});
