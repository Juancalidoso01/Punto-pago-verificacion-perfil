import type { AppMessages } from "@/i18n/catalog";

export const ruMessages: AppMessages = {
  chrome: {
    subtitle: "Смена профиля · Перенос номера",
    business: "Business",
    mainSite: "Основной сайт",
    footerBrand: "Grupo Punto Pago",
    footerLine: "Смена профиля и перенос номера приложения.",
    footerLinkLabel: "puntopago.net",
  },
  lang: {
    label: "Язык",
    es: "ES",
    en: "EN",
    ru: "RU",
  },
  errors: {
    INVALID_NUMBER_FORMAT:
      "Укажите номер приложения с выбранным префиксом (6–15 цифр).",
    DUPLICATE_APP_NUMBERS:
      "Новый номер приложения должен отличаться от предыдущего.",
    OLD_APP_NUMBER_NOT_FOUND:
      "Мы не нашли учётную запись Punto Pago для этого прежнего номера. Проверьте номер и страну и попробуйте снова.",
    OLD_APP_NUMBER_NO_PROFILE:
      "У этого номера нет прежнего профиля Punto Pago. Перенос возможен только с номера, которым вы уже пользовались.",
    PROFILE_CHANGE_ALREADY_REGISTERED:
      "Для этого номера уже зарегистрирована смена профиля или не истёк срок между сменами (не чаще одного раза в 2 месяца). При необходимости обратитесь в поддержку.",
    genericHost:
      "Не удалось завершить шаг. Проверьте данные и попробуйте снова.",
  },
  flow: {
    noticeH1: "Смена номера приложения",
    noticeAmberTitle: "Важно: перенос данных",
    noticeAmberBody:
      "Информация и история, привязанные к **прежнему номеру приложения** Punto Pago, будут **перенесены** на **новый номер**, который вы укажете на следующем шаге. Убедитесь, что оба номера верны; здесь вы только подтверждаете и разрешаете смену профиля.",
    noticeLimitTitle: "Ограничение на смену профиля",
    noticeLimitBody:
      "**Смену профиля** (перенос номера) можно выполнить **не чаще одного раза в 2 месяца**. Используйте её, когда действительно останетесь на новом номере; частые смены не предусмотрены.",
    noticeFooter:
      "Далее вы введёте прежний и новый номера приложения и пройдёте проверку личности по действующему документу и селфи.",
    appsH1: "Номера приложений Punto Pago",
    appsIntro:
      "Данные со старого приложения переносятся на новый номер. Укажите оба номера; по умолчанию страна — Панама (+507), префикс можно сменить в каждом поле. Помните: **не чаще одной смены профиля в 2 месяца**.",
    oldFieldLabel: "Прежний номер приложения",
    oldFieldDesc: "Номер, с которым вы пользовались Punto Pago до смены.",
    newFieldLabel: "Новый номер приложения",
    newFieldDesc: "Номер, на который перенесутся профиль и данные.",
    btnBackNotice: "Назад к предупреждению",
    btnContinue: "Продолжить",
    btnUnderstood: "Понятно, продолжить",
    metamapH1: "Проверка личности",
    metamapIntro:
      "Зафиксирован перенос с **{{old}}** на **{{new}}**. Чтобы завершить смену профиля, нужно подтвердить личность: имейте при себе **действующий документ**, нажмите кнопку ниже и следуйте инструкциям (включая **селфи**).",
    metamapBack: "Назад к редактированию номеров",
    metamapConfigTitle: "Настройка проверки",
    metamapConfigBody:
      "Не указан **identityId** Mati. Система, встраивающая эту страницу, должна создать идентичность в Mati и передать её в URL (`?identityId=…`) или задать `NEXT_PUBLIC_METAMAP_IDENTITY_ID` только в тестовых средах.",
    doneH1: "Смена профиля завершена",
    doneBody:
      "Личность подтверждена, перенос между номерами зафиксирован. Можете продолжать пользоваться приложением Punto Pago с новым номером.",
    doneNumbersLabel: "Номера:",
  },
  fields: {
    phonePlaceholder: "Номер приложения",
    formatOkTitle: "Корректный формат",
    formatOkAria: "Корректный формат",
    duplicateUnderField: "Должен отличаться от прежнего номера приложения.",
    countryAriaTemplate: "Страна или префикс для {{label}}",
  },
  migration: {
    title: "Анализируем ваши данные",
    body:
      "Проверяем прежний номер {{old}} в наших системах и проверку личности, связанную с переносом на {{new}}. Это может занять до минуты.",
    progressAria: "Анализ выполняется, до {{sec}} секунд",
    dontClose: "Не закрывайте это окно",
  },
  metamapUi: {
    btn: "Подтвердить личность",
    loading: "Загрузка проверки…",
    matiAria: "Открыть проверку личности по документу и селфи",
  },
  guide: {
    teaser: {
      title: "Руководство и интеграция (отдельно от потока)",
      body:
        "Пошаговая документация на отдельных страницах: действия пользователя, события `postMessage` виджета и когда бэкенду вызывать API. Кнопка открывает оглавление; с каждой страницы можно вернуться к потоку или к оглавлению.",
      cta: "Открыть пошаговое руководство",
    },
    index: {
      backFlow: "← К потоку проверки",
      title: "Руководство по потоку",
      subtitle:
        "Выберите шаг для подробностей. На каждой странице можно вернуться к оглавлению или к основному потоку смены профиля.",
      stepGeneral: "Обзор",
      stepNLabel: "Шаг {{n}}",
      backendCardTitle: "Интеграция бэкенда · Mati / MetaMap",
      backendCardDesc:
        "HTML, postMessage и пример связи с API проверок через **identityId** и **verificationId**.",
      backendCardCta: "Открыть техническую документацию",
    },
    pasoShell: {
      index: "← К оглавлению руководства",
      flow: "← К потоку проверки",
      kicker: "Руководство по процессу",
    },
    pasoBody: {
      userFacing: "В приложении",
      postMessage: "Виджет → родитель (`postMessage`)",
      backend: "Бэкенд / родитель — когда запрашивать или действовать",
    },
    steps: {
      overview: {
        title: "Обзор",
        summary:
          "Виджет в iframe; родительское приложение Punto Pago слушает сообщения и управляет идентичностью Mati, проверками и миграцией на сервере.",
        userFacing: [
          "Пользователь проходит: предупреждение → номера → Mati → ожидание → подтверждение.",
          "Чувствительные данные также уходят родителю через `postMessage` для действий бэкенда.",
        ],
        widgetEmits: [
          {
            type: "flow_ready",
            when:
              "При монтировании виджета (iframe готов принять `identityId` и показать поток).",
          },
        ],
        integrationHints: [
          "После `flow_ready` родитель может **создать или получить** `identityId` в Mati и обновить `src` iframe с `?identityId=…`, если его ещё нет.",
          "Слушайте `postMessage` с `source === \"punto-pago-cambio-perfil\"` на всём протяжении потока.",
        ],
      },
      notice: {
        title: "1. Начальное предупреждение",
        summary: "Перенос данных между номерами и лимит одной смены раз в 2 месяца.",
        userFacing: [
          "Прочитайте предупреждение о переносе и ограничении частоты смены профиля.",
          "Нажмите «Понятно, продолжить», чтобы перейти к номерам.",
        ],
        widgetEmits: [],
        integrationHints: [
          "По желанию: аналитика или лог входа в поток (дополнительных событий виджета на этом шаге нет, кроме уже отправленного `flow_ready`).",
        ],
      },
      apps: {
        title: "2. Номера приложений",
        summary: "Предыдущий и новый номер (E.164) с выбором страны; базовая проверка на клиенте.",
        userFacing: [
          "Укажите страну и прежний и новый номера.",
          "Кнопка «Продолжить» активна только при корректном формате и разных номерах.",
        ],
        widgetEmits: [
          {
            type: "apps_submitted",
            when: "При отправке формы номеров (до открытия Mati).",
          },
          {
            type: "verification_started",
            when: "Сразу после `apps_submitted` (начало процесса проверки в широком смысле).",
          },
        ],
        integrationHints: [
          "Здесь или **до** перехода к Mati бэкенд может **проверить** номера (существование, профиль, правило 2 месяцев).",
          "При ошибке родитель шлёт `postMessage`: `source: \"punto-pago-cambio-perfil-host\"`, `type: \"flow_error\"`, `errorCode` и при необходимости `step: \"apps\"`.",
        ],
      },
      metamap: {
        title: "3. Проверка Mati (SDK)",
        summary: "Документ + селфи во встроенном потоке Mati; нужен валидный `identityId`.",
        userFacing: [
          "Проверьте отображаемые номера и откройте проверку кнопкой Mati.",
          "При необходимости можно вернуться к редактированию номеров.",
        ],
        widgetEmits: [
          {
            type: "metamap_started",
            when: "Когда пользователь запускает SDK (первый контакт с модальным окном Mati).",
          },
          {
            type: "metamap_back_to_apps",
            when: "При нажатии «Назад к редактированию номеров».",
          },
        ],
        integrationHints: [
          "**Первый `identityId`** должен прийти из **вашего бэкенда** (создание в Mati) и попасть в iframe через query или тестовую конфигурацию.",
          "После `metamap_started` при необходимости коррелируйте сессию на сервере.",
        ],
      },
      "metamap-done": {
        title: "4. Завершение Mati → анализ",
        summary:
          "После успешного Mati виджет отправляет ID проверки и показывает экран ожидания.",
        userFacing: [
          "После Mati отображается экран «анализ» с полосой прогресса (в демо ~60 с).",
        ],
        widgetEmits: [
          {
            type: "metamap_verification_submitted",
            when:
              "По завершении Mati с `verificationId` и `identityId` — **основная точка для бэкенда**.",
          },
          {
            type: "migration_analysis_started",
            when: "Сразу после, с `estimatedDurationMs` и теми же идентификаторами.",
          },
        ],
        integrationHints: [
          "**Основная работа:** проверить `oldPhoneE164`, сопоставить с Mati, записать миграцию, запустить задачи и т.д.",
          "В продакшене можно заменить таймер UI реальным ответом бэкенда.",
        ],
      },
      analyzing: {
        title: "5. Анализ на экране",
        summary: "Ожидание обработки родителем (сейчас в UI используется демо-таймер).",
        userFacing: ["Сообщение не закрывать окно и индикатор прогресса."],
        widgetEmits: [],
        integrationHints: [
          "Пока показывается анализ, бэкенд может **опрашивать статус** Mati, обновлять учётную запись, уведомлять другие системы.",
          "При отрицательном результате можно отправить `flow_error` в iframe до конца демо-таймера.",
        ],
      },
      done: {
        title: "6. Завершено",
        summary: "Подтверждение пользователю; родитель получает завершение потока в демо.",
        userFacing: ["Сообщение об успехе и сводка по номерам."],
        widgetEmits: [
          {
            type: "metamap_finished",
            when: "Когда фаза анализа в UI завершается (в демо — по таймеру).",
          },
          {
            type: "verification_succeeded",
            when: "Одновременно с `metamap_finished` в демо.",
          },
          {
            type: "migration_analysis_complete",
            when:
              "Полезная нагрузка с `outcome` (например `\"success\"`) — согласуйте с реальным результатом бэкенда.",
          },
        ],
        integrationHints: [
          "Обновить состояние в родительском приложении, закрыть модальное окно, обновить профиль и т.д.",
        ],
      },
    },
  },
  backendDoc: {
    title: "Интеграция бэкенда: старый номер, identityId и MetaMap",
    intro:
      "Кратко о том, что должен реализовать **бэкенд**, прежде чем виджет Mati (MetaMap) сможет установить, существует ли валидная проверка. В примерах подсвечены критичные места интеграции.",
    backGuia: "← К оглавлению руководства",
    backFlow: "← К потоку",
    s1Title: "1) Проверка прежнего номера приложения и получение identityId",
    s1Body:
      "После отправки номеров (`apps_submitted`) бэкенд должен убедиться, что **прежний номер** существует, есть профиль и выполняются правила. При успехе **создайте или получите** идентичность в Mati и передайте **identityId** в iframe (`?identityId=…`). Без него SDK Mati не откроется.",
    codePrepareTitle: "Пример (Node / TypeScript): подготовка идентичности до iframe",
    codePrepare: `// После проверки oldPhoneE164 в вашем домене:
const [[HL]]identityId[[/HL]] = await mati.createOrGetIdentity({ externalId: oldPhoneE164 });
// Редирект / обновление src iframe:
// /embed?label=...&identityId=\${encodeURIComponent(identityId)}`,
    s2Title: "2) Загрузка embed с identityId",
    s2Body:
      "Компонент `mati-button` использует **clientid**, **flowId** и **identityId**. **identityId** должен соответствовать идентичности пользователя / проверенному старому номеру.",
    codeIframeTitle: "Минимальный HTML кнопки Mati (важные атрибуты)",
    codeIframe: `<mati-button
  clientid="[[HL]]YOUR_CLIENT_ID[[/HL]]"
  flowId="[[HL]]YOUR_FLOW_ID[[/HL]]"
  [[HL]]identityId[[/HL]]="[[HL]]<hex от вашего бэкенда>[[/HL]]"
></mati-button>`,
    s3Title: "3) Ожидание завершения Mati в родителе",
    s3Body:
      "Виджет шлёт родителю `metamap_verification_submitted` с **verificationId** и **identityId**. В этот момент бэкенд должен **сохранить** связь старый номер → проверка и при необходимости запросить Mati.",
    codePostMessageTitle: "postMessage из iframe (справка)",
    codePostMessage: `window.parent.postMessage({
  source: "punto-pago-cambio-perfil",
  type: "[[HL]]metamap_verification_submitted[[/HL]]",
  [[HL]]verificationId[[/HL]]: "<id проверки>",
  [[HL]]identityId[[/HL]]: "<id идентичности>",
  oldPhoneE164: "+507...",
  newPhoneE164: "+507...",
}, targetOrigin);`,
    s4Title: "4) Проверка в Mati, существует ли verification",
    s4Body:
      "С **verificationId** (и при необходимости **identityId**) вызывайте API MetaMap / Mati (REST v2, вебхуки и т.д.). Если проверка есть и в ожидаемом состоянии — завершаете поток; иначе ошибка пользователю или `flow_error` в iframe.",
    codeMatiTitle: "Пример запроса (псевдокод)",
    codeMati: `const v = await matiHttp.get(
  \`/v2/identities/[[HL]]\${identityId}[[/HL]]/verifications/[[HL]]\${verificationId}[[/HL]]\`
);
if (!v || v.status === "NOT_FOUND") {
  // нет или ещё не готово
}`,
    noteTitle: "Ошибки в iframe",
    noteBody:
      "Если проверка старого номера не прошла до Mati, родитель может отправить `postMessage`: `source: \"punto-pago-cambio-perfil-host\"`, `type: \"flow_error\"`, `errorCode` (например `OLD_APP_NUMBER_NOT_FOUND`) и `step: \"apps\"`. См. `cambio-perfil-errors.ts`.",
  },
};
