"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { AppNumberField } from "@/components/app-number-field";
import { MigrationAnalysisPending } from "@/components/migration-analysis-pending";
import { ProfileMetamapButton } from "@/components/profile-metamap-button";
import { MIGRATION_ANALYSIS_UI_MS } from "@/lib/cambio-perfil-parent-events";
import {
  DEFAULT_DIAL_ISO,
  findDialCountry,
  onlyDigits,
  toE164,
} from "@/lib/dial-countries";

type Step = "notice" | "apps" | "metamap" | "analyzing" | "done";

const MIN_NATIONAL = 6;
const MAX_NATIONAL = 15;

/** Identificador en postMessage para la app contenedora (iframe). */
const PARENT_MESSAGE_SOURCE = "punto-pago-cambio-perfil";

function notifyParent(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    window.parent?.postMessage(
      { source: PARENT_MESSAGE_SOURCE, ...payload },
      "*",
    );
  } catch {
    /* ignore */
  }
}

export function CambioPerfilFlow({
  compact = false,
  merchantLabel,
}: {
  /** Vista compacta para incrustar en iframe */
  compact?: boolean;
  merchantLabel?: string | null;
}) {
  const [step, setStep] = useState<Step>("notice");
  const [oldCountryIso, setOldCountryIso] = useState(DEFAULT_DIAL_ISO);
  const [oldNational, setOldNational] = useState("");
  const [newCountryIso, setNewCountryIso] = useState(DEFAULT_DIAL_ISO);
  const [newNational, setNewNational] = useState("");
  const [error, setError] = useState<string | null>(null);
  const analysisEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    notifyParent({ type: "flow_ready" });
  }, []);

  useEffect(() => {
    return () => {
      if (analysisEndTimerRef.current !== null) {
        clearTimeout(analysisEndTimerRef.current);
        analysisEndTimerRef.current = null;
      }
    };
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

  const metamapMetadata = useMemo((): Record<string, string> => {
    const m: Record<string, string> = {
      source: "punto-pago-cambio-perfil",
      oldPhoneE164: oldE164,
      newPhoneE164: newE164,
      oldCountryIso,
      newCountryIso,
    };
    const label = (merchantLabel ?? "").trim();
    if (label) m.merchantLabel = label;
    return m;
  }, [oldE164, newE164, oldCountryIso, newCountryIso, merchantLabel]);

  const oldLen = onlyDigits(oldNational).length;
  const newLen = onlyDigits(newNational).length;
  const oldFormatOk =
    oldLen >= MIN_NATIONAL && oldLen <= MAX_NATIONAL;
  const newFormatOk =
    newLen >= MIN_NATIONAL && newLen <= MAX_NATIONAL;
  const duplicateNumbers =
    oldFormatOk &&
    newFormatOk &&
    oldE164.length > 0 &&
    oldE164 === newE164;

  const canContinueApps =
    oldFormatOk && newFormatOk && !duplicateNumbers;

  const onSubmitApps = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setError(null);
      if (!oldFormatOk || !newFormatOk) {
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
      setStep("metamap");
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
      oldFormatOk,
      newFormatOk,
      oldE164,
      newE164,
      oldCountryIso,
      newCountryIso,
    ],
  );

  const onMetamapComplete = useCallback(
    (ids: { verificationId: string; identityId: string }) => {
      const merchant = (merchantLabel ?? "").trim();

      /** Backend: validar número anterior, identity, MetaMap, etc. Ver `cambio-perfil-parent-events.ts`. */
      notifyParent({
        type: "metamap_verification_submitted",
        verificationId: ids.verificationId,
        identityId: ids.identityId,
        oldPhoneE164: oldE164,
        newPhoneE164: newE164,
        oldCountryIso,
        newCountryIso,
        ...(merchant ? { merchantLabel: merchant } : {}),
      });

      notifyParent({
        type: "migration_analysis_started",
        estimatedDurationMs: MIGRATION_ANALYSIS_UI_MS,
        oldPhoneE164: oldE164,
        newPhoneE164: newE164,
        verificationId: ids.verificationId,
        identityId: ids.identityId,
      });

      setStep("analyzing");

      if (analysisEndTimerRef.current !== null) {
        clearTimeout(analysisEndTimerRef.current);
      }
      analysisEndTimerRef.current = setTimeout(() => {
        analysisEndTimerRef.current = null;
        notifyParent({
          type: "metamap_finished",
          verificationId: ids.verificationId,
          identityId: ids.identityId,
          oldPhoneE164: oldE164,
          newPhoneE164: newE164,
        });
        notifyParent({
          type: "verification_succeeded",
          oldPhoneE164: oldE164,
          newPhoneE164: newE164,
          metamapVerificationId: ids.verificationId,
          metamapIdentityId: ids.identityId,
        });
        notifyParent({
          type: "migration_analysis_complete",
          outcome: "success",
          oldPhoneE164: oldE164,
          newPhoneE164: newE164,
          verificationId: ids.verificationId,
          identityId: ids.identityId,
        });
        setStep("done");
      }, MIGRATION_ANALYSIS_UI_MS);
    },
    [oldE164, newE164, oldCountryIso, newCountryIso, merchantLabel],
  );

  const onMetamapUserStarted = useCallback(() => {
    notifyParent({
      type: "metamap_started",
      oldPhoneE164: oldE164,
      newPhoneE164: newE164,
    });
  }, [oldE164, newE164]);

  const cardClass = compact
    ? "w-full max-w-[min(100%,28rem)] rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg shadow-slate-900/[0.06] backdrop-blur-md sm:p-6"
    : "mx-auto w-full max-w-lg rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl shadow-slate-900/[0.08] backdrop-blur-md sm:p-8";

  const btnPrimary =
    "pp-touch min-h-12 w-full rounded-xl bg-gradient-to-r from-[#4749B6] to-[#3B3DA6] px-4 py-3 text-base font-semibold text-white shadow-md shadow-[#4749B6]/25 ring-1 ring-white/20 transition active:opacity-90 enabled:hover:brightness-[1.03] sm:text-sm";
  const btnPrimaryCompact =
    "pp-touch min-h-12 w-full rounded-xl bg-gradient-to-r from-[#4749B6] to-[#3B3DA6] px-4 py-3 text-base font-semibold text-white shadow-md shadow-[#4749B6]/25 ring-1 ring-white/20 transition active:opacity-90 enabled:hover:brightness-[1.03] enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-[200px] sm:text-sm";
  const btnSecondary =
    "pp-touch min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50 active:bg-slate-100 sm:w-auto sm:py-2.5 sm:text-sm";

  return (
    <div className={cardClass}>
      {step === "notice" && (
        <div className="space-y-5">
          <h1 className="text-lg font-bold tracking-tight text-[#0B0B13] sm:text-xl">
            Cambio de número de app
          </h1>

          <div
            className="rounded-xl border border-amber-200/90 bg-gradient-to-br from-amber-50/95 to-amber-50/40 p-4 shadow-sm ring-1 ring-amber-100/80"
            role="note"
          >
            <p className="text-sm font-semibold text-amber-950">
              Importante: migración de datos
            </p>
            <p className="mt-2 text-sm leading-relaxed text-amber-950/90">
              La información y el historial asociados a tu{" "}
              <strong>número de app anterior</strong> en Punto Pago serán{" "}
              <strong>migrados</strong> al <strong>número de app nuevo</strong>{" "}
              que indiques en el siguiente paso. Asegúrate de que ambos números
              son correctos; aquí solo registramos y autorizas ese cambio de
              perfil.
            </p>
          </div>

          <div
            className="rounded-xl border border-slate-200/90 bg-slate-50/90 p-4 text-sm leading-relaxed text-slate-700 shadow-sm"
            role="note"
          >
            <p className="font-semibold text-[#0B0B13]">
              Límite de cambios de perfil
            </p>
            <p className="mt-2">
              Solo puedes realizar un <strong>cambio de perfil</strong> (migración
              de número) <strong>una vez cada 2 meses</strong>. Úsalo cuando
              realmente vayas a quedarte con el número nuevo; no está pensado
              para cambiar de número con frecuencia.
            </p>
          </div>

          <p className="text-sm leading-relaxed text-slate-600">
            Después indicarás el número de app anterior y el nuevo, y completarás
            una verificación de identidad con documento vigente y selfie.
            {merchantLabel ? (
              <>
                {" "}
                <span className="font-semibold text-slate-800">
                  {merchantLabel}
                </span>
              </>
            ) : null}
          </p>

          <button type="button" onClick={() => setStep("apps")} className={btnPrimary}>
            Entendido, continuar
          </button>
        </div>
      )}

      {step === "apps" && (
        <form className="space-y-5" onSubmit={onSubmitApps}>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#0B0B13] sm:text-xl">
              Datos de tus apps en Punto Pago
            </h1>
            <p className="mt-2 text-justify text-sm leading-relaxed text-slate-600 hyphens-auto">
              Los datos del app anterior se migrarán al número nuevo. Indica ambos
              números; por defecto el país es Panamá (+507) y puedes cambiar el
              país en cada campo si aplica. Recuerda:{" "}
              <strong>un cambio de perfil cada 2 meses como máximo</strong>.
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
            formatOk={oldFormatOk}
          />

          <AppNumberField
            id="new-app"
            label="Número de app nuevo"
            description="El número de app al que se migrará tu perfil y datos."
            countryIso={newCountryIso}
            onCountryIso={setNewCountryIso}
            nationalDigits={newNational}
            onNationalDigits={setNewNational}
            formatOk={newFormatOk && !duplicateNumbers}
            duplicateError={duplicateNumbers}
          />

          {error ? (
            <p className="text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-2">
            <button
              type="button"
              onClick={() => setStep("notice")}
              className={btnSecondary}
            >
              Volver al aviso
            </button>
            <button
              type="submit"
              disabled={!canContinueApps}
              className={btnPrimaryCompact}
            >
              Continuar
            </button>
          </div>
        </form>
      )}

      {step === "metamap" && (
        <div className="space-y-5">
          <h1 className="text-lg font-bold tracking-tight text-[#0B0B13] sm:text-xl">
            Verificación de identidad
          </h1>
          <p className="break-words text-sm leading-relaxed text-slate-600">
            Quedó registrada la migración de{" "}
            <span className="inline-block max-w-full font-mono font-medium text-slate-800">
              {oldE164}
            </span>{" "}
            a{" "}
            <span className="inline-block max-w-full font-mono font-medium text-slate-800">
              {newE164}
            </span>
            . Para completar el cambio de perfil debemos confirmar que eres tú:
            ten a mano un <strong>documento de identidad vigente</strong>, pulsa
            el botón de abajo y sigue los pasos en pantalla (incluye una{" "}
            <strong>foto tipo selfie</strong>).
          </p>
          <ProfileMetamapButton
            metadata={metamapMetadata}
            onComplete={onMetamapComplete}
            onUserStartedSdk={onMetamapUserStarted}
          />
          <button
            type="button"
            onClick={() => {
              setStep("apps");
              setError(null);
              notifyParent({ type: "metamap_back_to_apps" });
            }}
            className={btnSecondary}
          >
            Volver y editar números
          </button>
        </div>
      )}

      {step === "analyzing" && (
        <MigrationAnalysisPending
          oldPhoneE164={oldE164}
          newPhoneE164={newE164}
        />
      )}

      {step === "done" && (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl shadow-inner ring-1 ring-emerald-100">
            ✓
          </div>
          <h1 className="text-lg font-bold tracking-tight text-[#0B0B13] sm:text-xl">
            Cambio de perfil completado
          </h1>
          <p className="text-sm text-slate-600">
            Tu identidad quedó validada y la migración entre números quedó
            registrada. Puedes seguir usando la aplicación Punto Pago con tu
            número nuevo.
          </p>
          <p className="break-words text-xs text-slate-500">
            Números:{" "}
            <span className="font-mono text-slate-700">{oldE164}</span>
            {" → "}
            <span className="font-mono text-slate-700">{newE164}</span>
          </p>
        </div>
      )}
    </div>
  );
}
