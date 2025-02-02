import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
const locales = ["en", "pl"];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound(); // eslint-disable-line @typescript-eslint/no-explicit-any

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
