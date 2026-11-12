/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.tiendaorali.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pastasorali.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
