"use client";

import { useId, useState } from "react";
import {
  CAMBIO_PERFIL_FLOW_GUIDE_NODES,
  type CambioPerfilFlowGuideNode,
} from "@/lib/cambio-perfil-flow-guide";

function NodeBody({ node }: { node: CambioPerfilFlowGuideNode }) {
  return (
    <div className="mt-3 space-y-3 border-t border-slate-100/90 pt-3 text-left text-sm text-slate-600">
      {node.userFacing.length > 0 ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            En la app
          </p>
          <ul className="mt-1.5 list-disc space-y-1 pl-4 leading-relaxed">
            {node.userFacing.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {node.widgetEmits.length > 0 ? (
        <div className="rounded-lg bg-[#4749B6]/[0.06] px-3 py-2.5 ring-1 ring-[#4749B6]/10">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#4749B6]">
            Widget → padre (`postMessage`)
          </p>
          <ul className="mt-1.5 space-y-2">
            {node.widgetEmits.map((e) => (
              <li key={e.type} className="leading-snug">
                <code className="rounded bg-white/80 px-1 font-mono text-[11px] text-[#0B0B13]">
                  {e.type}
                </code>
                <span className="mt-0.5 block text-xs text-slate-600">{e.when}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {node.integrationHints.length > 0 ? (
        <div className="rounded-lg border border-slate-200/80 bg-slate-50/80 px-3 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Backend / padre — cuándo consultar o actuar
          </p>
          <ul className="mt-1.5 list-disc space-y-1 pl-4 text-xs leading-relaxed text-slate-700">
            {node.integrationHints.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function CambioPerfilFlowGuide({ compact = false }: { compact?: boolean }) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>("overview");

  const pad = compact ? "p-3" : "p-4";
  const titleSm = compact ? "text-sm" : "text-base";

  return (
    <section
      className={`rounded-xl border border-[#4749B6]/20 bg-gradient-to-br from-[#4749B6]/[0.07] via-white/90 to-slate-50/50 shadow-sm ring-1 ring-[#4749B6]/10 ${pad}`}
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h2
          id={`${baseId}-heading`}
          className={`font-bold tracking-tight text-[#0B0B13] ${titleSm}`}
        >
          Cómo funciona este proceso
        </h2>
        <span className="rounded-full bg-[#4749B6]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#4749B6]">
          Guía interactiva
        </span>
      </div>
      <p className="mt-1.5 text-left text-xs leading-relaxed text-slate-600 sm:text-sm">
        Tocá cada paso para ver qué ocurre en pantalla, qué mensajes envía el widget
        al contenedor y en qué momento conviene que vuestro backend consulte APIs o
        valide datos.
      </p>

      <ol className="relative mt-4 space-y-2 sm:mt-5">
        <span
          className="absolute start-[11px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#4749B6]/35 via-[#4749B6]/20 to-slate-200/90 sm:start-[13px]"
          aria-hidden
        />
        {CAMBIO_PERFIL_FLOW_GUIDE_NODES.map((node, index) => {
          const open = openId === node.id;
          const panelId = `${baseId}-panel-${node.id}`;
          const btnId = `${baseId}-btn-${node.id}`;
          return (
            <li key={node.id} className="relative flex gap-3 sm:gap-3.5">
              <span
                className="relative z-[1] mt-2 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#4749B6] to-[#3B3DA6] text-[10px] font-bold leading-none text-white shadow-sm sm:mt-2.5 sm:h-6 sm:w-6 sm:text-[11px]"
                aria-hidden
              >
                {index === 0 ? (
                  <span className="font-sans text-[11px]">i</span>
                ) : (
                  index
                )}
              </span>
              <div className="min-w-0 flex-1 rounded-lg border border-slate-200/80 bg-white/90 shadow-sm">
                <button
                  id={btnId}
                  type="button"
                  className="flex w-full items-start justify-between gap-2 rounded-lg px-3 py-2.5 text-left transition hover:bg-slate-50/90 sm:px-3.5 sm:py-3"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : node.id)}
                >
                  <span className="min-w-0">
                    <span className="block font-semibold text-[#0B0B13] sm:text-[15px]">
                      {node.title}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-slate-500 sm:text-sm">
                      {node.summary}
                    </span>
                  </span>
                  <span
                    className={`mt-0.5 shrink-0 text-slate-400 transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    ▼
                  </span>
                </button>
                {open ? (
                  <div id={panelId} role="region" aria-labelledby={btnId} className="px-3 pb-3 sm:px-3.5 sm:pb-3.5">
                    <NodeBody node={node} />
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
