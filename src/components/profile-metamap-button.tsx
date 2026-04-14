"use client";

import Script from "next/script";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getMetamapPublicConfig } from "@/lib/metamap-public-config";

const METAMAP_SCRIPT_SRC = "https://web-button.metamap.com/button.js";

type Props = {
  /** Metadatos enviados a MetaMap (serializados en el atributo metadata) */
  metadata: Record<string, string>;
  onComplete: (ids: { verificationId: string; identityId: string }) => void;
  onUserStartedSdk?: () => void;
};

export function ProfileMetamapButton({
  metadata,
  onComplete,
  onUserStartedSdk,
}: Props) {
  const cfg = getMetamapPublicConfig();
  const [scriptReady, setScriptReady] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const metadataJson = useMemo(() => JSON.stringify(metadata), [metadata]);

  const attachListeners = useCallback(
    (el: HTMLElement) => {
      const onStart = () => {
        (window as unknown as { __ppMetamapModalOpen?: boolean }).__ppMetamapModalOpen =
          true;
        onUserStartedSdk?.();
      };
      const onFinish = (e: Event) => {
        (window as unknown as { __ppMetamapModalOpen?: boolean }).__ppMetamapModalOpen =
          false;
        const d = (e as CustomEvent<Record<string, unknown>>).detail ?? {};
        const verificationId = String(
          (d as { verificationId?: string }).verificationId ??
            (d as { verification_id?: string }).verification_id ??
            "",
        );
        const identityId = String(
          (d as { identityId?: string }).identityId ??
            (d as { identity_id?: string }).identity_id ??
            "",
        );
        if (verificationId) {
          onComplete({
            verificationId,
            identityId: identityId.trim(),
          });
        }
      };
      const onExit = () => {
        (window as unknown as { __ppMetamapModalOpen?: boolean }).__ppMetamapModalOpen =
          false;
      };
      el.addEventListener("metamap:userStartedSdk", onStart);
      el.addEventListener("metamap:userFinishedSdk", onFinish);
      el.addEventListener("metamap:exitedSdk", onExit);
      return () => {
        el.removeEventListener("metamap:userStartedSdk", onStart);
        el.removeEventListener("metamap:userFinishedSdk", onFinish);
        el.removeEventListener("metamap:exitedSdk", onExit);
      };
    },
    [onComplete, onUserStartedSdk],
  );

  useEffect(() => {
    if (!scriptReady || !wrapRef.current) return;
    const host = wrapRef.current;
    host.replaceChildren();
    const btn = document.createElement("metamap-button");
    btn.setAttribute("clientid", cfg.clientId);
    btn.setAttribute("flowId", cfg.flowId);
    btn.setAttribute("metadata", metadataJson);
    btn.className =
      "absolute inset-0 z-20 min-h-14 min-w-0 w-full cursor-pointer opacity-0 sm:min-h-[52px]";
    btn.setAttribute(
      "aria-label",
      "Abrir verificación de identidad con documento vigente y selfie",
    );
    host.appendChild(btn);
    const detach = attachListeners(btn);
    return () => {
      detach();
      host.replaceChildren();
    };
  }, [scriptReady, cfg.clientId, cfg.flowId, metadataJson, attachListeners]);

  return (
    <div className="space-y-3">
      <Script
        src={METAMAP_SCRIPT_SRC}
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
          Verificar identidad
        </button>
        {!scriptReady ? (
          <p className="mt-2 text-center text-xs text-slate-500">
            Cargando verificación…
          </p>
        ) : null}
      </div>
    </div>
  );
}
