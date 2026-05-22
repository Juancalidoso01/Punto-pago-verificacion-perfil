/**
 * Mati / MetaMap Web Button (público). clientId y flowId son visibles en el navegador.
 * Script oficial: `https://web-button.getmati.com/button.js` — elemento `<mati-button>` con `identityId`.
 * Opcional: NEXT_PUBLIC_METAMAP_CLIENT_ID, NEXT_PUBLIC_METAMAP_FLOW_ID, NEXT_PUBLIC_METAMAP_IDENTITY_ID
 * @see https://docs.metamap.com/docs/web-metamap-button
 */
const FALLBACK_CLIENT_ID = "612566a0a0be80001b035915";
const FALLBACK_FLOW_ID = "69cbe526362b446c0e050b5d";

/** Solo hex (ObjectId de Mati); rechaza valores raros en env. */
function sanitizeMetamapHexId(value: string, fallback: string): string {
  const t = value.trim();
  if (t.length < 8 || t.length > 64) return fallback;
  if (!/^[a-f0-9]+$/i.test(t)) return fallback;
  return t;
}

export function isValidMatiHexIdentityId(value: string): boolean {
  const t = value.trim();
  return t.length >= 8 && t.length <= 64 && /^[a-f0-9]+$/i.test(t);
}

/**
 * `identityId` debe venir del backend (identidad creada vía API Mati) o del query `identityId` en `/embed`.
 * Opcional: `NEXT_PUBLIC_METAMAP_IDENTITY_ID` solo para desarrollo / demos.
 */
export function resolveMatiIdentityId(
  fromEmbedQuery: string | null | undefined,
): string | null {
  const q = (fromEmbedQuery ?? "").trim();
  if (q && isValidMatiHexIdentityId(q)) return q;
  const env = process.env.NEXT_PUBLIC_METAMAP_IDENTITY_ID?.trim() ?? "";
  if (env && isValidMatiHexIdentityId(env)) return env;
  return null;
}

let cache: { clientId: string; flowId: string } | null = null;

export function getMetamapPublicConfig(): { clientId: string; flowId: string } {
  if (cache) return cache;
  const envClient = process.env.NEXT_PUBLIC_METAMAP_CLIENT_ID?.trim() ?? "";
  const envFlow = process.env.NEXT_PUBLIC_METAMAP_FLOW_ID?.trim() ?? "";
  cache = {
    clientId: sanitizeMetamapHexId(envClient, FALLBACK_CLIENT_ID),
    flowId: sanitizeMetamapHexId(envFlow, FALLBACK_FLOW_ID),
  };
  return cache;
}
