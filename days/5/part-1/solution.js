const { readFileSync } = require('fs');
const { resolve } = require('path');

const input = readFileSync(resolve(__dirname, '../input.txt'), { encoding: 'utf8' }).split('\n');
// console.log('input', input);

// const seatCode = 'FBFBBFFRLR';

const HALF = 2;
const POSITION_MAP = Object.freeze({
  FRONT: 'F',
  BACK: 'B',
  LEFT: 'L',
  RIGHT: 'R',
});

const seatIds = input.map((seatCode) => {
  const rowRange = [0, 127];
  const columnRange = [0, 7];

  const seatPositionMap = {
    F: rowRange,
    B: rowRange,
    R: columnRange,
    L: columnRange,
  };

  for (const seatCodeChar of seatCode) {
    const seatPositionRange = seatPositionMap[seatCodeChar];

    // console.log(
    //   'seatCodeChar',
    //   seatCodeChar,
    //   ' /seatPositionMap',
    //   seatPositionMap,
    //   ' /seatPositionRange:',
    //   seatPositionRange
    // );

    if (seatCodeChar === POSITION_MAP.FRONT || seatCodeChar === POSITION_MAP.LEFT) {
      const lowerHalf = seatPositionRange[0] / HALF;
      seatPositionRange[1] = Math.floor(seatPositionRange[1] / HALF) + lowerHalf;
    } else if (seatCodeChar === POSITION_MAP.BACK || seatCodeChar === POSITION_MAP.RIGHT) {
      const upperHalf = Math.ceil(seatPositionRange[1] / HALF);
      seatPositionRange[0] = seatPositionRange[0] / HALF + upperHalf;
    }
  }

  const seatId = seatPositionMap[POSITION_MAP.FRONT][0] * 8 + seatPositionMap[POSITION_MAP.RIGHT][0];

  return seatId;
});
const descSortedSeatIds = seatIds.sort((prev, next) => next - prev);

console.log('seatIds:', seatIds, ' /highest seatId:', descSortedSeatIds[0]);
