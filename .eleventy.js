const fs = require('fs');
const yaml = require('js-yaml');
const htmlmin = require('html-minifier');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItContainer = require('markdown-it-container');
const markdownItAttributes = require('markdown-it-attrs');

module.exports = (config) => {
  // Needed to prevent eleventy from ignoring changes to `webpack.njk`
  // since it is in our `.gitignore`
  config.setUseGitIgnore(false);

  // Allow eleventy to understand yaml files
  // mostly because we want comments support in data file.
  config.addDataExtension('yml', (contents) => yaml.safeLoad(contents));

  // Allow for customizing the built in markdown parser
  // We add more natural line breaks and anchor tag for headers
  config.setLibrary(
    'md',
    markdownIt({ html: true, breaks: true })
      .use(markdownItAnchor, {
        permalink: true
      })
      .use(markdownItContainer)
      .use(markdownItAttributes)
  );

  // Pass-through files
  config.addPassthroughCopy('src/favicon.ico');
  config.addPassthroughCopy('src/assets/images');

  // BrowserSync Overrides
  config.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        // Show 404 page without redirect to 404.html
        const fourOFour = fs.readFileSync('_site/404.html');
        browserSync.addMiddleware('*', (req, res) => {
          res.write(fourOFour);
          res.end();
        });
      }
    },
    ui: false,
    ghostMode: false
  });

  // Minify eleventy pages in production
  if (process.env.NODE_ENV === 'production') {
    config.addTransform('html-min', (content, outputPath) =>
      outputPath.endsWith('.html')
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

  return {
    dir: { input: 'src', output: '_site' },
    htmlTemplateEngine: 'njk'
  };
};
