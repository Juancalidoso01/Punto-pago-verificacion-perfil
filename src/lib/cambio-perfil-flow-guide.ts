/**
 * Contenido de la guía “paso a paso” del widget de cambio de perfil / migración.
 * Alineado con `cambio-perfil-parent-events.ts` y los pasos de `CambioPerfilFlow`.
 * Los textos traducidos viven en `AppMessages['guide']['steps']`; use `buildFlowGuideNodes`.
 */

import type { AppMessages, GuideFigure } from "@/i18n/catalog";

export type CambioPerfilGuideStepKey =
  | "notice"
  | "apps"
  | "metamap"
  | "analyzing"
  | "done";

export type CambioPerfilGuidePostMessage = {
  /** `type` en el mensaje hacia el padre (`source: punto-pago-cambio-perfil`). */
  type: string;
  /** Cuándo se emite (desde la UI del widget). */
  when: string;
};

export type CambioPerfilFlowGuideNode = {
  id: string;
  stepKey: CambioPerfilGuideStepKey | "overview";
  title: string;
  summary: string;
  /** Parte del proceso / pantalla en la que está el usuario en este paso. */
  whereInProcess: string;
  /** Qué hace o ve el usuario en la app. */
  userFacing: string[];
  /** Eventos `postMessage` que el iframe envía al padre en esta fase. */
  widgetEmits: CambioPerfilGuidePostMessage[];
  /**
   * Momento recomendado para que el **padre / backend** consulte APIs propias,
   * correlacione con Mati o responda al usuario (p. ej. `flow_error`).
   */
  integrationHints: string[];
  /** Diagramas o capturas (`/public/...`). */
  figures?: GuideFigure[];
};

const GUIDE_NODE_ORDER = [
  { id: "overview", stepKey: "overview" },
  { id: "notice", stepKey: "notice" },
  { id: "apps", stepKey: "apps" },
  { id: "metamap", stepKey: "metamap" },
  { id: "metamap-done", stepKey: "metamap" },
  { id: "analyzing", stepKey: "analyzing" },
  { id: "done", stepKey: "done" },
] as const satisfies readonly {
  id: keyof AppMessages["guide"]["steps"];
  stepKey: CambioPerfilFlowGuideNode["stepKey"];
}[];

export function buildFlowGuideNodes(
  guide: AppMessages["guide"],
): CambioPerfilFlowGuideNode[] {
  return GUIDE_NODE_ORDER.map((meta) => {
    const block = guide.steps[meta.id];
    return {
      id: meta.id,
      stepKey: meta.stepKey,
      title: block.title,
      summary: block.summary,
      whereInProcess: block.whereInProcess,
      userFacing: block.userFacing,
      widgetEmits: block.widgetEmits,
      integrationHints: block.integrationHints,
      figures: block.figures,
    };
  });
}

export function getGuideNodeBySlug(
  slug: string,
  nodes: CambioPerfilFlowGuideNode[],
): CambioPerfilFlowGuideNode | undefined {
  return nodes.find((n) => n.id === slug);
}

/** Query opcional para conservar `label` e `identityId` en enlaces `/embed/guia`. */
export function buildEmbedGuiaQuery(params: {
  label?: string | null;
  identityId?: string | null;
}): string {
  const q = new URLSearchParams();
  const label = (params.label ?? "").trim();
  const id = (params.identityId ?? "").trim();
  if (label) q.set("label", label);
  if (id) q.set("identityId", id);
  const s = q.toString();
  return s ? `?${s}` : "";
}
