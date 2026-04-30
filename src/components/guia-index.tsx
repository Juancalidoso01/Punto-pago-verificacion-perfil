import Link from "next/link";
import type { AppMessages } from "@/i18n/catalog";
import { interpolate } from "@/lib/interpolate";
import type { CambioPerfilFlowGuideNode } from "@/lib/cambio-perfil-flow-guide";

const cardClass =
  "block rounded-xl border border-slate-200/90 bg-white/90 p-4 shadow-sm transition hover:border-[#4749B6]/35 hover:bg-[#4749B6]/[0.04]";
const backClass =
  "inline-flex text-sm font-medium text-[#4749B6] underline-offset-2 hover:underline";

export function GuiaIndex({
  basePath,
  flowHref,
  querySuffix,
  nodes,
  index,
}: {
  /** `/guia` o `/embed/guia` */
  basePath: string;
  /** `/` o `/embed` + query si aplica */
  flowHref: string;
  /** `?label=…` o cadena vacía */
  querySuffix: string;
  nodes: CambioPerfilFlowGuideNode[];
  index: AppMessages["guide"]["index"];
}) {
  const q = querySuffix.startsWith("?")
    ? querySuffix
    : querySuffix
      ? `?${querySuffix}`
      : "";

  const backendHref = `${basePath}/integracion-backend${q}`;

  return (
    <div className="space-y-6">
      <Link href={flowHref} className={backClass}>
        {index.backFlow}
      </Link>

      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#0B0B13] sm:text-2xl">
          {index.title}
        </h1>
        <p className="mt-2 text-left text-sm leading-relaxed text-slate-600">
          {index.subtitle}
        </p>
      </div>

      <Link href={backendHref} className={cardClass}>
        <span className="text-[11px] font-bold uppercase tracking-wide text-amber-800">
          Backend
        </span>
        <span className="mt-1 block font-semibold text-[#0B0B13]">
          {index.backendCardTitle}
        </span>
        <span className="mt-1 block text-sm leading-snug text-slate-600">
          {index.backendCardDesc}
        </span>
        <span className="mt-3 inline-block text-sm font-semibold text-[#4749B6]">
          {index.backendCardCta} →
        </span>
      </Link>

      <ul className="space-y-2.5">
        {nodes.map((n, i) => (
          <li key={n.id}>
            <Link href={`${basePath}/${n.id}${q}`} className={cardClass}>
              <span className="text-[11px] font-bold uppercase tracking-wide text-[#4749B6]">
                {i === 0
                  ? index.stepGeneral
                  : interpolate(index.stepNLabel, { n: String(i) })}
              </span>
              <span className="mt-1 block font-semibold text-[#0B0B13]">{n.title}</span>
              <span className="mt-1 block text-sm leading-snug text-slate-600">
                {n.summary}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
