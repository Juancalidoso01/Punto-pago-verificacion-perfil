/** País + prefijo telefónico (sin +) para el selector del widget. */

export type DialCountry = {
  iso: string;
  name: string;
  /** Código sin el símbolo + (ej. "507") */
  dial: string;
};

/** Panamá primero; el resto orden alfabético por nombre. */
export const DIAL_COUNTRIES: DialCountry[] = [
  { iso: "PA", name: "Panamá", dial: "507" },
  { iso: "AR", name: "Argentina", dial: "54" },
  { iso: "BR", name: "Brasil", dial: "55" },
  { iso: "CL", name: "Chile", dial: "56" },
  { iso: "CO", name: "Colombia", dial: "57" },
  { iso: "CR", name: "Costa Rica", dial: "506" },
  { iso: "EC", name: "Ecuador", dial: "593" },
  { iso: "ES", name: "España", dial: "34" },
  { iso: "US", name: "Estados Unidos", dial: "1" },
  { iso: "GT", name: "Guatemala", dial: "502" },
  { iso: "HN", name: "Honduras", dial: "504" },
  { iso: "MX", name: "México", dial: "52" },
  { iso: "NI", name: "Nicaragua", dial: "505" },
  { iso: "PE", name: "Perú", dial: "51" },
  { iso: "DO", name: "Rep. Dominicana", dial: "1" },
  { iso: "SV", name: "El Salvador", dial: "503" },
  { iso: "UY", name: "Uruguay", dial: "598" },
  { iso: "VE", name: "Venezuela", dial: "58" },
];

export const DEFAULT_DIAL_ISO = "PA";

export function findDialCountry(iso: string): DialCountry | undefined {
  return DIAL_COUNTRIES.find((c) => c.iso === iso);
}

export function onlyDigits(s: string): string {
  return s.replace(/\D/g, "");
}

/** Construye E.164 aproximado (+ y dígitos). */
export function toE164(dial: string, nationalDigits: string): string {
  const d = onlyDigits(dial);
  const n = onlyDigits(nationalDigits);
  if (!d || !n) return "";
  return `+${d}${n}`;
}
