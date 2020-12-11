const { resolve } = require('path');
const { readFileSync } = require('fs');

const input = readFileSync(resolve(__dirname, './input.txt'), { encoding: 'utf8' });
const numbersFromInput = /*[2, 10];*/ input.match(/\d+/g).map(Number);
const lastInputValueIndex = numbersFromInput.length - 1;

const expectedSum = 2020;
const expectedNumbersToSum = 3;

class PointerIndexes {
  constructor() {
    this._initialList = Object.freeze(new Array(expectedNumbersToSum).fill(0)).map((_, index) => index);
    this.list = [...this._initialList];
  }

  getList(round) {
    this.list = round === 1 ? this._initialList : this.getPreparedListForNextRound(round);

    console.log('pointerIndexes', this.list);
    return this.list;
  }

  getPreparedListForNextRound(round) {
    return this.list.map((pointer, index) => {
      return this._initialList[index] + round - 1;
    });
  }

  getLastIndexPointer() {
    return this.list[this.list.length - 1];
  }

  getStopIndex(indexPointer, lastIndexPointer) {
    const nextPointerIndex = this.list[indexPointer + 1];
    return indexPointer === lastIndexPointer ? lastInputValueIndex : nextPointerIndex;
  }

  getOtherPointers(indexPointer) {
    return this.list.filter((_, index) => index !== indexPointer);
  }

  updatePointer(previousIndex, currentIndex) {
    this.list[previousIndex] = currentIndex;
  }

  allIndexPointersReachedEnd(lastIndexPointer) {
    return this.list.every((pointer, index) => {
      const nextPointerIndex = this.list[index + 1];

      if (pointer === lastIndexPointer) {
        return pointer === lastInputValueIndex;
      }

      return pointer + 1 === this.list[nextPointerIndex];
    });
  }
}

debugger;

let round = 0;

const result = (function recurse() {
  round++;

  const pointerIndexes = new PointerIndexes();
  const lastIndexPointer = pointerIndexes.getLastIndexPointer();
  const pointerIndexesList = pointerIndexes.getList(round);

  for (let indexPointer = lastIndexPointer; indexPointer >= 0; indexPointer--) {
    const stopIndex = pointerIndexes.getStopIndex(indexPointer, lastIndexPointer);
    const otherPointers = pointerIndexes.getOtherPointers(indexPointer);
    const sumResult = loop(indexPointer, stopIndex, otherPointers, pointerIndexes.updatePointer.bind(pointerIndexes));

    console.log('otherPointers', otherPointers, ' /sumResult: ', sumResult);

    if (sumResult === expectedSum) {
      return multiplyValues(pointerIndexesList);
    }
  }

  if (!pointerIndexes.allIndexPointersReachedEnd(lastIndexPointer)) {
    if (round > expectedNumbersToSum) {
      return 'Did not found numbers satisfying provided criterion. :(';
    }

    return recurse();
  }
})();

function loop(start, end, otherPointers, updatePointer) {
  debugger;

  const initialStart = start;

  for (; start <= end; start++) {
    updatePointer(initialStart, start);

    const currentValue = numbersFromInput[start];
    const sum = otherPointers.reduce((sum, pointer) => sum + numbersFromInput[pointer], currentValue);

    console.log('currentValue', currentValue, ' /sum', sum);

    if (sum === expectedSum) {
      return sum;
    }
  }
}

function multiplyValues(pointerIndexesList) {
  const values = pointerIndexesList.map((index) => numbersFromInput[index]);
  console.log('pointerIndexesList', pointerIndexesList, ' /numbersFromInput', numbersFromInput, ' /values', values);
  return values.reduce((multiplication, value) => multiplication * value, 1);
}

console.log('\nResult:', result);
