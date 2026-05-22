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

  try {
    const { identityId } = await createMatiIdentityForVerification({
      externalId: externalId || `pp-test-${Date.now()}`,
    });
    return NextResponse.json({ identityId });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create Mati identity";
    return NextResponse.json(
      { error: message, code: "MATI_PROVISIONING_FAILED" },
      { status: 502 },
    );
  }
}
