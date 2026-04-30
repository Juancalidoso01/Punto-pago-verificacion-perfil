import type { AppMessages } from "@/i18n/catalog";
import { GUIA_FIGURE_SRC } from "@/i18n/guia-figure-paths";

export const enMessages: AppMessages = {
  chrome: {
    subtitle: "Profile change · Number migration",
    business: "Business",
    mainSite: "Main site",
    footerBrand: "Grupo Punto Pago",
    footerLine: "Profile change and number migration.",
    footerLinkLabel: "puntopago.net",
  },
  lang: {
    label: "Language",
    es: "ES",
    en: "EN",
    ru: "RU",
  },
  errors: {
    INVALID_NUMBER_FORMAT:
      "Enter the app number with the selected prefix (1–15 digits).",
    DUPLICATE_APP_NUMBERS:
      "The new app number must be different from the previous app number.",
    OLD_APP_NUMBER_NOT_FOUND:
      "We could not find a Punto Pago account for that previous app number. Check the number and country and try again.",
    OLD_APP_NUMBER_NO_PROFILE:
      "That app number has no prior Punto Pago profile. You can only migrate from a number you have already used with the service.",
    PROFILE_CHANGE_ALREADY_REGISTERED:
      "This number already has a registered profile change or you have not yet met the waiting period between changes (at most one every 2 months). If you need help, contact support.",
    genericHost:
      "We could not complete this step. Check your details and try again.",
  },
  flow: {
    noticeH1: "Change app number",
    noticeAmberTitle: "Important: data migration",
    noticeAmberBody:
      "The information and history tied to your **previous app number** in Punto Pago will be **migrated** to the **new app number** you enter in the next step. Make sure both numbers are correct; here you only register and authorize that profile change.",
    noticeLimitTitle: "Profile change limit",
    noticeLimitBody:
      "You can only perform a **profile change** (number migration) **once every 2 months**. Use it when you truly intend to keep the new number; it is not meant for frequent number changes.",
    noticeFooter:
      "You will then enter the previous and new app numbers and complete identity verification with a valid ID document and a selfie.",
    appsH1: "Your Punto Pago app numbers",
    appsIntro:
      "Data from the old app will move to the new number. Enter both numbers; the default country is Panama (+507) and you can change the country per field if needed. Remember: **at most one profile change every 2 months**.",
    oldFieldLabel: "Previous app number",
    oldFieldDesc: "The number linked to your Punto Pago service before the change.",
    newFieldLabel: "New app number",
    newFieldDesc: "The app number your profile and data will migrate to.",
    btnBackNotice: "Back to notice",
    btnContinue: "Continue",
    btnUnderstood: "Understood, continue",
    metamapH1: "Identity verification",
    metamapIntro:
      "We registered migration from **{{old}}** to **{{new}}**. To finish the profile change we must confirm it is you: have a **valid ID document** ready, tap the button below and follow the on-screen steps (including a **selfie**).",
    metamapBack: "Back to edit numbers",
    metamapDemoHint:
      "Without a valid **identityId**, the Mati SDK does not open. Use the button below to simulate a verification and walk through the rest of the flow; in production the embed must pass `?identityId=…` or `NEXT_PUBLIC_METAMAP_IDENTITY_ID` for tests.",
    metamapDemoButton: "Continue without Mati (simulate verification)",
    metamapSkipHint:
      "You can complete **ID verification** with the button above, **or**—only for **testing or integration**—skip Mati and continue with demo IDs (this does not replace real production verification).",
    metamapSkipButton: "Skip verification and continue (demo)",
    doneH1: "Profile change completed",
    doneBody:
      "Your identity was validated and the number migration was recorded. You can keep using the Punto Pago app with your new number.",
    doneNumbersLabel: "Numbers:",
  },
  fields: {
    phonePlaceholder: "App number",
    formatOkTitle: "Valid format",
    formatOkAria: "Valid format",
    duplicateUnderField: "Must be different from the previous app number.",
    countryAriaTemplate: "Country or prefix for {{label}}",
  },
  migration: {
    title: "Analyzing your information",
    body:
      "We are validating previous app number {{old}} in our systems and the identity verification linked to the migration to {{new}}. This may take up to one minute.",
    progressAria: "Analysis in progress, up to {{sec}} seconds",
    dontClose: "Do not close this window",
  },
  metamapUi: {
    btn: "Verify identity",
    loading: "Loading verification…",
    matiAria: "Open identity verification with valid ID and selfie",
  },
  guide: {
    teaser: {
      sectionLabel: "Reference material only · not part of this transaction",
      title: "Guide & integration (separate from the flow)",
      body:
        "Step-by-step documentation on its own pages: what the user does, which `postMessage` events the widget sends, and when your backend should call APIs. Use the button to open the index and pick a step; each page links back to the flow or the index.",
      cta: "Open step-by-step guide",
    },
    index: {
      backFlow: "← Back to verification flow",
      title: "Flow guide",
      subtitle:
        "Pick a step to open its detail page. On each page you can return to the guide index or the main profile-change flow.",
      stepGeneral: "Overview",
      stepNLabel: "Step {{n}}",
      backendCardTitle: "Backend integration · Mati / MetaMap",
      backendCardDesc:
        "HTML, postMessage, and an example of correlating with the verifications API using **identityId** and **verificationId**.",
      backendCardCta: "Open technical documentation",
    },
    pasoShell: {
      index: "← Guide index",
      flow: "← Back to verification flow",
      kicker: "Process guide",
      whereInProcessLabel: "Where the user is in the flow",
    },
    pasoBody: {
      figuresLabel: "Flow view (wireframe)",
      figuresFootnote:
        "Reference diagrams. Replace with real screenshots (PNG/WebP) in public/guide-media/ (same filenames).",
      userFacing: "In the app",
      postMessage: "Widget → parent (`postMessage`)",
      backend: "Backend / parent — when to query or act",
    },
    steps: {
      overview: {
        title: "Overview",
        summary:
          "The widget runs in an iframe; the parent (Punto Pago app) listens for messages and orchestrates Mati identity, validations, and server-side migration.",
        whereInProcess:
          "Big-picture journey: from when the user opens the embed through final confirmation — how each phase fits inside and outside the iframe.",
        userFacing: [
          "The user goes through notice → numbers → Mati verification → waiting for result → confirmation.",
          "Sensitive data is also sent to the parent via `postMessage` so your backend can act.",
        ],
        widgetEmits: [
          {
            type: "flow_ready",
            when:
              "When the widget mounts (iframe ready to receive `identityId` and show the flow).",
          },
        ],
        integrationHints: [
          "After `flow_ready`, the parent may **create or fetch** `identityId` in Mati and update the iframe `src` with `?identityId=…` if it was not set yet.",
          "Keep listening to `postMessage` with `source === \"punto-pago-cambio-perfil\"` for the whole flow.",
        ],
        figures: [
          {
            src: GUIA_FIGURE_SRC.overview,
            alt: "Diagram: parent application containing an iframe that loads the profile-change widget",
            caption:
              "Visual relationship between the host app and the embed (same pattern as in production).",
          },
        ],
      },
      notice: {
        title: "1. Initial notice",
        summary: "Data migration between app numbers and a limit of one change every 2 months.",
        whereInProcess:
          "Initial widget screen (notice step): the user only reads migration and frequency notices; they have not entered numbers or opened Mati yet.",
        userFacing: [
          "Read the notice about migration and the frequency limit for profile changes.",
          "Tap “Understood, continue” to go to the numbers step.",
        ],
        widgetEmits: [],
        integrationHints: [
          "Optional: analytics or logging that the user entered the flow (no extra widget event on this step besides `flow_ready` already emitted).",
        ],
        figures: [
          {
            src: GUIA_FIGURE_SRC.notice,
            alt: "Initial notice screen: title, migration and limit callouts, doc block at the bottom, primary button",
            caption:
              "Real order: transactional content first (notices + continue); the guide sits below as reference only.",
          },
        ],
      },
      apps: {
        title: "2. App numbers",
        summary: "Capture previous and new numbers (E.164) with country; basic client-side validation.",
        whereInProcess:
          "Apps step in the widget: the user is filling in previous and new app numbers (with country); this is the first data capture of the flow.",
        userFacing: [
          "Select country and previous and new app numbers.",
          "The Continue button only enables with valid format and two different numbers.",
        ],
        widgetEmits: [
          {
            type: "apps_submitted",
            when: "When the numbers form is submitted (before opening Mati).",
          },
          {
            type: "verification_started",
            when: "Immediately after `apps_submitted` (broad sense: verification process starts).",
          },
        ],
        integrationHints: [
          "Here or **before** allowing Mati, the backend can **validate** numbers (existence, prior profile, 2-month policy).",
          "If validation fails, the parent sends `postMessage` with `source: \"punto-pago-cambio-perfil-host\"`, `type: \"flow_error\"`, `errorCode` (see error catalog) and optionally `step: \"apps\"`.",
        ],
        figures: [
          {
            src: GUIA_FIGURE_SRC.apps,
            alt: "Form with two number blocks (country + digits) and back / continue actions",
            caption: "Layout of the E.164 fields and buttons on the numbers step.",
          },
        ],
      },
      metamap: {
        title: "3. Mati verification (SDK)",
        summary: "The user completes document + selfie in the embedded Mati flow; requires a valid `identityId`.",
        whereInProcess:
          "Metamap step in the widget: numbers are already submitted; the user is on identity verification (number summary + button that opens the Mati / MetaMap SDK).",
        userFacing: [
          "Confirm the numbers shown and open verification with the Mati button.",
          "They can go back to edit numbers if needed.",
        ],
        widgetEmits: [
          {
            type: "metamap_started",
            when: "When the user starts the SDK (first contact with the Mati modal).",
          },
          {
            type: "metamap_back_to_apps",
            when: "If they tap “Back to edit numbers”.",
          },
        ],
        integrationHints: [
          "The **first `identityId`** must come from **your backend** (Mati creation) and reach the iframe via query or test env.",
          "After `metamap_started`, you can correlate the session on the backend if needed.",
        ],
        figures: [
          {
            src: GUIA_FIGURE_SRC.metamap,
            alt: "Verification step: number summary and main button to open Mati",
            caption: "The SDK needs a valid identityId; the purple button opens the MetaMap flow.",
          },
        ],
      },
      "metamap-done": {
        title: "4. Mati finished → analysis",
        summary:
          "When Mati closes successfully, the widget sends verification IDs and moves to the waiting screen.",
        whereInProcess:
          "Right after Mati succeeds: the widget has already emitted `metamap_verification_submitted` with `verificationId` and `identityId`, and transitions toward the analysis screen.",
        userFacing: [
          "After Mati, they see the “analyzing” screen with a progress bar (demo ~60 s).",
        ],
        widgetEmits: [
          {
            type: "metamap_verification_submitted",
            when:
              "When Mati finishes with `verificationId` and `identityId` — **main backend hook**.",
          },
          {
            type: "migration_analysis_started",
            when: "Right after, with `estimatedDurationMs` and the same identifiers.",
          },
        ],
        integrationHints: [
          "**Main read/write:** validate `oldPhoneE164`, cross-check with Mati, record migration, trigger jobs, etc.",
          "In production you can replace the UI timer with a real backend response and finish earlier if you define a protocol.",
        ],
        figures: [
          {
            src: GUIA_FIGURE_SRC.metamapDone,
            alt: "Diagram: iframe sends verificationId and identityId to the parent via postMessage",
            caption:
              "Critical integration point: correlate these IDs with your backend and Mati.",
          },
        ],
      },
      analyzing: {
        title: "5. On-screen analysis",
        summary: "Wait while the parent processes (today the UI uses a demo timer).",
        whereInProcess:
          "Analyzing step in the widget: the user sees the wait state (message, progress bar, do not close). In production that wait should reflect what your backend does with the IDs and migration.",
        userFacing: ["See the do-not-close message and the progress bar."],
        widgetEmits: [],
        integrationHints: [
          "While the UI shows analysis, the backend can **poll Mati status**, update the account, notify other systems, etc.",
          "If the result is negative, you can send `flow_error` to the iframe before the demo timer ends (if you add extra handling).",
        ],
        figures: [
          {
            src: GUIA_FIGURE_SRC.analyzing,
            alt: "Waiting screen with progress bar and do-not-close hint",
            caption: "Demo uses a fixed duration; production replaces this with server-driven state.",
          },
        ],
      },
      done: {
        title: "6. Completed",
        summary: "User confirmation; the parent receives flow completion in the demo.",
        whereInProcess:
          "Final done step in the widget: the user sees success confirmation and migrated numbers; the UI flow is complete (the parent also receives the last events).",
        userFacing: ["Success message and summary of migrated numbers."],
        widgetEmits: [
          {
            type: "metamap_finished",
            when: "When the analysis phase ends in the UI (in the demo, when the timer completes).",
          },
          {
            type: "verification_succeeded",
            when: "At the same instant as `metamap_finished` in the demo.",
          },
          {
            type: "migration_analysis_complete",
            when:
              "Payload with `outcome` (e.g. `\"success\"`) — align with real backend outcome in production.",
          },
        ],
        integrationHints: [
          "Update state in the native / parent web app, close modal, refresh profile, etc.",
        ],
        figures: [
          {
            src: GUIA_FIGURE_SRC.done,
            alt: "Final screen with success icon, title, and migrated numbers summary",
            caption: "User-facing confirmation after the flow completes in the UI.",
          },
        ],
      },
    },
  },
  backendDoc: {
    title: "Backend integration: old number, identityId, and MetaMap",
    intro:
      "This page summarizes what the **backend** team must implement before the Mati (MetaMap) widget can determine whether a valid verification exists. Highlighted regions in the samples are the critical integration points.",
    backGuia: "← Guide index",
    backFlow: "← Back to flow",
    s1Title: "1) Validate the previous app number and resolve identityId",
    s1Body:
      "When the user submits numbers (`apps_submitted`), your backend must ensure the **previous number** exists, has a profile, and meets policies. If OK, **create or fetch** a Mati identity and obtain the **identityId** you pass to the iframe (`?identityId=…`). Without it, the Mati SDK cannot open the flow.",
    codePrepareTitle: "Example (Node / TypeScript): prepare identity before the iframe",
    codePrepare: `// After validating oldPhoneE164 in your domain:
const [[HL]]identityId[[/HL]] = await mati.createOrGetIdentity({ externalId: oldPhoneE164 });
// Redirect / update iframe src:
// /embed?label=...&identityId=\${encodeURIComponent(identityId)}`,
    s2Title: "2) Load the embed with identityId",
    s2Body:
      "The `mati-button` SDK component uses **clientid**, **flowId**, and **identityId**. The **identityId** must be the identity tied to the user / validated old number.",
    codeIframeTitle: "Minimal Mati button HTML (relevant attributes)",
    codeIframe: `<mati-button
  clientid="[[HL]]YOUR_CLIENT_ID[[/HL]]"
  flowId="[[HL]]YOUR_FLOW_ID[[/HL]]"
  [[HL]]identityId[[/HL]]="[[HL]]<hex from your backend>[[/HL]]"
></mati-button>`,
    s3Title: "3) Listen for Mati completion in the parent",
    s3Body:
      "The widget sends `metamap_verification_submitted` to the parent with **verificationId** and **identityId**. That is when the backend should **persist** old-number → verification correlation and query Mati if needed.",
    codePostMessageTitle: "postMessage from the iframe (reference)",
    codePostMessage: `window.parent.postMessage({
  source: "punto-pago-cambio-perfil",
  type: "[[HL]]metamap_verification_submitted[[/HL]]",
  [[HL]]verificationId[[/HL]]: "<verification id>",
  [[HL]]identityId[[/HL]]: "<identity id>",
  oldPhoneE164: "+507...",
  newPhoneE164: "+507...",
}, targetOrigin);`,
    s4Title: "4) Check in Mati whether the verification exists",
    s4Body:
      "With **verificationId** (and optionally **identityId**) call the MetaMap / Mati API (per your product version: REST v2, webhooks, etc.). If the verification exists and is in the expected state, you can conclude the flow; otherwise respond with an error or send `flow_error` to the iframe.",
    codeMatiTitle: "Example query (pseudocode)",
    codeMati: `const v = await matiHttp.get(
  \`/v2/identities/[[HL]]\${identityId}[[/HL]]/verifications/[[HL]]\${verificationId}[[/HL]]\`
);
if (!v || v.status === "NOT_FOUND") {
  // missing or not yet available
}`,
    noteTitle: "Errors to the iframe",
    noteBody:
      "If old-number validation fails before Mati, the parent can send `postMessage` with `source: \"punto-pago-cambio-perfil-host\"`, `type: \"flow_error\"`, `errorCode` (e.g. `OLD_APP_NUMBER_NOT_FOUND`) and `step: \"apps\"`. See `cambio-perfil-errors.ts`.",
  },
};
