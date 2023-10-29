const CracoAlias = require('craco-alias');

module.exports = {
 webpack: {
  configure: (config) => {
   // Add the 'crypto' polyfill
   config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
   };
   return config;
  },
 },
};