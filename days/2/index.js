const { readFileSync } = require('fs');
const { resolve } = require('path');

const input = readFileSync(resolve(__dirname, './input.txt'), { encoding: 'utf8' });
const instructions = input.match(/\w\d+/g);

const CONSTANTS = Object.freeze({
  directions: ['N','E','S','W'],
  quarters: 4,
  turnAngle: 90
});
const shipPosition = {
  coordinates: {
    x: 0,
    y: 0
  },
  direction: 'E',
};

// console.log('instructions', instructions);

instructions.forEach((instruction) => {
  const direction = instruction[0];
  const value = Number(instruction.slice(1));

  processShipPosition(direction, value);
});

const manhattanDistance = Math.abs(shipPosition.coordinates.x) + Math.abs(shipPosition.coordinates.y);
console.log('manhattanDistance', manhattanDistance, ' /shipPosition', shipPosition)

function processShipPosition(direction, value) {
  switch (direction) {
    case 'N': {
      shipPosition.coordinates.y += value
      break;
    }

    case 'S': {
      shipPosition.coordinates.y -= value
      break;
    }

    case 'E': {
      shipPosition.coordinates.x += value
      break;
    }

    case 'W': {
      shipPosition.coordinates.x -= value
      break;
    }

    case 'L': {
      shipPosition.direction = getDirectionByAngleDegrees(-value);
      break;
    }
    case 'R': {
      shipPosition.direction = getDirectionByAngleDegrees(value);
      break;
    }

    case 'F': {
      processShipPosition(shipPosition.direction, value);

      break;
    }
  }
}

function getDirectionByAngleDegrees(degrees) {
  const indexOfOldDirection = CONSTANTS.directions.indexOf(shipPosition.direction);
  const numberOfNewDirection = degrees / CONSTANTS.turnAngle;
  const directionIndex = (((indexOfOldDirection + numberOfNewDirection) % CONSTANTS.quarters) + CONSTANTS.quarters) % CONSTANTS.quarters;

  return CONSTANTS.directions[directionIndex];
}
