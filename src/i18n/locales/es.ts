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
      "Indica el número de app con el prefijo elegido (6–15 dígitos).",
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
    metamapConfigTitle: "Configuración de verificación",
    metamapConfigBody:
      "Falta el **identityId** de Mati. El sistema que incrusta esta página debe crear la identidad en Mati y pasarla en la URL del embed (por ejemplo `?identityId=…`) o definir `NEXT_PUBLIC_METAMAP_IDENTITY_ID` solo en entornos de prueba.",
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
    countryAria: (label: string) => `País o prefijo para ${label}`,
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
      stepN: (n: number) => `Paso ${n}`,
      backendCardTitle: "Integración backend · Mati / MetaMap",
      backendCardDesc:
        "HTML, postMessage y ejemplo de correlación con la API de verificaciones usando **identityId** y **verificationId**.",
      backendCardCta: "Abrir documentación técnica",
    },
    pasoShell: {
      index: "← Índice de la guía",
      flow: "← Volver al flujo de verificación",
      kicker: "Guía del proceso",
    },
    pasoBody: {
      userFacing: "En la app",
      postMessage: "Widget → padre (`postMessage`)",
      backend: "Backend / padre — cuándo consultar o actuar",
    },
    steps: {
      overview: {
        title: "Vista general",
        summary:
          "El widget vive en un iframe; el padre (app Punto Pago) escucha mensajes y orquesta identidad Mati, validaciones y migración en servidor.",
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
    title: "Integración backend: número viejo, identityId y MetaMap",
    intro:
      "Esta página resume lo que debe implementar el equipo de **backend** antes de que el widget Mati (MetaMap) pueda concluir si existe una verificación válida. Las zonas resaltadas en los ejemplos son las piezas críticas.",
    backGuia: "← Índice de la guía",
    backFlow: "← Volver al flujo",
    s1Title: "1) Validar el número de app anterior y resolver identityId",
    s1Body:
      "Cuando el usuario envía los números (`apps_submitted`), vuestro backend debe comprobar que el **número anterior** existe, tiene perfil y cumple políticas. Si todo es correcto, **creáis o recuperáis** una identidad en Mati y obtenéis el **identityId** que luego pasáis al iframe (`?identityId=…`). Sin ese ID, el SDK de Mati no puede abrir el flujo.",
    codePrepareTitle: "Ejemplo (Node / TypeScript): preparar identidad antes del iframe",
    codePrepare: `// Tras validar oldPhoneE164 en vuestro dominio:
const [[HL]]identityId[[/HL]] = await mati.createOrGetIdentity({ externalId: oldPhoneE164 });
// Redirigir / actualizar src del iframe:
// /embed?label=...&identityId=\${encodeURIComponent(identityId)}`,
    s2Title: "2) Cargar el embed con identityId",
    s2Body:
      "El componente `mati-button` del SDK usa **clientid**, **flowId** y **identityId**. El **identityId** debe ser el de la identidad asociada al usuario / al número viejo validado.",
    codeIframeTitle: "HTML mínimo del botón Mati (atributos relevantes)",
    codeIframe: `<mati-button
  clientid="[[HL]]YOUR_CLIENT_ID[[/HL]]"
  flowId="[[HL]]YOUR_FLOW_ID[[/HL]]"
  [[HL]]identityId[[/HL]]="[[HL]]<hex de Mati devuelto por vuestro backend>[[/HL]]"
></mati-button>`,
    s3Title: "3) Escuchar el cierre de Mati en el padre",
    s3Body:
      "El widget emite `metamap_verification_submitted` al padre con **verificationId** e **identityId**. Ese es el momento en que el backend debe **persistir** la correlación número viejo → verificación y consultar a Mati si hace falta.",
    codePostMessageTitle: "postMessage desde el iframe (referencia)",
    codePostMessage: `window.parent.postMessage({
  source: "punto-pago-cambio-perfil",
  type: "[[HL]]metamap_verification_submitted[[/HL]]",
  [[HL]]verificationId[[/HL]]: "<id de la verificación>",
  [[HL]]identityId[[/HL]]: "<id de identidad>",
  oldPhoneE164: "+507...",
  newPhoneE164: "+507...",
}, targetOrigin);`,
    s4Title: "4) Comprobar en Mati si la verificación existe",
    s4Body:
      "Con **verificationId** (y opcionalmente **identityId**) llamáis a la API de MetaMap / Mati (según vuestra versión del producto: REST v2, webhooks, etc.). Si la verificación existe y está en estado esperado, podéis concluir el flujo; si no, respondéis con error al usuario o enviáis `flow_error` al iframe.",
    codeMatiTitle: "Ejemplo de consulta (pseudocódigo)",
    codeMati: `const v = await matiHttp.get(
  \`/v2/identities/[[HL]]\${identityId}[[/HL]]/verifications/[[HL]]\${verificationId}[[/HL]]\`
);
if (!v || v.status === "NOT_FOUND") {
  // no existe o aún no está disponible
}`,
    noteTitle: "Errores hacia el iframe",
    noteBody:
      "Si la validación del número viejo falla antes de Mati, el padre puede enviar `postMessage` con `source: \"punto-pago-cambio-perfil-host\"`, `type: \"flow_error\"`, `errorCode` (p. ej. `OLD_APP_NUMBER_NOT_FOUND`) y `step: \"apps\"`. Ver `cambio-perfil-errors.ts`.",
  },
};
