import { cookies } from "next/headers";
import { parseLocale } from "@/i18n/parse-locale";
import { LOCALE_COOKIE } from "@/i18n/types";

export { parseLocale } from "@/i18n/parse-locale";

export async function getLocale() {
  const c = (await cookies()).get(LOCALE_COOKIE)?.value;
  return parseLocale(c ?? undefined);
}
