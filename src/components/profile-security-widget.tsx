"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { AppNumberField } from "@/components/app-number-field";
import {
  DEFAULT_DIAL_ISO,
  findDialCountry,
  onlyDigits,
  toE164,
} from "@/lib/dial-countries";

type Step = "apps" | "code" | "done";

const CODE_LEN = 6;
const MIN_NATIONAL = 6;
const MAX_NATIONAL = 15;

function notifyParent(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    window.parent?.postMessage(
      { source: "punto-pago-perfil-seguridad", ...payload },
      "*",
    );
  } catch {
    /* ignore */
  }
}

export function ProfileSecurityWidget({
  compact = false,
  merchantLabel,
}: {
  compact?: boolean;
  merchantLabel?: string | null;
}) {
  const [step, setStep] = useState<Step>("apps");
  const [oldCountryIso, setOldCountryIso] = useState(DEFAULT_DIAL_ISO);
  const [oldNational, setOldNational] = useState("");
  const [newCountryIso, setNewCountryIso] = useState(DEFAULT_DIAL_ISO);
  const [newNational, setNewNational] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    notifyParent({ type: "widget_ready" });
  }, []);

  useEffect(() => {
    if (step !== "apps") return;
    setError(null);
  }, [oldNational, newNational, oldCountryIso, newCountryIso, step]);

  const oldDial = findDialCountry(oldCountryIso)?.dial ?? "507";
  const newDial = findDialCountry(newCountryIso)?.dial ?? "507";

  const oldE164 = useMemo(
    () => toE164(oldDial, oldNational),
    [oldDial, oldNational],
  );
  const newE164 = useMemo(
    () => toE164(newDial, newNational),
    [newDial, newNational],
  );

  const oldLen = onlyDigits(oldNational).length;
  const newLen = onlyDigits(newNational).length;
  const appsValid =
    oldLen >= MIN_NATIONAL &&
    oldLen <= MAX_NATIONAL &&
    newLen >= MIN_NATIONAL &&
    newLen <= MAX_NATIONAL;

  const onSubmitApps = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setError(null);
      if (!appsValid) {
        setError(
          `Indica el número de app con el prefijo elegido (${MIN_NATIONAL}–${MAX_NATIONAL} dígitos).`,
        );
        return;
      }
      if (oldE164 === newE164) {
        setError(
          "El número de app nuevo debe ser distinto al número de app anterior.",
        );
        return;
      }
      setStep("code");
      notifyParent({
        type: "apps_submitted",
        oldPhoneE164: oldE164,
        newPhoneE164: newE164,
        oldCountryIso,
        newCountryIso,
      });
      notifyParent({ type: "verification_started" });
    },
    [
      appsValid,
      oldE164,
      newE164,
      oldCountryIso,
      newCountryIso,
    ],
  );

  const canSubmitCode = useMemo(
    () => code.replace(/\D/g, "").length === CODE_LEN,
    [code],
  );

  const onSubmitCode = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!canSubmitCode) return;
      setError(null);
      const ok = code === "000000";
      if (ok) {
        setStep("done");
        notifyParent({
          type: "verification_succeeded",
          code: "***",
          oldPhoneE164: oldE164,
          newPhoneE164: newE164,
        });
      } else {
        setError("Código incorrecto. Revisa el mensaje o solicita uno nuevo.");
        notifyParent({ type: "verification_failed" });
      }
    },
    [canSubmitCode, code, oldE164, newE164],
  );

  const cardClass = compact
    ? "rounded-2xl border border-white/70 bg-white/90 p-5 shadow-lg shadow-slate-900/[0.06] backdrop-blur-md sm:p-6"
    : "mx-auto max-w-lg rounded-2xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-slate-900/[0.08] backdrop-blur-md sm:p-8";

  return (
    <div className={cardClass}>
      {step === "apps" && (
        <form className="space-y-5" onSubmit={onSubmitApps}>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#0B0B13] sm:text-xl">
              Datos de tus apps en Punto Pago
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Indica el número de app con el que usabas Punto Pago y el número de
              tu app nueva. Por defecto el país es Panamá (+507); puedes cambiar
              el país si tu número es de otro prefijo.
              {merchantLabel ? (
                <>
                  {" "}
                  <span className="font-semibold text-slate-800">
                    {merchantLabel}
                  </span>
                </>
              ) : null}
            </p>
          </div>

          <AppNumberField
            id="old-app"
            label="Número de app anterior"
            description="El número vinculado a tu servicio Punto Pago antes del cambio."
            countryIso={oldCountryIso}
            onCountryIso={setOldCountryIso}
            nationalDigits={oldNational}
            onNationalDigits={setOldNational}
          />

          <AppNumberField
            id="new-app"
            label="Número de app nuevo"
            description="El número de app al que quieres asociar tu perfil."
            countryIso={newCountryIso}
            onCountryIso={setNewCountryIso}
            nationalDigits={newNational}
            onNationalDigits={setNewNational}
          />

          {error ? (
            <p className="text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-[#4749B6] to-[#3B3DA6] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[#4749B6]/25 ring-1 ring-white/20 transition hover:brightness-[1.03] active:scale-[0.99]"
          >
            Continuar a verificación
          </button>
          <p className="text-center text-[11px] text-slate-500">
            Demo del código:{" "}
            <span className="font-mono font-semibold text-slate-700">
              000000
            </span>
          </p>
        </form>
      )}

      {step === "code" && (
        <form className="space-y-4" onSubmit={onSubmitCode}>
          <h1 className="text-lg font-bold tracking-tight text-[#0B0B13] sm:text-xl">
            Ingresa el código
          </h1>
          <p className="text-sm text-slate-600">
            Enviamos un código de {CODE_LEN} dígitos para confirmar el cambio
            entre{" "}
            <span className="font-mono font-medium text-slate-800">
              {oldE164}
            </span>{" "}
            y{" "}
            <span className="font-mono font-medium text-slate-800">
              {newE164}
            </span>
            .
          </p>
          <input
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={CODE_LEN}
            value={code}
            onChange={(ev) =>
              setCode(ev.target.value.replace(/\D/g, "").slice(0, CODE_LEN))
            }
            className="w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-center font-mono text-2xl tracking-[0.35em] text-[#0B0B13] shadow-inner shadow-slate-900/[0.03] outline-none ring-0 transition focus:border-[#4749B6]/50 focus:ring-2 focus:ring-[#4749B6]/25"
            placeholder="······"
            aria-label="Código de verificación"
          />
          {error ? (
            <p className="text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setStep("apps");
                setCode("");
                setError(null);
                notifyParent({ type: "verification_cancelled" });
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Volver y editar números
            </button>
            <button
              type="submit"
              disabled={!canSubmitCode}
              className="rounded-xl bg-gradient-to-r from-[#4749B6] to-[#3B3DA6] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#4749B6]/20 ring-1 ring-white/15 transition enabled:hover:brightness-[1.03] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Verificar
            </button>
          </div>
        </form>
      )}

      {step === "done" && (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl shadow-inner ring-1 ring-emerald-100">
            ✓
          </div>
          <h1 className="text-lg font-bold tracking-tight text-[#0B0B13] sm:text-xl">
            Verificación completada
          </h1>
          <p className="text-sm text-slate-600">
            Ya puedes continuar con el cambio de perfil en la aplicación de Punto
            Pago.
          </p>
          <p className="text-xs text-slate-500">
            Apps registradas:{" "}
            <span className="font-mono text-slate-700">{oldE164}</span>
            {" → "}
            <span className="font-mono text-slate-700">{newE164}</span>
          </p>
        </div>
      )}
    </div>
  );
}
