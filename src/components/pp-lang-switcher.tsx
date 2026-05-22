"use client";

import { useI18n } from "@/i18n/i18n-context";
import { LOCALES, type Locale } from "@/i18n/types";

export function PpLangSwitcher({ className = "" }: { className?: string }) {
  const { locale, messages, setLocale } = useI18n();

  return (
    <div
      className={`relative z-10 flex items-center gap-1 rounded-lg border border-slate-200/80 bg-white/90 px-1 py-0.5 text-[11px] font-semibold shadow-sm sm:bg-white/70 sm:text-xs ${className}`}
      role="group"
      aria-label={messages.lang.label}
    >
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l as Locale)}
            className={`pp-touch min-h-9 min-w-9 cursor-pointer rounded-md px-1.5 py-1 text-center sm:min-h-8 sm:min-w-8 sm:px-2 sm:py-1 ${
              active
                ? "bg-[#4749B6] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 active:bg-slate-200"
            }`}
            aria-current={active ? "true" : undefined}
            aria-pressed={active}
          >
            {messages.lang[l]}
          </button>
        );
      })}
    </div>
  );
}
