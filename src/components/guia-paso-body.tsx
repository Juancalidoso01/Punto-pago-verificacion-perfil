"use client";

import type { CambioPerfilFlowGuideNode } from "@/lib/cambio-perfil-flow-guide";
import { useI18n } from "@/i18n/i18n-context";

/** Contenido detallado de un paso de la guía (reutilizable en páginas `/guia/...`). */
export function GuiaPasoBody({ node }: { node: CambioPerfilFlowGuideNode }) {
  const { messages } = useI18n();
  const lb = messages.guide.pasoBody;

  return (
    <div className="space-y-4 text-left text-sm text-slate-600">
      {node.figures && node.figures.length > 0 ? (
        <div className="rounded-xl border border-slate-200/90 bg-gradient-to-b from-slate-50/90 to-white/80 p-4 shadow-sm ring-1 ring-slate-100/80">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#4749B6]">
            {lb.figuresLabel}
          </p>
          <div className="mt-3 grid gap-4">
            {node.figures.map((fig) => (
              <figure key={fig.src} className="m-0">
                <div className="overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.04]">
                  {/* eslint-disable-next-line @next/next/no-img-element -- PNG/WebP/SVG locales en /public */}
                  <img
                    src={fig.src}
                    alt={fig.alt}
                    width={720}
                    height={480}
                    className="h-auto w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {fig.caption ? (
                  <figcaption className="mt-2 text-xs leading-relaxed text-slate-500">
                    {fig.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
          <p className="mt-3 border-t border-slate-200/80 pt-3 text-[10px] leading-snug text-slate-400">
            {lb.figuresFootnote}
          </p>
        </div>
      ) : null}
      {node.userFacing.length > 0 ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {lb.userFacing}
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-4 leading-relaxed">
            {node.userFacing.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {node.widgetEmits.length > 0 ? (
        <div className="rounded-xl bg-[#4749B6]/[0.06] px-4 py-3 ring-1 ring-[#4749B6]/12">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#4749B6]">
            {lb.postMessage}
          </p>
          <ul className="mt-2 space-y-2.5">
            {node.widgetEmits.map((e) => (
              <li key={e.type} className="leading-snug">
                <code className="rounded bg-white/90 px-1.5 font-mono text-[11px] text-[#0B0B13]">
                  {e.type}
                </code>
                <span className="mt-1 block text-xs text-slate-600">{e.when}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {node.integrationHints.length > 0 ? (
        <div className="rounded-xl border border-slate-200/90 bg-slate-50/90 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            {lb.backend}
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-slate-700">
            {node.integrationHints.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
