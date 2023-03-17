const feeConfig = require('../config/feeConfig');

function cashInFee(data) {
  const feePercents = feeConfig.cashIn.percents / 100;
  const maxFee = feeConfig.cashIn.max.amount;

  return Object.values(data).flatMap(({ operations }) => operations.map(({ date, amount }) => ({
    fee: Math.min(amount * feePercents, maxFee),
    date,
    amount,
  })));
}

module.exports = cashInFee;
