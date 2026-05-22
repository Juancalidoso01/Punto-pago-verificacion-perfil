import { fetchMatiVerificationSnapshot } from "@/lib/metamap-server";
import { getVerificationStatusFromWebhookStore } from "@/lib/metamap-verification-status-store";
import {
  isTerminalMetamapVerificationStatus,
  normalizeMetamapVerificationStatus,
  type MetamapVerificationStatusSnapshot,
} from "@/lib/metamap-verification-status";

export async function resolveMetamapVerificationStatus(
  verificationId: string,
): Promise<MetamapVerificationStatusSnapshot> {
  const id = verificationId.trim();
  const fromWebhook = getVerificationStatusFromWebhookStore(id);

  if (fromWebhook && isTerminalMetamapVerificationStatus(fromWebhook.status)) {
    return fromWebhook;
  }

  const api = await fetchMatiVerificationSnapshot(id);
  if (api?.rawStatus) {
    const status = normalizeMetamapVerificationStatus(api.rawStatus);
    return {
      verificationId: id,
      status,
      rawStatus: api.rawStatus,
      eventName: fromWebhook?.eventName ?? "api_poll",
      matiDashboardUrl: api.matiDashboardUrl ?? fromWebhook?.matiDashboardUrl,
      updatedAt: new Date().toISOString(),
      source: "api",
    };
  }

  if (fromWebhook) return fromWebhook;

  return {
    verificationId: id,
    status: "processing",
    updatedAt: new Date().toISOString(),
    source: "webhook",
  };
}
