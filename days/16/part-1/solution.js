const utils = require('../../../utils');

const input = utils
  .getInput({
    shouldDoubleSplit: true,
  })
  .map((part) => part.split(utils.EOL));

const tripMeta = input[0].map((metaItem) => {
  const [key, value] = metaItem.split(': ');
  return { key, value };
});
const nearbyTickets = input[2].slice(1).reduce((tickets, ticketsPart) => {
  const normalizedTicketPart = ticketsPart.split(',').map(Number);
  tickets.push(...normalizedTicketPart);

  return tickets;
}, []);

const ticketRanges = tripMeta.filter((metaItem) => /class|row|seat/.test(metaItem.key));

const ticketUnifiedRanges = ticketRanges.reduce((unifiedRanges, { value: range }) => {
  unifiedRanges.push(...getTicketNormalizedRanges(range));

  return unifiedRanges;
}, []);

const invalidTickets = nearbyTickets.filter(
  (nearbyTicket) => !ticketUnifiedRanges.some(({ min, max }) => nearbyTicket >= min && nearbyTicket <= max)
);
const ticketScanningErrorRate = utils.add(invalidTickets);
console.log('ticketScanningErrorRate:', ticketScanningErrorRate);

function getTicketNormalizedRanges(range) {
  return range.split(' or ').map((minMax) => {
    const [min, max] = minMax.split('-');

    return { min: Number(min), max: Number(max) };
  });
}
