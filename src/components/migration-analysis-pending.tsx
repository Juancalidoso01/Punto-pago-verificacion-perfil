"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/i18n-context";
import { DEMO_METAMAP_VERIFICATION_ID } from "@/lib/cambio-perfil-demo-metamap";
import { MIGRATION_ANALYSIS_UI_MS } from "@/lib/cambio-perfil-parent-events";
import type { MetamapVerificationUiStatus } from "@/lib/metamap-verification-status";
import { isTerminalMetamapVerificationStatus } from "@/lib/metamap-verification-status";

const POLL_INTERVAL_MS = 2_000;
const MAX_POLL_MS = 90_000;
const DEMO_WAIT_MS = 4_000;

type Props = {
  oldPhoneE164: string;
  newPhoneE164: string;
  verificationId: string;
  onResolved: (status: MetamapVerificationUiStatus) => void;
};

export function MigrationAnalysisPending({
  oldPhoneE164,
  newPhoneE164,
  verificationId,
  onResolved,
}: Props) {
  const { messages } = useI18n();
  const m = messages.migration;
  const [uiStatus, setUiStatus] = useState<MetamapVerificationUiStatus>("processing");
  const [statusLine, setStatusLine] = useState(m.statusProcessing);
  const resolvedRef = useRef(false);
  const statusRef = useRef<MetamapVerificationUiStatus>("processing");
  const onResolvedRef = useRef(onResolved);
  onResolvedRef.current = onResolved;

  const isDemo = verificationId === DEMO_METAMAP_VERIFICATION_ID;
  const durationMs = isDemo ? DEMO_WAIT_MS : MAX_POLL_MS;
  const durationSec = Math.round(durationMs / 1000);

  useEffect(() => {
    resolvedRef.current = false;

    if (isDemo) {
      const t = setTimeout(() => {
        if (!resolvedRef.current) {
          resolvedRef.current = true;
          onResolved("verified");
        }
      }, DEMO_WAIT_MS);
      return () => clearTimeout(t);
    }

    let cancelled = false;
    const started = Date.now();

    const applyStatus = (status: MetamapVerificationUiStatus) => {
      statusRef.current = status;
      setUiStatus(status);
      if (status === "verified") setStatusLine(m.statusVerified);
      else if (status === "review_needed") setStatusLine(m.statusReviewNeeded);
      else if (status === "rejected") setStatusLine(m.statusRejected);
      else setStatusLine(m.statusProcessing);
    };

    const finish = (status: MetamapVerificationUiStatus) => {
      if (resolvedRef.current || cancelled) return;
      resolvedRef.current = true;
      applyStatus(status);
      onResolvedRef.current(status);
    };

    const poll = async () => {
      try {
        const res = await fetch(
          `/api/metamap/verification-status?verificationId=${encodeURIComponent(verificationId)}`,
          { cache: "no-store" },
        );
        const data = (await res.json()) as {
          ok?: boolean;
          status?: MetamapVerificationUiStatus;
        };
        if (cancelled || !data.ok || !data.status) return;
        applyStatus(data.status);
        if (isTerminalMetamapVerificationStatus(data.status)) {
          finish(data.status);
        }
      } catch {
        /* reintento en el siguiente intervalo */
      }
    };

    void poll();
    const interval = setInterval(() => {
      if (Date.now() - started >= MAX_POLL_MS) {
        clearInterval(interval);
        const last = statusRef.current;
        finish(last === "processing" ? "review_needed" : last);
        return;
      }
      void poll();
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
    // onResolved estable vía ref
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reiniciar solo al cambiar verificationId
  }, [verificationId, isDemo, m.statusProcessing, m.statusVerified, m.statusReviewNeeded, m.statusRejected]);

  const tpl = m.body;
  const o = "{{old}}";
  const n = "{{new}}";
  const io = tpl.indexOf(o);
  const in_ = tpl.indexOf(n);
  const prefix = io >= 0 ? tpl.slice(0, io) : tpl;
  const mid =
    io >= 0 && in_ > io
      ? tpl.slice(io + o.length, in_)
      : io >= 0
        ? tpl.slice(io + o.length)
        : "";
  const suffix = in_ >= 0 ? tpl.slice(in_ + n.length) : "";

  const statusBoxClass =
    uiStatus === "verified"
      ? "border-emerald-200/90 bg-emerald-50/90 text-emerald-950"
      : uiStatus === "rejected"
        ? "border-red-200/90 bg-red-50/90 text-red-950"
        : uiStatus === "review_needed"
          ? "border-amber-200/90 bg-amber-50/90 text-amber-950"
          : "border-slate-200/90 bg-slate-50/90 text-slate-700";

  return (
    <div className="space-y-6 py-1">
      <div className="text-center">
        <h1 className="text-lg font-bold tracking-tight text-[#0B0B13] sm:text-xl">
          {m.title}
        </h1>
        <p className="mt-3 break-words text-base leading-relaxed text-slate-600 sm:text-sm">
          {prefix}
          <span className="inline-block max-w-full font-mono font-semibold text-slate-800">
            {oldPhoneE164}
          </span>
          {mid}
          <span className="inline-block max-w-full font-mono font-semibold text-slate-800">
            {newPhoneE164}
          </span>
          {suffix}
        </p>
      </div>

      <div
        className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${statusBoxClass}`}
        role="status"
        aria-live="polite"
      >
        {statusLine}
      </div>

      <div className="space-y-2">
        <div
          className="pp-migration-analysis-track h-3 w-full overflow-hidden rounded-full bg-slate-200/90 shadow-inner"
          style={
            {
              "--pp-analysis-ms": `${isDemo ? DEMO_WAIT_MS : MIGRATION_ANALYSIS_UI_MS}ms`,
            } as CSSProperties
          }
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={m.progressAria.replace(
            "{{sec}}",
            String(durationSec),
          )}
        >
          <div className="pp-migration-analysis-bar h-full w-full rounded-full bg-gradient-to-r from-[#4749B6] to-[#3B3DA6] shadow-sm shadow-[#4749B6]/25" />
        </div>
        <p className="text-center text-sm font-medium text-slate-500 sm:text-xs">
          {m.dontClose}
        </p>
      </div>

      <div className="flex justify-center">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-[#4749B6]"
          aria-hidden
        />
      </div>
    </div>
  );
}
