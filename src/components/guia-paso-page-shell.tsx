"use client";

import Link from "next/link";
import { GuiaPasoBody } from "@/components/guia-paso-body";
import {
  buildOpenFlowHref,
  type CambioPerfilFlowGuideNode,
} from "@/lib/cambio-perfil-flow-guide";
import { useI18n } from "@/i18n/i18n-context";

type Mode = "site" | "embed";

const linkSecondary =
  "pp-touch inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50";

export function GuiaPasoPageShell({
  mode,
  node,
  embedQuerySuffix,
}: {
  mode: Mode;
  node: CambioPerfilFlowGuideNode;
  /** p. ej. `?label=…&identityId=…` para rutas embed */
  embedQuerySuffix: string;
}) {
  const { messages } = useI18n();
  const sh = messages.guide.pasoShell;
  const q = embedQuerySuffix.startsWith("?")
    ? embedQuerySuffix
    : embedQuerySuffix
      ? `?${embedQuerySuffix}`
      : "";
  const indexHref = mode === "embed" ? `/embed/guia${q}` : "/guia";
  const flowHref = mode === "embed" ? `/embed${q}` : "/";
  const openFlowHref = buildOpenFlowHref({
    mode,
    embedQuerySuffix: q,
    step: node.openFlowStep,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Link href={indexHref} className={linkSecondary}>
          {sh.index}
        </Link>
        <Link href={flowHref} className={linkSecondary}>
          {sh.flow}
        </Link>
      </div>

      <header className="space-y-3 border-b border-slate-200/90 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#4749B6]">
          {sh.kicker}
        </p>
        <div
          className="rounded-xl border border-[#4749B6]/25 bg-gradient-to-br from-[#4749B6]/[0.07] to-white/80 px-3.5 py-3 shadow-sm ring-1 ring-[#4749B6]/10 sm:px-4"
          role="status"
          aria-label={`${sh.whereInProcessLabel}: ${node.whereInProcess}`}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#4749B6]">
            {sh.whereInProcessLabel}
          </p>
          <p className="mt-1.5 text-sm font-semibold leading-snug text-[#0B0B13] sm:text-[15px]">
            {node.whereInProcess}
          </p>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-[#0B0B13] sm:text-2xl">
          {node.title}
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">{node.summary}</p>
      </header>

      <GuiaPasoBody node={node} openFlowHref={openFlowHref} />
    </div>
  );
}
