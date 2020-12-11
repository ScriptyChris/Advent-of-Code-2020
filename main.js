const { sep } = require('path');
const chalk = require('chalk');

const INIT_CWD = process.env.INIT_CWD;
const scriptRunFromProjectRoot = INIT_CWD === __dirname;
const pathIncludesDayParts = /days\|\d+\|part-\d+/.test(getPipeSeparatedPath(INIT_CWD));

if (!scriptRunFromProjectRoot && pathIncludesDayParts) {
  const targetScriptPath = `${INIT_CWD}${sep}index.js`;
  console.log(`Run ${targetScriptPath}\n`);
  require(targetScriptPath);
} else {
  console.error(
    chalk.bold.white.bgRed(
      'Please, run "npm start" in folder within the specific part of a challenge day, e.g: "./days/1/part-1"'
    )
  );
  process.exit();
}

function getPipeSeparatedPath(path) {
  return path.split(sep).join('|');
}
