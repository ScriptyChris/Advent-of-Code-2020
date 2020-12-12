const { resolve } = require('path');
const { readFileSync } = require('fs');

const input = readFileSync(resolve(__dirname, './input.txt'), { encoding: 'utf8' });
const numbersFromInput = input.match(/\d+/g).map(Number);

const expectedSum = 2020;
const expectedNumbersToSum = 3;

const { sum, values } = findSumRecursively();
console.log('Sum:', sum, '\nValues', values, '\nMultiplication:', multiply(values));

function findSumRecursively(upperIndex = 0, previousValues = [], depth = 0) {
  if (depth < expectedNumbersToSum) {
    for (let i = upperIndex; i < numbersFromInput.length; i++) {
      const currentValue = numbersFromInput[i];
      previousValues[upperIndex] = currentValue;

      const result = findSumRecursively(upperIndex + 1, previousValues, depth + 1);

      if (result) {
        return result;
      }
    }
  }

  const sum = previousValues.reduce(doSum, 0);

  if (sum === expectedSum) {
    return {
      sum,
      values: previousValues,
    };
  }

  return null;
}

function doSum(total, value) {
  return total + value;
}

function multiply(values) {
  return values.reduce((multiplication, v) => multiplication * v, 1);
}
