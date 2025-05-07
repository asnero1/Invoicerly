// File: /next.config.js

const nextConfig = {
  experimental: {
    serverActions: true, // ✅ Required for 'use server' support
  },

  async headers() {
    return [
      {
        source: '/attachments/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/octet-stream',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
