const { readFileSync } = require('fs');
const { resolve } = require('path');
const { EOL } = require('os');

const answers = readFileSync(resolve(__dirname, '../input.txt'), { encoding: 'utf8' }).trim(); /*`abc

a
b
c

ab
ac

a
a
a
a

b`;*/

const parsedAnswers = answers.split(/*'\n'*/ EOL.repeat(2)).map((groupAnswers) => {
  const peopleAnswers = groupAnswers.split(/*'\n'*/ EOL);
  console.log('peopleAnswers:', peopleAnswers);

  if (peopleAnswers.length === 1) {
    return peopleAnswers;
  }

  const repeatedAnswers = new Set();

  // sort from the least to the most occurrences of "yes" answers
  peopleAnswers.sort((prev, next) => prev.length - next.length);
  const leastYesAnswers = peopleAnswers[0];
  const remainingPeopleAnswers = peopleAnswers.slice(1);

  for (let i = 0; i < leastYesAnswers.length; i++) {
    const answer = leastYesAnswers[i];

    const isAnswerRepeated = remainingPeopleAnswers.every((personAnswers) => personAnswers.includes(answer));

    if (isAnswerRepeated) {
      repeatedAnswers.add(answer);
    }
  }

  return repeatedAnswers.size ? [...repeatedAnswers] : [];
});

const onlySameAnswersCount = /*onlySameAnswers*/ parsedAnswers.reduce(
  (sum, answers) => sum + answers.join('').length,
  0
);

console.log('onlySameAnswersCount:', onlySameAnswersCount);
