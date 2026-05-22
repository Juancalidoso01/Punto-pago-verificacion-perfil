import type { AppMessages } from "@/i18n/catalog";

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
      "If Mati is unavailable, use the button below to **simulate** verification and continue the flow. With **MATI_CLIENT_SECRET** on the server, the widget tries to create an identity automatically so users can run the real selfie flow.",
    metamapDemoButton: "Continue without Mati (simulate verification)",
    metamapSkipHint:
      "You can complete **ID verification** with the button above, **or**—only for **testing or integration**—skip Mati and continue with demo IDs (this does not replace real production verification).",
    metamapSkipButton: "Skip verification and continue (demo)",
    metamapProvisionLoading:
      "Preparing Mati verification (document and selfie)…",
    metamapProvisionFailed:
      "Could not create a Mati identity. Set **MATI_CLIENT_SECRET** on the server (see `.env.example`) or use simulation. Mati may still reject the session later if number validation is not wired on your backend yet.",
    metamapProvisionRetry: "Retry opening Mati",
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
        "**Iframe ↔ host ↔ backend** contract: validate the previous number, supply **identityId** before the SDK, handle **`postMessage`** events, and confirm **verificationId** with the Mati API.",
      backendCardCta: "Open technical documentation",
    },
    pasoShell: {
      index: "← Guide index",
      flow: "← Back to verification flow",
      kicker: "Process guide",
      whereInProcessLabel: "Where the user is in the flow",
    },
    pasoBody: {
      openFlowStepTitle: "See this screen in the widget",
      openFlowStepButton: "Open the flow at this step",
      openFlowStepFootnote:
        "Link with `?step=…` to the embed (or the main site). For reviewing the UI; if you skip steps, some copy may appear without prior data.",
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
      },
    },
  },
  backendDoc: {
    title: "Backend integration for profile change (MetaMap / Mati)",
    intro:
      "This document describes the **contract** between the **widget iframe**, the **host app**, and your **backend**: what to validate when numbers are submitted, how to obtain and expose **identityId** before the SDK, which message marks a finished Mati session, and how to **confirm** verification on the server before you treat migration as complete. Highlighted snippets mark values that must not be guessed in production.",
    backGuia: "← Guide index",
    backFlow: "← Back to flow",
    handoffTitle: "What to hand off so another team can develop on their own",
    handoffBody:
      "At minimum: **Git repository access** (or an agreed copy with history); **Node.js** matching the project and **`npm install`**, **`npm run dev`**, **`npm run build`**; the **deployed base URL** of the widget (where **`/embed`** is served) for staging and production; public build vars **`NEXT_PUBLIC_METAMAP_CLIENT_ID`** and **`NEXT_PUBLIC_METAMAP_FLOW_ID`** (replace defaults with **your** MetaMap account values); optional **`NEXT_PUBLIC_METAMAP_IDENTITY_ID`** for local demos only; **Mati API secrets on the server** (never in the client or repo) to create **`identityId`**; and an agreement on **origins** if you customize who may send `flow_error` to the iframe (see **`embed-security.ts`**). Also document who runs **deployment** (e.g. Vercel) and the **exact URLs** the bank will embed.",
    uiTitle: "HTML, visual design, and how backend and frontend split the work",
    uiBody:
      "The **markup and styles** for the flow (buttons, typography, colors, steps) live in **this** Next.js project: components under **`src/components`**, global CSS, and Tailwind. If you integrate only an **`<iframe>`** to **`/embed`**, the **inner** look is controlled by this widget deployment; the host app can set **width, height, shadows, and margins** around the frame, but **cannot** style iframe content from outside because of the **same-origin policy**. To match brand (Punto Pago colors, copy, breakpoints), someone with **frontend** skills should clone or fork **this repo** and adjust components or design tokens. **Backend** teams typically own the **container HTML** in their portal, the **iframe URL** with query params (`identityId`, `label`, etc.), and **`postMessage`** handling; **inside** the widget, visual tweaks happen in this codebase.",
    codeHostIframeTitle: "Minimal host-page HTML (iframe container)",
    codeHostIframe: `<!-- Replace the host and query string from your backend -->
<iframe
  [[HL]]title[[/HL]]="Punto Pago profile change"
  [[HL]]src[[/HL]]="https://[[HL]]your-widget-domain[[/HL]]/embed?[[HL]]identityId[[/HL]]=...&[[HL]]label[[/HL]]=..."
  [[HL]]allow[[/HL]]="[[HL]]camera[[/HL]]"
  style="width:100%;max-width:28rem;min-height:640px;border:0;display:block;margin:0 auto;"
></iframe>`,
    s1Title: "1) After numbers: run business checks, then create or fetch the Mati identity",
    s1Body:
      "When the user submits the numbers form, the iframe emits **`apps_submitted`**. Treat that as the signal to validate the **previous number** (existence, Punto Pago profile, policies such as the 2‑month change limit). If everything passes, **create or fetch** the Mati identity and obtain the **identityId** that must reach the iframe in **`?identityId=…`** (or equivalent) **before** the user opens the SDK. Without it, Mati cannot start.",
    codePrepareTitle: "Example: identity ready before setting the iframe URL",
    codePrepare: `// After validating oldPhoneE164 and business rules on the server:
const [[HL]]identityId[[/HL]] = await mati.createOrGetIdentity({ externalId: oldPhoneE164 });
// Update iframe src (optional ?label= for merchant copy):
// /embed?label=...&identityId=\${encodeURIComponent(identityId)}`,
    s2Title: "2) Load the embed with the correct per-session identityId",
    s2Body:
      "The widget uses the official **`mati-button`** web component. **clientid** and **flowId** are usually fixed per environment (build); what must vary per user or attempt is **identityId**—always the value Mati returned for the identity tied to the **already validated** previous number in your domain.",
    codeIframeTitle: "Minimal Mati button HTML (relevant attributes)",
    codeIframe: `<mati-button
  clientid="[[HL]]YOUR_CLIENT_ID[[/HL]]"
  flowId="[[HL]]YOUR_FLOW_ID[[/HL]]"
  [[HL]]identityId[[/HL]]="[[HL]]<hex from your backend>[[/HL]]"
></mati-button>`,
    s3Title: "3) Successful Mati close: handle `metamap_verification_submitted`",
    s3Body:
      "When the user finishes the SDK, the widget posts **`metamap_verification_submitted`** to the parent with **verificationId**, **identityId**, both E.164 values, and optional fields. This is the **primary hook** to persist pending migration, correlate the session, and call Mati if needed. Later messages (`migration_analysis_*`, `verification_succeeded`, etc.) complete the demo narrative; see **`cambio-perfil-parent-events.ts`** for the full list and payloads. On the host, always validate **`origin`**, **`source`**, and message **shape** before acting.",
    codePostMessageTitle: "Message shape (reference; host validation is still required)",
    codePostMessage: `window.parent.postMessage({
  source: "punto-pago-cambio-perfil",
  type: "[[HL]]metamap_verification_submitted[[/HL]]",
  [[HL]]verificationId[[/HL]]: "<verification id>",
  [[HL]]identityId[[/HL]]: "<identity id>",
  oldPhoneE164: "+507...",
  newPhoneE164: "+507...",
}, targetOrigin); // explicit targetOrigin — never "*" in production`,
    s4Title: "4) Confirm with Mati before you finalize migration",
    s4Body:
      "Do not rely on the browser alone: with **verificationId** (and **identityId** for context) obtain a **definitive status** from the MetaMap API (REST, webhooks, or both, depending on your integration). Only then update accounts, numbers, and internal records. If verification is missing, failed, or not ready, respond to the user and you may send **`flow_error`** to the iframe to return them to the right step.",
    codeMatiTitle: "Sample query (pseudocode; paths depend on API version)",
    codeMati: `const v = await matiHttp.get(
  \`/v2/identities/[[HL]]\${identityId}[[/HL]]/verifications/[[HL]]\${verificationId}[[/HL]]\`
);
if (!v || v.status === "NOT_FOUND") {
  // not indexed yet, rejected, or missing — align with webhooks if you use them
}`,
    noteTitle: "Business errors to the iframe (`flow_error`)",
    noteBody:
      "If validation of the previous number fails **before** Mati, the host can postMessage the iframe with **`source: \"punto-pago-cambio-perfil-host\"`**, **`type: \"flow_error\"`**, an **`errorCode`** from the catalog (e.g. **`OLD_APP_NUMBER_NOT_FOUND`**) and optional **`step`** (`\"apps\"`, `\"metamap\"`, …) so the user can fix data or retry. Codes and user-facing strings: **`cambio-perfil-errors.ts`**. Treat iframe messages as **untrusted input** until origin and schema checks pass.",
  },
};
