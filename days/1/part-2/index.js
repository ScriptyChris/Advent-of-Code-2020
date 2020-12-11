const { resolve } = require('path');
const { readFileSync } = require('fs');

const input = readFileSync(resolve(__dirname, './input.txt'), { encoding: 'utf8' });
const numbersFromInput = [5, 10, 1995, 20, 10]; /*input.match(/\d+/g).map(Number);*/

const expectedSum = 2020;
const expectedNumbersToSum = 3;

debugger;

const result = loop(0, []);
console.log(
  'Sum:',
  result.sum,
  ' /Multiplication:',
  result.values.reduce((multiplication, v) => multiplication * v, 1)
);

function loop(round, previousValues) {
  // console.log('round', round);

  for (let j = round; j < numbersFromInput.length; j++) {
    let currentValue = numbersFromInput[j];

    if (round < expectedNumbersToSum) {
      previousValues[round] = currentValue;

      const result = loop(j + 1, previousValues);

      if (result) {
        return result;
      }
    } else {
      const sum = currentValue + previousValues.reduce((total, value) => total + value, 0);

      // console.log('currentValue', currentValue, '/prevs', previousValues, ' /sum', sum);

      if (sum === expectedSum) {
        return {
          sum,
          values: [...previousValues, currentValue],
        };
      }
    }
  }
}
