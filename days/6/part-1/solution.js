const utils = require('../../../utils');

const answers = utils.getInput({ shouldDoubleSplit: true });
const parsedAnswers = answers.map((answer) => answer.replace(new RegExp(utils.EOL, 'g'), ''));

const onlyUniqueAnswers = parsedAnswers.map((answer) => {
  const uniqAnswer = [...new Set(answer)].join('');

  return uniqAnswer;
});
const onlyUniqueAnswersCount = onlyUniqueAnswers.reduce((sum, answer) => sum + answer.length, 0);

console.log('onlyUniqueAnswersCount:', onlyUniqueAnswersCount);
