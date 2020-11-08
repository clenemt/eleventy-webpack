module.exports = (api) =>
  api.env('production')
    ? {
        presets: [
          [
            // Only add polyfill in production since
            // most use a recent browser when developing
            '@babel/env',
            {
              useBuiltIns: 'usage',
              corejs: { version: 3 },
              shippedProposals: true,
              bugfixes: true
            }
          ]
        ]
      }
    : {
        // Only transforms new dev syntax like optional chaining
        // or nullish coalescing
        presets: ['@babel/env']
      };
