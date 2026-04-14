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

export const CAMBIO_PERFIL_ERROR_MESSAGES: Record<
  CambioPerfilErrorCode,
  string
> = {
  INVALID_NUMBER_FORMAT:
    "Indica el número de app con el prefijo elegido (6–15 dígitos).",
  DUPLICATE_APP_NUMBERS:
    "El número de app nuevo debe ser distinto al número de app anterior.",
  OLD_APP_NUMBER_NOT_FOUND:
    "No encontramos una cuenta Punto Pago asociada a ese número de app anterior. Revisa el número, el país e inténtalo de nuevo.",
  OLD_APP_NUMBER_NO_PROFILE:
    "Ese número de app no tiene un perfil previo con Punto Pago. Solo puedes migrar desde un número con el que ya hayas usado el servicio.",
  PROFILE_CHANGE_ALREADY_REGISTERED:
    "Este número ya tiene un cambio de perfil registrado o aún no cumples el plazo entre cambios (máximo uno cada 2 meses). Si necesitas ayuda, contacta a soporte.",
};

const KNOWN = new Set<string>(CAMBIO_PERFIL_ERROR_CODES);

/**
 * Resuelve un código conocido al texto en español; si el código es desconocido,
 * devuelve `fallback` o un mensaje genérico.
 */
export function resolveCambioPerfilErrorMessage(
  code: string,
  fallback?: string,
): string {
  if (KNOWN.has(code)) {
    return CAMBIO_PERFIL_ERROR_MESSAGES[code as CambioPerfilErrorCode];
  }
  return (
    fallback?.trim() ||
    "No pudimos completar el paso. Revisa los datos e inténtalo de nuevo."
  );
}
