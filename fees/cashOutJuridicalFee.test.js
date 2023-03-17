const cashOutJuridicalFee = require('./cashOutJuridicalFee');

test('calculates cash out fees for juridical users', () => {
  const data = {
    2: {
      operations: [
        {
          userType: 'juridical',
          date: '2016-01-06 14:00',
          type: 'cash_out',
          amount: 300,
          currency: 'EUR',
          weekLimit: null,
        },
      ],
    },
  };
  const expected = [
    { fee: 0.9, date: '2016-01-06 14:00', amount: 300 },
  ];
  expect(cashOutJuridicalFee(data)).toEqual(expected);
});
