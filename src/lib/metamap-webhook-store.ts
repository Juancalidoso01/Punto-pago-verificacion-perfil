import type { ParsedMetamapWebhook } from "@/lib/metamap-webhook-parse";
import { isMetamapWebhookMemoryStoreEnabled } from "@/lib/metamap-webhook-config";

const MAX_EVENTS = 40;

export type StoredMetamapWebhookEvent = {
  id: string;
  receivedAt: string;
  signatureValid: boolean;
  summary: ParsedMetamapWebhook;
  payload: unknown;
};

const buffer: StoredMetamapWebhookEvent[] = [];

export function pushMetamapWebhookEvent(entry: StoredMetamapWebhookEvent): void {
  if (!isMetamapWebhookMemoryStoreEnabled()) return;
  buffer.unshift(entry);
  if (buffer.length > MAX_EVENTS) buffer.length = MAX_EVENTS;
}

export function listMetamapWebhookEvents(limit = 20): StoredMetamapWebhookEvent[] {
  const n = Math.min(Math.max(1, limit), MAX_EVENTS);
  return buffer.slice(0, n);
}
