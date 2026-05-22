import { getMetamapPublicConfig, isValidMatiHexIdentityId } from "@/lib/metamap-public-config";

const MATI_OAUTH_URL = "https://api.getmati.com/oauth/token";
const MATI_VERIFICATIONS_URL = "https://api.getmati.com/v2/verifications";

function getServerMatiCredentials(): {
  clientId: string;
  clientSecret: string;
  flowId: string;
} | null {
  const clientSecret = process.env.MATI_CLIENT_SECRET?.trim() ?? "";
  if (!clientSecret) return null;

  const { clientId, flowId } = getMetamapPublicConfig();
  const envClient = process.env.MATI_CLIENT_ID?.trim();
  const envFlow = process.env.MATI_FLOW_ID?.trim();

  return {
    clientId: envClient || clientId,
    clientSecret,
    flowId: envFlow || flowId,
  };
}

async function fetchMatiAccessToken(creds: {
  clientId: string;
  clientSecret: string;
  flowId: string;
}): Promise<string> {
  const basic = Buffer.from(`${creds.clientId}:${creds.clientSecret}`).toString(
    "base64",
  );
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    scope: "verification_flow",
    flow_id: creds.flowId,
  });

  const res = await fetch(MATI_OAUTH_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "x-mati-app": "platform=web_desktop; version=22.2.10",
    },
    body,
    cache: "no-store",
  });

  const json = (await res.json()) as { access_token?: string; message?: string };
  if (!res.ok || !json.access_token) {
    throw new Error(json.message ?? `Mati OAuth failed (${res.status})`);
  }
  return json.access_token;
}

/**
 * Crea una verificación en Mati y devuelve el **identityId** para el web button.
 * No valida el número en Punto Pago; solo metadata para pruebas / pre-backend.
 */
export async function createMatiIdentityForVerification(input: {
  externalId: string;
}): Promise<{ identityId: string }> {
  const creds = getServerMatiCredentials();
  if (!creds) {
    throw new Error("MATI_CLIENT_SECRET is not configured");
  }

  const token = await fetchMatiAccessToken(creds);
  const res = await fetch(MATI_VERIFICATIONS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
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

  const json = (await res.json()) as {
    identity?: string;
    message?: string;
    error?: string;
  };

  if (!res.ok) {
    throw new Error(
      json.message ?? json.error ?? `Mati verification create failed (${res.status})`,
    );
  }

  const identityId = String(json.identity ?? "").trim();
  if (!isValidMatiHexIdentityId(identityId)) {
    throw new Error("Mati response missing a valid identity id");
  }

  return { identityId };
}

export function isMatiServerProvisioningEnabled(): boolean {
  return Boolean(process.env.MATI_CLIENT_SECRET?.trim());
}
