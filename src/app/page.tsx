import Link from "next/link";
import { PpAppChrome } from "@/components/pp-app-chrome";
import { ProfileSecurityWidget } from "@/components/profile-security-widget";

export default function Home() {
  return (
    <PpAppChrome
      headerDetail={
        <>
          <span className="font-semibold text-[#4749B6]">
            Vista previa del flujo
          </span>
          {". Para incrustar en tu app, usa la ruta "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-800">
            /widget
          </code>
          .
        </>
      }
    >
      <div className="space-y-8">
        <ProfileSecurityWidget />
        <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-slate-300/80 bg-white/60 p-5 text-sm text-slate-600 backdrop-blur-sm">
          <p className="font-semibold text-slate-800">Integración (iframe)</p>
          <p className="mt-2 leading-relaxed">
            Incrusta{" "}
            <code className="rounded bg-slate-100 px-1 font-mono text-xs">
              /widget
            </code>{" "}
            y escucha{" "}
            <code className="rounded bg-slate-100 px-1 font-mono text-xs">
              postMessage
            </code>{" "}
            con{" "}
            <code className="rounded bg-slate-100 px-1 font-mono text-xs">
              source: &quot;punto-pago-perfil-seguridad&quot;
            </code>
            . Flujo: aviso migración → números → código OTP → MetaMap → listo.
            Eventos:{" "}
            <span className="font-mono text-xs">
              widget_ready, apps_submitted, verification_started, otp_verified,
              metamap_started, metamap_finished, metamap_back_to_otp,
              verification_succeeded (incluye metamapVerificationId si aplica),
              verification_failed, verification_cancelled
            </span>
            .
          </p>
          <p className="mt-3">
            <Link
              href="/widget"
              className="font-medium text-[#4749B6] underline-offset-2 hover:underline"
            >
              Abrir solo el widget
            </Link>
          </p>
        </div>
      </div>
    </PpAppChrome>
  );
}
