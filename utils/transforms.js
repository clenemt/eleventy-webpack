const htmlminifier = require('html-minifier');

module.exports = {
  htmlmin: (content, outputPath) =>
    process.env.NODE_ENV === 'production' &&
    outputPath &&
    outputPath.endsWith('.html')
      ? htmlminifier.minify(content, {
          html5: true,
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        })
      : content
};
