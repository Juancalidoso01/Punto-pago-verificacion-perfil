"use client";

import { DIAL_COUNTRIES, type DialCountry } from "@/lib/dial-countries";

const inputClass =
  "min-w-0 flex-1 rounded-xl border border-slate-200/90 bg-white px-3 py-2.5 text-sm text-[#0B0B13] shadow-inner shadow-slate-900/[0.03] outline-none transition focus:border-[#4749B6]/50 focus:ring-2 focus:ring-[#4749B6]/25";

const selectClass =
  "max-w-[min(52%,11rem)] shrink-0 rounded-xl border border-slate-200/90 bg-slate-50/90 py-2.5 pl-2 pr-7 text-xs font-medium text-slate-800 outline-none focus:border-[#4749B6]/50 focus:ring-2 focus:ring-[#4749B6]/25 sm:text-sm";

type Props = {
  id: string;
  label: string;
  description?: string;
  countryIso: string;
  onCountryIso: (iso: string) => void;
  nationalDigits: string;
  onNationalDigits: (v: string) => void;
};

export function AppNumberField({
  id,
  label,
  description,
  countryIso,
  onCountryIso,
  nationalDigits,
  onNationalDigits,
}: Props) {
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
        <div className="flex flex-wrap items-stretch gap-2 sm:flex-nowrap">
          <select
            id={`${id}-country`}
            className={selectClass}
            value={countryIso}
            onChange={(e) => onCountryIso(e.target.value)}
            aria-label={`País o prefijo para ${label}`}
          >
            {DIAL_COUNTRIES.map((c: DialCountry) => (
              <option key={c.iso} value={c.iso}>
                {c.name} (+{c.dial})
              </option>
            ))}
          </select>
          <input
            id={`${id}-tel`}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            className={inputClass}
            placeholder="Número de app"
            value={nationalDigits}
            onChange={(e) =>
              onNationalDigits(e.target.value.replace(/\D/g, "").slice(0, 15))
            }
          />
        </div>
      </label>
    </div>
  );
}
