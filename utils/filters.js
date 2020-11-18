const { format, formatISO } = require('date-fns');
const markdown = require('./markdown');

module.exports = {
  format: format,
  formatISO: formatISO,
  markdown: (content) => markdown.renderInline(content)
};
