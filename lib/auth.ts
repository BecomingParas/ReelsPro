import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import UserModel from "../models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          await connectToDatabase();

          // Find user and explicitly select password field
          const user = await UserModel.findOne({
            email: credentials.email.toLowerCase(),
          }).select("+password");

          if (!user) {
            // Use generic error message to prevent user enumeration
            throw new Error("Invalid credentials");
          }

          // Use the comparePassword method from the model
          const isValid = await user.comparePassword(credentials.password);

          if (!isValid) {
            // Log failed attempt (increment loginAttempts)
            await UserModel.updateOne(
              { _id: user._id },
              {
                $inc: { loginAttempts: 1 },
              }
            );

            throw new Error("Invalid credentials");
          }

          // Check if account is locked (too many failed attempts)
          if (user.loginAttempts >= 5) {
            throw new Error(
              "Account temporarily locked due to too many failed login attempts. Please try again later or contact support."
            );
          }

          // Reset login attempts and update last login
          await UserModel.updateOne(
            { _id: user._id },
            {
              $set: {
                loginAttempts: 0,
                lastLogin: new Date(),
              },
            }
          );

          // Return user data for session
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            username: user.username,
            avatar: user.avatar || "",
            role: user.role || "user",
          };
        } catch (error: any) {
          console.error("Auth error:", error);
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = (user as any).username;
        token.avatar = (user as any).avatar;
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        (session.user as any).username = token.username as string;
        (session.user as any).avatar = token.avatar as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth",
    error: "/auth",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Refresh session every 24 hours
  },

  secret: process.env.NEXTAUTH_SECRET,

  // Security options
  useSecureSessionCookies: process.env.NODE_ENV === "production",

  debug: process.env.NODE_ENV === "development",
};
