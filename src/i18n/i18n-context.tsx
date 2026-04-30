"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import type { Locale } from "@/i18n/types";
import type { AppMessages } from "@/i18n/catalog";

const Ctx = createContext<{
  locale: Locale;
  messages: AppMessages;
} | null>(null);

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: AppMessages;
  children: ReactNode;
}) {
  return (
    <Ctx.Provider value={{ locale, messages }}>{children}</Ctx.Provider>
  );
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return v;
}
