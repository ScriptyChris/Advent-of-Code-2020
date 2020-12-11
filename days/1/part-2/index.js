const { resolve } = require('path');
const { readFileSync } = require('fs');

const input = readFileSync(resolve(__dirname, '../part-1/input.txt' /*'./input.txt'*/), { encoding: 'utf8' });
const numbersFromInput = /*[5, 10, 1995, 20, 10]*/ input.match(/\d+/g).map(Number);
console.log('numbersFromInput', numbersFromInput);

const expectedSum = 2020;
const expectedNumbersToSum = 2;

debugger;

const { sum, values } = loop(0, []);
const multiplication = values.reduce((multiplication, v) => multiplication * v, 1);

console.log('Sum:', sum, ' /Multiplication:', multiplication);

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
        console.log('found', sum);
        return {
          sum,
          values: [...previousValues, currentValue],
        };
      }
    }
  }
}
