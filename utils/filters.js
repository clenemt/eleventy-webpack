const { format } = require('date-fns');

module.exports = {
  formatDate: (dateObj, dateFormat) => format(dateObj, dateFormat)
};
