/**
 * Integración con la ventana padre (iframe): `postMessage`
 * con `source: "punto-pago-cambio-perfil"` y `type` + payload.
 *
 * ## Punto principal para backend (otro ingeniero)
 *
 * **`metamap_verification_submitted`** — Se emite cuando el usuario termina el
 * flujo en el SDK de MetaMap y ya existen `verificationId` e `identityId`.
 * Aquí el backend debe, entre otras cosas:
 * - Tomar el **número de app anterior** (`oldPhoneE164`) y comprobar si existe
 *   y si está asociado a un **identity id** coherente con la verificación.
 * - Registrar / correlacionar con MetaMap según vuestra API.
 *
 * Payload típico:
 * `verificationId`, `identityId`, `oldPhoneE164`, `newPhoneE164`,
 * `oldCountryIso`, `newCountryIso`, y opcionalmente `merchantLabel` si vino en
 * la URL del embed. El Web SDK Mati requiere **`identityId`** en `/embed`
 * (`?identityId=…`) o variable `NEXT_PUBLIC_METAMAP_IDENTITY_ID` en builds de prueba.
 *
 * ## Flujo UI actual (demo)
 *
 * Tras ese evento, la UI muestra una barra de análisis durante
 * `MIGRATION_ANALYSIS_UI_MS` (60s). En producción podéis sustituir esa espera
 * por la respuesta real del backend y cerrar el flujo cuando corresponda.
 *
 * **`migration_analysis_started`** — Comienza la fase de “análisis” en pantalla
 * (misma ventana de tiempo que arriba). Payload incluye `estimatedDurationMs`.
 *
 * **`metamap_finished`** y **`verification_succeeded`** — Se emiten al
 * finalizar la fase de análisis (hoy, al cumplirse el temporizador de demo).
 *
 * **`migration_analysis_complete`** — Fin de la fase de análisis en UI; payload
 * incluye `outcome` (p. ej. `"success"`). En producción podéis emitir errores
 * u otros valores cuando el backend responda antes que el temporizador.
 *
 * Otros eventos existentes: `flow_ready`, `apps_submitted`, `verification_started`,
 * `metamap_started`, `metamap_back_to_apps`, etc.
 *
 * ## Mensajes del host hacia el iframe (errores de negocio)
 *
 * La ventana **padre** puede enviar al iframe:
 *
 * ```ts
 * iframe.contentWindow.postMessage(
 *   {
 *     source: "punto-pago-cambio-perfil-host",
 *     type: "flow_error",
 *     errorCode: "OLD_APP_NUMBER_NOT_FOUND", // ver `cambio-perfil-errors.ts`
 *     message: "opcional: texto si errorCode no está en el catálogo",
 *     step: "apps", // opcional: "notice" | "apps" | "metamap" para volver y mostrar el error
 *   },
 *   targetOrigin,
 * );
 * ```
 *
 * El iframe **solo aplica** estos mensajes si `event.origin` está permitido (mismo criterio
 * que `frame-ancestors`: `*.puntopago.net`, `localhost`, o lista en
 * `NEXT_PUBLIC_ALLOWED_PARENT_ORIGINS`). Al **enviar** al padre: si no hay
 * `NEXT_PUBLIC_POST_MESSAGE_TARGET_ORIGIN`, se intenta usar el origen de `document.referrer`
 * cuando sea de confianza; si no, `*`.
 *
 * Códigos recomendados (textos i18n en `AppMessages['errors']`):
 * - `OLD_APP_NUMBER_NOT_FOUND` — número anterior no existe.
 * - `OLD_APP_NUMBER_NO_PROFILE` — sin perfil previo Punto Pago en ese número.
 * - `PROFILE_CHANGE_ALREADY_REGISTERED` — ya hay cambio registrado / política de 2 meses.
 *
 * También existen códigos de validación en cliente: `INVALID_NUMBER_FORMAT`,
 * `DUPLICATE_APP_NUMBERS` (normalmente no hace falta enviarlos desde el host).
 *
 * ## Guía paso a paso (producto / integradores)
 *
 * En el paso inicial hay un enlace a la guía en páginas dedicadas (`/guia`,
 * `/embed/guia` y `/guia/[slug]` / `/embed/guia/[slug]`). El contenido
 * estructurado está en `cambio-perfil-flow-guide.ts`.
 */

/** Tiempo de la barra “analizando información” en la UI (demo). Producción: alinear con backend o eliminar. */
export const MIGRATION_ANALYSIS_UI_MS = 60_000;
