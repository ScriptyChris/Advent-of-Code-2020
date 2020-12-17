const { readFileSync } = require('fs');
const { resolve } = require('path');
const { EOL } = require('os');

const LINE_SEPARATORS = [ EOL, '\n' ];

function doSplit(source, splitBy, shouldDoubleSplit) {
  // when explicitly refused to split, then return raw source
  if (splitBy === null) {
    return source;
  }

  const separatorCount = shouldDoubleSplit ? 2 : 1;

  // when not provided any split value, then choose one of line separators
  if (splitBy === undefined) {
    const matchedLineSeparator = LINE_SEPARATORS
      .find(lineSeparator => doSplit.getRegExp(lineSeparator, separatorCount).test(source))

    splitBy = doSplit.getRegExp(matchedLineSeparator, separatorCount);
  }

  return source.split(splitBy);
}
doSplit.getRegExp = function(separator, separatorCount) {
  return new RegExp(separator.repeat(separatorCount), 'g');
}

function getInput({inputPath = '../input.txt' , splitBy, shouldDoubleSplit = false, trimBeforeSplit = false } = {}) {
  // TODO: fix issue with module.parent.filename referencing "day/1/part-1" directory, when app is run from root path
  const resolvedPath = resolve(module.parent.filename, '../', inputPath);
  let file = readFileSync(resolvedPath, { encoding: 'utf8' });

  if (trimBeforeSplit) {
    file = file.trim();
  }

  const splitFile = doSplit(file, splitBy, shouldDoubleSplit);

  return splitFile || file;
}

function add(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

function multiply(values) {
  return values.reduce((multiplication, value) => multiplication * value, 1);
}

module.exports = {
  getInput, doSplit, add, multiply, EOL
};
