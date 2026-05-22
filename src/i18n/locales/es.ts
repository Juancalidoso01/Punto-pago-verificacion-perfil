import type { AppMessages } from "@/i18n/catalog";

export const esMessages: AppMessages = {
  chrome: {
    subtitle: "Cambio de perfil · Migración de número",
    business: "Business",
    mainSite: "Sitio principal",
    footerBrand: "Grupo Punto Pago",
    footerLine: "Cambio de perfil y migración de número.",
    footerLinkLabel: "puntopago.net",
  },
  lang: {
    label: "Idioma",
    es: "ES",
    en: "EN",
    ru: "RU",
  },
  errors: {
    INVALID_NUMBER_FORMAT:
      "Indica el número de app con el prefijo elegido (1–15 dígitos).",
    DUPLICATE_APP_NUMBERS:
      "El número de app nuevo debe ser distinto al número de app anterior.",
    OLD_APP_NUMBER_NOT_FOUND:
      "No encontramos una cuenta Punto Pago asociada a ese número de app anterior. Revisa el número, el país e inténtalo de nuevo.",
    OLD_APP_NUMBER_NO_PROFILE:
      "Ese número de app no tiene un perfil previo con Punto Pago. Solo puedes migrar desde un número con el que ya hayas usado el servicio.",
    PROFILE_CHANGE_ALREADY_REGISTERED:
      "Este número ya tiene un cambio de perfil registrado o aún no cumples el plazo entre cambios (máximo uno cada 2 meses). Si necesitas ayuda, contacta a soporte.",
    genericHost:
      "No pudimos completar el paso. Revisa los datos e inténtalo de nuevo.",
  },
  flow: {
    noticeH1: "Cambio de número de app",
    noticeAmberTitle: "Importante: migración de datos",
    noticeAmberBody:
      "La información y el historial asociados a tu **número de app anterior** en Punto Pago serán **migrados** al **número de app nuevo** que indiques en el siguiente paso. Asegúrate de que ambos números son correctos; aquí solo registramos y autorizas ese cambio de perfil.",
    noticeLimitTitle: "Límite de cambios de perfil",
    noticeLimitBody:
      "Solo puedes realizar un **cambio de perfil** (migración de número) **una vez cada 2 meses**. Úsalo cuando realmente vayas a quedarte con el número nuevo; no está pensado para cambiar de número con frecuencia.",
    noticeFooter:
      "Después indicarás el número de app anterior y el nuevo, y completarás una verificación de identidad con documento vigente y selfie.",
    appsH1: "Datos de tus apps en Punto Pago",
    appsIntro:
      "Los datos del app anterior se migrarán al número nuevo. Indica ambos números; por defecto el país es Panamá (+507) y puedes cambiar el país en cada campo si aplica. Recuerda: **un cambio de perfil cada 2 meses como máximo**.",
    oldFieldLabel: "Número de app anterior",
    oldFieldDesc:
      "El número vinculado a tu servicio Punto Pago antes del cambio.",
    newFieldLabel: "Número de app nuevo",
    newFieldDesc: "El número de app al que se migrará tu perfil y datos.",
    btnBackNotice: "Volver al aviso",
    btnContinue: "Continuar",
    btnUnderstood: "Entendido, continuar",
    metamapH1: "Verificación de identidad",
    metamapIntro:
      "Quedó registrada la migración de **{{old}}** a **{{new}}**. Para completar el cambio de perfil debemos confirmar que eres tú: ten a mano un **documento de identidad vigente**, pulsa el botón de abajo y sigue los pasos en pantalla (incluye una **foto tipo selfie**).",
    metamapBack: "Volver y editar números",
    metamapDemoHint:
      "Si Mati no está disponible, usá el botón de abajo para **simular** la verificación y ver el resto del flujo. Con **MATI_CLIENT_SECRET** en el servidor, el widget intenta crear la identidad automáticamente para abrir el selfie real.",
    metamapDemoButton: "Continuar sin Mati (simular verificación)",
    metamapSkipHint:
      "Podés **verificar con documento y selfie** usando el botón de arriba, o bien—solo para **pruebas o integración**—omitir Mati y seguir con datos demo (no sustituye una verificación real en producción).",
    metamapSkipButton: "Omitir verificación y continuar (demo)",
    metamapProvisionLoading:
      "Preparando la verificación en Mati (documento y selfie)…",
    metamapProvisionFailed:
      "No se pudo crear la identidad en Mati. Configurá **MATI_CLIENT_SECRET** en el servidor (ver `.env.example`) o usá la simulación. Mati puede rechazar el trámite después si aún no tenéis validación de número en backend.",
    metamapProvisionRetry: "Reintentar abrir Mati",
    doneH1: "Cambio de perfil completado",
    doneBody:
      "Tu identidad quedó validada y la migración entre números quedó registrada. Puedes seguir usando la aplicación Punto Pago con tu número nuevo.",
    doneNumbersLabel: "Números:",
  },
  fields: {
    phonePlaceholder: "Número de app",
    formatOkTitle: "Formato válido",
    formatOkAria: "Formato válido",
    duplicateUnderField: "Debe ser distinto al número de app anterior.",
    countryAriaTemplate: "País o prefijo para {{label}}",
  },
  migration: {
    title: "Analizando tu información",
    body:
      "Estamos validando el número de app anterior {{old}} en nuestros sistemas y la verificación de identidad asociada a la migración hacia {{new}}. Esto puede tardar hasta un minuto.",
    progressAria: "Análisis en curso, hasta {{sec}} segundos",
    dontClose: "No cierres esta ventana",
  },
  metamapUi: {
    btn: "Verificar identidad",
    loading: "Cargando verificación…",
    matiAria:
      "Abrir verificación de identidad con documento vigente y selfie",
  },
  guide: {
    teaser: {
      sectionLabel: "Solo material explicativo · no es parte del trámite",
      title: "Guía e integración (separada del flujo)",
      body:
        "Documentación paso a paso en páginas propias: qué hace el usuario, qué `postMessage` emite el widget y cuándo conviene que el backend consulte APIs. Usá el botón para abrir el índice y elegir un paso; en cada página podés volver al flujo o al índice.",
      cta: "Abrir guía paso a paso",
    },
    index: {
      backFlow: "← Volver al flujo de verificación",
      title: "Guía del flujo",
      subtitle:
        "Elegí un paso para abrir su página de detalle. En cada una podés regresar al índice de la guía o al flujo principal de cambio de perfil.",
      stepGeneral: "General",
      stepNLabel: "Paso {{n}}",
      backendCardTitle: "Integración backend · Mati / MetaMap",
      backendCardDesc:
        "Contrato **iframe ↔ host ↔ backend**: validación del número anterior, **identityId** antes del SDK, eventos **`postMessage`** y comprobación de **verificationId** contra la API de Mati.",
      backendCardCta: "Abrir documentación técnica",
    },
    pasoShell: {
      index: "← Índice de la guía",
      flow: "← Volver al flujo de verificación",
      kicker: "Guía del proceso",
      whereInProcessLabel: "Dónde está el usuario en el proceso",
    },
    pasoBody: {
      openFlowStepTitle: "Ver esta pantalla en el widget",
      openFlowStepButton: "Abrir el flujo en este paso",
      openFlowStepFootnote:
        "Enlace con `?step=…` al embed (o al sitio). Sirve para revisar la UI; si saltás pasos, algunos textos pueden mostrarse sin datos previos.",
      userFacing: "En la app",
      postMessage: "Widget → padre (`postMessage`)",
      backend: "Backend / padre — cuándo consultar o actuar",
    },
    steps: {
      overview: {
        title: "Vista general",
        summary:
          "El widget vive en un iframe; el padre (app Punto Pago) escucha mensajes y orquesta identidad Mati, validaciones y migración en servidor.",
        whereInProcess:
          "Panorama del recorrido: desde que el usuario abre el embed hasta la confirmación final — útil para ver en qué orden ocurre cada cosa dentro y fuera del iframe.",
        userFacing: [
          "El usuario completa aviso → números → verificación Mati → espera de resultado → confirmación.",
          "Los datos sensibles también viajan al padre por `postMessage` para que vuestro backend actúe.",
        ],
        widgetEmits: [
          {
            type: "flow_ready",
            when:
              "Al montar el widget (iframe listo para recibir `identityId` y mostrar el flujo).",
          },
        ],
        integrationHints: [
          "Tras `flow_ready`, el padre puede **crear o recuperar** `identityId` en Mati y actualizar el `src` del iframe con `?identityId=…` si aún no lo tenía.",
          "Mantener escucha de `postMessage` con `source === \"punto-pago-cambio-perfil\"` durante todo el flujo.",
        ],
      },
      notice: {
        title: "1. Aviso inicial",
        summary:
          "Migración de datos entre números de app y límite de un cambio cada 2 meses.",
        whereInProcess:
          "Pantalla inicial del widget (paso «aviso»): el usuario solo lee los avisos de migración y el límite de frecuencia; aún no ingresa números ni abre Mati.",
        userFacing: [
          "Lee el aviso sobre migración y el límite de frecuencia del cambio de perfil.",
          "Pulsa «Entendido, continuar» para pasar a los números.",
        ],
        widgetEmits: [],
        integrationHints: [
          "Opcional: analytics o registro de que el usuario entró al flujo (sin evento adicional del widget en este paso, salvo `flow_ready` ya emitido).",
        ],
      },
      apps: {
        title: "2. Números de app",
        summary:
          "Captura número anterior y nuevo (E.164) con país; validación básica en cliente.",
        whereInProcess:
          "Paso «apps» del widget: el usuario está completando el formulario de número de app anterior y nuevo (con país); es la primera captura de datos del trámite.",
        userFacing: [
          "Indica país y número de app anterior y nuevo.",
          "El botón «Continuar» solo habilita con formato válido y números distintos.",
        ],
        widgetEmits: [
          {
            type: "apps_submitted",
            when: "Al enviar el formulario de números (antes de abrir Mati).",
          },
          {
            type: "verification_started",
            when:
              "Inmediatamente después de `apps_submitted` (inicio del trámite de verificación en sentido amplio).",
          },
        ],
        integrationHints: [
          "Aquí o justo **antes** de permitir avanzar a Mati, el backend puede **validar** números (existencia, perfil previo, política de 2 meses).",
          "Si la validación falla, el padre envía `postMessage` con `source: \"punto-pago-cambio-perfil-host\"`, `type: \"flow_error\"` y `errorCode` (ver catálogo de errores) y opcionalmente `step: \"apps\"`.",
        ],
      },
      metamap: {
        title: "3. Verificación Mati (SDK)",
        summary:
          "El usuario completa documento + selfie en el flujo Mati embebido; requiere `identityId` válido.",
        whereInProcess:
          "Paso «metamap» del widget: ya envió los números; ahora está en la pantalla de verificación de identidad (resumen de números + botón que abre el SDK Mati / MetaMap).",
        userFacing: [
          "Confirma los números mostrados y abre la verificación con el botón Mati.",
          "Puede volver a editar números si lo necesita.",
        ],
        widgetEmits: [
          {
            type: "metamap_started",
            when: "Cuando el usuario inicia el SDK (primer contacto con el modal Mati).",
          },
          {
            type: "metamap_back_to_apps",
            when: "Si pulsa «Volver y editar números».",
          },
        ],
        integrationHints: [
          "El **primer `identityId`** debe venir de **vuestro backend** (creación en Mati) y llegar al iframe por query o entorno de pruebas.",
          "Tras `metamap_started`, podéis correlacionar sesión en backend si lo necesitáis.",
        ],
      },
      "metamap-done": {
        title: "4. Fin de Mati → análisis",
        summary:
          "Al cerrar Mati con éxito, el widget envía los IDs de verificación y pasa a la pantalla de espera.",
        whereInProcess:
          "Momento inmediatamente posterior a cerrar Mati con éxito: el widget ya emitió `metamap_verification_submitted` con `verificationId` e `identityId` y entra en la transición hacia la pantalla de análisis.",
        userFacing: [
          "Tras completar Mati, ve la pantalla de «analizando» con barra de progreso (en demo ~60 s).",
        ],
        widgetEmits: [
          {
            type: "metamap_verification_submitted",
            when:
              "Al terminar Mati con `verificationId` e `identityId` — **punto principal para backend**.",
          },
          {
            type: "migration_analysis_started",
            when:
              "Justo después, con `estimatedDurationMs` y los mismos identificadores.",
          },
        ],
        integrationHints: [
          "**Consulta / escritura principal:** validar `oldPhoneE164`, cruzar con Mati, registrar migración, disparar jobs, etc.",
          "En producción podéis sustituir el temporizador de la UI por respuesta real del backend y cerrar antes con otros eventos si definís protocolo.",
        ],
      },
      analyzing: {
        title: "5. Análisis en pantalla",
        summary:
          "Espera mientras el padre procesa (hoy la UI usa un temporizador de demostración).",
        whereInProcess:
          "Paso «analyzing» del widget: el usuario ve la espera (mensaje, barra de progreso, no cerrar ventana). En producción esa espera debe reflejar lo que hace vuestro backend con los IDs y la migración.",
        userFacing: [
          "Ve el mensaje de no cerrar la ventana y la barra de progreso.",
        ],
        widgetEmits: [],
        integrationHints: [
          "Mientras la UI muestra análisis, el backend puede **consultar estado** de Mati, actualizar cuenta, notificar otros sistemas, etc.",
          "Si el resultado es negativo, podéis enviar `flow_error` al iframe antes de que termine el tiempo de demo (si implementáis escucha adicional o siguiente pantalla).",
        ],
      },
      done: {
        title: "6. Completado",
        summary:
          "Confirmación al usuario; el padre recibe el cierre del flujo en la demo.",
        whereInProcess:
          "Paso final «done» del widget: el usuario ve la confirmación de éxito y el resumen de números migrados; el flujo en la UI llegó a su cierre (en paralelo el padre recibe los últimos eventos).",
        userFacing: [
          "Mensaje de éxito y resumen de números migrados.",
        ],
        widgetEmits: [
          {
            type: "metamap_finished",
            when:
              "Al finalizar la fase de análisis en la UI (en la demo, al cumplirse el temporizador).",
          },
          {
            type: "verification_succeeded",
            when: "En el mismo instante que `metamap_finished` en la demo.",
          },
          {
            type: "migration_analysis_complete",
            when:
              "Payload con `outcome` (p. ej. `\"success\"`) — alinear con resultado real del backend en producción.",
          },
        ],
        integrationHints: [
          "Actualizar estado en app nativa / web padre, cerrar modal, refrescar perfil, etc.",
        ],
      },
    },
  },
  backendDoc: {
    title: "Integración backend del cambio de perfil (MetaMap / Mati)",
    intro:
      "Aquí se describe el **contrato** entre el **iframe del widget**, la **app contenedora** y vuestro **backend**: qué validar en cuanto el usuario confirma los números, cómo obtener y exponer **identityId** antes del SDK, qué mensaje esperar al cerrar Mati y cómo **confirmar** la verificación en servidor antes de cerrar el trámite. En los ejemplos, lo resaltado marca datos que no deben improvisarse en producción.",
    backGuia: "← Índice de la guía",
    backFlow: "← Volver al flujo",
    handoffTitle: "Qué compartir para que otro equipo desarrolle el proyecto aparte",
    handoffBody:
      "Como mínimo: **acceso al repositorio Git** (o copia acordada con historial); **Node.js** acorde al proyecto y comandos **`npm install`**, **`npm run dev`**, **`npm run build`**; **URL base desplegada** del widget (donde vive **`/embed`**) en staging y producción; variables públicas de build **`NEXT_PUBLIC_METAMAP_CLIENT_ID`** y **`NEXT_PUBLIC_METAMAP_FLOW_ID`** (sustituir los valores por defecto por los de **vuestra** cuenta MetaMap); opcional **`NEXT_PUBLIC_METAMAP_IDENTITY_ID`** solo para demos locales; **secretos de API Mati en servidor** (nunca en el cliente ni en el repo) para crear **`identityId`**; y acuerdo de **orígenes** si personalizáis quién puede enviar `flow_error` al iframe (ver **`embed-security.ts`**). Documentá también quién opera el **despliegue** (p. ej. Vercel) y las **URLs exactas** que el banco incrustará.",
    uiTitle: "HTML, diseño visual y cómo ajustarlo junto al backend",
    uiBody:
      "El **marcado y los estilos** del flujo (botones, tipografía, colores, pasos) están en **este** proyecto Next.js: componentes en **`src/components`**, estilos globales y Tailwind. Si integráis solo un **`<iframe>`** hacia **`/embed`**, el aspecto **dentro** del marco lo controla el despliegue del widget; la app madre puede dar **ancho, alto, sombras y márgenes** alrededor, pero **no** puede aplicar CSS “de afuera” al contenido del iframe por **misma política de origen**. Para alinear marca (colores Punto Pago, textos, breakpoints), hace falta que alguien con **frontend** clone o bifurque **este repo** y adapte componentes o tokens. El equipo de **backend** suele encargarse del **HTML del contenedor** en su portal, la **URL del iframe** con query (`identityId`, `label`, etc.) y la **lógica** que escucha `postMessage`; el **diseño interior** del trámite se ajusta en el código del widget.",
    codeHostIframeTitle: "HTML mínimo en la app padre (contenedor del iframe)",
    codeHostIframe: `<!-- Sustituí el host y los query params según vuestro backend -->
<iframe
  [[HL]]title[[/HL]]="Cambio de perfil Punto Pago"
  [[HL]]src[[/HL]]="https://[[HL]]tu-dominio-del-widget[[/HL]]/embed?[[HL]]identityId[[/HL]]=...&[[HL]]label[[/HL]]=..."
  [[HL]]allow[[/HL]]="[[HL]]camera[[/HL]]"
  style="width:100%;max-width:28rem;min-height:640px;border:0;display:block;margin:0 auto;"
></iframe>`,
    s1Title: "1) Tras los números: validar negocio y crear o recuperar identidad en Mati",
    s1Body:
      "Al enviar el formulario de números, el iframe emite **`apps_submitted`**. Ese evento debe disparar en backend la comprobación del **número anterior** (existencia, perfil Punto Pago, políticas como el límite de un cambio cada 2 meses). Si todo es correcto, **creáis o recuperáis** la identidad en Mati y obtenéis el **identityId** que debe llegar al iframe en **`?identityId=…`** (o equivalente) **antes** de que el usuario abra el SDK. Sin ese valor, Mati no puede iniciar el flujo.",
    codePrepareTitle: "Ejemplo: identidad lista antes de fijar la URL del iframe",
    codePrepare: `// Tras validar oldPhoneE164 y reglas de negocio en servidor:
const [[HL]]identityId[[/HL]] = await mati.createOrGetIdentity({ externalId: oldPhoneE164 });
// Actualizar src del iframe (opcional ?label= para texto comercial):
// /embed?label=...&identityId=\${encodeURIComponent(identityId)}`,
    s2Title: "2) Cargar el embed con el identityId correcto por sesión",
    s2Body:
      "El widget usa el web component oficial **`mati-button`**. Los atributos **clientid** y **flowId** suelen ser fijos por entorno (build); lo que debe variar por usuario o intento es **identityId**: siempre el que devolvió Mati para la identidad ligada al **número anterior ya validado** en vuestro dominio.",
    codeIframeTitle: "HTML mínimo del botón Mati (atributos relevantes)",
    codeIframe: `<mati-button
  clientid="[[HL]]YOUR_CLIENT_ID[[/HL]]"
  flowId="[[HL]]YOUR_FLOW_ID[[/HL]]"
  [[HL]]identityId[[/HL]]="[[HL]]<hex de Mati devuelto por vuestro backend>[[/HL]]"
></mati-button>`,
    s3Title: "3) Cierre exitoso de Mati: escuchar y persistir `metamap_verification_submitted`",
    s3Body:
      "Cuando el usuario termina el SDK, el widget envía al padre **`metamap_verification_submitted`** con **verificationId**, **identityId**, ambos E.164 y datos opcionales. Es el **punto principal** para grabar la migración pendiente, correlacionar sesión y, si aplica, consultar Mati. Los mensajes posteriores (`migration_analysis_*`, `verification_succeeded`, etc.) completan la narrativa de la demo; el listado y los payloads están en **`cambio-perfil-parent-events.ts`**. En el host, conviene validar siempre **`origin`**, **`source`** y la **forma** del mensaje antes de actuar.",
    codePostMessageTitle: "Forma del mensaje (referencia; no sustituye validación en el host)",
    codePostMessage: `window.parent.postMessage({
  source: "punto-pago-cambio-perfil",
  type: "[[HL]]metamap_verification_submitted[[/HL]]",
  [[HL]]verificationId[[/HL]]: "<id de la verificación>",
  [[HL]]identityId[[/HL]]: "<id de identidad>",
  oldPhoneE164: "+507...",
  newPhoneE164: "+507...",
}, targetOrigin); // targetOrigin explícito, nunca "*" en producción`,
    s4Title: "4) Confirmar en Mati antes de dar por cerrada la migración",
    s4Body:
      "No basta con lo que muestra el navegador: con **verificationId** (y **identityId** como contexto) debéis obtener un **estado definitivo** en la API de MetaMap (REST, webhooks o ambos, según vuestra integración). Solo entonces actualizáis cuenta, números y registros internos. Si la verificación no existe, falla o no está lista, respondéis al usuario y podéis enviar **`flow_error`** al iframe para devolverlo al paso adecuado.",
    codeMatiTitle: "Ejemplo de consulta (pseudocódigo; rutas según versión de API)",
    codeMati: `const v = await matiHttp.get(
  \`/v2/identities/[[HL]]\${identityId}[[/HL]]/verifications/[[HL]]\${verificationId}[[/HL]]\`
);
if (!v || v.status === "NOT_FOUND") {
  // aún no indexada, rechazada o no encontrada — alinear con webhooks si los usáis
}`,
    noteTitle: "Errores de negocio hacia el iframe (`flow_error`)",
    noteBody:
      "Si la validación del número anterior falla **antes** de Mati, el host puede enviar al iframe `postMessage` con **`source: \"punto-pago-cambio-perfil-host\"`**, **`type: \"flow_error\"`**, un **`errorCode`** del catálogo (p. ej. **`OLD_APP_NUMBER_NOT_FOUND`**) y opcionalmente **`step`** (`\"apps\"`, `\"metamap\"`, …) para que el usuario corrija datos o reintente. Catálogo de códigos y textos: **`cambio-perfil-errors.ts`**. Tratad los mensajes del iframe como **entrada no confiable** hasta validar origen y esquema.",
  },
};
