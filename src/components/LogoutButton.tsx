"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/signIn" })}
      className="bg-gray-600 text-white py-1.5 px-3 rounded hover:bg-red-500 transition text-sm"
    >
      Cerrar sesión
    </button>
  );
}
