import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnApp =
        nextUrl.pathname.startsWith("/offers") ||
        nextUrl.pathname.startsWith("/matches") ||
        nextUrl.pathname.startsWith("/chat") ||
        nextUrl.pathname.startsWith("/profile") ||
        nextUrl.pathname.startsWith("/create-profile");
      if (isOnApp) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to Sign in page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/offers", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
