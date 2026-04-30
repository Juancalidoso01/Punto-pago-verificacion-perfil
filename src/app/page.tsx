import { PpAppChrome } from "@/components/pp-app-chrome";
import { CambioPerfilFlow } from "@/components/cambio-perfil-flow";
import { parseEmbedFlowStepFromSearchParam } from "@/lib/cambio-perfil-flow-guide";

type SearchParams = Promise<{ step?: string | string[] }>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const initialStep = parseEmbedFlowStepFromSearchParam(sp.step);

  return (
    <PpAppChrome>
      <CambioPerfilFlow initialStep={initialStep} />
    </PpAppChrome>
  );
}
