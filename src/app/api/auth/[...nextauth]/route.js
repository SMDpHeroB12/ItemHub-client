export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const HARDCODED_USER = {
  email: "test@itemhub.com",
  password: "123456",
  name: "ItemHub User",
};

const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = credentials?.email?.toLowerCase();
      const password = credentials?.password;

      if (
        email === HARDCODED_USER.email &&
        password === HARDCODED_USER.password
      ) {
        return {
          id: "mock-user-1",
          name: HARDCODED_USER.name,
          email: HARDCODED_USER.email,
        };
      }
      return null;
    },
  }),
];

// Google env থাকলে তবেই enable
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

export const authOptions = {
  session: { strategy: "jwt" },
  providers,
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
