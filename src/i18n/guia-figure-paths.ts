/**
 * Rutas públicas de diagramas del flujo (SVG).
 * Deben vivir **fuera** de `/guia/*` para no chocar con la ruta dinámica `app/guia/[slug]`
 * (p. ej. `/guia/metamap.svg` se interpretaba como slug `metamap.svg` y devolvía HTML → imagen rota).
 */
export const GUIA_FIGURE_SRC = {
  overview: "/guide-media/overview.svg",
  notice: "/guide-media/notice.svg",
  apps: "/guide-media/apps.svg",
  metamap: "/guide-media/metamap.svg",
  metamapDone: "/guide-media/metamap-done.svg",
  analyzing: "/guide-media/analyzing.svg",
  done: "/guide-media/done.svg",
} as const;
