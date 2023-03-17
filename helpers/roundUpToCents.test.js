const roundUpToCents = require('./roundUpToCents');

describe('rounding fees', () => {
  test('it should round up to the nearest cent', () => {
    expect(roundUpToCents(1.234)).toBe('1.24');
    expect(roundUpToCents(0.001)).toBe('0.01');
    expect(roundUpToCents(0)).toBe('0.00');
    expect(roundUpToCents(-1.234)).toBe('-1.23');
  });
});
