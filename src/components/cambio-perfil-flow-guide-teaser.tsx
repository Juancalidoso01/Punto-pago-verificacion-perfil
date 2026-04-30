"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/i18n-context";

const boxClass =
  "rounded-xl border border-dashed border-[#4749B6]/35 bg-slate-50/60 p-4 shadow-inner shadow-slate-900/[0.02] sm:p-5";
const linkClass =
  "pp-touch mt-3 inline-flex w-full min-h-11 items-center justify-center rounded-xl border border-[#4749B6]/40 bg-white px-4 py-2.5 text-sm font-semibold text-[#4749B6] transition hover:border-[#4749B6]/60 hover:bg-[#4749B6]/[0.06] sm:w-auto";

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
        className="text-sm font-bold tracking-tight text-[#0B0B13] sm:text-base"
      >
        {g.title}
      </h2>
      <p className="mt-2 text-left text-xs leading-relaxed text-slate-600 sm:text-sm">
        {g.body}
      </p>
      <Link href={guiaHref} className={linkClass}>
        {g.cta}
      </Link>
    </aside>
  );
}
