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
              bugfixes: true,
              debug: true
            }
          ]
        ]
      }
    : {
        // Allow to debug without `__WEBPACK_IMPORTED...` weird names
        plugins: [
          ['transform-es2015-modules-commonjs-simple', { noMangle: true }]
        ],
        // Only transforms new dev syntax like optional chaining
        // or nullish coalescing
        presets: ['@babel/env']
      };
