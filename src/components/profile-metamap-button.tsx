"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/i18n-context";
import { parseSafeMetamapCallbackId } from "@/lib/embed-security";
import { getMetamapPublicConfig } from "@/lib/metamap-public-config";

/** Integración oficial Mati (Direct Link / Web SDK). */
const MATI_SCRIPT_SRC = "https://web-button.getmati.com/button.js";

const MATI_BUTTON_ID = "mati_button";

type Props = {
  /** Obligatorio: identidad creada en Mati antes de abrir el flujo. */
  identityId: string;
  onComplete: (ids: { verificationId: string; identityId: string }) => void;
  onUserStartedSdk?: () => void;
};

/** Eventos del web component (documentación MetaMap / Mati). */
const FINISH_EVENTS = [
  "metamap:userFinishedSdk",
  "mati:userFinishedSdk",
] as const;
const START_EVENTS = ["metamap:userStartedSdk", "mati:userStartedSdk"] as const;
const EXIT_EVENTS = ["metamap:exitedSdk", "mati:exitedSdk"] as const;

export function ProfileMetamapButton({
  identityId,
  onComplete,
  onUserStartedSdk,
}: Props) {
  const { messages } = useI18n();
  const ui = messages.metamapUi;
  const cfg = getMetamapPublicConfig();
  const [scriptReady, setScriptReady] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const lastVerificationRef = useRef<string | null>(null);

  const attachListeners = useCallback(
    (el: HTMLElement) => {
      const setModal = (open: boolean) => {
        (window as unknown as { __ppMetamapModalOpen?: boolean }).__ppMetamapModalOpen =
          open;
      };

      const onStart = () => {
        setModal(true);
        onUserStartedSdk?.();
      };

      const onFinish = (e: Event) => {
        setModal(false);
        const d = (e as CustomEvent<Record<string, unknown>>).detail ?? {};
        const verificationRaw = String(
          (d as { verificationId?: string }).verificationId ??
            (d as { verification_id?: string }).verification_id ??
            "",
        );
        const identityRaw = String(
          (d as { identityId?: string }).identityId ??
            (d as { identity_id?: string }).identity_id ??
            "",
        );
        const verificationId = parseSafeMetamapCallbackId(verificationRaw);
        const identityOut = parseSafeMetamapCallbackId(identityRaw) ?? identityId;
        if (!verificationId) return;
        if (lastVerificationRef.current === verificationId) return;
        lastVerificationRef.current = verificationId;
        onComplete({ verificationId, identityId: identityOut });
      };

      const onExit = () => {
        setModal(false);
      };

      for (const ev of START_EVENTS) {
        el.addEventListener(ev, onStart);
      }
      for (const ev of FINISH_EVENTS) {
        el.addEventListener(ev, onFinish);
      }
      for (const ev of EXIT_EVENTS) {
        el.addEventListener(ev, onExit);
      }

      return () => {
        for (const ev of START_EVENTS) {
          el.removeEventListener(ev, onStart);
        }
        for (const ev of FINISH_EVENTS) {
          el.removeEventListener(ev, onFinish);
        }
        for (const ev of EXIT_EVENTS) {
          el.removeEventListener(ev, onExit);
        }
      };
    },
    [identityId, onComplete, onUserStartedSdk],
  );

  useEffect(() => {
    lastVerificationRef.current = null;
  }, [identityId]);

  useEffect(() => {
    if (!scriptReady || !wrapRef.current) return;
    const host = wrapRef.current;
    host.replaceChildren();
    const btn = document.createElement("mati-button");
    btn.id = MATI_BUTTON_ID;
    btn.setAttribute("clientid", cfg.clientId);
    btn.setAttribute("flowId", cfg.flowId);
    btn.setAttribute("identityId", identityId);
    btn.className =
      "absolute inset-0 z-20 min-h-14 min-w-0 w-full cursor-pointer opacity-0 sm:min-h-[52px]";
    btn.setAttribute("aria-label", ui.matiAria);
    host.appendChild(btn);
    const detach = attachListeners(btn);
    return () => {
      detach();
      host.replaceChildren();
    };
  }, [scriptReady, cfg.clientId, cfg.flowId, identityId, attachListeners, ui.matiAria]);

  return (
    <div className="space-y-3">
      <Script
        src={MATI_SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />

      <div className="relative w-full min-h-14 sm:min-h-[52px]">
        <div
          ref={wrapRef}
          className="absolute inset-0 z-20 min-h-14 sm:min-h-[52px]"
          aria-hidden
        />
        <button
          type="button"
          className="pointer-events-none relative z-10 flex w-full min-h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#4749B6] to-[#3B3DA6] px-5 py-4 text-base font-bold text-white shadow-lg shadow-[#4749B6]/30 sm:min-h-[52px] sm:px-6"
          tabIndex={-1}
        >
          {ui.btn}
        </button>
        {!scriptReady ? (
          <p className="mt-2 text-center text-xs text-slate-500">
            {ui.loading}
          </p>
        ) : null}
      </div>
    </div>
  );
}
