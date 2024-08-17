import createNextIntlPlugin from "next-intl/plugin";

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
