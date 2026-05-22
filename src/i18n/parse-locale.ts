import type { Locale } from "@/i18n/types";

export function parseLocale(value: string | null | undefined): Locale {
  if (value === "en" || value === "ru" || value === "es") return value;
  return "es";
}
