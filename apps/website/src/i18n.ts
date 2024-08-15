import { getRequestConfig } from "next-intl/server";

export const locales = ["en"];

export default getRequestConfig(async () => {
  const locale = "en";

  return {
    locale,
    messages: (await import(`./languages/${locale}.json`)).default,
  };
});
