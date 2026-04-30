import type { CambioPerfilErrorCode } from "@/lib/cambio-perfil-errors";

/** Contenido traducible de un paso de la guía (sin `id` / `stepKey`). */
export type GuideStepBlock = {
  title: string;
  summary: string;
  userFacing: string[];
  widgetEmits: { type: string; when: string }[];
  integrationHints: string[];
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
    metamapConfigTitle: string;
    metamapConfigBody: string;
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
    teaser: { title: string; body: string; cta: string };
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
    };
    pasoBody: {
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
