import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      avatar: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
    avatar: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    avatar: string;
    role: string;
  }
}
