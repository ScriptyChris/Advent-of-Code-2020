const utils = require('../../../utils');

const rows = utils.getInput({ trimBeforeSplit: true });

const INITIAL_DIMENSIONS = Object.freeze({
  ROWS: rows.length,
  COLUMNS: rows[0].length,
});

const POINT_SYMBOL = Object.freeze({
  OPEN_SQUARE: '.',
  TREE: '#',
});

const subsequentStepsObjects = [
  {
    RIGHT: 1,
    DOWN: 1,
  },
  {
    RIGHT: 3,
    DOWN: 1,
  },
  {
    RIGHT: 5,
    DOWN: 1,
  },
  {
    RIGHT: 7,
    DOWN: 1,
  },
  {
    RIGHT: 1,
    DOWN: 2,
  },
];

const pointsEncounteredOnMap = processStepsThoughMap(subsequentStepsObjects);
const encounteredTreesMultiplied = pointsEncounteredOnMap /* TODO: use utils.multiply with custom param */
  .reduce((multiplication, pointSymbol) => multiplication * pointSymbol[POINT_SYMBOL.TREE], 1);
console.log('encounteredTreesMultiplied:', encounteredTreesMultiplied);

function extendMapWidth(stepsToTheRight) {
  return Math.ceil((INITIAL_DIMENSIONS.ROWS * stepsToTheRight) / INITIAL_DIMENSIONS.COLUMNS);
}

function processStepsThoughMap(steps) {
  return steps.map(({ RIGHT: stepsRight, DOWN: stepsDown }) => {
    const mapRowsRepeater = extendMapWidth(stepsRight);
    const mapRows = rows.map((row) => row.repeat(mapRowsRepeater));

    return goThroughMap(mapRows, { stepsRight, stepsDown });
  });
}

function goThroughMap(mapRows, { stepsRight, stepsDown }) {
  const pointSymbolsEncountered = {
    [POINT_SYMBOL.OPEN_SQUARE]: 0,
    [POINT_SYMBOL.TREE]: 0,
  };

  for (
    let rowIndex = stepsDown, columnIndex = stepsRight;
    rowIndex < mapRows.length;
    rowIndex += stepsDown, columnIndex += stepsRight
  ) {
    const pointSymbol = mapRows[rowIndex][columnIndex];
    pointSymbolsEncountered[pointSymbol]++;
  }

  return pointSymbolsEncountered;
}
