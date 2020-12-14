const { readFileSync } = require('fs');
const { resolve } = require('path');
const { EOL } = require('os');

let [timestamp, busIds] = readFileSync(resolve(__dirname, '../input.txt'), { encoding: 'utf8' }).split(
  EOL
); /*`939
7,13,x,x,59,x,31,19`.split('\n');*/

timestamp = Number(timestamp);
busIds = busIds
  .split(',')
  .filter((id) => id !== 'x')
  .map(Number);

console.log('timestamp:', timestamp, ' /busIds:', busIds);

const busIdToTimestampDiff = busIds.map((id) => {
  const busIdClosestToTimeStamp = Math.ceil(timestamp / id) * id;
  return {
    diff: busIdClosestToTimeStamp - timestamp,
    busId: id,
  };
});
const closestBusIdToTimestamp = busIdToTimestampDiff.sort((prev, next) => next.diff - prev.diff).pop();
const waitTime = closestBusIdToTimestamp.busId * closestBusIdToTimestamp.diff;

console.log('closestBusIdToTimestamp.diff', closestBusIdToTimestamp.diff, ' /waitTime:', waitTime);
