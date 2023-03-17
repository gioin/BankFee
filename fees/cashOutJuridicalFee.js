import feeConfig from '../config/feeConfig.js';

function cashOutJuridicalFee(data) {
  const minFee = feeConfig.cashOut.juridical.min.amount;
  const feePercents = feeConfig.cashOut.juridical.percents / 100;

  return Object.values(data).flatMap(({ operations }) => operations.map(({ date, amount }) => ({
    fee: Math.max(amount * feePercents, minFee),
    date,
    amount,
  })));
}

export default cashOutJuridicalFee;
