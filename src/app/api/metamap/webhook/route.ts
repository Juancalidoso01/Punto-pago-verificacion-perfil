import { NextResponse } from "next/server";
import {
  isMetamapWebhookEnabled,
  mustVerifyMetamapWebhookSignature,
  readMetamapWebhookForwardUrl,
  readMetamapWebhookSecret,
} from "@/lib/metamap-webhook-config";
import { parseMetamapWebhookPayload } from "@/lib/metamap-webhook-parse";
import { upsertVerificationStatusFromWebhook } from "@/lib/metamap-verification-status-store";
import { pushMetamapWebhookEvent } from "@/lib/metamap-webhook-store";
import { verifyMetamapWebhookSignature } from "@/lib/metamap-webhook-verify";

export const runtime = "nodejs";

function forwardWebhookCopy(rawBody: string): void {
  const url = readMetamapWebhookForwardUrl();
  if (!url) return;
  void fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: rawBody,
    signal: AbortSignal.timeout(8000),
  }).catch(() => {
    /* pruebas opcionales */
  });
}

export async function POST(req: Request) {
  if (!isMetamapWebhookEnabled()) {
    return NextResponse.json(
      { ok: false, code: "WEBHOOKS_DISABLED" },
      { status: 404 },
    );
  }

  const rawBody = await req.text();
  const secret = readMetamapWebhookSecret();
  const signature = req.headers.get("x-signature");

  let signatureValid = false;
  if (secret) {
    signatureValid = verifyMetamapWebhookSignature(
      rawBody,
      signature,
      secret,
    );
    if (!signatureValid && mustVerifyMetamapWebhookSignature()) {
      console.warn("[metamap-webhook] firma inválida o ausente");
      return NextResponse.json(
        { ok: false, code: "INVALID_SIGNATURE" },
        { status: 401 },
      );
    }
  } else if (mustVerifyMetamapWebhookSignature()) {
    return NextResponse.json(
      {
        ok: false,
        code: "WEBHOOK_SECRET_REQUIRED",
        hint: "Configura METAMAP_WEBHOOK_SECRET (mismo valor que en el dashboard MetaMap).",
      },
      { status: 503 },
    );
  } else {
    signatureValid = true;
    console.warn(
      "[metamap-webhook] sin METAMAP_WEBHOOK_SECRET — solo aceptable en desarrollo",
    );
  }

  let payload: unknown;
  try {
    payload = rawBody ? JSON.parse(rawBody) : {};
  } catch {
    return NextResponse.json(
      { ok: false, code: "INVALID_JSON" },
      { status: 400 },
    );
  }

  const summary = parseMetamapWebhookPayload(payload);
  const id = crypto.randomUUID();
  const receivedAt = new Date().toISOString();

  const logLine = {
    tag: "metamap-webhook",
    id,
    receivedAt,
    signatureValid,
    eventName: summary?.eventName ?? "unknown",
    flowId: summary?.flowId,
    resource: summary?.resource,
    stepId: summary?.stepId,
    metadata: summary?.metadata,
  };
  console.info(JSON.stringify(logLine));

  if (summary) {
    upsertVerificationStatusFromWebhook(summary, payload);
    pushMetamapWebhookEvent({
      id,
      receivedAt,
      signatureValid,
      summary,
      payload,
    });
  }

  forwardWebhookCopy(rawBody);

  return NextResponse.json({
    ok: true,
    received: true,
    id,
    eventName: summary?.eventName ?? null,
  });
}

export async function GET() {
  if (!isMetamapWebhookEnabled()) {
    return NextResponse.json(
      { ok: false, code: "WEBHOOKS_DISABLED" },
      { status: 404 },
    );
  }
  return NextResponse.json({
    ok: true,
    endpoint: "POST",
    docs: "https://docs.metamap.com/docs/webhook-specifications",
    events: [
      "verification_started",
      "step_completed",
      "verification_inputs_completed",
      "verification_completed",
      "verification_updated",
    ],
  });
}
