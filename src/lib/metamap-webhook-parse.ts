export type ParsedMetamapWebhook = {
  eventName: string;
  flowId?: string;
  resource?: string;
  timestamp?: string;
  metadata?: Record<string, unknown>;
  stepId?: string;
  identityStatus?: string;
  matiDashboardUrl?: string;
};

export function parseMetamapWebhookPayload(
  payload: unknown,
): ParsedMetamapWebhook | null {
  if (!payload || typeof payload !== "object") return null;
  const o = payload as Record<string, unknown>;

  const eventName = String(o.eventName ?? "").trim();
  if (!eventName) return null;

  const step =
    o.step && typeof o.step === "object"
      ? (o.step as Record<string, unknown>)
      : null;

  const metadata =
    o.metadata && typeof o.metadata === "object"
      ? (o.metadata as Record<string, unknown>)
      : undefined;

  return {
    eventName,
    flowId: String(o.flowId ?? o.flowID ?? "").trim() || undefined,
    resource: String(o.resource ?? "").trim() || undefined,
    timestamp: String(o.timestamp ?? "").trim() || undefined,
    metadata,
    stepId: step ? String(step.id ?? "").trim() || undefined : undefined,
    identityStatus:
      String(o.identityStatus ?? o.status ?? "").trim() || undefined,
    matiDashboardUrl:
      String(o.matiDashboardUrl ?? "").trim() || undefined,
  };
}
