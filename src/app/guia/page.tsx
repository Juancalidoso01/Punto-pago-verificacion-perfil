import { GuiaIndex } from "@/components/guia-index";
import { PpAppChrome } from "@/components/pp-app-chrome";

export default function GuiaPage() {
  return (
    <PpAppChrome>
      <div className="mx-auto max-w-lg pb-16 sm:max-w-xl">
        <GuiaIndex basePath="/guia" flowHref="/" querySuffix="" />
      </div>
    </PpAppChrome>
  );
}
