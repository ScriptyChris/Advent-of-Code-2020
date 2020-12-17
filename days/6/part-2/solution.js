const utils = require('../../../utils');

const answers = utils.getInput({ trimBeforeSplit: true, shouldDoubleSplit: true });
const onlySameAnswersSum = utils.add(parseAnswers());
console.log('onlySameAnswersSum:', onlySameAnswersSum);

function parseAnswers() {
  return answers.map((peopleAnswers) => {
    const groupAnswers = peopleAnswers.split(utils.EOL);

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
