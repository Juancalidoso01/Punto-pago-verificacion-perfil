"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { AppNumberField } from "@/components/app-number-field";
import { CambioPerfilFlowGuideTeaser } from "@/components/cambio-perfil-flow-guide-teaser";
import { MigrationAnalysisPending } from "@/components/migration-analysis-pending";
import { ProfileMetamapButton } from "@/components/profile-metamap-button";
import { useI18n } from "@/i18n/i18n-context";
import {
  CAMBIO_PERFIL_HOST_MESSAGE_SOURCE,
  resolveCambioPerfilErrorMessage,
} from "@/lib/cambio-perfil-errors";
import { renderInlineStrong } from "@/lib/render-inline-strong";
import { interpolate } from "@/lib/interpolate";
import {
  DEMO_METAMAP_IDENTITY_ID,
  DEMO_METAMAP_VERIFICATION_ID,
} from "@/lib/cambio-perfil-demo-metamap";
import type { MetamapVerificationUiStatus } from "@/lib/metamap-verification-status";
import {
  clampEmbedText,
  isAllowedParentMessageOrigin,
  resolvePostMessageTargetOriginForSend,
} from "@/lib/embed-security";
import type { EmbedFlowStepParam } from "@/lib/cambio-perfil-flow-guide";
import { resolveMatiIdentityId } from "@/lib/metamap-public-config";
import {
  DEFAULT_DIAL_ISO,
  findDialCountry,
  onlyDigits,
  toE164,
} from "@/lib/dial-countries";

type Step = "notice" | "apps" | "metamap" | "analyzing" | "done";

/** Mínimo bajo para permitir recorrer el flujo con números cortos de prueba. */
const MIN_NATIONAL = 1;
const MAX_NATIONAL = 15;

/** Identificador en postMessage para la app contenedora (iframe). */
const PARENT_MESSAGE_SOURCE = "punto-pago-cambio-perfil";

function notifyParent(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    window.parent?.postMessage(
      { source: PARENT_MESSAGE_SOURCE, ...payload },
      resolvePostMessageTargetOriginForSend(),
    );
  } catch {
    /* ignore */
  }
}

export function CambioPerfilFlow({
  compact = false,
  merchantLabel,
  matiIdentityId: matiIdentityIdProp,
  guiaEmbedQuerySuffix = "",
  initialStep = null,
}: {
  /** Vista compacta para incrustar en iframe */
  compact?: boolean;
  merchantLabel?: string | null;
  /** Identidad Mati (hex). Si no se pasa, se usa solo `NEXT_PUBLIC_METAMAP_IDENTITY_ID` en build. */
  matiIdentityId?: string | null;
  /** Solo embed: query para enlaces `/embed/guia` (p. ej. `?label=…&identityId=…`). */
  guiaEmbedQuerySuffix?: string;
  /** Abrir en un paso concreto (`?step=` desde guía o pruebas). */
  initialStep?: EmbedFlowStepParam | null;
}) {
  const { messages } = useI18n();
  const t = messages.flow;
  const [step, setStep] = useState<Step>(() => initialStep ?? "notice");
  const [oldCountryIso, setOldCountryIso] = useState(DEFAULT_DIAL_ISO);
  const [oldNational, setOldNational] = useState("");
  const [newCountryIso, setNewCountryIso] = useState(DEFAULT_DIAL_ISO);
  const [newNational, setNewNational] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [analysisMatiIds, setAnalysisMatiIds] = useState<{
    verificationId: string;
    identityId: string;
  } | null>(null);
  const [verificationOutcome, setVerificationOutcome] =
    useState<MetamapVerificationUiStatus | null>(null);

  useEffect(() => {
    notifyParent({ type: "flow_ready" });
  }, []);

  /** El host (padre del iframe) puede enviar errores de negocio con `postMessage`. */
  useEffect(() => {
    function onMessage(ev: MessageEvent) {
      const d = ev.data;
      if (!d || typeof d !== "object") return;
      if (!isAllowedParentMessageOrigin(ev.origin)) return;
      if ((d as { source?: unknown }).source !== CAMBIO_PERFIL_HOST_MESSAGE_SOURCE)
        return;
      if ((d as { type?: unknown }).type !== "flow_error") return;
      const raw = d as {
        errorCode?: unknown;
        message?: unknown;
        step?: unknown;
      };
      const code =
        typeof raw.errorCode === "string" ? raw.errorCode : "";
      const customRaw =
        typeof raw.message === "string" ? raw.message : undefined;
      const custom = customRaw
        ? clampEmbedText(customRaw, 500)
        : undefined;
      setError(resolveCambioPerfilErrorMessage(code, messages.errors, custom));
      const s = raw.step;
      if (s === "apps" || s === "notice" || s === "metamap") {
        setStep(s);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [messages.errors]);

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

  const matiIdentityIdFromQuery = useMemo(
    () => resolveMatiIdentityId(matiIdentityIdProp ?? null),
    [matiIdentityIdProp],
  );

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
        setError(messages.errors.INVALID_NUMBER_FORMAT);
        return;
      }
      if (oldE164 === newE164) {
        setError(messages.errors.DUPLICATE_APP_NUMBERS);
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
      messages.errors,
    ],
  );

  const finishAnalysisWithStatus = useCallback(
    (
      ids: { verificationId: string; identityId: string },
      status: MetamapVerificationUiStatus,
    ) => {
      const outcome =
        status === "verified"
          ? "success"
          : status === "review_needed"
            ? "review_needed"
            : status === "rejected"
              ? "rejected"
              : "pending";

      setVerificationOutcome(status);
      setAnalysisMatiIds(null);

      notifyParent({
        type: "metamap_finished",
        verificationId: ids.verificationId,
        identityId: ids.identityId,
        oldPhoneE164: oldE164,
        newPhoneE164: newE164,
        metamapStatus: status,
      });

      if (status === "verified") {
        notifyParent({
          type: "verification_succeeded",
          oldPhoneE164: oldE164,
          newPhoneE164: newE164,
          metamapVerificationId: ids.verificationId,
          metamapIdentityId: ids.identityId,
        });
      }

      notifyParent({
        type: "migration_analysis_complete",
        outcome,
        metamapStatus: status,
        oldPhoneE164: oldE164,
        newPhoneE164: newE164,
        verificationId: ids.verificationId,
        identityId: ids.identityId,
      });

      setStep("done");
    },
    [oldE164, newE164],
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
        estimatedDurationMs: 90_000,
        oldPhoneE164: oldE164,
        newPhoneE164: newE164,
        verificationId: ids.verificationId,
        identityId: ids.identityId,
      });

      setVerificationOutcome(null);
      setAnalysisMatiIds(ids);
      setStep("analyzing");
    },
    [oldE164, newE164, oldCountryIso, newCountryIso, merchantLabel],
  );

  const onAnalysisResolved = useCallback(
    (status: MetamapVerificationUiStatus) => {
      if (!analysisMatiIds) return;
      finishAnalysisWithStatus(analysisMatiIds, status);
    },
    [analysisMatiIds, finishAnalysisWithStatus],
  );

  const onMetamapUserStarted = useCallback(() => {
    notifyParent({
      type: "metamap_started",
      oldPhoneE164: oldE164,
      newPhoneE164: newE164,
    });
  }, [oldE164, newE164]);

  /** Sin `identityId` real: simula cierre Mati para que cualquiera recorra el flujo (solo demo). */
  const onDemoMetamapContinue = useCallback(() => {
    notifyParent({
      type: "metamap_started",
      oldPhoneE164: oldE164,
      newPhoneE164: newE164,
    });
    onMetamapComplete({
      verificationId: DEMO_METAMAP_VERIFICATION_ID,
      identityId: DEMO_METAMAP_IDENTITY_ID,
    });
  }, [oldE164, newE164, onMetamapComplete]);

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
        <div className="space-y-4 sm:space-y-5">
          <h1 className="text-lg font-bold tracking-tight text-[#0B0B13] sm:text-xl">
            {t.noticeH1}
          </h1>

          <div
            className="rounded-xl border border-amber-200/90 bg-gradient-to-br from-amber-50/95 to-amber-50/40 p-4 shadow-sm ring-1 ring-amber-100/80"
            role="note"
          >
            <p className="text-sm font-semibold text-amber-950">
              {t.noticeAmberTitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-amber-950/90">
              {renderInlineStrong(t.noticeAmberBody)}
            </p>
          </div>

          <div
            className="rounded-xl border border-slate-200/90 bg-slate-50/90 p-4 text-sm leading-relaxed text-slate-700 shadow-sm"
            role="note"
          >
            <p className="font-semibold text-[#0B0B13]">
              {t.noticeLimitTitle}
            </p>
            <p className="mt-2">{renderInlineStrong(t.noticeLimitBody)}</p>
          </div>

          <p className="text-sm leading-relaxed text-slate-600">
            {t.noticeFooter}
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
            {t.btnUnderstood}
          </button>

          <section
            className="mt-8 border-t border-dashed border-slate-200/90 pt-6"
            aria-labelledby="guia-doc-section-label"
          >
            <p
              id="guia-doc-section-label"
              className="mb-3 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-400"
            >
              {messages.guide.teaser.sectionLabel}
            </p>
            <CambioPerfilFlowGuideTeaser
              compact={compact}
              embedQuerySuffix={guiaEmbedQuerySuffix}
            />
          </section>
        </div>
      )}

      {step === "apps" && (
        <form className="space-y-5" onSubmit={onSubmitApps}>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#0B0B13] sm:text-xl">
              {t.appsH1}
            </h1>
            <p className="mt-2 text-left text-sm leading-relaxed text-slate-600 hyphens-none text-pretty sm:hyphens-auto sm:text-justify">
              {renderInlineStrong(t.appsIntro)}
            </p>
          </div>

          <AppNumberField
            id="old-app"
            label={t.oldFieldLabel}
            description={t.oldFieldDesc}
            countryIso={oldCountryIso}
            onCountryIso={setOldCountryIso}
            nationalDigits={oldNational}
            onNationalDigits={setOldNational}
            formatOk={oldFormatOk}
          />

          <AppNumberField
            id="new-app"
            label={t.newFieldLabel}
            description={t.newFieldDesc}
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
              {t.btnBackNotice}
            </button>
            <button
              type="submit"
              disabled={!canContinueApps}
              className={btnPrimaryCompact}
            >
              {t.btnContinue}
            </button>
          </div>
        </form>
      )}

      {step === "metamap" && (
        <div className="space-y-5">
          <h1 className="text-lg font-bold tracking-tight text-[#0B0B13] sm:text-xl">
            {t.metamapH1}
          </h1>
          <p className="break-words text-sm leading-relaxed text-slate-600">
            {renderInlineStrong(
              interpolate(t.metamapIntro, {
                old: oldE164,
                new: newE164,
              }),
            )}
          </p>
          <div className="space-y-5">
            <ProfileMetamapButton
              identityId={matiIdentityIdFromQuery}
              oldPhoneE164={oldE164}
              newPhoneE164={newE164}
              merchantLabel={merchantLabel}
              onComplete={onMetamapComplete}
              onUserStartedSdk={onMetamapUserStarted}
            />
            <div className="space-y-3 border-t border-slate-200/90 pt-5">
              <div
                className="rounded-xl border border-slate-200/90 bg-slate-50/90 p-4 text-sm leading-relaxed text-slate-700"
                role="note"
              >
                {renderInlineStrong(t.metamapSkipHint)}
              </div>
              <button
                type="button"
                onClick={onDemoMetamapContinue}
                className={btnSecondary}
              >
                {t.metamapSkipButton}
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setStep("apps");
              setError(null);
              notifyParent({ type: "metamap_back_to_apps" });
            }}
            className={btnSecondary}
          >
            {t.metamapBack}
          </button>
        </div>
      )}

      {step === "analyzing" && analysisMatiIds ? (
        <MigrationAnalysisPending
          oldPhoneE164={oldE164}
          newPhoneE164={newE164}
          verificationId={analysisMatiIds.verificationId}
          onResolved={onAnalysisResolved}
        />
      ) : null}

      {step === "done" && (
        <div className="space-y-4 text-center">
          <div
            className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-inner ring-1 ${
              verificationOutcome === "rejected"
                ? "bg-red-50 text-red-700 ring-red-100"
                : verificationOutcome === "review_needed"
                  ? "bg-amber-50 text-amber-800 ring-amber-100"
                  : "bg-emerald-50 text-emerald-700 ring-emerald-100"
            }`}
          >
            {verificationOutcome === "rejected"
              ? "!"
              : verificationOutcome === "review_needed"
                ? "…"
                : "✓"}
          </div>
          <h1 className="text-lg font-bold tracking-tight text-[#0B0B13] sm:text-xl">
            {verificationOutcome === "review_needed"
              ? t.doneReviewH1
              : verificationOutcome === "rejected"
                ? t.doneRejectedH1
                : t.doneH1}
          </h1>
          <p className="text-sm text-slate-600">
            {verificationOutcome === "review_needed"
              ? t.doneReviewBody
              : verificationOutcome === "rejected"
                ? t.doneRejectedBody
                : t.doneBody}
          </p>
          <p className="break-words text-xs text-slate-500">
            {t.doneNumbersLabel}{" "}
            <span className="font-mono text-slate-700">{oldE164}</span>
            {" → "}
            <span className="font-mono text-slate-700">{newE164}</span>
          </p>
        </div>
      )}
    </div>
  );
}
