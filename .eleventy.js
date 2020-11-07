const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const htmlmin = require('html-minifier');
const markdownIt = require('markdown-it');
const localImages = require('eleventy-plugin-local-images');
const ErrorOverlay = require('eleventy-plugin-error-overlay');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttributes = require('markdown-it-attrs');
const { format } = require('date-fns');
const iconsprite = require('./iconsprite');

module.exports = (config) => {
  const manifestPath = path.resolve(__dirname, '_site/assets/manifest.json');

  // Allow for customizing the built in markdown parser
  // We add more natural line breaks and anchor tag for headers
  const markdown = markdownIt({ html: true, breaks: true })
    .use(markdownItAttributes)
    .use(markdownItAnchor);
  config.setLibrary('md', markdown);

  // Allow eleventy to understand yaml files
  // mostly because we want comments support in data file.
  config.addDataExtension('yml', (contents) => yaml.safeLoad(contents));

  // Pass-through files
  config.addPassthroughCopy('src/_headers');
  config.addPassthroughCopy('src/favicon.ico');
  config.addPassthroughCopy('src/assets/images');

  // Plugins
  // Shows error name, message, and fancy stacktrace
  config.addPlugin(ErrorOverlay);
  // Grab all external images used on the site and put them locally
  config.addPlugin(localImages, {
    distPath: '_site',
    assetPath: 'assets/images/remote'
  });

  // Filters
  config.addFilter('readableDate', (dateObj) => format(dateObj, 'dd LLL yyyy'));
  config.addFilter('htmlDateString', (dateObj) =>
    format(dateObj, 'yyyy-LL-dd')
  );

  // Shortcodes
  config.addPairedShortcode('markdown', (content) => markdown.render(content));
  config.addNunjucksAsyncShortcode('iconsprite', iconsprite);
  config.addNunjucksAsyncShortcode(
    'webpack',
    (name) =>
      new Promise((resolve) => {
        fs.readFile(manifestPath, { encoding: 'utf8' }, (err, data) =>
          resolve(err ? {} : JSON.parse(data)[name])
        );
      })
  );
  config.addShortcode(
    'icon',
    (name) => `
<svg class="icon icon--${name}" role="img" aria-hidden="true" width="24" height="24">
  <use xlink:href="#icon-${name}"></use>
</svg>`
  );

  // Transforms
  // Minify eleventy pages in production
  if (process.env.NODE_ENV === 'production') {
    config.addTransform('html-min', (content, outputPath) =>
      outputPath && outputPath.endsWith('.html')
        ? htmlmin.minify(content, {
            html5: true,
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          })
        : content
    );
  }

  // Make eleventy aware of the manifest file
  config.addWatchTarget(manifestPath);

  // BrowserSync Overrides
  config.setBrowserSyncConfig({
    ...config.browserSyncConfig,
    // Show 404 page without redirect to 404.html
    callbacks: {
      ready: (err, browserSync) => {
        const fourOFour = fs.readFileSync('_site/404.html');
        browserSync.addMiddleware('*', (req, res) => {
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
    dir: { input: 'src', output: '_site' },
    htmlTemplateEngine: 'njk'
  };
};
