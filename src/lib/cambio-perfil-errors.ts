/**
 * Catálogo de códigos y textos de error del flujo “cambio de perfil”.
 * Usarlos en UI y al mapear respuestas del backend o mensajes del host (iframe).
 */

/** Origen que debe usar la ventana padre al enviar mensajes al iframe (ver `cambio-perfil-parent-events.ts`). */
export const CAMBIO_PERFIL_HOST_MESSAGE_SOURCE =
  "punto-pago-cambio-perfil-host";

export const CAMBIO_PERFIL_ERROR_CODES = [
  /** Formato de número inválido (cliente). */
  "INVALID_NUMBER_FORMAT",
  /** Mismo E.164 en ambos campos (cliente). */
  "DUPLICATE_APP_NUMBERS",
  /** El número anterior no existe en el sistema. */
  "OLD_APP_NUMBER_NOT_FOUND",
  /** El número anterior no tiene perfil / historial previo con Punto Pago. */
  "OLD_APP_NUMBER_NO_PROFILE",
  /** Ya existe un cambio de perfil registrado o no cumple política (p. ej. límite 2 meses). */
  "PROFILE_CHANGE_ALREADY_REGISTERED",
] as const;

export type CambioPerfilErrorCode = (typeof CAMBIO_PERFIL_ERROR_CODES)[number];

import type { AppMessages } from "@/i18n/catalog";

const KNOWN = new Set<string>(CAMBIO_PERFIL_ERROR_CODES);

type ErrorCatalog = AppMessages["errors"];

/**
 * Resuelve un código conocido al texto del catálogo i18n; si el código es desconocido,
 * devuelve `fallback` o el mensaje genérico del catálogo.
 */
export function resolveCambioPerfilErrorMessage(
  code: string,
  catalog: ErrorCatalog,
  fallback?: string,
): string {
  if (KNOWN.has(code)) {
    return catalog[code as CambioPerfilErrorCode];
  }
  return fallback?.trim() || catalog.genericHost;
}
