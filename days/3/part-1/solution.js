const { readFileSync } = require('fs');
const { resolve } = require('path');
const { EOL } = require('os');

const input = readFileSync(resolve(__dirname, '../exampleInput.txt'), { encoding: 'utf8' });
const rows = input.trim().split(EOL);

const INITIAL_DIMENSIONS = Object.freeze({
  ROWS: rows.length,
  COLUMNS: rows[0].length,
});

const STEPS = Object.freeze({
  RIGHT: 3,
  DOWN: 1,
});

const POINT = Object.freeze({
  OPEN_SQUARE: '.',
  TREE: '#',
});

const timesToExtendMapWidth = Math.ceil((INITIAL_DIMENSIONS.ROWS * STEPS.RIGHT) / INITIAL_DIMENSIONS.COLUMNS);
const horizontallyExtendedMapWidth = INITIAL_DIMENSIONS.COLUMNS * timesToExtendMapWidth;

console.log(
  'rows: ',
  rows,
  ' /INITIAL_DIMENSIONS:',
  INITIAL_DIMENSIONS,
  ' /timesToExtendMapWidth:',
  timesToExtendMapWidth,
  ' /horizontallyExtendedMapWidth:',
  horizontallyExtendedMapWidth
);

const HORIZONTALLY_EXTENDED_INPUT_MAP = rows.map((row) => row.repeat(timesToExtendMapWidth));
console.log('HORIZONTALLY_EXTENDED_INPUT_MAP:', HORIZONTALLY_EXTENDED_INPUT_MAP);

const pointsEncounteredOnMap = goThroughMap();
console.log(
  'pointsEncounteredOnMap:',
  pointsEncounteredOnMap,
  ' /trees encountered: ',
  pointsEncounteredOnMap[POINT.TREE]
);

function goThroughMap() {
  let pointsEncountered = {
    [POINT.OPEN_SQUARE]: 0,
    [POINT.TREE]: 0,
  };

  for (
    let rowIndex = STEPS.DOWN, columnIndex = 0;
    rowIndex < HORIZONTALLY_EXTENDED_INPUT_MAP.length;
    rowIndex += STEPS.DOWN
  ) {
    columnIndex += STEPS.RIGHT;
    const pointChar = HORIZONTALLY_EXTENDED_INPUT_MAP[rowIndex][columnIndex];
    pointsEncountered[pointChar]++;

    // console.log('rowIndex:', rowIndex, ' /columnIndex: ', columnIndex, ' /pointChar:', pointChar);
  }

  return pointsEncountered;
}
