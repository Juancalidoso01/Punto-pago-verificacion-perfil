import { NextResponse } from "next/server";
import { clampEmbedText } from "@/lib/embed-security";
import {
  createMatiIdentityForVerification,
  isMatiServerProvisioningEnabled,
} from "@/lib/metamap-server";

export const runtime = "nodejs";

type Body = { externalId?: unknown };

export async function POST(request: Request) {
  if (!isMatiServerProvisioningEnabled()) {
    return NextResponse.json(
      {
        error: "MATI_CLIENT_SECRET is not configured on the server",
        code: "MATI_PROVISIONING_DISABLED",
      },
      { status: 503 },
    );
  }

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    body = {};
  }

  const externalId = clampEmbedText(
    typeof body.externalId === "string" ? body.externalId : "",
    128,
  ).trim();

  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip")?.trim() ??
    "127.0.0.1";

  try {
    const { identityId } = await createMatiIdentityForVerification({
      externalId: externalId || `pp-test-${Date.now()}`,
      clientIp,
    });
    return NextResponse.json({ identityId });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create Mati identity";
    const code =
      message.includes("no está configurado") ||
      message.includes("not configured")
        ? "MATI_PROVISIONING_DISABLED"
        : "MATI_PROVISIONING_FAILED";
    return NextResponse.json(
      { error: message, code },
      { status: code === "MATI_PROVISIONING_DISABLED" ? 503 : 502 },
    );
  }
}
