import Link from "next/link";
import { CAMBIO_PERFIL_FLOW_GUIDE_NODES } from "@/lib/cambio-perfil-flow-guide";

const cardClass =
  "block rounded-xl border border-slate-200/90 bg-white/90 p-4 shadow-sm transition hover:border-[#4749B6]/35 hover:bg-[#4749B6]/[0.04]";
const backClass =
  "inline-flex text-sm font-medium text-[#4749B6] underline-offset-2 hover:underline";

export function GuiaIndex({
  basePath,
  flowHref,
  querySuffix,
}: {
  /** `/guia` o `/embed/guia` */
  basePath: string;
  /** `/` o `/embed` + query si aplica */
  flowHref: string;
  /** `?label=…` o cadena vacía */
  querySuffix: string;
}) {
  const q = querySuffix.startsWith("?")
    ? querySuffix
    : querySuffix
      ? `?${querySuffix}`
      : "";

  return (
    <div className="space-y-6">
      <Link href={flowHref} className={backClass}>
        ← Volver al flujo de verificación
      </Link>

      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#0B0B13] sm:text-2xl">
          Guía del flujo
        </h1>
        <p className="mt-2 text-left text-sm leading-relaxed text-slate-600">
          Elegí un paso para abrir su página de detalle. En cada una podés regresar al
          índice de la guía o al flujo principal de cambio de perfil.
        </p>
      </div>

      <ul className="space-y-2.5">
        {CAMBIO_PERFIL_FLOW_GUIDE_NODES.map((n, i) => (
          <li key={n.id}>
            <Link href={`${basePath}/${n.id}${q}`} className={cardClass}>
              <span className="text-[11px] font-bold uppercase tracking-wide text-[#4749B6]">
                {i === 0 ? "General" : `Paso ${i}`}
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
