const { readFileSync } = require('fs');
const { resolve } = require('path');
const { EOL } = require('os');

const answers = readFileSync(resolve(__dirname, '../input.txt'), { encoding: 'utf8' });

const parsedAnswers = answers.split(EOL.repeat(2)).map((answer) => answer.replace(new RegExp(EOL, 'g'), ''));

const onlyUniqueAnswers = parsedAnswers.map((answer) => {
  const uniqAnswer = [...new Set(answer)].join('');
  // console.log('answer len eq to uniq', answer.length === uniqAnswer.length);

  return uniqAnswer;
});
const onlyUniqueAnswersCount = onlyUniqueAnswers.reduce((sum, answer) => sum + answer.length, 0);

console.log(
  // 'answers',
  // JSON.stringify(answers),
  // '/parsedAnswers:',
  // parsedAnswers,
  ' /onlyUniqueAnswersCount:',
  onlyUniqueAnswersCount
);
