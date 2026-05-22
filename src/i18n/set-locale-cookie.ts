import { LOCALE_COOKIE, type Locale } from "@/i18n/types";

const MAX_AGE_SEC = 60 * 60 * 24 * 365;

/** Persistencia en iframe / Safari (intenta cookie particionada de terceros). */
export function writeLocaleCookieClient(locale: Locale): void {
  if (typeof document === "undefined") return;
  const base = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${MAX_AGE_SEC}; Secure`;
  document.cookie = `${base}; SameSite=Lax`;
  document.cookie = `${base}; SameSite=None`;
}

export const LOCALE_STORAGE_KEY = "pp-locale";

export function readLocaleFromSessionStorage(): Locale | null {
  if (typeof sessionStorage === "undefined") return null;
  const v = sessionStorage.getItem(LOCALE_STORAGE_KEY);
  if (v === "es" || v === "en" || v === "ru") return v;
  return null;
}

export function writeLocaleSessionStorage(locale: Locale): void {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(LOCALE_STORAGE_KEY, locale);
}
