"use client";

import { useCallback, useEffect, useState } from "react";

type WebhookEvent = {
  id: string;
  receivedAt: string;
  signatureValid: boolean;
  summary: {
    eventName: string;
    flowId?: string;
    resource?: string;
    metadata?: Record<string, unknown>;
    stepId?: string;
  };
};

type Props = {
  webhookUrl: string;
  enabled: boolean;
  debugTokenConfigured: boolean;
};

export function GuiaMetamapWebhooksPrueba({
  webhookUrl,
  enabled,
  debugTokenConfigured,
}: Props) {
  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState("");

  const load = useCallback(async () => {
    if (!enabled) return;
    setError(null);
    try {
      const q = token.trim() ? `?token=${encodeURIComponent(token.trim())}` : "";
      const res = await fetch(`/api/metamap/webhooks/recent${q}`);
      const data = (await res.json()) as {
        ok?: boolean;
        events?: WebhookEvent[];
        code?: string;
      };
      if (!res.ok) {
        setError(data.code ?? `HTTP ${res.status}`);
        setEvents([]);
        return;
      }
      setEvents(data.events ?? []);
    } catch {
      setError("No se pudo cargar el listado");
    }
  }, [enabled, token]);

  useEffect(() => {
    void load();
    const t = setInterval(() => void load(), 4000);
    return () => clearInterval(t);
  }, [load]);

  if (!enabled) {
    return (
      <div className="space-y-4 text-sm leading-relaxed text-slate-700">
        <p className="rounded-xl border border-amber-200/90 bg-amber-50/90 px-4 py-3 text-amber-950">
          Los webhooks están <strong>desactivados</strong>. Para pruebas internas,
          en Vercel o <code className="text-xs">.env.local</code> definí{" "}
          <code className="text-xs">METAMAP_WEBHOOK_ENABLED=true</code> y redeploy.
        </p>
        <p>
          Documentación:{" "}
          <a
            href="https://docs.metamap.com/docs/webhook-specifications"
            className="font-medium text-[#4749B6] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Webhook specifications (MetaMap)
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-sm leading-relaxed text-slate-700">
      <section className="space-y-2">
        <h2 className="text-base font-bold text-[#0B0B13]">
          Checklist MetaMap ↔ Vercel
        </h2>
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-2 pr-2">Campo en MetaMap</th>
              <th className="py-2">Dónde va</th>
            </tr>
          </thead>
          <tbody className="text-slate-800">
            <tr className="border-b border-slate-100">
              <td className="py-2 pr-2 font-medium">Your webhook URL</td>
              <td className="py-2 break-all font-mono">{webhookUrl}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 pr-2 font-medium">Webhook secret</td>
              <td className="py-2">
                Mismo texto en Vercel →{" "}
                <code className="rounded bg-slate-100 px-1">METAMAP_WEBHOOK_SECRET</code>
                {" "}(no es <code>NEXT_PUBLIC_</code>; solo servidor)
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-2 font-medium">Activar endpoint</td>
              <td className="py-2">
                Vercel → <code className="rounded bg-slate-100 px-1">METAMAP_WEBHOOK_ENABLED</code>{" "}
                = <code>true</code> (Production y Preview si probás en preview)
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-slate-500">
          Después de guardar variables en Vercel, hacé <strong>Redeploy</strong> del
          último deployment. Sin redeploy el servidor no ve los secretos nuevos.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-[#0B0B13]">URL para el dashboard</h2>
        <p>
          En MetaMap → Integration → Webhooks, en <strong>Your webhook URL</strong>{" "}
          pegá (mismo proyecto que el web button):
        </p>
        <code className="block break-all rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs">
          {webhookUrl}
        </code>
        <p className="text-xs text-slate-500">
          El <code>metadata</code> del botón incluye{" "}
          <code>oldPhoneE164</code>, <code>newPhoneE164</code> y{" "}
          <code>source</code> — debería aparecer en los webhooks según la{" "}
          <a
            href="https://docs.metamap.com/docs/webhook-specifications"
            className="text-[#4749B6] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            especificación
          </a>
          .
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-[#0B0B13]">Variables (solo pruebas)</h2>
        <ul className="list-disc space-y-1 pl-5 text-xs sm:text-sm">
          <li>
            <code>METAMAP_WEBHOOK_ENABLED=true</code> — activa el endpoint
          </li>
          <li>
            <code>METAMAP_WEBHOOK_SECRET</code> — mismo secret que en el dashboard
            (firma <code>x-signature</code>)
          </li>
          <li>
            <code>METAMAP_WEBHOOK_DEBUG_TOKEN</code> — opcional en Vercel para ver
            eventos en esta página
          </li>
          <li>
            <code>METAMAP_WEBHOOK_FORWARD_URL</code> — opcional (p. ej. webhook.site)
          </li>
        </ul>
        <p className="text-xs text-slate-500">
          El flujo del widget <strong>no cambia</strong>: seguís pudiendo verificar con
          Mati u omitir en demo. Los webhooks son paralelos para correlar en backend.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#0B0B13]">Últimos eventos recibidos</h2>
        {debugTokenConfigured ? (
          <label className="block text-xs">
            Token de depuración
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="METAMAP_WEBHOOK_DEBUG_TOKEN"
              autoComplete="off"
            />
          </label>
        ) : null}
        {error ? (
          <p className="rounded-xl border border-amber-200/90 bg-amber-50/90 px-3 py-2 text-xs text-amber-950">
            {error}
            {!debugTokenConfigured ? (
              <span className="mt-1 block">
                En producción definí <code>METAMAP_WEBHOOK_DEBUG_TOKEN</code> o revisá
                logs en Vercel (filtro <code>metamap-webhook</code>).
              </span>
            ) : null}
          </p>
        ) : null}
        {events.length === 0 ? (
          <p className="text-xs text-slate-500">
            Aún no hay eventos en memoria. Completá una verificación en el flujo o
            esperá webhooks; en deploy revisá también los logs del proyecto.
          </p>
        ) : (
          <ul className="space-y-2">
            {events.map((ev) => (
              <li
                key={ev.id}
                className="rounded-xl border border-slate-200/90 bg-white px-3 py-2 text-xs"
              >
                <span className="font-mono font-semibold text-[#4749B6]">
                  {ev.summary.eventName}
                </span>
                {ev.summary.stepId ? (
                  <span className="text-slate-500"> · step {ev.summary.stepId}</span>
                ) : null}
                <br />
                <span className="text-slate-500">{ev.receivedAt}</span>
                {ev.summary.metadata ? (
                  <pre className="mt-1 max-h-24 overflow-auto rounded bg-slate-50 p-2 text-[10px]">
                    {JSON.stringify(ev.summary.metadata, null, 2)}
                  </pre>
                ) : null}
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          onClick={() => void load()}
          className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
        >
          Actualizar
        </button>
      </section>
    </div>
  );
}
