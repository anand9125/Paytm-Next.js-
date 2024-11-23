import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

const CredentialsSchema = z.object({
  phone: z.string().min(10, "Invalid phone number").max(15, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

       const { phone, password } = CredentialsSchema.parse(credentials);

        const existingUser = await db.user.findFirst({
          where: { number: phone },
        });

        if (existingUser) {
          const isValidPassword = await bcrypt.compare(password, existingUser.password);
          if (isValidPassword) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.number,
            };
          }
          throw new Error("Invalid credentials");
        }

        // Hash password for new user creation
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
          const newUser = await db.user.create({
            data: { number: phone, password: hashedPassword },
          });

          return {
            id: newUser.id.toString(),
            name: newUser.name,
            email: newUser.number,
          };
        } catch (error) {
          console.error(error);
          throw new Error("Failed to create new user");
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: { token: JWT; session: Session }) {
      if (token?.sub) {
        session.user = {
          ...session.user
        };
      }

      return session;
    },
  },
};
