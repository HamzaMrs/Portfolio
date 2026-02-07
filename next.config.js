// const withPWA = require('next-pwa');

module.exports = {
  images: {
    domains: ['i.ibb.co'],
  },
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  reactStrictMode: false,
  swcMinify: true,
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
};
