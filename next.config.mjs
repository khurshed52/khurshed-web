/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Project screenshots are local assets. Keep remote image loading disabled
    // unless a specific trusted host is added here in the future.
    remotePatterns: [],
  },

  experimental: {
    serverComponentsExternalPackages: [
      '@sparticuz/chromium',
      'puppeteer-core',
    ],

    outputFileTracingIncludes: {
      '/*': [
        './node_modules/@sparticuz/chromium/bin/**/*',
      ],
    },
  },
}

export default nextConfig
