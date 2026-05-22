import { NextResponse } from "next/server";
import { canAccessMetamapWebhookDebug } from "@/lib/metamap-webhook-config";
import { listMetamapWebhookEvents } from "@/lib/metamap-webhook-store";

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (!canAccessMetamapWebhookDebug(req)) {
    return NextResponse.json({ ok: false, code: "FORBIDDEN" }, { status: 403 });
  }

  const limit = Number(new URL(req.url).searchParams.get("limit") ?? "20");
  return NextResponse.json({
    ok: true,
    events: listMetamapWebhookEvents(limit),
    note:
      "En serverless el buffer es por instancia; en Vercel revisá también los logs con filtro metamap-webhook.",
  });
}
