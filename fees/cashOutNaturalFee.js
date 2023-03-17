import moment from 'moment';
import feeConfig from '../config/feeConfig.js';

function cashOutNaturalFee(data) {
  const result = [];
  const { week_limit: weekLimit, percents } = feeConfig.cashOut.natural;

  const keys = Object.keys(data);
  const numKeys = keys.length;

  for (let i = 0; i < numKeys; i += 1) {
    const { operations } = data[keys[i]];
    const numOperations = operations.length;

    operations.forEach((operation, index) => {
      const currentOperation = operation;
      const isFirstOperation = index === 0;
      const nextOperation = operations[index + 1];
      const isLastOperation = index === numOperations - 1;
      const isAmountGreaterThanLimit = operation.amount > weekLimit.amount;
      const hasLimitExceeded = operation.weekLimit < 0;
      const isSameWeekAsNext = moment(operation.date).isSame(
        nextOperation?.date,
        'week',
      );
      if (!isLastOperation) {
        if (isSameWeekAsNext) {
          if (isAmountGreaterThanLimit) {
            currentOperation.weekLimit -= operation.amount;
            nextOperation.weekLimit = 0;
          } else if (hasLimitExceeded) {
            nextOperation.weekLimit = 0;
          } else {
            if (isFirstOperation) {
              currentOperation.weekLimit -= operation.amount;
            }
            nextOperation.weekLimit = operation.weekLimit - nextOperation.amount;
          }
        } else {
          nextOperation.weekLimit -= nextOperation.amount;
        }
      }

      let fee;

      if (operation.weekLimit > 0) {
        fee = 0;
      } else if (operation.weekLimit === 0) {
        fee = operation.amount * (percents / 100);
      } else {
        fee = Math.abs(operation.weekLimit) * (percents / 100);
      }

      result.push({
        fee,
        date: operation.date,
        amount: operation.amount,
      });
    });
  }

  return result;
}

export default cashOutNaturalFee;
