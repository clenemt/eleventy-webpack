const cheerio = require('cheerio');
const htmlminifier = require('html-minifier');

const shouldTransformHTML = (outputPath) =>
  outputPath &&
  outputPath.endsWith('.html') &&
  process.env.NODE_ENV === 'production';

module.exports = {
  htmlmin: (content, outputPath) =>
    shouldTransformHTML(outputPath)
      ? htmlminifier.minify(content, {
          html5: true,
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        })
      : content,

  safelink: (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      try {
        const $ = cheerio.load(content);

        $('a').each((i, link) => {
          const href = $(link).attr('href');
          if (!/https{0,1}:\/\//.test(href)) return;

          $(link).attr('rel', 'noopener noreferrer');
          $(link).attr('target', '_blank');
          $(link).replaceWith($.html(link));
        });

        return $.html();
      } catch (e) {
        console.log('Error with links', e);
      }
    }

    return content;
  }
};
