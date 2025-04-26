// import withPWA from 'next-pwa';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  // pwa: {
  //   dest: 'public',
  //   disable: process.env.NODE_ENV === 'development',
  // },
};

// export default withPWA(nextConfig);
export default nextConfig;
