import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@mpms/shared-ui'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.mpms.mp.br',
      },
    ],
  },
  output: 'standalone',
  compress: true,
  // Os aliases de import ("@/*" e "@/shared/*") sao resolvidos a partir dos
  // "paths" do tsconfig.json, lidos nativamente pelo Next.js (webpack e turbopack).
  // NAO redefinir o alias "@" aqui: isso sobrescreveria a resolucao e quebraria
  // imports internos como "@/service" e "@/components".
};

export default nextConfig;
