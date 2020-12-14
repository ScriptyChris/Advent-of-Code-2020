const { readFileSync } = require('fs');
const { resolve } = require('path');
const { EOL } = require('os');

const answers = readFileSync(resolve(__dirname, '../input.txt'), { encoding: 'utf8' }).trim();

const onlySameAnswersSum = parseAnswers().reduce((sum, answers) => sum + answers, 0);
console.log('onlySameAnswersSum:', onlySameAnswersSum);

function parseAnswers() {
  return answers.split(EOL.repeat(2)).map((peopleAnswers) => {
    const groupAnswers = peopleAnswers.split(EOL);

    sortFromLeastToMostYesAnswers(groupAnswers);

    const leastYesAnswersInGroup = groupAnswers[0];
    const remainingGroupAnswers = groupAnswers.slice(1);
    const repeatedAnswers = getRepeatedAnswers(leastYesAnswersInGroup, remainingGroupAnswers);

    return repeatedAnswers.join('').length;
  });
}

function sortFromLeastToMostYesAnswers(groupAnswers) {
  return groupAnswers.sort((prev, next) => prev.length - next.length);
}

function getRepeatedAnswers(leastYesAnswersInGroup, remainingGroupAnswers) {
  return [].filter.call(leastYesAnswersInGroup, (answer) => {
    if (remainingGroupAnswers.length === 0) {
      return true;
    }

    const isAnswerRepeated = remainingGroupAnswers.every((personAnswers) => personAnswers.includes(answer));
    return isAnswerRepeated;
  });
}
