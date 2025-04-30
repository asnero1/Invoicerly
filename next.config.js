// File: /next.config.js

const nextConfig = {
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
