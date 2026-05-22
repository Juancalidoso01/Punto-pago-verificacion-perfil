import { getMetamapPublicConfig, isValidMatiHexIdentityId } from "@/lib/metamap-public-config";

/** Base oficial documentada: https://docs.metamap.com/docs/authentication */
const DEFAULT_API_BASE = "https://api.prod.metamap.com";

const OAUTH_PATHS = ["/oauth", "/oauth/token"] as const;
const VERIFICATIONS_PATH = "/v2/verifications";

function apiBase(): string {
  const custom = process.env.MATI_API_BASE_URL?.trim().replace(/\/$/, "");
  return custom || DEFAULT_API_BASE;
}

function readClientSecret(): string {
  return (
    process.env.MATI_CLIENT_SECRET?.trim() ||
    process.env.METAMAP_CLIENT_SECRET?.trim() ||
    ""
  );
}

function getServerMatiCredentials(): {
  clientId: string;
  clientSecret: string;
  flowId: string;
} | null {
  const clientSecret = readClientSecret();
  if (!clientSecret) return null;

  const { clientId, flowId } = getMetamapPublicConfig();
  const envClient =
    process.env.MATI_CLIENT_ID?.trim() ||
    process.env.METAMAP_CLIENT_ID?.trim() ||
    "";
  const envFlow =
    process.env.MATI_FLOW_ID?.trim() ||
    process.env.METAMAP_FLOW_ID?.trim() ||
    "";

  return {
    clientId: envClient || clientId,
    clientSecret,
    flowId: envFlow || flowId,
  };
}

function extractIdentityId(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const o = payload as Record<string, unknown>;
  const candidates = [o.identity, o.identityId];
  const nested = o.data;
  if (nested && typeof nested === "object") {
    const d = nested as Record<string, unknown>;
    candidates.push(d.identity, d.identityId);
  }
  for (const c of candidates) {
    const s = String(c ?? "").trim();
    if (isValidMatiHexIdentityId(s)) return s;
  }
  return null;
}

async function parseJsonSafe(res: Response): Promise<Record<string, unknown>> {
  try {
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
}

async function fetchMatiAccessToken(creds: {
  clientId: string;
  clientSecret: string;
  flowId: string;
}): Promise<string> {
  const basic = Buffer.from(`${creds.clientId}:${creds.clientSecret}`).toString(
    "base64",
  );
  const base = apiBase();

  /** Orden: primero el flujo documentado (solo client_credentials), luego variantes. */
  const bodyVariants: URLSearchParams[] = [
    new URLSearchParams({ grant_type: "client_credentials" }),
    new URLSearchParams({
      grant_type: "client_credentials",
      scope: "verification_flow",
      flow_id: creds.flowId,
    }),
    new URLSearchParams({
      grant_type: "application_key",
      application_key: creds.clientId,
      scope: "verification_flow",
      flow_id: creds.flowId,
    }),
  ];

  let lastError = "Mati OAuth failed";

  for (const path of OAUTH_PATHS) {
    for (const body of bodyVariants) {
      const res = await fetch(`${base}${path}`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "x-mati-app": "platform=web_desktop; version=22.2.10",
        },
        body,
        cache: "no-store",
      });

      const json = await parseJsonSafe(res);
      const token = String(json.access_token ?? "").trim();
      if (res.ok && token) return token;

      const msg = String(json.message ?? json.error ?? "").trim();
      lastError = msg
        ? `${msg} (${res.status} @ ${path})`
        : `Mati OAuth failed (${res.status} @ ${path})`;
    }
  }

  throw new Error(lastError);
}

/**
 * Crea una verificación en Mati y devuelve el **identityId** para el web button.
 */
export async function createMatiIdentityForVerification(input: {
  externalId: string;
  clientIp?: string;
}): Promise<{ identityId: string }> {
  const creds = getServerMatiCredentials();
  if (!creds) {
    throw new Error(
      "MATI_CLIENT_SECRET (o METAMAP_CLIENT_SECRET) no está configurado en el servidor",
    );
  }

  const token = await fetchMatiAccessToken(creds);
  const ip = (input.clientIp ?? "127.0.0.1").trim() || "127.0.0.1";

  const verificationUrls = [
    `${apiBase()}${VERIFICATIONS_PATH}`,
    "https://api.getmati.com/v2/verifications",
  ];

  let lastError = "Mati verification create failed";

  for (const url of verificationUrls) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-forwarded-for": ip,
      },
      body: JSON.stringify({
        flowId: creds.flowId,
        metadata: {
          source: "punto-pago-cambio-perfil",
          externalId: input.externalId.slice(0, 128),
        },
      }),
      cache: "no-store",
    });

    const json = await parseJsonSafe(res);
    const identityId = extractIdentityId(json);

    if (res.ok && identityId) {
      return { identityId };
    }

    const msg = String(json.message ?? json.error ?? "").trim();
    lastError = msg
      ? `${msg} (${res.status})`
      : identityId
        ? `Respuesta Mati sin identity válido (${res.status})`
        : `Mati verification create failed (${res.status})`;
  }

  throw new Error(lastError);
}

export function isMatiServerProvisioningEnabled(): boolean {
  return Boolean(readClientSecret());
}
