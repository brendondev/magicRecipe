/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
        port: '', 
        pathname: '/**', 
      },
    ],
  },
};

module.exports = nextConfig;
