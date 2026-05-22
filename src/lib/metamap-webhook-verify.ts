import { createHmac, timingSafeEqual } from "crypto";

/**
 * Valida `x-signature` (HMAC-SHA256 del cuerpo crudo).
 * @see https://docs.metamap.com/docs/configure-your-webhook-url
 */
export function verifyMetamapWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
): boolean {
  const received = (signatureHeader ?? "").trim();
  if (!received || !secret) return false;

  const expected = createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("hex");

  try {
    const a = Buffer.from(expected, "hex");
    const b = Buffer.from(received.replace(/^sha256=/i, ""), "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
