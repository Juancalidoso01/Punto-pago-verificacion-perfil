"use client";

import { useI18n } from "@/i18n/i18n-context";
import { DIAL_COUNTRIES, type DialCountry } from "@/lib/dial-countries";

const selectClass =
  "pp-input-mobile pp-touch w-full min-h-12 shrink-0 rounded-xl border border-slate-200/90 bg-slate-50/90 py-2 pl-2 pr-8 font-medium text-[#0B0B13] outline-none focus:border-[#4749B6]/50 focus:ring-2 focus:ring-[#4749B6]/25 sm:max-w-[11rem] sm:min-h-0 sm:w-auto sm:py-2.5 sm:text-sm";

function FormatOkIcon({ title, aria }: { title: string; aria: string }) {
  return (
    <span
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm shadow-emerald-600/20 ring-1 ring-emerald-400/30"
      title={title}
      role="img"
      aria-label={aria}
    >
      <svg
        viewBox="0 0 20 20"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

type Props = {
  id: string;
  label: string;
  description?: string;
  countryIso: string;
  onCountryIso: (iso: string) => void;
  nationalDigits: string;
  onNationalDigits: (v: string) => void;
  /** Número nacional cumple longitud mín/máx y se muestra el gancho verde */
  formatOk?: boolean;
  /** Mismo número que el otro campo: borde rojo (típicamente el campo “nuevo”) */
  duplicateError?: boolean;
};

export function AppNumberField({
  id,
  label,
  description,
  countryIso,
  onCountryIso,
  nationalDigits,
  onNationalDigits,
  formatOk = false,
  duplicateError = false,
}: Props) {
  const { messages } = useI18n();
  const f = messages.fields;
  const inputClass = [
    "pp-input-mobile pp-touch min-h-12 min-w-0 flex-1 rounded-xl border bg-white px-3 py-2.5 text-[#0B0B13] shadow-inner shadow-slate-900/[0.03] outline-none transition sm:min-h-0 sm:text-sm",
    duplicateError
      ? "border-red-400 ring-2 ring-red-200 focus:border-red-500 focus:ring-red-200"
      : "border-slate-200/90 focus:border-[#4749B6]/50 focus:ring-2 focus:ring-[#4749B6]/25",
  ].join(" ");

  const selectStateClass = duplicateError
    ? "border-red-400 ring-2 ring-red-200 focus:border-red-500 focus:ring-red-200"
    : "";

  return (
    <div className="space-y-1.5">
      <label htmlFor={`${id}-tel`} className="block">
        <span className="mb-1 block text-sm font-medium text-[#0B0B13]">
          {label}
        </span>
        {description ? (
          <span className="mb-2 block text-xs leading-relaxed text-slate-500">
            {description}
          </span>
        ) : null}
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <select
            id={`${id}-country`}
            className={`${selectClass} ${selectStateClass}`}
            value={countryIso}
            onChange={(e) => onCountryIso(e.target.value)}
            aria-label={f.countryAria(label)}
            aria-invalid={duplicateError || undefined}
          >
            {DIAL_COUNTRIES.map((c: DialCountry) => (
              <option key={c.iso} value={c.iso}>
                {c.name} (+{c.dial})
              </option>
            ))}
          </select>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <input
              id={`${id}-tel`}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              className={inputClass}
              placeholder={f.phonePlaceholder}
              value={nationalDigits}
              onChange={(e) =>
                onNationalDigits(e.target.value.replace(/\D/g, "").slice(0, 15))
              }
              aria-invalid={duplicateError || undefined}
            />
            {formatOk ? (
              <FormatOkIcon title={f.formatOkTitle} aria={f.formatOkAria} />
            ) : null}
          </div>
        </div>
        {duplicateError ? (
          <span className="mt-1 block text-xs font-medium text-red-600">
            {f.duplicateUnderField}
          </span>
        ) : null}
      </label>
    </div>
  );
}
