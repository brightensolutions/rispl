/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "2lf0v5shbaheqb2e.public.blob.vercel-storage.com",
      },
    ],
  },
}

module.exports = nextConfig

