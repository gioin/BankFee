const parseOperations = require('./parseOperations');

describe('distributes data for corresponding operation', () => {
  test('it should parse operations into userOperations object', () => {
    const operations = [
      {
        date: '2016-01-05',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_in',
        operation: { amount: 200, currency: 'EUR' },
      },
      {
        date: '2016-01-06 14:00',
        user_id: 2,
        user_type: 'juridical',
        type: 'cash_out',
        operation: { amount: 300, currency: 'EUR' },
      },
      {
        date: '2016-01-06 16:00',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 30000, currency: 'EUR' },
      },
      {
        date: '2016-01-07 14:00',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 1000, currency: 'EUR' },
      },
      {
        date: '2016-01-07 16:00',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 100, currency: 'EUR' },
      },
      {
        date: '2016-01-10 14:00',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 100, currency: 'EUR' },
      },
      {
        date: '2016-01-10 16:00',
        user_id: 2,
        user_type: 'juridical',
        type: 'cash_in',
        operation: { amount: 1000000, currency: 'EUR' },
      },
      {
        date: '2016-01-10 17:00',
        user_id: 3,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 1000, currency: 'EUR' },
      },
      {
        date: '2020-02-15',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 300, currency: 'EUR' },
      },
    ];
    const userOperations = parseOperations(operations);
    expect(userOperations).toEqual({
      cashIn: {
        1: {
          operations: [{
            userType: 'natural',
            date: '2016-01-05',
            type: 'cash_in',
            amount: 200,
            currency: 'EUR',
            weekLimit: 0,
          }],
        },
        2: {
          operations: [{
            userType: 'juridical',
            date: '2016-01-10 16:00',
            type: 'cash_in',
            amount: 1000000,
            currency: 'EUR',
            weekLimit: 0,
          }],
        },
      },
      cashOutNatural: {
        1: {
          operations: [{
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
          }],
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
      },
      cashOutJuridical: {
        2: {
          operations: [{
            userType: 'juridical',
            date: '2016-01-06 14:00',
            type: 'cash_out',
            amount: 300,
            currency: 'EUR',
            weekLimit: 0,
          }],
        },
      },
    });
  });
});
