import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const MAX_ATTEMPTS = 3;
const LOCK_TIME_SECONDS = 30;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Si no existe el usuario → fallamos normal
        if (!user || !user.password) return null;

        // 1️⃣ Verificar si está bloqueado
        if (user.lockUntil && user.lockUntil > new Date()) {
          // Sigue bloqueado → NO devolvemos usuario
          throw new Error("AccountLocked");
        }

        // 2️⃣ Validar password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          // incrementar contador
          const attempts = user.failedLoginAttempts + 1;

          if (attempts >= MAX_ATTEMPTS) {
            // bloquear
            await prisma.user.update({
              where: { id: user.id },
              data: {
                failedLoginAttempts: attempts,
                lockUntil: new Date(Date.now() + LOCK_TIME_SECONDS * 1000),
              },
            });
          } else {
            // solo incrementar intentos
            await prisma.user.update({
              where: { id: user.id },
              data: { failedLoginAttempts: attempts },
            });
          }

          return null; // login fallido
        }

        // 3️⃣ Si el login es correcto → resetear contador y desbloquear
        if (user.failedLoginAttempts > 0 || user.lockUntil) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              failedLoginAttempts: 0,
              lockUntil: null,
            },
          });
        }

        // 4️⃣ Retornar usuario válido
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },

  pages: {
    signIn: "/signIn",
    error: "/signIn",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
