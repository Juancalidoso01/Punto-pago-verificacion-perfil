"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AppMessages } from "@/i18n/catalog";
import { getAppMessages } from "@/i18n/messages";
import { parseLocale } from "@/i18n/parse-locale";
import {
  readLocaleFromSessionStorage,
  writeLocaleCookieClient,
  writeLocaleSessionStorage,
} from "@/i18n/set-locale-cookie";
import type { Locale } from "@/i18n/types";

type I18nContextValue = {
  locale: Locale;
  messages: AppMessages;
  setLocale: (locale: Locale) => void;
};

const Ctx = createContext<I18nContextValue | null>(null);

export function I18nClientProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const stored = readLocaleFromSessionStorage();
    if (stored && stored !== initialLocale) {
      setLocaleState(stored);
    }
  }, [initialLocale]);

  const setLocale = useCallback((next: Locale) => {
    const parsed = parseLocale(next);
    setLocaleState(parsed);
    writeLocaleSessionStorage(parsed);
    writeLocaleCookieClient(parsed);
  }, []);

  const messages = useMemo(() => getAppMessages(locale), [locale]);

  const value = useMemo(
    () => ({ locale, messages, setLocale }),
    [locale, messages, setLocale],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) {
    throw new Error("useI18n must be used within I18nClientProvider");
  }
  return v;
}
