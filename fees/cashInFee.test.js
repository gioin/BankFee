const cashInFee = require('./cashInFee');
// Test calculateCashInFee
test('calculates cash in commission fee for all users', () => {
  const data = {
    1: {
      operations: [
        {
          userType: 'natural',
          date: '2016-01-05',
          type: 'cash_in',
          amount: 200,
          currency: 'EUR',
          weekLimit: 0,
        },
      ],
    },
    2: {
      operations: [
        {
          userType: 'juridical',
          date: '2016-01-10 16:00',
          type: 'cash_in',
          amount: 1000000,
          currency: 'EUR',
          weekLimit: 0,
        },
      ],
    },
  };
  const expected = [
    { fee: 0.06, date: '2016-01-05', amount: 200 },
    { fee: 5, date: '2016-01-10 16:00', amount: 1000000 },
  ];
  expect(cashInFee(data)).toEqual(expected);
});
