const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttributes = require('markdown-it-attrs');
const markdownItBracketedSpans = require('markdown-it-bracketed-spans');

const markdown = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
})
  .use(markdownItBracketedSpans)
  .use(markdownItAttributes)
  .use(markdownItAnchor);

module.exports = markdown;
