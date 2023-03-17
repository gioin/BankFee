import feeConfig from '../config/feeConfig.js';

function parseOperations(operations) {
  const userOperations = {
    cashIn: {},
    cashOutNatural: {},
    cashOutJuridical: {},
  };

  operations.forEach((operation) => {
    const { type } = operation;
    const userOperation = {
      userType: operation.user_type,
      date: operation.date,
      type: operation.type,
      amount: operation.operation.amount,
      currency: () => {
        if (type === 'cash_in') {
          return feeConfig.cashIn.max.currency;
        } if (type === 'cash_out' && operation.user_type === 'natural') {
          return feeConfig.cashOut.natural.week_limit.currency;
        } if (type === 'cash_out' && operation.user_type === 'juridical') {
          return feeConfig.cashOut.juridical.min.currency;
        }
        return null;
      },
      weekLimit:
        operation.user_type === 'natural' && type === 'cash_out'
          ? feeConfig.cashOut.natural.week_limit.amount
          : null,
    };

    if (operation.type === 'cash_in') {
      if (userOperations.cashIn[operation.user_id] === undefined) {
        userOperations.cashIn[operation.user_id] = {
          operations: [userOperation],
        };
      } else {
        userOperations.cashIn[operation.user_id].operations.push(userOperation);
      }
    } else if (
      operation.type === 'cash_out'
        && operation.user_type === 'juridical'
    ) {
      if (userOperations.cashOutJuridical[operation.user_id] === undefined) {
        userOperations.cashOutJuridical[operation.user_id] = {
          operations: [userOperation],
        };
      } else {
        userOperations.cashOutJuridical[operation.user_id].operations.push(userOperation);
      }
    } else if (
      operation.type === 'cash_out'
        && operation.user_type === 'natural'
    ) {
      if (userOperations.cashOutNatural[operation.user_id] === undefined) {
        userOperations.cashOutNatural[operation.user_id] = {
          operations: [userOperation],
        };
      } else {
        userOperations.cashOutNatural[operation.user_id].operations.push(userOperation);
      }
    }
  });

  return userOperations;
}

export default parseOperations;
