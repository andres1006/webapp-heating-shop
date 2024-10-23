import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const privateRoute =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/cuenta");

      if (nextUrl.pathname.startsWith("/dashboard/agencia-naviera")) {
        return true;
      }

      if (privateRoute) {
        if (isLoggedIn) {
          /*           const session = authValidate().then((session) => {
                      console.log(session)
                    }); */
          return true;
        }
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
