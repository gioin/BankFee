const moment = require('moment');
const roundUpToCents = require('./roundUpToCents.js');

function sortFees(result) {
  return result.sort((a, b) => moment.utc(a.date).diff(moment.utc(b.date)))
    .map((data) => ({ ...data, fee: roundUpToCents(data.fee) }));
}

module.exports = sortFees;
