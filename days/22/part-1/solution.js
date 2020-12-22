const utils = require('../../../utils');

const winningPlayerCardDeck = play(getPlayerCardDecks());
const cardsDeckLength = winningPlayerCardDeck.length;
const winningPlayerScore = getWinningPlayerScore(winningPlayerCardDeck);

console.log('winningPlayerScore:', winningPlayerScore);

function getPlayerCardDecks() {
  return utils.getInput({ shouldDoubleSplit: true }).map((deck) => {
    const [, deckCards] = deck.split(':');

    return deckCards.trim().split(utils.EOL);
  });
}

function play(playerCardDecks) {
  while (!isAnyDeckEmpty()) {
    const [playerOneDeck, playerTwoDeck] = playerCardDecks;

    const p1TopNumber = Number(playerOneDeck.shift());
    const p2TopNumber = Number(playerTwoDeck.shift());

    if (p1TopNumber > p2TopNumber) {
      playerOneDeck.push(p1TopNumber, p2TopNumber);
    } else if (p1TopNumber < p2TopNumber) {
      playerTwoDeck.push(p2TopNumber, p1TopNumber);
    }
  }

  return playerCardDecks.filter((cardDeck) => cardDeck.length)[0];

  function isAnyDeckEmpty() {
    return playerCardDecks.some((cardDeck) => cardDeck.length === 0);
  }
}

function getWinningPlayerScore(winningPlayerCardDeck) {
  return winningPlayerCardDeck.reduce((score, cardValue, index) => {
    const calculatedScore = cardValue * (cardsDeckLength - index);

    return score + calculatedScore;
  }, 0);
}
