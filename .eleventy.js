const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const NavigationPlugin = require('@11ty/eleventy-navigation');
const ErrorOverlayPlugin = require('eleventy-plugin-error-overlay');

const filters = require('./utils/filters');
const markdown = require('./utils/markdown');
const shortcodes = require('./utils/shortcodes');
const transforms = require('./utils/transforms');

module.exports = (config) => {
  const manifestPath = path.resolve(__dirname, '_site/assets/manifest.json');

  // Allow for customizing the built in markdown parser.
  config.setLibrary('md', markdown);

  // Allow eleventy to understand yaml files
  config.addDataExtension('yml', (contents) => yaml.safeLoad(contents));

  // Plugins
  config.addPlugin(NavigationPlugin);
  // Shows error name, message, and fancy stacktrace
  config.addPlugin(ErrorOverlayPlugin);

  // Filters
  Object.keys(filters).forEach((key) => {
    config.addFilter(key, filters[key]);
  });

  // Transforms
  Object.keys(transforms).forEach((key) => {
    config.addTransform(key, transforms[key]);
  });

  // Shortcodes
  config.addShortcode('icon', shortcodes.icon);
  config.addPairedShortcode('markdown', shortcodes.markdown);
  config.addNunjucksAsyncShortcode('image', shortcodes.image);
  config.addNunjucksAsyncShortcode('webpack', shortcodes.webpack);

  // Pass-through files
  config.addPassthroughCopy('src/_headers');
  config.addPassthroughCopy('src/favicon.ico');
  // Everything inside static is copied verbatim to `_site`
  config.addPassthroughCopy('src/assets/static');

  // BrowserSync Overrides
  config.setBrowserSyncConfig({
    ...config.browserSyncConfig,
    // Reload when manifest file changes
    files: [manifestPath],
    // Show 404 page on invalid urls
    callbacks: {
      ready: (err, browserSync) => {
        browserSync.addMiddleware('*', (req, res) => {
          const fourOFour = fs.readFileSync('_site/404.html');
          res.writeHead(404, {"Content-Type": "text/html; charset=UTF-8"});
          res.write(fourOFour);
          res.end();
        });
      }
    },
    // Speed/clean up build time
    ui: false,
    ghostMode: false
  });

  return {
    dir: { input: 'src', output: '_site', includes: 'includes', data: 'data' },
    // Allow nunjucks, markdown and 11ty files to be processed
    templateFormats: ['njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    // Allow pre-processing `.md` files with nunjucks
    // thus transforming the shortcodes
    markdownTemplateEngine: 'njk'
  };
};
