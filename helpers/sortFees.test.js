const sortedFees = require('./sortFees');

describe('sorting based on date', () => {
  test('it should sort fees in descending order', () => {
    const fees = [
      { fee: 87, date: '2016-01-06 16:00', amount: 30000 },
      { fee: 3, date: '2016-01-07 14:00', amount: 1000 },
      { fee: 0.3, date: '2016-01-07 16:00', amount: 100 },
      { fee: 0.3, date: '2016-01-10 14:00', amount: 100 },
      { fee: 0, date: '2020-02-15', amount: 300 },
      { fee: 0, date: '2016-01-10 17:00', amount: 1000 },
    ];
    expect(sortedFees(fees)).toEqual([
      { fee: '87.00', date: '2016-01-06 16:00', amount: 30000 },
      { fee: '3.00', date: '2016-01-07 14:00', amount: 1000 },
      { fee: '0.30', date: '2016-01-07 16:00', amount: 100 },
      { fee: '0.30', date: '2016-01-10 14:00', amount: 100 },
      { fee: '0.00', date: '2016-01-10 17:00', amount: 1000 },
      { fee: '0.00', date: '2020-02-15', amount: 300 },
    ]);
  });
});
