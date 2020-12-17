const utils = require('../../../utils');

const input = utils.getInput({ splitBy: null });
const numbersFromInput = input.match(/\d+/g).map(Number);

const expectedSum = 2020;
const expectedNumbersToSum = 3;

const { sum, values } = findSumRecursively();
console.log('Sum:', sum, '\nValues', values, '\nMultiplication:', utils.multiply(values));

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

  const sum = utils.add(previousValues);

  if (sum === expectedSum) {
    return {
      sum,
      values: previousValues,
    };
  }

  return null;
}
