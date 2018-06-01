/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
const card = document.getElementsByClassName('card');
const cards = [...card];
let moves = 0;
let score = 3;
let openedCards = [];
let matched = 0;
let moveCounter = document.querySelector('.moves');
let stars = document.querySelector('.stars').querySelectorAll('i');
let myModal = document.getElementById('modal');
let start;
let elapsed = 0;
const min = document.querySelector('.min');
const sec = document.querySelector('.sec');
const endScore = document.querySelector('.score');
const endMoves = document.querySelector('.move');
const mins = document.querySelector('.mins');
const secs = document.querySelector('.secs');

function initGame() {
    //Reset variables
    seconds = 0;
    moves = 0;
    score = 3;

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
    sec.innerHTML = '0';
    min.innerHTML = '0';

    myModal.style.display = 'none';
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

//Timer function
let timer = setInterval(function() {
    let time = new Date().getTime() - start;
    elapsed = Math.floor(time / 100) / 10;
    sec.innerHTML = (parseInt(elapsed%60));
    min.innerHTML = (parseInt(elapsed/60));
}, 100);

//Game over, display modal
function openModal() {
    const endMin = document.querySelector('.min').innerHTML;
    const endSec = document.querySelector('.sec').innerHTML;
    endScore.innerHTML = score;
    mins.innerHTML = endMin;
    secs.innerHTML = endSec;
    endMoves.innerHTML = moves;
    myModal.style.display = 'block';
    clearInterval(timer);

}

document.getElementsByClassName('restart')[0].addEventListener('click', initGame);
const currentCard = document.getElementsByClassName('card');
const currentCards = [...currentCard];

window.onload = initGame();

currentCards.forEach(function(card) {
    card.addEventListener('click', function(evt) {
        if (moves == 0) {
            start = new Date().getTime();
            timer;
        }
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openedCards.push(card);
            card.classList.add('open', 'show');
            if (openedCards.length == 2) {
                if (openedCards[0].querySelector('i').classList.item(1) == openedCards[1].querySelector('i').classList.item(1)) {
                    openedCards[0].classList.add('match');
                    openedCards[1].classList.add('match');
                    openedCards = [];
                    matched += 1;
                    if (matched == 8) {
                        openModal();
                    }
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
                if (moves == 14) {
                    stars[0].style.fontSize = '0';
                    score = 2;
                }
                if (moves == 22) {
                    stars[1].style.fontSize = '0';
                    score = 1;
                }
            }
        }

    });
});
