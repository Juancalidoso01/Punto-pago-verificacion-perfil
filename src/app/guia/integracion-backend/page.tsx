import { GuiaBackendIntegrationDoc } from "@/components/guia-backend-integration-doc";
import { PpAppChrome } from "@/components/pp-app-chrome";
import { getLocale } from "@/i18n/get-locale";
import { getAppMessages } from "@/i18n/messages";

export default async function GuiaBackendIntegrationPage() {
  const messages = getAppMessages(await getLocale());

  return (
    <PpAppChrome>
      <div className="mx-auto max-w-lg pb-16 sm:max-w-xl">
        <GuiaBackendIntegrationDoc
          doc={messages.backendDoc}
          indexHref="/guia"
          flowHref="/"
        />
      </div>
    </PpAppChrome>
  );
}
