import { CambioPerfilFlow } from "@/components/cambio-perfil-flow";
import { EmbedTopBar } from "@/components/embed-top-bar";
import { PpAmbient } from "@/components/pp-ambient";
import {
  clampEmbedText,
  EMBED_MERCHANT_LABEL_MAX_LENGTH,
  safeDecodeURIComponent,
} from "@/lib/embed-security";
import {
  buildEmbedGuiaQuery,
  parseEmbedFlowStepFromSearchParam,
} from "@/lib/cambio-perfil-flow-guide";

type SearchParams = Promise<{
  label?: string | string[];
  identityId?: string | string[];
  step?: string | string[];
}>;

export default async function EmbedPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const raw = sp.label;
  const decoded =
    typeof raw === "string"
      ? safeDecodeURIComponent(raw).trim()
      : Array.isArray(raw)
        ? safeDecodeURIComponent(raw[0] ?? "").trim()
        : "";
  const merchantLabel = decoded
    ? clampEmbedText(decoded, EMBED_MERCHANT_LABEL_MAX_LENGTH)
    : null;

  const rawIdentity = sp.identityId;
  const identityFromQuery =
    typeof rawIdentity === "string"
      ? safeDecodeURIComponent(rawIdentity).trim()
      : Array.isArray(rawIdentity)
        ? safeDecodeURIComponent(rawIdentity[0] ?? "").trim()
        : "";

  const guiaEmbedQuerySuffix = buildEmbedGuiaQuery({
    label: merchantLabel,
    identityId: identityFromQuery || null,
  });

  const initialStep = parseEmbedFlowStepFromSearchParam(sp.step);

  return (
    <div className="pp-page-bg relative min-h-dvh min-h-[100dvh]">
      <EmbedTopBar />
      <PpAmbient />
      <div className="relative z-10 flex min-h-dvh min-h-[100dvh] items-center justify-center pl-[calc(1rem+env(safe-area-inset-left,0px))] pr-[calc(1rem+env(safe-area-inset-right,0px))] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] pt-[calc(1rem+env(safe-area-inset-top,0px))] sm:p-6">
        <CambioPerfilFlow
          compact
          merchantLabel={merchantLabel}
          matiIdentityId={identityFromQuery || null}
          guiaEmbedQuerySuffix={guiaEmbedQuerySuffix}
          initialStep={initialStep}
        />
      </div>
    </div>
  );
}
