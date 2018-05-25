/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
const card = document.getElementsByClassName('card');
const cards = [...card];
let moves = 0;
let openedCards = [];
let moveCounter = document.querySelector('.moves');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function restart() {
    //Reset moves
    moves = 0;
    moveCounter.innerText = moves;
    //Make sure cards are face-down
    cards.forEach(function(card) {
        card.classList.remove('open', 'show', 'match');
    });
    //Shuffle the cards
    let shuffleCards = shuffle(cards);

    //Clear the current cards
    while (deck.hasChildNodes()) {
        deck.removeChild(deck.firstChild);
    }
    //Create new deck
    for (let shuffleCard of shuffleCards) {
        deck.appendChild(shuffleCard);
    }
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
document.getElementsByClassName('restart')[0].addEventListener('click', restart);
const currentCard = document.getElementsByClassName('card');
const currentCards = [...currentCard];
currentCards.forEach(function(card) {
    card.addEventListener('click', function(evt) {
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openedCards.push(card);
            card.classList.add('open', 'show');
            if (openedCards.length == 2) {
                if (openedCards[0].querySelector('i').classList.item(1) == openedCards[1].querySelector('i').classList.item(1)) {
                    openedCards[0].classList.add('match');
                    openedCards[1].classList.add('match');
                    openedCards = [];
                } else {
                    //If no match, flip cards
                    setTimeout(function() {
                        openedCards.forEach(function(card) {
                            card.classList.remove('open', 'show');
                        });
                        openedCards = [];
                    },700);
                }
                moves += 1;
                moveCounter.innerText = moves;

            }
        }

    });
});
