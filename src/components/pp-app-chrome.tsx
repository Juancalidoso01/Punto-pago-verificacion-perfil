"use client";

import type { ReactNode } from "react";
import { PpAmbient } from "@/components/pp-ambient";
import { PpLangSwitcher } from "@/components/pp-lang-switcher";
import { useI18n } from "@/i18n/i18n-context";

const BUSINESS_HUB_URL = "https://puntopago.net/business/paymentshub/";

type PpAppChromeProps = {
  children: ReactNode;
  /** Texto opcional en el pie del encabezado (solo desktop). */
  headerDetail?: ReactNode;
};

export function PpAppChrome({ children, headerDetail }: PpAppChromeProps) {
  const { messages } = useI18n();
  const c = messages.chrome;

  return (
    <div className="pp-page-bg relative flex min-h-dvh min-h-[100dvh] flex-col">
      <PpAmbient />
      <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 pt-[calc(0.5rem+env(safe-area-inset-top,0px))] shadow-sm shadow-slate-900/[0.04] backdrop-blur-xl sm:pt-[calc(0.75rem+env(safe-area-inset-top,0px))]">
        <div className="mx-auto max-w-7xl px-[calc(1rem+env(safe-area-inset-left,0px))] pr-[calc(1rem+env(safe-area-inset-right,0px))] pb-2 sm:px-[calc(1.5rem+env(safe-area-inset-left,0px))] sm:pb-3.5">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <a
              href="https://puntopago.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="pp-touch group flex min-w-0 items-center gap-2 rounded-lg py-0.5 sm:gap-2.5 sm:py-1"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#4749B6] to-[#3B3DA6] text-xs font-bold text-white shadow-md shadow-[#4749B6]/30 ring-1 ring-white/20 sm:h-9 sm:w-9 sm:rounded-xl sm:text-sm"
                aria-hidden
              >
                PP
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-sm font-bold tracking-tight text-[#0B0B13] sm:text-[15px]">
                  Punto Pago
                </span>
                <span className="mt-0.5 hidden text-[11px] font-medium text-slate-500 sm:block">
                  {c.subtitle}
                </span>
                {headerDetail ? (
                  <span className="mt-2 hidden text-sm leading-snug text-slate-700 sm:block">
                    {headerDetail}
                  </span>
                ) : null}
              </span>
            </a>

            <nav className="flex shrink-0 items-center gap-2 sm:gap-3">
              <PpLangSwitcher />
              <a
                href={BUSINESS_HUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pp-touch hidden items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-[#4749B6] sm:inline-flex"
              >
                {c.business}
              </a>
              <a
                href="https://puntopago.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="pp-touch hidden items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-[#4749B6] sm:inline-flex"
              >
                {c.mainSite}
              </a>
            </nav>
          </div>
        </div>
        <div
          className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#4749B6]/40 to-transparent"
          aria-hidden
        />
      </header>

      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-[calc(1rem+env(safe-area-inset-left,0px))] pr-[calc(1rem+env(safe-area-inset-right,0px))] pb-[calc(3rem+env(safe-area-inset-bottom,0px))] pt-5 sm:px-[calc(1.5rem+env(safe-area-inset-left,0px))] sm:pb-24 sm:pt-10">
        {children}
      </main>

      <footer className="relative z-0 mt-auto hidden border-t border-white/50 bg-white/55 px-[calc(1rem+env(safe-area-inset-left,0px))] pr-[calc(1rem+env(safe-area-inset-right,0px))] py-6 text-center text-xs text-slate-500 backdrop-blur-md sm:block sm:px-[calc(1.5rem+env(safe-area-inset-left,0px))] sm:py-8 sm:pb-[calc(2rem+env(safe-area-inset-bottom,0px))]">
        <p>
          <span className="font-medium text-slate-600">{c.footerBrand}</span>
          {" · "}
          {c.footerLine}{" "}
          <a
            href="https://puntopago.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#4749B6] underline-offset-2 hover:underline"
          >
            {c.footerLinkLabel}
          </a>
        </p>
      </footer>
    </div>
  );
}
