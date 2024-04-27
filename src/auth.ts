import NextAuth, { type DefaultSession, type User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { API_ROUTES, ROLE } from "./constants";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: DefaultSession["user"];
  }

  interface User {
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}

async function getUser(
  email: string,
  password: string
): Promise<User | undefined> {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/${API_ROUTES.SIGN_IN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role: ROLE.EMPLOYEE }),
      }
    );
    if (!res.ok) {
      return undefined;
    }
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await getUser(email, password);
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.user = user;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.user.accessToken;
      return session;
    },
  },
});
