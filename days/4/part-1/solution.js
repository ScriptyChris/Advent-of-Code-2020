const utils = require('../../../utils');

const numberOfAllPassportFields = 8;
const optionalPassportField = 'cid';
const passports = utils
  .getInput({
    shouldDoubleSplit: true,
  })
  .map((data) => {
    const dataArray = data.split(new RegExp(`\\s|${utils.EOL}`, 'g')).filter(Boolean);
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
