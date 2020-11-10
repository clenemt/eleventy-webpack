const util = require('util');
const { format } = require('date-fns');

module.exports = {
  log: (data) => console.log(`\n${util.inspect(data)}\n`),
  formatDate: (dateObj, dateFormat) => format(dateObj, dateFormat),
};
