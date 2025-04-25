// next.config.mjs
import withPWA from 'next-pwa';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
  },
};

export default withPWA(nextConfig);
