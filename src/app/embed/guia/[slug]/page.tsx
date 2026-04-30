import { notFound } from "next/navigation";
import { EmbedTopBar } from "@/components/embed-top-bar";
import { GuiaPasoPageShell } from "@/components/guia-paso-page-shell";
import { PpAmbient } from "@/components/pp-ambient";
import {
  clampEmbedText,
  EMBED_MERCHANT_LABEL_MAX_LENGTH,
  safeDecodeURIComponent,
} from "@/lib/embed-security";
import {
  buildEmbedGuiaQuery,
  buildFlowGuideNodes,
  getGuideNodeBySlug,
} from "@/lib/cambio-perfil-flow-guide";
import { getLocale } from "@/i18n/get-locale";
import { getAppMessages } from "@/i18n/messages";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ label?: string | string[]; identityId?: string | string[] }>;

export default async function EmbedGuiaSlugPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const messages = getAppMessages(await getLocale());
  const nodes = buildFlowGuideNodes(messages.guide);
  const node = getGuideNodeBySlug(slug, nodes);
  if (!node) notFound();

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

  const q = buildEmbedGuiaQuery({
    label: merchantLabel,
    identityId: identityFromQuery || null,
  });

  return (
    <div className="pp-page-bg relative min-h-dvh min-h-[100dvh]">
      <EmbedTopBar />
      <PpAmbient />
      <div className="relative z-10 mx-auto w-full max-w-[min(100%,28rem)] px-[calc(1rem+env(safe-area-inset-left,0px))] py-8 pr-[calc(1rem+env(safe-area-inset-right,0px))] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] pt-[calc(1rem+env(safe-area-inset-top,0px))] sm:px-6">
        <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg shadow-slate-900/[0.06] backdrop-blur-md sm:p-6">
          <GuiaPasoPageShell mode="embed" node={node} embedQuerySuffix={q} />
        </div>
      </div>
    </div>
  );
}
