import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            return true
        },
    },
    providers: [],
} 