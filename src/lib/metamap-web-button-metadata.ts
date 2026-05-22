/** Metadata para `<matamap-button metadata='…'>` (correlación con webhooks / backend). */
export function buildMetamapButtonMetadata(input: {
  oldPhoneE164: string;
  newPhoneE164: string;
  merchantLabel?: string | null;
}): string {
  const payload: Record<string, string> = {
    source: "punto-pago-cambio-perfil",
    oldPhoneE164: input.oldPhoneE164.slice(0, 32),
    newPhoneE164: input.newPhoneE164.slice(0, 32),
  };
  const label = (input.merchantLabel ?? "").trim();
  if (label) payload.merchantLabel = label.slice(0, 64);
  return JSON.stringify(payload);
}
