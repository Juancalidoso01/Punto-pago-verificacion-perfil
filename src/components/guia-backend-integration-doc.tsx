import Link from "next/link";
import { HighlightedCode } from "@/components/highlighted-code";
import type { AppMessages } from "@/i18n/catalog";
import { renderInlineStrong } from "@/lib/render-inline-strong";

const linkSecondary =
  "pp-touch inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50";

export function GuiaBackendIntegrationDoc({
  doc,
  indexHref,
  flowHref,
}: {
  doc: AppMessages["backendDoc"];
  indexHref: string;
  flowHref: string;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Link href={indexHref} className={linkSecondary}>
          {doc.backGuia}
        </Link>
        <Link href={flowHref} className={linkSecondary}>
          {doc.backFlow}
        </Link>
      </div>

      <header className="space-y-2 border-b border-slate-200/90 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
          Backend
        </p>
        <h1 className="text-xl font-bold tracking-tight text-[#0B0B13] sm:text-2xl">
          {doc.title}
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          {renderInlineStrong(doc.intro)}
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#0B0B13]">{doc.handoffTitle}</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          {renderInlineStrong(doc.handoffBody)}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#0B0B13]">{doc.uiTitle}</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          {renderInlineStrong(doc.uiBody)}
        </p>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {doc.codeHostIframeTitle}
        </p>
        <HighlightedCode code={doc.codeHostIframe} />
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#0B0B13]">{doc.s1Title}</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          {renderInlineStrong(doc.s1Body)}
        </p>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {doc.codePrepareTitle}
        </p>
        <HighlightedCode code={doc.codePrepare} />
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#0B0B13]">{doc.s2Title}</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          {renderInlineStrong(doc.s2Body)}
        </p>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {doc.codeIframeTitle}
        </p>
        <HighlightedCode code={doc.codeIframe} />
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#0B0B13]">{doc.s3Title}</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          {renderInlineStrong(doc.s3Body)}
        </p>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {doc.codePostMessageTitle}
        </p>
        <HighlightedCode code={doc.codePostMessage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#0B0B13]">{doc.s4Title}</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          {renderInlineStrong(doc.s4Body)}
        </p>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {doc.codeMatiTitle}
        </p>
        <HighlightedCode code={doc.codeMati} />
      </section>

      <div
        className="rounded-xl border border-slate-200/90 bg-slate-50/90 p-4 text-sm text-slate-700"
        role="note"
      >
        <p className="font-semibold text-[#0B0B13]">{doc.noteTitle}</p>
        <p className="mt-2 leading-relaxed">{renderInlineStrong(doc.noteBody)}</p>
      </div>
    </div>
  );
}
