"use client";

import type { CSSProperties } from "react";
import { useI18n } from "@/i18n/i18n-context";
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
  const { messages } = useI18n();
  const m = messages.migration;
  const durationSec = Math.round(MIGRATION_ANALYSIS_UI_MS / 1000);
  const tpl = m.body;
  const o = "{{old}}";
  const n = "{{new}}";
  const io = tpl.indexOf(o);
  const in_ = tpl.indexOf(n);
  const prefix = io >= 0 ? tpl.slice(0, io) : tpl;
  const mid =
    io >= 0 && in_ > io
      ? tpl.slice(io + o.length, in_)
      : io >= 0
        ? tpl.slice(io + o.length)
        : "";
  const suffix = in_ >= 0 ? tpl.slice(in_ + n.length) : "";

  return (
    <div className="space-y-6 py-1">
      <div className="text-center">
        <h1 className="text-lg font-bold tracking-tight text-[#0B0B13] sm:text-xl">
          {m.title}
        </h1>
        <p className="mt-3 break-words text-base leading-relaxed text-slate-600 sm:text-sm">
          {prefix}
          <span className="inline-block max-w-full font-mono font-semibold text-slate-800">
            {oldPhoneE164}
          </span>
          {mid}
          <span className="inline-block max-w-full font-mono font-semibold text-slate-800">
            {newPhoneE164}
          </span>
          {suffix}
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
          aria-valuetext={m.progressAria.replace(
            "{{sec}}",
            String(durationSec),
          )}
        >
          <div className="pp-migration-analysis-bar h-full w-full rounded-full bg-gradient-to-r from-[#4749B6] to-[#3B3DA6] shadow-sm shadow-[#4749B6]/25" />
        </div>
        <p className="text-center text-sm font-medium text-slate-500 sm:text-xs">
          {m.dontClose}
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
