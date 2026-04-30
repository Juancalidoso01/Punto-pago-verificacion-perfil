import type { ReactNode } from "react";

const OPEN = "[[HL]]";
const CLOSE = "[[/HL]]";

/**
 * Resalta fragmentos delimitados por `[[HL]]...[[/HL]]` dentro del string (útil en i18n).
 */
export function HighlightedCode({
  code,
  className = "",
}: {
  code: string;
  className?: string;
}) {
  const nodes: ReactNode[] = [];
  let rest = code;
  let k = 0;
  while (rest.length > 0) {
    const i = rest.indexOf(OPEN);
    if (i === -1) {
      nodes.push(
        <span key={k++} className="text-slate-200">
          {rest}
        </span>,
      );
      break;
    }
    if (i > 0) {
      nodes.push(
        <span key={k++} className="text-slate-200">
          {rest.slice(0, i)}
        </span>,
      );
    }
    rest = rest.slice(i + OPEN.length);
    const j = rest.indexOf(CLOSE);
    const inner = j === -1 ? rest : rest.slice(0, j);
    nodes.push(
      <mark
        key={k++}
        className="rounded bg-amber-400/25 px-0.5 font-medium text-amber-100"
      >
        {inner}
      </mark>,
    );
    rest = j === -1 ? "" : rest.slice(j + CLOSE.length);
  }

  return (
    <pre
      className={`overflow-x-auto rounded-xl border border-slate-700/80 bg-[#0f172a] p-4 text-left text-[11px] leading-relaxed shadow-inner sm:text-xs ${className}`}
    >
      <code className="font-mono">{nodes}</code>
    </pre>
  );
}
