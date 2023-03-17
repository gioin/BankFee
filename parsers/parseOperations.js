const feeConfig = require('../config/feeConfig.js');

function parseOperations(operations) {
  const userOperations = {
    cashIn: {},
    cashOutNatural: {},
    cashOutJuridical: {},
  };
  let currency;

  operations.forEach((operation) => {
    const { type } = operation;

    if (type === 'cash_in') {
      currency = feeConfig.cashIn.max.currency;
    } if (type === 'cash_out' && operation.user_type === 'natural') {
      currency = feeConfig.cashOut.natural.week_limit.currency;
    } if (type === 'cash_out' && operation.user_type === 'juridical') {
      currency = feeConfig.cashOut.juridical.min.currency;
    }

    const userOperation = {
      userType: operation.user_type,
      date: operation.date,
      type: operation.type,
      amount: operation.operation.amount,
      currency,
      weekLimit:
        operation.user_type === 'natural' && type === 'cash_out'
          ? feeConfig.cashOut.natural.week_limit.amount
          : 0,
    };

    switch (operation.type) {
      case 'cash_in':
        if (userOperations.cashIn[operation.user_id] === undefined) {
          userOperations.cashIn[operation.user_id] = {
            operations: [userOperation],
          };
        } else {
          userOperations.cashIn[operation.user_id].operations.push(userOperation);
        }
        break;
      case 'cash_out':
        if (operation.user_type === 'juridical') {
          if (userOperations.cashOutJuridical[operation.user_id] === undefined) {
            userOperations.cashOutJuridical[operation.user_id] = {
              operations: [userOperation],
            };
          } else {
            userOperations.cashOutJuridical[operation.user_id].operations.push(userOperation);
          }
        } else if (operation.user_type === 'natural') {
          if (userOperations.cashOutNatural[operation.user_id] === undefined) {
            userOperations.cashOutNatural[operation.user_id] = {
              operations: [userOperation],
            };
          } else {
            userOperations.cashOutNatural[operation.user_id].operations.push(userOperation);
          }
        }
        break;
      default:
    }
  });

  return userOperations;
}

module.exports = parseOperations;
