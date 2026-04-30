"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/i18n-context";

/** Estilo secundario: documentación aparte del trámite principal. */
const boxClass =
  "rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 shadow-sm sm:p-4";
const linkClass =
  "pp-touch mt-3 inline-flex w-full min-h-11 items-center justify-center rounded-xl border border-slate-300/90 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#4749B6]/45 hover:bg-slate-50 hover:text-[#4749B6] sm:w-auto";

/**
 * Bloque separado del flujo de verificación: enlaza al índice de la guía en páginas dedicadas.
 */
export function CambioPerfilFlowGuideTeaser({
  compact,
  embedQuerySuffix = "",
}: {
  compact?: boolean;
  /** Solo embed: conservar `label` / `identityId` en la URL (incluye `?` si hay params). */
  embedQuerySuffix?: string;
}) {
  const { messages } = useI18n();
  const g = messages.guide.teaser;
  const q = embedQuerySuffix.startsWith("?")
    ? embedQuerySuffix
    : embedQuerySuffix
      ? `?${embedQuerySuffix}`
      : "";
  const guiaHref = compact ? `/embed/guia${q}` : "/guia";

  return (
    <aside className={boxClass} aria-labelledby="guia-teaser-title">
      <h2
        id="guia-teaser-title"
        className="text-xs font-bold tracking-tight text-slate-600 sm:text-sm"
      >
        {g.title}
      </h2>
      <p className="mt-2 text-left text-[11px] leading-relaxed text-slate-500 sm:text-xs">
        {g.body}
      </p>
      <Link href={guiaHref} className={linkClass}>
        {g.cta}
      </Link>
    </aside>
  );
}
