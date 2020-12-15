const { readFileSync } = require('fs');
const { resolve } = require('path');

const input = /*[0, 3, 6];*/ readFileSync(resolve(__dirname, '../input.txt'), { encoding: 'utf8' })
  .split(',')
  .map(Number);
console.log('input:', input);

const turnsOfSpokenNumbers = {};

input.forEach((number, index) => (turnsOfSpokenNumbers[number] = [index + 1, null]));
const numbersSpokenInitialKeys = Object.keys(turnsOfSpokenNumbers);

let lastSpokenNumber = input[input.length - 1];
let previousToLastSpokenNumber = 0;
const LOOP_LIMIT = /*10;*/ 2020; /*99999*/ /*30000000*/

const start = new Date();
console.log(
  'start time:',
  start.toLocaleTimeString(),
  '\n /numbersSpokenInitialKeys.length:',
  numbersSpokenInitialKeys.length,
  '\n /LOOP_LIMIT:',
  LOOP_LIMIT,
  '\n /numbersSpoken:',
  turnsOfSpokenNumbers
);

for (let turn = numbersSpokenInitialKeys.length + 1; turn <= LOOP_LIMIT; turn++) {
  debugger;
  // process.stdout.write(
  //   `lastSpokenNumber: ${lastSpokenNumber} in turn: ${turn.toLocaleString('en-US')} of ${LOOP_LIMIT.toLocaleString(
  //     'en-US'
  //   )} \r`
  // );

  const turnsPerNumber = turnsOfSpokenNumbers[lastSpokenNumber];
  const [numberSpokenInTurnLastTurn, previousToLastSpokenNumberTurn] = turnsPerNumber;
  const wasFirstTurnForNumber = !turnsPerNumber[1];

  // console.log(
  //   '\n turn:',
  //   turn,
  //   ' /lastSpokenNumber:',
  //   lastSpokenNumber,
  //   ' /previousToLastSpokenNumber:',
  //   previousToLastSpokenNumber,
  //   ' /turnsPerNumber:',
  //   JSON.parse(JSON.stringify(turnsPerNumber)),
  //   ' /wasFirstTurnForNumber:',
  //   wasFirstTurnForNumber,
  //   ' /turnsOfSpokenNumbers:',
  //   turnsOfSpokenNumbers
  // );

  debugger;

  if (wasFirstTurnForNumber) {
    previousToLastSpokenNumber = lastSpokenNumber;
    lastSpokenNumber = 0;

    turnsOfSpokenNumbers[lastSpokenNumber] = [turn, turnsOfSpokenNumbers[lastSpokenNumber][0]];
  } else if (lastSpokenNumber === previousToLastSpokenNumber) {
    lastSpokenNumber = 1;

    const newFirstTurn = turnsOfSpokenNumbers[lastSpokenNumber] || [];
    turnsOfSpokenNumbers[lastSpokenNumber] = [turn, newFirstTurn[0]];
    // turnsOfSpokenNumbers[lastSpokenNumber] = [null, null];
  } else {
    previousToLastSpokenNumber = lastSpokenNumber;
    lastSpokenNumber = numberSpokenInTurnLastTurn - previousToLastSpokenNumberTurn;

    const newFirstTurn = turnsOfSpokenNumbers[lastSpokenNumber] || [];
    turnsOfSpokenNumbers[lastSpokenNumber] = [turn, newFirstTurn[0]];
  }
}

const end = new Date();
console.log('end time:', end.toLocaleTimeString(), ' /diff [ms]: ', end - start);
console.log('\nlastSpokenNumber:', lastSpokenNumber);

// const nums = [...numbersSpoken, ...new Array(LOOP_LIMIT - numbersSpoken.length).fill(0)];
// const nums = [...numbersSpoken , ...new Uint16Array(LOOP_LIMIT).fill(0)];
// const nums = new Uint32Array([...numbersSpoken, new Array(LOOP_LIMIT - numbersSpoken.length).fill(0)]);
// const nums = new Map([...numbersSpoken, new Array(LOOP_LIMIT - numbersSpoken.length).fill(0)]);

// const LOOP_LIMIT = 10; /*2020*/ /*99999*/ /*30000000*/
// const nums = input; // [0, 3, 6];
//
// console.log('start time:', new Date().toLocaleTimeString());
//
// for (let i = 0; i < LOOP_LIMIT; i++) {
//   let num = nums[i];
//
//   process.stdout.write(`i: ${i} of ${LOOP_LIMIT} \r`);
//
//   if (num === undefined) {
//     const lastSpokenNumber = nums[i - 1];
//     const previousToLastSpokenNumber = nums[i - 2];
//
//     const turnOfLastSpokenNum = nums.lastIndexOf(lastSpokenNumber) + 1;
//     const isFirstTurnForNum = nums.indexOf(lastSpokenNumber) === nums.lastIndexOf(lastSpokenNumber);
//     const turnOfPreviousToLastNum = nums.lastIndexOf(lastSpokenNumber, nums.lastIndexOf(lastSpokenNumber) - 1) + 1;
//
//     if (isFirstTurnForNum) {
//       num = 0;
//     } else if (previousToLastSpokenNumber === lastSpokenNumber) {
//       num = 1;
//     } else {
//       num = turnOfLastSpokenNum - turnOfPreviousToLastNum;
//     }
//
//     nums.push(num);
//   }
// }
//
// console.log('last num:', nums[nums.length - 1]);
