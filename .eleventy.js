const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const htmlmin = require('html-minifier');
const markdownIt = require('markdown-it');
const Image = require('@11ty/eleventy-img');
const ErrorOverlay = require('eleventy-plugin-error-overlay');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttributes = require('markdown-it-attrs');
const { format } = require('date-fns');

module.exports = (config) => {
  const manifestPath = path.resolve(__dirname, '_site/assets/manifest.json');

  const markdown = markdownIt({ html: true, breaks: true, typographer: true })
    .use(markdownItAttributes)
    .use(markdownItAnchor);

  // Allow for customizing the built in markdown parser.
  // We add more natural line breaks anchor tag for headings
  // and attribute properties
  config.setLibrary('md', markdown);

  // Allow eleventy to understand yaml files
  config.addDataExtension('yml', (contents) => yaml.safeLoad(contents));

  // Pass-through files
  config.addPassthroughCopy('src/_headers');
  config.addPassthroughCopy('src/favicon.ico');
  // Everything inside static is copied verbatim to `_site`
  config.addPassthroughCopy('src/assets/static');

  // Plugins
  // Shows error name, message, and fancy stacktrace
  config.addPlugin(ErrorOverlay);

  // Filters
  config.addFilter('readableDate', (dateObj) => format(dateObj, 'dd LLL yyyy'));
  config.addFilter('htmlDateString', (dateObj) =>
    format(dateObj, 'yyyy-LL-dd')
  );

  // Shortcodes
  config.addPairedShortcode('markdown', (content) => markdown.render(content));
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
    (name) => `<svg class="icon icon--${name}" role="img" aria-hidden="true">
    <use xlink:href="/assets/images/sprite.svg#${name}"></use>
  </svg>`
  );
  config.addNunjucksAsyncShortcode(
    'image',
    async (
      src,
      alt,
      sizes = '90vw, (min-width: 1280px) 1152px',
      lazy = true
    ) => {
      const extension = path.extname(src).slice(1).toLowerCase();
      const isFullUrl = (url) => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      };

      let stats = await Image(
        isFullUrl(src) ? src : `src/assets/images/${src}`,
        {
          widths: [1920, 1280, 640, 320],
          formats:
            extension === 'webp' ? ['webp', 'jpeg'] : ['webp', extension],
          urlPath: '/assets/images/',
          outputDir: '_site/assets/images/'
        }
      );

      const fallback = stats[extension][0];
      return `<picture>
    ${Object.values(stats)
      .map(
        (image) =>
          `<source type="image/${image[0].format}" srcset="${image
            .map((entry) => `${entry.url} ${entry.width}w`)
            .join(', ')}" sizes="${sizes}">`
      )
      .join('\n')}
    <img loading="${lazy ? 'lazy' : 'eager'}" src="${fallback.url}" width="${
        fallback.width
      }" height="${fallback.height}" alt="${alt}">
    </picture>
  `;
    }
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
    // Show 404 page on invalid urls
    callbacks: {
      ready: (err, browserSync) => {
        browserSync.addMiddleware('*', (req, res) => {
          const fourOFour = fs.readFileSync('_site/404.html');
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
