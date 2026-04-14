import { PpAmbient } from "@/components/pp-ambient";
import { ProfileSecurityWidget } from "@/components/profile-security-widget";

type SearchParams = Promise<{ label?: string | string[] }>;

export default async function WidgetPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const raw = sp.label;
  const merchantLabel =
    typeof raw === "string"
      ? decodeURIComponent(raw).trim() || null
      : Array.isArray(raw)
        ? decodeURIComponent(raw[0] ?? "").trim() || null
        : null;

  return (
    <div className="pp-page-bg relative min-h-screen">
      <PpAmbient />
      <div className="relative z-10 flex min-h-[100dvh] items-center justify-center p-4 sm:p-6">
        <ProfileSecurityWidget compact merchantLabel={merchantLabel} />
      </div>
    </div>
  );
}
