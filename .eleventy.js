const fs = require('fs');
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
  // Allow for customizing the built in markdown parser
  // We add more natural line breaks and anchor tag for headers
  const markdown = markdownIt({ html: true, breaks: true })
    .use(markdownItAttributes)
    .use(markdownItAnchor);
  config.setLibrary('md', markdown);

  // Needed to prevent eleventy from ignoring changes to `webpack.njk`
  // since it is in our `.gitignore`
  config.setUseGitIgnore(false);

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
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          })
        : content
    );
  }

  // BrowserSync Overrides
  config.setBrowserSyncConfig({
    ...config.browserSyncConfig,
    // Show 404 page without redirect to 404.html
    callbacks: {
      ready: function (err, browserSync) {
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
