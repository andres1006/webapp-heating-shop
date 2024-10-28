
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./_auth.config";

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
    signIn: '/',
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
      return true;
    },
  }
});

