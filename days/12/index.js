const { readFileSync } = require('fs');
const { resolve } = require('path');

const input = readFileSync(resolve(__dirname, './input.txt'), { encoding: 'utf8' });

const CONSTANTS = Object.freeze({
  directions: ['N','E','S','W'],
  quarters: 4,
  turnAngle: 90
});

class ShipPositioning {
  constructor(input) {
    this.shipPosition = {
      coordinates: {
        x: 0,
        y: 0
      },
      direction: 'E',
    };
    this.instructions = input.match(/\w\d+/g);
  }

  processShipPosition(direction, value) {
    switch (direction) {
      case 'N': {
        this.shipPosition.coordinates.y += value
        break;
      }

      case 'S': {
        this.shipPosition.coordinates.y -= value
        break;
      }

      case 'E': {
        this.shipPosition.coordinates.x += value
        break;
      }

      case 'W': {
        this.shipPosition.coordinates.x -= value
        break;
      }

      case 'L': {
        this.shipPosition.direction = this.getDirectionByAngleDegrees(-value);
        break;
      }
      case 'R': {
        this.shipPosition.direction = this.getDirectionByAngleDegrees(value);
        break;
      }

      case 'F': {
        this.processShipPosition(this.shipPosition.direction, value);
        break;
      }
    }
  }

  getDirectionByAngleDegrees(degrees) {
    const indexOfOldDirection = CONSTANTS.directions.indexOf(this.shipPosition.direction);
    const numberOfNewDirection = degrees / CONSTANTS.turnAngle;
    const directionIndex = (((indexOfOldDirection + numberOfNewDirection) % CONSTANTS.quarters) + CONSTANTS.quarters) % CONSTANTS.quarters;

    return CONSTANTS.directions[directionIndex];
  }

  getCalculatedManhattanDistance() {
    this.instructions.forEach((instruction) => {
      const direction = instruction[0];
      const value = Number(instruction.slice(1));

      this.processShipPosition(direction, value);
    });

    return Math.abs(this.shipPosition.coordinates.x) + Math.abs(this.shipPosition.coordinates.y);
  }
}

const shipPositioning = new ShipPositioning(input);
console.log('Manhattan distance:',shipPositioning.getCalculatedManhattanDistance());
