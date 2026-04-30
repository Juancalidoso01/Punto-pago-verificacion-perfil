import type { AppMessages } from "@/i18n/catalog";
import type { Locale } from "@/i18n/types";
import { enMessages } from "@/i18n/locales/en";
import { esMessages } from "@/i18n/locales/es";
import { ruMessages } from "@/i18n/locales/ru";

export type { AppMessages } from "@/i18n/catalog";

export function getAppMessages(locale: Locale): AppMessages {
  if (locale === "en") return enMessages;
  if (locale === "ru") return ruMessages;
  return esMessages;
}
