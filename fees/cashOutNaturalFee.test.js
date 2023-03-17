const cashOutNaturalFee = require('./cashOutNaturalFee');

test('calculates cash out fees for natural users', () => {
  const data = {
    1: {
      operations: [
        {
          userType: 'natural',
          date: '2016-01-06 16:00',
          type: 'cash_out',
          amount: 30000,
          currency: 'EUR',
          weekLimit: 1000,
        },
        {
          userType: 'natural',
          date: '2016-01-07 14:00',
          type: 'cash_out',
          amount: 1000,
          currency: 'EUR',
          weekLimit: 1000,
        },
        {
          userType: 'natural',
          date: '2016-01-07 16:00',
          type: 'cash_out',
          amount: 100,
          currency: 'EUR',
          weekLimit: 1000,
        },
        {
          userType: 'natural',
          date: '2016-01-10 14:00',
          type: 'cash_out',
          amount: 100,
          currency: 'EUR',
          weekLimit: 1000,
        },
        {
          userType: 'natural',
          date: '2020-02-15',
          type: 'cash_out',
          amount: 300,
          currency: 'EUR',
          weekLimit: 1000,
        },
      ],
    },
    3: {
      operations: [{
        userType: 'natural',
        date: '2016-01-10 17:00',
        type: 'cash_out',
        amount: 1000,
        currency: 'EUR',
        weekLimit: 1000,
      }],
    },
  };
  const expected = [
    { fee: 87, date: '2016-01-06 16:00', amount: 30000 },
    { fee: 3, date: '2016-01-07 14:00', amount: 1000 },
    { fee: 0.3, date: '2016-01-07 16:00', amount: 100 },
    { fee: 0.3, date: '2016-01-10 14:00', amount: 100 },
    { fee: 0, date: '2020-02-15', amount: 300 },
    { fee: 0, date: '2016-01-10 17:00', amount: 1000 },
  ];
  expect(cashOutNaturalFee(data)).toEqual(expected);
});
