"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";

type Step = "intro" | "code" | "done";

const CODE_LEN = 6;

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
  /** Nombre del comercio o cliente, opcional (p. ej. desde query) */
  merchantLabel?: string | null;
}) {
  const [step, setStep] = useState<Step>("intro");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    notifyParent({ type: "widget_ready" });
  }, []);

  const canSubmitCode = useMemo(
    () => code.replace(/\D/g, "").length === CODE_LEN,
    [code],
  );

  const onStart = useCallback(() => {
    setError(null);
    setStep("code");
    notifyParent({ type: "verification_started" });
  }, []);

  const onSubmitCode = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!canSubmitCode) return;
      setError(null);
      // Placeholder: aquí conectarás OTP / backend Punto Pago
      const ok = code === "000000";
      if (ok) {
        setStep("done");
        notifyParent({ type: "verification_succeeded", code: "***" });
      } else {
        setError("Código incorrecto. Revisa el mensaje o solicita uno nuevo.");
        notifyParent({ type: "verification_failed" });
      }
    },
    [canSubmitCode, code],
  );

  const cardClass = compact
    ? "rounded-2xl border border-white/70 bg-white/90 p-5 shadow-lg shadow-slate-900/[0.06] backdrop-blur-md sm:p-6"
    : "mx-auto max-w-lg rounded-2xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-slate-900/[0.08] backdrop-blur-md sm:p-8";

  return (
    <div className={cardClass}>
      {step === "intro" && (
        <div className="space-y-4">
          <h1 className="text-lg font-bold tracking-tight text-[#0B0B13] sm:text-xl">
            Confirma tu identidad
          </h1>
          <p className="text-sm leading-relaxed text-slate-600">
            Por seguridad, necesitamos verificarte antes de cambiar el perfil de
            tu cuenta en Punto Pago.
            {merchantLabel ? (
              <>
                {" "}
                <span className="font-semibold text-slate-800">
                  {merchantLabel}
                </span>
              </>
            ) : null}
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-slate-600">
            <li>Te enviaremos un código por el canal que ya tienes registrado.</li>
            <li>El proceso solo toma un momento.</li>
          </ul>
          <button
            type="button"
            onClick={onStart}
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#4749B6] to-[#3B3DA6] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[#4749B6]/25 ring-1 ring-white/20 transition hover:brightness-[1.03] active:scale-[0.99]"
          >
            Continuar
          </button>
          <p className="text-center text-[11px] text-slate-500">
            Demo: en el siguiente paso usa el código{" "}
            <span className="font-mono font-semibold text-slate-700">
              000000
            </span>{" "}
            hasta conectar el backend.
          </p>
        </div>
      )}

      {step === "code" && (
        <form className="space-y-4" onSubmit={onSubmitCode}>
          <h1 className="text-lg font-bold tracking-tight text-[#0B0B13] sm:text-xl">
            Ingresa el código
          </h1>
          <p className="text-sm text-slate-600">
            Escribe el código de {CODE_LEN} dígitos que te enviamos.
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
                setStep("intro");
                setCode("");
                setError(null);
                notifyParent({ type: "verification_cancelled" });
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Volver
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
        </div>
      )}
    </div>
  );
}
