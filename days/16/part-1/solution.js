const { readFileSync } = require('fs');
const { resolve } = require('path');
const { EOL } = require('os');

const input = readFileSync(resolve(__dirname, '../input.txt'), { encoding: 'utf8' })
  .split(EOL.repeat(2))
  .map((part) => part.split(EOL));

// console.log('input', /*JSON.stringify(*/input/*)*/);

const tripMeta = input[0].map((metaItem) => {
  const [key, value] = metaItem.split(': ');
  return { key, value };
});
// const yourTicket = input[1][1].split(',').map(Number);
const nearbyTickets = input[2].slice(1).reduce((tickets, ticketsPart) => {
  const normalizedTicketPart = ticketsPart.split(',').map(Number);
  tickets.push(...normalizedTicketPart);

  return tickets;
}, []);

console.log('tripMeta:', tripMeta /*, ' /yourTicket:', yourTicket*/, ' /nearbyTickets:', nearbyTickets);

const ticketRanges = tripMeta.filter((metaItem) => /class|row|seat/.test(metaItem.key));
// console.log('ticketRanges:',ticketRanges)

const ticketUnifiedRanges = ticketRanges.reduce((unifiedRanges, { value: range }) => {
  unifiedRanges.push(...getTicketNormalizedRanges(range));

  return unifiedRanges;
}, []);
console.log('ticketUnifiedRanges:', ticketUnifiedRanges);

const invalidTickets = nearbyTickets.filter(
  (nearbyTicket) => !ticketUnifiedRanges.some(({ min, max }) => nearbyTicket >= min && nearbyTicket <= max)
);
const ticketScanningErrorRate = invalidTickets.reduce((sum, ticket) => sum + ticket, 0);
console.log('invalidTickets:', invalidTickets, ' /ticketScanningErrorRate:', ticketScanningErrorRate);

function getTicketNormalizedRanges(range) {
  return range.split(' or ').map((minMax) => {
    const [min, max] = minMax.split('-');

    return { min: Number(min), max: Number(max) };
  });
}
