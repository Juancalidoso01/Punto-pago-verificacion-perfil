"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import type { Locale } from "@/i18n/types";
import { LOCALES } from "@/i18n/types";
import { useI18n } from "@/i18n/i18n-context";

function hrefWithLang(pathname: string, search: string, lang: Locale) {
  const q = new URLSearchParams(search);
  q.set("lang", lang);
  const s = q.toString();
  return `${pathname}${s ? `?${s}` : ""}`;
}

function PpLangSwitcherInner({ className = "" }: { className?: string }) {
  const { locale, messages } = useI18n();
  const pathname = usePathname() || "/";
  const sp = useSearchParams();
  const search = useMemo(() => sp.toString(), [sp]);

  return (
    <div
      className={`flex items-center gap-1 rounded-lg border border-slate-200/80 bg-white/70 px-1 py-0.5 text-[11px] font-semibold shadow-sm sm:text-xs ${className}`}
      role="group"
      aria-label={messages.lang.label}
    >
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={hrefWithLang(pathname, search, l)}
            className={`pp-touch min-h-8 min-w-8 rounded-md px-1.5 py-1 text-center sm:min-h-0 sm:min-w-0 sm:px-2 sm:py-1 ${
              active
                ? "bg-[#4749B6] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
            aria-current={active ? "true" : undefined}
            prefetch={false}
          >
            {messages.lang[l]}
          </Link>
        );
      })}
    </div>
  );
}

/** `useSearchParams` requiere un padre `Suspense` (recomendación Next.js / evita errores de render). */
export function PpLangSwitcher({ className = "" }: { className?: string }) {
  return (
    <Suspense
      fallback={
        <div
          className={`flex h-9 min-w-[5.5rem] animate-pulse rounded-lg border border-slate-200/80 bg-slate-100/80 sm:h-8 ${className}`}
          aria-hidden
        />
      }
    >
      <PpLangSwitcherInner className={className} />
    </Suspense>
  );
}
