/**
 * MetaMap Web Button (público). clientId y flowId son visibles en el navegador.
 * Opcional: NEXT_PUBLIC_METAMAP_CLIENT_ID y NEXT_PUBLIC_METAMAP_FLOW_ID en .env.local
 * @see https://docs.metamap.com/docs/web-metamap-button
 */
const FALLBACK_CLIENT_ID = "612566a0a0be80001b035915";
const FALLBACK_FLOW_ID = "69cbe526362b446c0e050b5d";

let cache: { clientId: string; flowId: string } | null = null;

export function getMetamapPublicConfig(): { clientId: string; flowId: string } {
  if (cache) return cache;
  cache = {
    clientId:
      process.env.NEXT_PUBLIC_METAMAP_CLIENT_ID?.trim() || FALLBACK_CLIENT_ID,
    flowId:
      process.env.NEXT_PUBLIC_METAMAP_FLOW_ID?.trim() || FALLBACK_FLOW_ID,
  };
  return cache;
}
