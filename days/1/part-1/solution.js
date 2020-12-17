const utils = require('../../../utils');

const input = utils.getInput({ splitBy: null });
const numbersFromInput = input.match(/\d+/g);
const numbersFromInputLen = numbersFromInput.length;

const expected = 2020;
let multiplicationResult = 0;

outerLoop: for (let i = 0; i < numbersFromInputLen; i++) {
  const left = numbersFromInput[i];

  for (let j = 0; j < numbersFromInputLen; j++) {
    const right = numbersFromInput[j];

    if (+left + +right === expected) {
      multiplicationResult = left * right;
      break outerLoop;
    }
  }
}

console.log('numbersFromInput', numbersFromInput);
console.log('multiplicationResult', multiplicationResult);
