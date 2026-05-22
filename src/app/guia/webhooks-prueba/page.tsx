import Link from "next/link";
import { GuiaMetamapWebhooksPrueba } from "@/components/guia-metamap-webhooks-prueba";
import { PpAppChrome } from "@/components/pp-app-chrome";
import {
  isMetamapWebhookEnabled,
  readMetamapWebhookDebugToken,
} from "@/lib/metamap-webhook-config";

function resolvePublicOrigin(): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (site) return site.replace(/\/$/, "");

  /** Dominio estable de producción (no usar VERCEL_URL: cambia en cada deploy). */
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) {
    return `https://${production.replace(/^https?:\/\//, "")}`;
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel && !/-[a-z0-9]{8,}\.vercel\.app$/i.test(vercel)) {
    return `https://${vercel.replace(/^https?:\/\//, "")}`;
  }

  return "https://punto-pago-verificacion-perfil.vercel.app";
}

export default function GuiaWebhooksPruebaPage() {
  const enabled = isMetamapWebhookEnabled();
  const webhookUrl = `${resolvePublicOrigin()}/api/metamap/webhook`;

  return (
    <PpAppChrome>
      <div className="mx-auto max-w-lg space-y-6 pb-16 sm:max-w-xl">
        <div>
          <Link
            href="/guia"
            className="text-sm font-medium text-[#4749B6] hover:underline"
          >
            ← Guía
          </Link>
          <h1 className="mt-3 text-xl font-bold tracking-tight text-[#0B0B13]">
            Webhooks MetaMap (pruebas internas)
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Endpoint opt-in según{" "}
            <a
              href="https://docs.metamap.com/docs/webhook-specifications"
              className="font-medium text-[#4749B6] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              webhook specifications
            </a>
            . No altera el flujo del usuario en el widget.
          </p>
        </div>
        <GuiaMetamapWebhooksPrueba
          webhookUrl={webhookUrl}
          enabled={enabled}
          debugTokenConfigured={Boolean(readMetamapWebhookDebugToken())}
        />
      </div>
    </PpAppChrome>
  );
}
