/**
 * Orígenes permitidos para mensajes con el padre del iframe y destino de postMessage.
 * Alineado con `frame-ancestors` en `next.config.ts` (puntopago + localhost).
 */

function envOriginsList(): string[] {
  const raw = process.env.NEXT_PUBLIC_ALLOWED_PARENT_ORIGINS?.trim();
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

/**
 * Origen explícito al enviar al padre (variable opcional en Vercel).
 */
export function getPostMessageTargetOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_POST_MESSAGE_TARGET_ORIGIN?.trim() || "*"
  );
}

/**
 * Destino real para `postMessage` al padre: sin configuración manual, si el iframe
 * tiene `document.referrer` de un dominio Punto Pago (o localhost), se usa ese origen
 * en lugar de `*`.
 */
export function resolvePostMessageTargetOriginForSend(): string {
  const explicit = process.env.NEXT_PUBLIC_POST_MESSAGE_TARGET_ORIGIN?.trim();
  if (explicit) return explicit;
  if (typeof document === "undefined") return "*";
  const ref = document.referrer;
  if (!ref) return "*";
  try {
    const origin = new URL(ref).origin;
    if (isAllowedParentMessageOrigin(origin)) return origin;
  } catch {
    /* ignore */
  }
  return "*";
}

function hostnameAllowed(hostname: string): boolean {
  if (hostname === "puntopago.net" || hostname.endsWith(".puntopago.net")) {
    return true;
  }
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return true;
  }
  return false;
}

/**
 * Acepta mensajes `postMessage` solo desde orígenes de confianza (mismo criterio que el embed).
 */
export function isAllowedParentMessageOrigin(origin: string): boolean {
  const extra = envOriginsList();
  if (extra.length > 0 && extra.includes(origin)) {
    return true;
  }
  if (extra.length > 0) {
    return false;
  }
  try {
    const u = new URL(origin);
    if (u.protocol !== "https:" && u.protocol !== "http:") {
      return false;
    }
    if (u.protocol === "https:" && hostnameAllowed(u.hostname)) {
      return true;
    }
    if (u.protocol === "http:" && hostnameAllowed(u.hostname)) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

/** Límite del query `label` en `/embed` (mitiga abuso de URL / UI). */
export const EMBED_MERCHANT_LABEL_MAX_LENGTH = 120;

/** Evita textos enormes o raros en UI (query `label`, mensajes del host). */
export function clampEmbedText(s: string, maxLen: number): string {
  const t = s.replace(/\0/g, "").trim();
  if (t.length <= maxLen) return t;
  return `${t.slice(0, maxLen)}…`;
}

export function safeDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/** IDs devueltos por el SDK MetaMap en el evento de finalización. */
const METAMAP_CALLBACK_ID_RE = /^[a-zA-Z0-9_-]{1,128}$/;

export function parseSafeMetamapCallbackId(value: string): string | null {
  const t = value.trim();
  if (!t || t.length > 128) return null;
  if (!METAMAP_CALLBACK_ID_RE.test(t)) return null;
  return t;
}
