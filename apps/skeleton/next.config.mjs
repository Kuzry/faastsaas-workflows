import createNextIntlPlugin from "next-intl/plugin";
// import withFaastSaas from "@faastsaas/nextjs-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true
        }
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
