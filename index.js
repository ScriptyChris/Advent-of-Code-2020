const { sep, resolve } = require('path');
const glob = require('glob');
const chalk = require('chalk');

const INIT_CWD = process.env.INIT_CWD;
const scriptRunFromProjectRoot = INIT_CWD === __dirname;
const pipeSeparatedInitCWD = getPipeSeparatedPath(INIT_CWD);
const dayPartsRegExp = /days.(?<day>\d+).part-(?<part>\d+)/;
const pathIncludesDayParts = dayPartsRegExp.test(pipeSeparatedInitCWD);

if (!scriptRunFromProjectRoot && pathIncludesDayParts) {
  const { day, part } = pipeSeparatedInitCWD.match(dayPartsRegExp).groups;
  const targetScriptPath = `${INIT_CWD}${sep}solution.js`;

  runSolutionScript(day, part, targetScriptPath);
} else {
  console.log(
    chalk.bold.white.bgGreen(
      `Scripts with solution for all puzzles will be run!\nIf you want to run solution script for the specific part of the day, please run "npm start" while being in puzzle solution folder, e.g: "/days/1/part-1".`
    )
  );

  const files = glob.sync(`days/+([0-9])/part-+([0-9])/solution.js`, { nodir: true });

  files.forEach((file) => {
    const { day, part } = file.match(dayPartsRegExp).groups;
    const targetScriptPath = resolve(__dirname, file);

    runSolutionScript(day, part, targetScriptPath);
  });
}

function getPipeSeparatedPath(path) {
  return path.split(sep).join('|');
}

function runSolutionScript(day, part, path) {
  const msg = `\nRunning solution for day: ${day}, part: ${part}, from path "${path}".\n`;
  const horizontalSeparator = '-'.repeat(msg.length);

  console.log(horizontalSeparator, chalk.bold.white.bgBlue(msg));

  require(path);

  console.log(chalk.bold.white.bgBlue(`\nFinished solution script for day: ${day}, part: ${part}.\n`));
}
