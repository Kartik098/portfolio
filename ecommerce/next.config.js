/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  experimental: {
    dynamicIO: true,
  },
}

module.exports = nextConfig
