/**
 * Contenido de la guía “paso a paso” del widget de cambio de perfil / migración.
 * Alineado con `cambio-perfil-parent-events.ts` y los pasos de `CambioPerfilFlow`.
 */

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
  /** Qué hace o ve el usuario en la app. */
  userFacing: string[];
  /** Eventos `postMessage` que el iframe envía al padre en esta fase. */
  widgetEmits: CambioPerfilGuidePostMessage[];
  /**
   * Momento recomendado para que el **padre / backend** consulte APIs propias,
   * correlacione con Mati o responda al usuario (p. ej. `flow_error`).
   */
  integrationHints: string[];
};

export function getGuideNodeBySlug(
  slug: string,
): CambioPerfilFlowGuideNode | undefined {
  return CAMBIO_PERFIL_FLOW_GUIDE_NODES.find((n) => n.id === slug);
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

export const CAMBIO_PERFIL_FLOW_GUIDE_NODES: CambioPerfilFlowGuideNode[] = [
  {
    id: "overview",
    stepKey: "overview",
    title: "Vista general",
    summary:
      "El widget vive en un iframe; el padre (app Punto Pago) escucha mensajes y orquesta identidad Mati, validaciones y migración en servidor.",
    userFacing: [
      "El usuario completa aviso → números → verificación Mati → espera de resultado → confirmación.",
      "Los datos sensibles también viajan al padre por `postMessage` para que vuestro backend actúe.",
    ],
    widgetEmits: [
      {
        type: "flow_ready",
        when: "Al montar el widget (iframe listo para recibir `identityId` y mostrar el flujo).",
      },
    ],
    integrationHints: [
      "Tras `flow_ready`, el padre puede **crear o recuperar** `identityId` en Mati y actualizar el `src` del iframe con `?identityId=…` si aún no lo tenía.",
      "Mantener escucha de `postMessage` con `source === \"punto-pago-cambio-perfil\"` durante todo el flujo.",
    ],
  },
  {
    id: "notice",
    stepKey: "notice",
    title: "1. Aviso inicial",
    summary:
      "Migración de datos entre números de app y límite de un cambio cada 2 meses.",
    userFacing: [
      "Lee el aviso sobre migración y el límite de frecuencia del cambio de perfil.",
      "Pulsa «Entendido, continuar» para pasar a los números.",
    ],
    widgetEmits: [],
    integrationHints: [
      "Opcional: analytics o registro de que el usuario entró al flujo (sin evento adicional del widget en este paso, salvo `flow_ready` ya emitido).",
    ],
  },
  {
    id: "apps",
    stepKey: "apps",
    title: "2. Números de app",
    summary:
      "Captura número anterior y nuevo (E.164) con país; validación básica en cliente.",
    userFacing: [
      "Indica país y número de app anterior y nuevo.",
      "El botón «Continuar» solo habilita con formato válido y números distintos.",
    ],
    widgetEmits: [
      {
        type: "apps_submitted",
        when: "Al enviar el formulario de números (antes de abrir Mati).",
      },
      {
        type: "verification_started",
        when: "Inmediatamente después de `apps_submitted` (inicio del trámite de verificación en sentido amplio).",
      },
    ],
    integrationHints: [
      "Aquí o justo **antes** de permitir avanzar a Mati, el backend puede **validar** números (existencia, perfil previo, política de 2 meses).",
      "Si la validación falla, el padre envía `postMessage` con `source: \"punto-pago-cambio-perfil-host\"`, `type: \"flow_error\"` y `errorCode` (ver `cambio-perfil-errors.ts`) y opcionalmente `step: \"apps\"`.",
    ],
  },
  {
    id: "metamap",
    stepKey: "metamap",
    title: "3. Verificación Mati (SDK)",
    summary:
      "El usuario completa documento + selfie en el flujo Mati embebido; requiere `identityId` válido.",
    userFacing: [
      "Confirma los números mostrados y abre la verificación con el botón Mati.",
      "Puede volver a editar números si lo necesita.",
    ],
    widgetEmits: [
      {
        type: "metamap_started",
        when: "Cuando el usuario inicia el SDK (primer contacto con el modal Mati).",
      },
      {
        type: "metamap_back_to_apps",
        when: "Si pulsa «Volver y editar números».",
      },
    ],
    integrationHints: [
      "El **primer `identityId`** debe venir de **vuestro backend** (creación en Mati) y llegar al iframe por query o entorno de pruebas.",
      "Tras `metamap_started`, podéis correlacionar sesión en backend si lo necesitáis.",
    ],
  },
  {
    id: "metamap-done",
    stepKey: "metamap",
    title: "4. Fin de Mati → análisis",
    summary:
      "Al cerrar Mati con éxito, el widget envía los IDs de verificación y pasa a la pantalla de espera.",
    userFacing: [
      "Tras completar Mati, ve la pantalla de «analizando» con barra de progreso (en demo ~60 s).",
    ],
    widgetEmits: [
      {
        type: "metamap_verification_submitted",
        when: "Al terminar Mati con `verificationId` e `identityId` — **punto principal para backend**.",
      },
      {
        type: "migration_analysis_started",
        when: "Justo después, con `estimatedDurationMs` y los mismos identificadores.",
      },
    ],
    integrationHints: [
      "**Consulta / escritura principal:** validar `oldPhoneE164`, cruzar con Mati, registrar migración, disparar jobs, etc.",
      "En producción podéis sustituir el temporizador de la UI por respuesta real del backend y cerrar antes con otros eventos si definís protocolo.",
    ],
  },
  {
    id: "analyzing",
    stepKey: "analyzing",
    title: "5. Análisis en pantalla",
    summary:
      "Espera mientras el padre procesa (hoy la UI usa un temporizador de demostración).",
    userFacing: [
      "Ve el mensaje de no cerrar la ventana y la barra de progreso.",
    ],
    widgetEmits: [],
    integrationHints: [
      "Mientras la UI muestra análisis, el backend puede **consultar estado** de Mati, actualizar cuenta, notificar otros sistemas, etc.",
      "Si el resultado es negativo, podéis enviar `flow_error` al iframe antes de que termine el tiempo de demo (si implementáis escucha adicional o siguiente pantalla).",
    ],
  },
  {
    id: "done",
    stepKey: "done",
    title: "6. Completado",
    summary:
      "Confirmación al usuario; el padre recibe el cierre del flujo en la demo.",
    userFacing: [
      "Mensaje de éxito y resumen de números migrados.",
    ],
    widgetEmits: [
      {
        type: "metamap_finished",
        when: "Al finalizar la fase de análisis en la UI (en la demo, al cumplirse el temporizador).",
      },
      {
        type: "verification_succeeded",
        when: "En el mismo instante que `metamap_finished` en la demo.",
      },
      {
        type: "migration_analysis_complete",
        when: "Payload con `outcome` (p. ej. `\"success\"`) — alinear con resultado real del backend en producción.",
      },
    ],
    integrationHints: [
      "Actualizar estado en app nativa / web padre, cerrar modal, refrescar perfil, etc.",
    ],
  },
];
