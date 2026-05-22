/** Estado normalizado para mostrar en UI (webhook + API Mati). */
export type MetamapVerificationUiStatus =
  | "processing"
  | "verified"
  | "review_needed"
  | "rejected"
  | "unknown";

export type MetamapVerificationStatusSnapshot = {
  verificationId: string;
  status: MetamapVerificationUiStatus;
  rawStatus?: string;
  eventName?: string;
  matiDashboardUrl?: string;
  updatedAt: string;
  source: "webhook" | "api";
};

export function extractVerificationIdFromResource(
  resource: string | undefined,
): string | null {
  const r = (resource ?? "").trim();
  if (!r) return null;
  const m = r.match(/\/verifications\/([a-f0-9]+)/i);
  return m?.[1] ?? null;
}

export function normalizeMetamapVerificationStatus(
  raw: string | undefined,
): MetamapVerificationUiStatus {
  const s = (raw ?? "").trim().toLowerCase();
  if (!s) return "unknown";
  if (s === "verified" || s === "approved" || s === "success") return "verified";
  if (
    s === "reviewneeded" ||
    s === "review_needed" ||
    s === "review-needed" ||
    s === "manual_review" ||
    s === "manualreview"
  ) {
    return "review_needed";
  }
  if (
    s === "rejected" ||
    s === "declined" ||
    s === "failed" ||
    s === "fail"
  ) {
    return "rejected";
  }
  if (
    s === "processing" ||
    s === "pending" ||
    s === "running" ||
    s === "in_progress" ||
    s === "started"
  ) {
    return "processing";
  }
  return "unknown";
}

export function isTerminalMetamapVerificationStatus(
  status: MetamapVerificationUiStatus,
): boolean {
  return (
    status === "verified" ||
    status === "review_needed" ||
    status === "rejected"
  );
}

export function readStatusFromVerificationPayload(
  payload: unknown,
): string | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const o = payload as Record<string, unknown>;
  const identity =
    o.identity && typeof o.identity === "object"
      ? (o.identity as Record<string, unknown>)
      : null;
  const candidates = [
    o.identityStatus,
    o.status,
    o.state,
    identity?.status,
    identity?.state,
  ];
  for (const c of candidates) {
    const s = String(c ?? "").trim();
    if (s) return s;
  }
  return undefined;
}
