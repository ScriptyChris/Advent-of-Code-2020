const utils = require('../../../utils');

const rows = utils.getInput({ trimBeforeSplit: true });

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
const HORIZONTALLY_EXTENDED_INPUT_MAP = rows.map((row) => row.repeat(timesToExtendMapWidth));

const pointsEncounteredOnMap = goThroughMap();
console.log('trees encountered: ', pointsEncounteredOnMap[POINT.TREE]);

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
  }

  return pointsEncountered;
}
