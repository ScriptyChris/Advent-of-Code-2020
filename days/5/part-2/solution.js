const { readFileSync } = require('fs');
const { resolve } = require('path');

const input = readFileSync(resolve(__dirname, '../input.txt'), { encoding: 'utf8' }).split('\n');

const HALF = 2;
const POSITION_MAP = Object.freeze({
  FRONT: 'F',
  BACK: 'B',
  LEFT: 'L',
  RIGHT: 'R',
});

const seatIds = getSeatIds();
seatIds.sort((prev, next) => prev - next);

console.log('seatIds:', seatIds, ' /getMySeat:', getMySeat());

function getSeatIds() {
  return input.map((seatCode) => {
    const seatPositionMap = getSeatPositionMap();

    for (const seatCodeChar of seatCode) {
      const seatPositionRange = seatPositionMap[seatCodeChar];

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
}

function getMySeat() {
  for (let i = 0; i < seatIds.length - 1; i++) {
    const seatId = seatIds[i];
    const nextSeatId = seatIds[i + 1];

    if (nextSeatId - seatId === 2) {
      return seatId + 1;
    }
  }
}

function getSeatPositionMap() {
  const rowRange = [0, 127];
  const columnRange = [0, 7];

  return {
    F: rowRange,
    B: rowRange,
    R: columnRange,
    L: columnRange,
  };
}
