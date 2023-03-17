const fs = require('fs');
const path = require('path');
const cashInFee = require('./fees/cashInFee.js');
const cashOutJuridicalFee = require('./fees/cashOutJuridicalFee.js');
const cashOutNaturalFee = require('./fees/cashOutNaturalFee.js');
const parseOperations = require('./parsers/parseOperations.js');
const sortFees = require('./helpers/sortFees.js');

function main() {
  const inputFilePath = path.resolve('./input.json');
  const inputData = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));

  const parsedOperations = parseOperations(inputData.data);
  const resultCashOutNatural = cashOutNaturalFee(
    parsedOperations.cashOutNatural,
  );
  const resultCashOutJuridical = cashOutJuridicalFee(
    parsedOperations.cashOutJuridical,
  );
  const resultCalculateCashIn = cashInFee(parsedOperations.cashIn);

  const result = sortFees([
    ...resultCashOutNatural,
    ...resultCashOutJuridical,
    ...resultCalculateCashIn,
  ]);

  result.forEach((log) => {
    // eslint-disable-next-line no-console
    console.log(log.fee);
  });
}

main();
