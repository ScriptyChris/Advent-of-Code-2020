const { readFileSync } = require('fs');
const { resolve } = require('path');
const { EOL } = require('os');

const passports = readFileSync(resolve(__dirname, '../input.txt'), { encoding: 'utf8' })
  .split(new RegExp(EOL.repeat(2), 'g'))
  .map((data) => data.split(new RegExp(`\\s|${EOL}`, 'g')).filter(Boolean));

console.log('passports', passports);
