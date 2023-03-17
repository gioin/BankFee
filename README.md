
# Bank Fee Calculations

This is a simple Node.js command line application that calculates fees for bank transactions based on a provided JSON file. The application reads the JSON file, parses the transactions, applies the necessary fees, and outputs the final transaction fees.

## Installation

> To get started, clone the repository from GitHub and navigate to the project directory.


```bash
git clone https://github.com/gioin/BankFee.git
cd BankFee
```

Next, install the project dependencies by running the following command:

```bash
npm install
```
or
```bash
yarn install
```
## Usage

To run the application, use the following command:
```bash
node index.js
```

## Testing
The tests use Jest as the test runner and are located in the tests directory. The jest configuration is defined in the package.json file.

To run the tests, use the following command:

```bash
npm test
```
or
```bash
yarn test
```

## Functionality

The main functionality of the application is split across several functions, located in the index.js file. Each function is responsible for a specific part of the transaction processing flow.

These are core functions that handle the processing of calculations, formats, parsing, and sorting in the application:

**parseOperations()**: parseOperations takes a string of raw data containing financial transactions in a specific format and converts it into an object for each operation separately that can be easily manipulated by related functions.

Here is an example of the returned data, where each key represents a specific operation type, which itself contains the user IDs and their corresponding operations:

```js
{
  cashIn: {
    1: { operations: [Array] },
    2: { operations: [Array] },
  },
  cashOutNatural: {
    1: { operations: [Array] },
    3: { operations: [Array] },
  },
  cashOutJuridical: {
    2: { operations: [Array] },
  },
}
```

**cashOutNaturalFee()**: calculates the fee that should be charged for a natural person's cash-out transaction. The function takes into account the transaction amount and the amount of cash-outs that have already been made during the week. The fee is calculated as a percentage of the amount that exceeds a certain threshold. The function is commonly used to calculate fees for cash-out transactions made by individuals.

**cashOutJuridicalFee()**: calculates the fee that should be charged for a cash-out transaction made by a legal entity. The function takes into account the transaction amount and the percentage fee that should be charged based on that amount. The function is commonly used to calculate fees for cash-out transactions made by businesses.

**calculateCashInFee()**: calculates the fee that should be charged for a cash-in transaction. The fee is calculated as a percentage of the transaction amount, with a maximum fee amount that can be charged. The function is commonly used to calculate fees for cash-in transactions made by both individuals and businesses.

**roundUpToCents()**: roundUpToCents function takes a numerical value and rounds it up to the nearest cent. The function is commonly used to ensure that financial transactions are rounded up to the nearest cent for accuracy and consistency. The function uses the built-in Math.ceil function to round up the value.

**sortFees()**: function takes an array of objects, each representing a financial transaction, and sorts them by their date in ascending order. The function is commonly used to ensure that transactions are processed in the correct order based on when they occurred.