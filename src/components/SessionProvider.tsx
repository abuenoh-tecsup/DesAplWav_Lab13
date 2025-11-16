'use client';

import { SessionProvider } from "next-auth/react";

export default function Provider({
  children,
  session
}: {
  children: React.ReactNode;
  session: any; // puedes tiparlo como Session | null si quieres
}) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
