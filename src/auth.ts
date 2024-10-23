
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";

type User = {
  id: string;
  codigoEmpresa: string;
  codigoUsuario: string;
  nombreEmpresa: string;
  nombreUsuario: string;
  dobleFactor: boolean;
  restablecerClave: boolean;
  error: string | null;
  permisos: { [key: string]: string[] };
};


export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('login')
        // Simulación de un usuario autenticado
        const user = {
          id: "1",
          name: "John Doe",
          email: credentials.email,
        }

        // Simular una validación de credenciales
        if (credentials.email && credentials.password) {
          console.log('Autenticación exitosa:', user)
          return user as any
        } else {
          console.error('Credenciales incorrectas')
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/error', // Página de error personalizada
  },
  session: {
    strategy: 'jwt',

  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: any) {
      session.user.id = token.id
      return session
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log('authorized', isLoggedIn)
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
  }
});

