import { CambioPerfilFlow } from "@/components/cambio-perfil-flow";
import { PpAmbient } from "@/components/pp-ambient";

type SearchParams = Promise<{ label?: string | string[] }>;

export default async function EmbedPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const raw = sp.label;
  const merchantLabel =
    typeof raw === "string"
      ? decodeURIComponent(raw).trim() || null
      : Array.isArray(raw)
        ? decodeURIComponent(raw[0] ?? "").trim() || null
        : null;

  return (
    <div className="pp-page-bg relative min-h-dvh min-h-[100dvh]">
      <PpAmbient />
      <div className="relative z-10 flex min-h-dvh min-h-[100dvh] items-center justify-center pl-[calc(1rem+env(safe-area-inset-left,0px))] pr-[calc(1rem+env(safe-area-inset-right,0px))] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] pt-[calc(1rem+env(safe-area-inset-top,0px))] sm:p-6">
        <CambioPerfilFlow compact merchantLabel={merchantLabel} />
      </div>
    </div>
  );
}
