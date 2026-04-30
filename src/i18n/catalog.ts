import type { CambioPerfilErrorCode } from "@/lib/cambio-perfil-errors";

/** Ilustración del paso (archivo en `/public`, p. ej. captura o wireframe SVG). */
export type GuideFigure = {
  src: string;
  alt: string;
  caption?: string;
};

/** Contenido traducible de un paso de la guía (sin `id` / `stepKey`). */
export type GuideStepBlock = {
  title: string;
  summary: string;
  /**
   * Qué parte del proceso vive el usuario en este paso (pantalla / acción),
   * para alinear la guía con el flujo real del widget.
   */
  whereInProcess: string;
  userFacing: string[];
  widgetEmits: { type: string; when: string }[];
  integrationHints: string[];
  /** Diagramas o capturas mostrados en la página del paso. */
  figures?: GuideFigure[];
};

export type GuideSteps = {
  overview: GuideStepBlock;
  notice: GuideStepBlock;
  apps: GuideStepBlock;
  metamap: GuideStepBlock;
  "metamap-done": GuideStepBlock;
  analyzing: GuideStepBlock;
  done: GuideStepBlock;
};

export type AppMessages = {
  chrome: {
    subtitle: string;
    business: string;
    mainSite: string;
    footerBrand: string;
    footerLine: string;
    footerLinkLabel: string;
  };
  lang: {
    label: string;
    es: string;
    en: string;
    ru: string;
  };
  errors: Record<CambioPerfilErrorCode, string> & { genericHost: string };
  flow: {
    noticeH1: string;
    noticeAmberTitle: string;
    noticeAmberBody: string;
    noticeLimitTitle: string;
    noticeLimitBody: string;
    noticeFooter: string;
    appsH1: string;
    appsIntro: string;
    oldFieldLabel: string;
    oldFieldDesc: string;
    newFieldLabel: string;
    newFieldDesc: string;
    btnBackNotice: string;
    btnContinue: string;
    btnUnderstood: string;
    metamapH1: string;
    metamapIntro: string;
    metamapBack: string;
    metamapDemoHint: string;
    metamapDemoButton: string;
    /** Cuando hay SDK Mati: texto bajo el botón real para la opción de omitir (demo). */
    metamapSkipHint: string;
    metamapSkipButton: string;
    doneH1: string;
    doneBody: string;
    doneNumbersLabel: string;
  };
  fields: {
    phonePlaceholder: string;
    formatOkTitle: string;
    formatOkAria: string;
    duplicateUnderField: string;
    /** Plantilla con `{{label}}` para `aria-label` del selector de país. */
    countryAriaTemplate: string;
  };
  migration: {
    title: string;
    body: string;
    progressAria: string;
    dontClose: string;
  };
  metamapUi: {
    btn: string;
    loading: string;
    matiAria: string;
  };
  guide: {
    teaser: {
      title: string;
      body: string;
      cta: string;
      /** Línea corta que separa este bloque del trámite principal. */
      sectionLabel: string;
    };
    index: {
      backFlow: string;
      title: string;
      subtitle: string;
      stepGeneral: string;
      /** Plantilla con `{{n}}` (número de paso, 1-based tras el ítem “General”). */
      stepNLabel: string;
      backendCardTitle: string;
      backendCardDesc: string;
      backendCardCta: string;
    };
    pasoShell: {
      index: string;
      flow: string;
      kicker: string;
      /** Etiqueta junto a `whereInProcess` en cada página de paso. */
      whereInProcessLabel: string;
    };
    pasoBody: {
      figuresLabel: string;
      figuresFootnote: string;
      userFacing: string;
      postMessage: string;
      backend: string;
    };
    steps: GuideSteps;
  };
  backendDoc: {
    title: string;
    intro: string;
    backGuia: string;
    backFlow: string;
    s1Title: string;
    s1Body: string;
    codePrepareTitle: string;
    codePrepare: string;
    s2Title: string;
    s2Body: string;
    codeIframeTitle: string;
    codeIframe: string;
    s3Title: string;
    s3Body: string;
    codePostMessageTitle: string;
    codePostMessage: string;
    s4Title: string;
    s4Body: string;
    codeMatiTitle: string;
    codeMati: string;
    noteTitle: string;
    noteBody: string;
  };
};
