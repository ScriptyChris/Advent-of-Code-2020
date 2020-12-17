const utils = require('../../../utils');

const input = utils.getInput({ splitBy: null }).split(',').map(Number);
console.log('input:', input);

const nums = input;
const LOOP_LIMIT = 2020;

for (let i = 0; i < LOOP_LIMIT; i++) {
  let num = nums[i];

  if (num === undefined) {
    const lastSpokenNumber = nums[i - 1];
    const previousToLastSpokenNumber = nums[i - 2];

    const turnOfLastSpokenNum = nums.lastIndexOf(lastSpokenNumber) + 1;
    const isFirstTurnForNum = nums.indexOf(lastSpokenNumber) === nums.lastIndexOf(lastSpokenNumber);
    const turnOfPreviousToLastNum = nums.lastIndexOf(lastSpokenNumber, nums.lastIndexOf(lastSpokenNumber) - 1) + 1;

    if (isFirstTurnForNum) {
      num = 0;
    } else if (previousToLastSpokenNumber === lastSpokenNumber) {
      num = 1;
    } else {
      num = turnOfLastSpokenNum - turnOfPreviousToLastNum;
    }

    nums.push(num);
  }
}

console.log('nums:', nums, ' /last num:', nums[nums.length - 1]);
