import { NextConfig } from 'next'

export default function withFaastSaas(nextConfig: NextConfig) {
    console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
    console.log(nextConfig);
    return nextConfig;
}
