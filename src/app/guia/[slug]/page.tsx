import { notFound } from "next/navigation";
import { GuiaPasoPageShell } from "@/components/guia-paso-page-shell";
import { PpAppChrome } from "@/components/pp-app-chrome";
import { getLocale } from "@/i18n/get-locale";
import { getAppMessages } from "@/i18n/messages";
import {
  buildFlowGuideNodes,
  getGuideNodeBySlug,
} from "@/lib/cambio-perfil-flow-guide";

type Params = Promise<{ slug: string }>;

export default async function GuiaSlugPage({ params }: { params: Params }) {
  const { slug } = await params;
  const messages = getAppMessages(await getLocale());
  const nodes = buildFlowGuideNodes(messages.guide);
  const node = getGuideNodeBySlug(slug, nodes);
  if (!node) notFound();

  return (
    <PpAppChrome>
      <div className="mx-auto max-w-lg pb-16 sm:max-w-xl">
        <GuiaPasoPageShell mode="site" node={node} embedQuerySuffix="" />
      </div>
    </PpAppChrome>
  );
}
