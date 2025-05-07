// next.config.js
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      encoding: false,
    }
    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
