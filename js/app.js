/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
const card = document.getElementsByClassName('card');
const cards = [...card];
let moves = 0;
let openedCards = [];
let moveCounter = document.querySelector('.moves');
let stars = document.querySelector('.stars').querySelectorAll('i');

function initGame() {
    //Reset moves
    moves = 0;
    moveCounter.innerText = moves;
    stars.forEach(function(star) {
        star.style.fontSize = 'medium';
    });
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


document.getElementsByClassName('restart')[0].addEventListener('click', initGame);
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
                if (moves % 15 == 0) {
                    stars[0].style.fontSize = '0';
                }
                if (moves % 24 == 0) {
                    stars[1].style.fontSize = '0';
                }
            }
        }

    });
});
