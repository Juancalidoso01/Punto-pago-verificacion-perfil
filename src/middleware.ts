import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { LOCALE_COOKIE } from "@/i18n/types";

/** Solo estas rutas pueden mostrarse dentro de un iframe de otro sitio (CSP en `next.config`). */
const IFRAME_EMBED_PATHS = ["/embed", "/widget"];

function isEmbedLikePath(pathname: string): boolean {
  return IFRAME_EMBED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

function isLocaleParam(v: string | null): v is "es" | "en" | "ru" {
  return v === "es" || v === "en" || v === "ru";
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const lang = url.searchParams.get("lang");

  if (isLocaleParam(lang)) {
    url.searchParams.delete("lang");
    const redirect = NextResponse.redirect(url);
    redirect.cookies.set(LOCALE_COOKIE, lang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    if (!isEmbedLikePath(url.pathname)) {
      redirect.headers.set("X-Frame-Options", "SAMEORIGIN");
    }
    return redirect;
  }

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
