// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Middleware que protege rutas con NextAuth.
 * - Si hay token válido (usuario autenticado) permite el request.
 * - Si no hay token, devuelve NextResponse.next() (puedes redirigir si quieres).
 *
 * NOTA: withAuth devuelve una función middleware válida para Next.js 16+.
 */
export default withAuth(
  function middleware(req) {
    // Aquí puedes inspeccionar req y decidir redirecciones custom si quieres.
    // Por defecto solo dejamos pasar la petición.
    return NextResponse.next();
  },
  {
    callbacks: {
      // authorized recibe { token, req, pathname }
      // Devuelve true si el request está autorizado.
      authorized: ({ token }) => {
        // Si existe token (sesión) → autorizado
        return !!token;
      },
    },
  }
);

// Rutas a proteger (ajusta si necesitas otras)
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
