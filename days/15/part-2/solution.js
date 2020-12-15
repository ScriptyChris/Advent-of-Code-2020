const { readFileSync } = require('fs');
const { resolve } = require('path');

const input = readFileSync(resolve(__dirname, '../input.txt'), { encoding: 'utf8' }).split(',').map(Number);
console.log('input:', input);

const LOOP_LIMIT = 30000000;

const recentTurns = new Uint16Array(LOOP_LIMIT);
const previousTurns = new Uint16Array(LOOP_LIMIT);

input.forEach((number, index) => {
  recentTurns[number] = index + 1;
  previousTurns[number] = null;
});

let lastSpokenNumber = input[input.length - 1];
let previousToLastSpokenNumber = 0;

const start = new Date();
console.log('start time:', start.toLocaleTimeString(), '\n /LOOP_LIMIT:', LOOP_LIMIT);

for (let turn = input.length + 1; turn <= LOOP_LIMIT; turn++) {
  if (turn % 50000 === 0) {
    // prettier00-ignore
    process.stdout.write(`in turn: ${turn.toLocaleString('en-US')} of ${LOOP_LIMIT.toLocaleString('en-US')} \r`);
  }

  const numberSpokenInTurnLastTurn = recentTurns[lastSpokenNumber];
  const previousToLastSpokenNumberTurn = previousTurns[lastSpokenNumber];
  const wasFirstTurnForNumber = !previousTurns[lastSpokenNumber];

  if (wasFirstTurnForNumber) {
    previousToLastSpokenNumber = lastSpokenNumber;
    lastSpokenNumber = 0;

    previousTurns[lastSpokenNumber] = recentTurns[lastSpokenNumber];
    recentTurns[lastSpokenNumber] = turn;
  } else if (lastSpokenNumber === previousToLastSpokenNumber) {
    lastSpokenNumber = 1;

    previousTurns[lastSpokenNumber] = recentTurns[lastSpokenNumber];
    recentTurns[lastSpokenNumber] = turn;
  } else {
    previousToLastSpokenNumber = lastSpokenNumber;
    lastSpokenNumber = numberSpokenInTurnLastTurn - previousToLastSpokenNumberTurn;

    previousTurns[lastSpokenNumber] = recentTurns[lastSpokenNumber];
    recentTurns[lastSpokenNumber] = turn;
  }
}

const end = new Date();
console.log('end time:', end.toLocaleTimeString(), ' /diff [ms]: ', end - start);
console.log('\nlastSpokenNumber:', lastSpokenNumber);
