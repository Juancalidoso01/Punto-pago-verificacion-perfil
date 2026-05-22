import { NextResponse } from "next/server";
import { parseSafeMetamapCallbackId } from "@/lib/embed-security";
import { resolveMetamapVerificationStatus } from "@/lib/resolve-metamap-verification-status";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const id = parseSafeMetamapCallbackId(
    new URL(req.url).searchParams.get("verificationId") ?? "",
  );
  if (!id) {
    return NextResponse.json(
      { ok: false, code: "INVALID_VERIFICATION_ID" },
      { status: 400 },
    );
  }

  const snapshot = await resolveMetamapVerificationStatus(id);
  return NextResponse.json({
    ok: true,
    verificationId: snapshot.verificationId,
    status: snapshot.status,
    rawStatus: snapshot.rawStatus ?? null,
    eventName: snapshot.eventName ?? null,
    matiDashboardUrl: snapshot.matiDashboardUrl ?? null,
    source: snapshot.source,
    updatedAt: snapshot.updatedAt,
  });
}
