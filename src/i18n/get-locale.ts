import { cookies } from "next/headers";
import type { Locale } from "@/i18n/types";
import { LOCALE_COOKIE } from "@/i18n/types";

export function parseLocale(value: string | null | undefined): Locale {
  if (value === "en" || value === "ru" || value === "es") return value;
  return "es";
}

export async function getLocale(): Promise<Locale> {
  const c = (await cookies()).get(LOCALE_COOKIE)?.value;
  return parseLocale(c ?? undefined);
}
