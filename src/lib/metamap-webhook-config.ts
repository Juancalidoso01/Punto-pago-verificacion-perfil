/** Webhooks MetaMap — solo pruebas; desactivado por defecto. */

export function isMetamapWebhookEnabled(): boolean {
  const v = process.env.METAMAP_WEBHOOK_ENABLED?.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

export function readMetamapWebhookSecret(): string {
  return (
    process.env.METAMAP_WEBHOOK_SECRET?.trim() ||
    process.env.MATI_WEBHOOK_SECRET?.trim() ||
    ""
  );
}

export function isMetamapWebhookMemoryStoreEnabled(): boolean {
  if (process.env.NODE_ENV === "development") return true;
  const v = process.env.METAMAP_WEBHOOK_MEMORY_STORE?.trim().toLowerCase();
  return v === "1" || v === "true";
}

export function readMetamapWebhookDebugToken(): string {
  return process.env.METAMAP_WEBHOOK_DEBUG_TOKEN?.trim() ?? "";
}

export function readMetamapWebhookForwardUrl(): string {
  return process.env.METAMAP_WEBHOOK_FORWARD_URL?.trim() ?? "";
}

/** En producción exigimos secret si el endpoint está activo. */
export function mustVerifyMetamapWebhookSignature(): boolean {
  if (process.env.NODE_ENV === "development") {
    return Boolean(readMetamapWebhookSecret());
  }
  return true;
}

export function canAccessMetamapWebhookDebug(req: Request): boolean {
  if (!isMetamapWebhookEnabled()) return false;
  const token = readMetamapWebhookDebugToken();
  if (!token) return process.env.NODE_ENV === "development";
  const auth =
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim() ?? "";
  const q = new URL(req.url).searchParams.get("token")?.trim() ?? "";
  return auth === token || q === token;
}
