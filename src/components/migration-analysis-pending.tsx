"use client";

import type { CSSProperties } from "react";
import { MIGRATION_ANALYSIS_UI_MS } from "@/lib/cambio-perfil-parent-events";

type Props = {
  oldPhoneE164: string;
  newPhoneE164: string;
};

/**
 * Pantalla de espera mientras el “sistema analiza” (demo: duración fija).
 * La barra usa animación CSS sincronizada con `MIGRATION_ANALYSIS_UI_MS`.
 */
export function MigrationAnalysisPending({
  oldPhoneE164,
  newPhoneE164,
}: Props) {
  const durationSec = Math.round(MIGRATION_ANALYSIS_UI_MS / 1000);

  return (
    <div className="space-y-6 py-1">
      <div className="text-center">
        <h1 className="text-lg font-bold tracking-tight text-[#0B0B13] sm:text-xl">
          Analizando tu información
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Estamos validando el número de app anterior{" "}
          <span className="font-mono font-semibold text-slate-800">
            {oldPhoneE164}
          </span>{" "}
          en nuestros sistemas y la verificación de identidad asociada a la
          migración hacia{" "}
          <span className="font-mono font-semibold text-slate-800">
            {newPhoneE164}
          </span>
          . Esto puede tardar hasta un minuto.
        </p>
      </div>

      <div className="space-y-2">
        <div
          className="pp-migration-analysis-track h-3 w-full overflow-hidden rounded-full bg-slate-200/90 shadow-inner"
          style={
            {
              "--pp-analysis-ms": `${MIGRATION_ANALYSIS_UI_MS}ms`,
            } as CSSProperties
          }
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`Análisis en curso, hasta ${durationSec} segundos`}
        >
          <div className="pp-migration-analysis-bar h-full w-full rounded-full bg-gradient-to-r from-[#4749B6] to-[#3B3DA6] shadow-sm shadow-[#4749B6]/25" />
        </div>
        <p className="text-center text-xs font-medium text-slate-500">
          No cierres esta ventana
        </p>
      </div>

      <div className="flex justify-center">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-[#4749B6]"
          aria-hidden
        />
      </div>
    </div>
  );
}
