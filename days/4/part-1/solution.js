const { readFileSync } = require('fs');
const { resolve } = require('path');
const { EOL } = require('os');

const numberOfAllPassportFields = 8;
const optionalPassportField = 'cid';
const passports = readFileSync(resolve(__dirname, '../input.txt'), { encoding: 'utf8' })
  .split(new RegExp(EOL.repeat(2), 'g'))
  .map((data) => {
    const dataArray = data.split(new RegExp(`\\s|${EOL}`, 'g')).filter(Boolean);
    return dataArray.reduce((passport, dataEntry) => {
      const [key, value] = dataEntry.split(':');

      passport[key] = value;

      return passport;
    }, {});
  });
const passportsConsideredValid = passports.filter((passport) => {
  const passportKeysLen = Object.keys(passport).length;

  return (
    passportKeysLen === numberOfAllPassportFields ||
    (passportKeysLen === numberOfAllPassportFields - 1 && !(optionalPassportField in passport))
  );
});

console.log('passports.length:', passports.length, ' /validPassports.length:', passportsConsideredValid.length);
