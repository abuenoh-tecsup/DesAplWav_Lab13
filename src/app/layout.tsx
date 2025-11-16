import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Provider from "@/components/SessionProvider";
import { authOptions } from "./api/auth/[...nextauth]/route";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Next App",
  description: "My Next Auth Mapp",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100
                    min-h-screen flex flex-col`}
      >
        {/* NAVBAR */}
        <nav className="w-full bg-black h-20 shadow-sm border-b border-gray-200">
          <div className="h-full mx-auto px-6 flex items-center justify-between max-w-6xl">

            {/* LOGO */}
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight hover:text-blue-300 transition"
            >
              MyAuthApp
            </Link>

            <ul className="flex items-center gap-6 text-sm text-gray-700">

              <li>
                <Link
                  href="/dashboard"
                  className="text-white hover:text-blue-300 transition"
                >
                  Dashboard
                </Link>
              </li>

              {session?.user && (
                <li>
                  <Link
                    href="/profile"
                    className="text-white hover:text-blue-300 transition"
                  >
                    Profile
                  </Link>
                </li>
              )}

              {session?.user && (
                <li>
                  <LogoutButton />
                </li>
              )}

              {session?.user?.image && (
                <li>
                  <Image
                    height={100}
                    width={100}
                    src={session?.user?.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
                  />
                </li>
              )}
            </ul>
          </div>
        </nav>

        {/* CONTENIDO */}
        <Provider session={session}>
          <main className="flex-1 flex">
            <div className="w-full mx-auto flex flex-col min-h-full">
              {children}
            </div>
          </main>
        </Provider>
      </body>
    </html>
  );
}
