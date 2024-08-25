import createNextIntlPlugin from "next-intl/plugin";
import createFaastSaasNextJsPlugin from "@faastsaas/core";

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

const withNextIntl = createNextIntlPlugin();
const withFaastSaas = createFaastSaasNextJsPlugin();

export default withNextIntl(withFaastSaas(nextConfig));
