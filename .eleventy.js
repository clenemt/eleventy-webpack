const yaml = require('js-yaml');
const htmlmin = require('html-minifier');

module.exports = (config) => {
  // Needed to prevent eleventy from ignoring changes to `webpack.njk`
  // since it is in our `.gitignore`
  config.setUseGitIgnore(false);

  // Allow eleventy to understand yaml files
  // mostly because we want comments support in data file.
  config.addDataExtension('yml', (contents) => yaml.safeLoad(contents));

  // Pass-through files
  config.addPassthroughCopy('src/robots.txt');
  config.addPassthroughCopy('src/favicon.ico');
  config.addPassthroughCopy('src/assets/images');

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
    dir: { input: 'src', output: 'dist' },
    htmlTemplateEngine: 'njk'
  };
};
