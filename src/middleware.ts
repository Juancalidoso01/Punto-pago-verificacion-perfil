import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Solo estas rutas pueden mostrarse dentro de un iframe de otro sitio (CSP en `next.config`). */
const IFRAME_EMBED_PATHS = ["/embed", "/widget"];

function isEmbedLikePath(pathname: string): boolean {
  return IFRAME_EMBED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export function middleware(request: NextRequest) {
  const res = NextResponse.next();

  if (!isEmbedLikePath(request.nextUrl.pathname)) {
    res.headers.set("X-Frame-Options", "SAMEORIGIN");
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|webp|svg)$).*)",
  ],
};
