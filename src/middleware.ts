/* import NextAuth from "next-auth";
import { authConfig } from "./_auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
 */
import { NextResponse } from 'next/server'

export function middleware(request: any) {

  if (request.nextUrl.pathname.startsWith('/home')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

}