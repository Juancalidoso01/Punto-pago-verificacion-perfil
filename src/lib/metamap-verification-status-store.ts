import type { ParsedMetamapWebhook } from "@/lib/metamap-webhook-parse";
import { isMetamapWebhookEnabled } from "@/lib/metamap-webhook-config";
import {
  extractVerificationIdFromResource,
  normalizeMetamapVerificationStatus,
  readStatusFromVerificationPayload,
  type MetamapVerificationStatusSnapshot,
  type MetamapVerificationUiStatus,
} from "@/lib/metamap-verification-status";

type GlobalStore = typeof globalThis & {
  __ppMetamapVerificationStatus?: Map<string, MetamapVerificationStatusSnapshot>;
};

function store(): Map<string, MetamapVerificationStatusSnapshot> {
  const g = globalThis as GlobalStore;
  if (!g.__ppMetamapVerificationStatus) {
    g.__ppMetamapVerificationStatus = new Map();
  }
  return g.__ppMetamapVerificationStatus;
}

function statusFromWebhookEvent(
  eventName: string,
  summary: ParsedMetamapWebhook,
  payload: unknown,
): MetamapVerificationUiStatus {
  if (
    eventName === "verification_completed" ||
    eventName === "verification_updated"
  ) {
    const raw =
      summary.identityStatus ?? readStatusFromVerificationPayload(payload);
    return normalizeMetamapVerificationStatus(raw);
  }
  if (eventName === "verification_started") return "processing";
  if (eventName === "verification_inputs_completed") return "processing";
  if (eventName === "step_completed") {
    const step =
      payload && typeof payload === "object"
        ? ((payload as Record<string, unknown>).step as
            | Record<string, unknown>
            | undefined)
        : undefined;
    const err =
      step?.error && typeof step.error === "object"
        ? (step.error as Record<string, unknown>)
        : undefined;
    const code = String(err?.code ?? "").toLowerCase();
    if (code.includes("fraud")) return "rejected";
    if (code.includes("negligence") || code.includes("review")) {
      return "review_needed";
    }
  }
  return "processing";
}

export function upsertVerificationStatusFromWebhook(
  summary: ParsedMetamapWebhook,
  payload: unknown,
): void {
  if (!isMetamapWebhookEnabled()) return;
  const verificationId = extractVerificationIdFromResource(summary.resource);
  if (!verificationId) return;

  const nextStatus = statusFromWebhookEvent(
    summary.eventName,
    summary,
    payload,
  );
  const map = store();
  const prev = map.get(verificationId);
  const terminal =
    nextStatus === "verified" ||
    nextStatus === "review_needed" ||
    nextStatus === "rejected";

  if (
    prev &&
    (prev.status === "verified" ||
      prev.status === "review_needed" ||
      prev.status === "rejected") &&
    !terminal
  ) {
    return;
  }

  map.set(verificationId, {
    verificationId,
    status: nextStatus,
    rawStatus: summary.identityStatus ?? prev?.rawStatus,
    eventName: summary.eventName,
    matiDashboardUrl: summary.matiDashboardUrl ?? prev?.matiDashboardUrl,
    updatedAt: new Date().toISOString(),
    source: "webhook",
  });

  if (map.size > 200) {
    const first = map.keys().next().value;
    if (first) map.delete(first);
  }
}

export function getVerificationStatusFromWebhookStore(
  verificationId: string,
): MetamapVerificationStatusSnapshot | null {
  return store().get(verificationId.trim()) ?? null;
}
