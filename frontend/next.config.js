/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// next.config.js
module.exports = {
  async rewrites() {
      return [
        {
          source: 'http://127.0.0.1:3000/',
          destination: 'https://127.0.0.1:5000/',
        },
      ]
    },
};

module.exports = nextConfig
