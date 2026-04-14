import type { ReactNode } from "react";
import { PpAmbient } from "@/components/pp-ambient";

const BUSINESS_HUB_URL = "https://puntopago.net/business/paymentshub/";

type PpAppChromeProps = {
  children: ReactNode;
  /** Subtítulo bajo “Punto Pago” (ej. contexto del flujo) */
  subtitle?: string;
  /** Texto opcional en el pie del encabezado */
  headerDetail?: ReactNode;
};

export function PpAppChrome({
  children,
  subtitle = "Cambio de perfil · Migración de número",
  headerDetail,
}: PpAppChromeProps) {
  return (
    <div className="pp-page-bg relative flex min-h-dvh min-h-[100dvh] flex-col">
      <PpAmbient />
      <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] shadow-sm shadow-slate-900/[0.04] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-start justify-between gap-3 pb-3 pl-[calc(1rem+env(safe-area-inset-left,0px))] pr-[calc(1rem+env(safe-area-inset-right,0px))] sm:items-center sm:gap-4 sm:pl-[calc(1.5rem+env(safe-area-inset-left,0px))] sm:pr-[calc(1.5rem+env(safe-area-inset-right,0px))] sm:pb-3.5">
          <a
            href="https://puntopago.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="pp-touch group flex min-w-0 flex-1 items-start gap-2.5 rounded-lg py-1 sm:items-center"
          >
            <span
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4749B6] to-[#3B3DA6] text-sm font-bold text-white shadow-md shadow-[#4749B6]/30 ring-1 ring-white/20 transition duration-300 group-hover:scale-105 group-hover:shadow-lg sm:mt-0"
              aria-hidden
            >
              PP
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[15px] font-bold tracking-tight text-[#0B0B13]">
                Punto Pago
              </span>
              <span className="mt-0.5 block text-[11px] font-medium text-slate-500">
                {subtitle}
              </span>
              {headerDetail ? (
                <span className="mt-2 block text-sm leading-snug text-slate-700">
                  {headerDetail}
                </span>
              ) : null}
            </span>
          </a>
          <nav className="flex shrink-0 flex-wrap items-center justify-end gap-1 sm:flex-nowrap">
            <a
              href={BUSINESS_HUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pp-touch inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-[#4749B6] sm:min-h-0 sm:min-w-0 sm:px-3 sm:text-sm"
            >
              Business
            </a>
            <a
              href="https://puntopago.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="pp-touch inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-[#4749B6] sm:min-h-0 sm:min-w-0 sm:px-3 sm:text-sm"
            >
              Sitio principal
            </a>
          </nav>
        </div>
        <div
          className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#4749B6]/40 to-transparent"
          aria-hidden
        />
      </header>

      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 pl-[calc(1rem+env(safe-area-inset-left,0px))] pr-[calc(1rem+env(safe-area-inset-right,0px))] pb-[calc(4rem+env(safe-area-inset-bottom,0px))] pt-8 sm:pl-[calc(1.5rem+env(safe-area-inset-left,0px))] sm:pr-[calc(1.5rem+env(safe-area-inset-right,0px))] sm:pb-24 sm:pt-10">
        {children}
      </main>

      <footer className="relative z-0 mt-auto border-t border-white/50 bg-white/55 pl-[calc(1rem+env(safe-area-inset-left,0px))] pr-[calc(1rem+env(safe-area-inset-right,0px))] pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] text-center text-xs text-slate-500 backdrop-blur-md sm:py-8 sm:pb-[calc(2rem+env(safe-area-inset-bottom,0px))]">
        <p>
          <span className="font-medium text-slate-600">Grupo Punto Pago</span>
          {" · "}
          Cambio de perfil y migración de número.{" "}
          <a
            href="https://puntopago.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="pp-touch inline-flex min-h-11 items-center justify-center font-medium text-[#4749B6] underline-offset-2 hover:underline sm:min-h-0"
          >
            puntopago.net
          </a>
        </p>
      </footer>
    </div>
  );
}
