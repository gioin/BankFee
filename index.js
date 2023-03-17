import fs from 'fs';
import path from 'path';
import moment from 'moment';
import calculateCashInFee from './fees/calculateCashInFee.js';
import cashOutJuridicalFee from './fees/cashOutJuridicalFee.js';
import cashOutNaturalFee from './fees/cashOutNaturalFee.js';
import parseOperations from './parsers/parseOperations.js';
import sortFees from './helpers/sortFees.js';

moment.updateLocale('en', {
  week: {
    dow: 1,
    doy: 6,
  },
});

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
  const resultCalculateCashIn = calculateCashInFee(parsedOperations.cashIn);

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
