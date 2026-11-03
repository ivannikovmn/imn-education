/** @type {import('next').NextConfig} */

const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL)

const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: apiUrl.protocol.replace(':', ''),
        hostname: apiUrl.hostname,
        port: apiUrl.port,
      },
    ],
  },
};

export default nextConfig;
