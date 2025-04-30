/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    // Default locale
    defaultLocale: 'en',
    // All supported locales
    locales: ['en', 'da', 'sv'],
    // Domains for different locales (optional)
    // domains: [
    //   {
    //     domain: 'example.com',
    //     defaultLocale: 'en',
    //   },
    //   {
    //     domain: 'example.dk',
    //     defaultLocale: 'da',
    //   },
    //   {
    //     domain: 'example.se',
    //     defaultLocale: 'sv',
    //   },
    // ],
  },
}

module.exports = nextConfig 