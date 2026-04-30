import Link from "next/link";
import { GuiaPasoBody } from "@/components/guia-paso-body";
import type { CambioPerfilFlowGuideNode } from "@/lib/cambio-perfil-flow-guide";

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
  const q = embedQuerySuffix.startsWith("?") ? embedQuerySuffix : embedQuerySuffix ? `?${embedQuerySuffix}` : "";
  const indexHref = mode === "embed" ? `/embed/guia${q}` : "/guia";
  const flowHref = mode === "embed" ? `/embed${q}` : "/";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Link href={indexHref} className={linkSecondary}>
          ← Índice de la guía
        </Link>
        <Link href={flowHref} className={linkSecondary}>
          ← Volver al flujo de verificación
        </Link>
      </div>

      <header className="space-y-2 border-b border-slate-200/90 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#4749B6]">
          Guía del proceso
        </p>
        <h1 className="text-xl font-bold tracking-tight text-[#0B0B13] sm:text-2xl">
          {node.title}
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">{node.summary}</p>
      </header>

      <GuiaPasoBody node={node} />
    </div>
  );
}
