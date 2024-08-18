import createNextIntlPlugin from "next-intl/plugin";
import createFaastSaasPlugin from "@faastsaas/nextjs-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

const withNextIntl = createNextIntlPlugin();
const withFaastSaas = createFaastSaasPlugin();

export default withNextIntl(withFaastSaas(nextConfig));
