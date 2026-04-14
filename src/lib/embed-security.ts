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
 * Origen explícito al enviar al padre. Si no se define, en producción conviene fijarlo
 * al dominio real del embedder (p. ej. `https://app.puntopago.net`).
 */
export function getPostMessageTargetOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_POST_MESSAGE_TARGET_ORIGIN?.trim() || "*"
  );
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
