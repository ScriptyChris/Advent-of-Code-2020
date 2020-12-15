const { readFileSync } = require('fs');
const { resolve } = require('path');

const input = readFileSync(resolve(__dirname, '../input.txt'), { encoding: 'utf8' }).split(',').map(Number);
console.log('input:', input);

const nums = input; // [0, 3, 6];
const LOOP_LIMIT = 2020;

for (let i = 0; i < LOOP_LIMIT; i++) {
  let num = nums[i];

  //     console.log(i+1, '[bef] num', num);

  if (num === undefined) {
    debugger;

    const lastSpokenNumber = nums[i - 1];
    const previousToLastSpokenNumber = nums[i - 2];

    const turnOfLastSpokenNum = nums.lastIndexOf(lastSpokenNumber) + 1;
    const isFirstTurnForNum = nums.indexOf(lastSpokenNumber) === nums.lastIndexOf(lastSpokenNumber);
    const turnOfPreviousToLastNum = nums.lastIndexOf(lastSpokenNumber, nums.lastIndexOf(lastSpokenNumber) - 1) + 1;

    //         console.log('lastSpokenNumber:',lastSpokenNumber,' /previousToLastSpokenNumber:',previousToLastSpokenNumber,' /turnOfLastSpokenNum:',turnOfLastSpokenNum,' /turnOfPreviousToLastNum:',turnOfPreviousToLastNum, ' /isFirstTurnForNum:',isFirstTurnForNum);

    if (isFirstTurnForNum /*turnOfPreviousToLastNum === turnOfLastSpokenNum*/) {
      num = 0;
    } else if (previousToLastSpokenNumber === lastSpokenNumber) {
      num = 1;
    } else {
      num = turnOfLastSpokenNum - turnOfPreviousToLastNum;
      //num = nums[turnOfLastSpokenNum] - nums.lastIndexOf(num, -turnOfLastSpokenNum);
    }

    nums.push(num);
  }

  //     console.log(i+1, '[af] num', num, '\n');
}

console.log('nums:', nums, ' /last num:', nums[nums.length - 1]);
