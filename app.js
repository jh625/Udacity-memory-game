// Objects and variables section

//Create a list that holds all of your cards
let cardsArray = ['fa-anchor', 'fa-anchor', 'fa-bicycle', 'fa-bolt', 'fa-cube', 'fa-diamond', 'fa-diamond', 'fa-plane', 'fa-leaf', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-plane', 'fa-cube'];

let lock = false;
let firstClick = null, secondClick = null;
let li1 = null, li2 = null; //firstClick and secondClick
let score = document.querySelector('#fin-score');
//move(s)
let moves = 0;
let lastMoves = document.querySelector('#fin-moves');
let lastTime = document.querySelector('#finish-time');
let counter = document.querySelector('.moves');
let machedCard = 0;

// Time variables
let time = document.querySelector('.displayTime');
let startGame = 0;
let gameInterval;

// star icon
const allStars = document.querySelectorAll('.fa-star');
console.log(allStars, "STAR");


let modal = document.getElementsByClassName('modal')[0];

const buttonRestart = document.getElementsByClassName('restart');


// Functions section


// Shuffle function
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

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
function timer() {
    let minutes = 0;
    let seconds = 0;
    gameInterval = setInterval(function () {
        seconds = parseInt(seconds, 10) + 1;
        minutes = parseInt(minutes, 10);
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }

        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        time.innerHTML = minutes + ":" + seconds;
        lastTime.textContent = time.textContent;
        // console.log
    }, 1000);
}

function endOfGame() {
    clearInterval(gameInterval);
}


function displaySymbol(el) {
    el.classList.add("open");
    el.classList.add("show");
}


function closeUnmatchedCards() {
    let els = document.getElementsByClassName('unMatch');
    Array.from(els).forEach(el => {
        el.classList.remove('unMatch');
        el.classList.remove('show');
        el.classList.remove('open');
    });
}


function restartClick() {
    firstClick = null;
    secondClick = null;
}

function changeRating() {
    // console.log
    if (moves === 10) {
        document.querySelector('.star').classList.remove('hide');
        return true;
    } else if (moves === 16) {
        allStars[0].classList.add('hide')
        allStars[3].classList.add('hide');
        document.querySelector('.star').classList.remove('hide');
        document.querySelector('.star').classList.add('hide');
    } else if (moves === 20) {
        allStars[1].classList.add('hide');
        allStars[4].classList.add('hide');
        document.querySelector('.star').classList.remove('hide');
        document.querySelector('.star').classList.add('hide');

    }
    // console.log
}


function moveCounter() {
    moves++;
    counter.innerHTML = moves;
  // Sets star rating based on number of moves. (Note: using display: none for removed stars instead of visibility: collapse, because with visibility: collapse, row is centered as if stars are still present)
  if (moves > 8 && moves < 12) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.display = 'none';
      }
    }
  }
  else if (moves > 13) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.display = 'none';
      }
    }
  }
}


function restarValue() {

    for (let i = 0; i < 3; i++) {
        allStars[i].classList.remove('hide');
    }

    for (let i = 0; i < 3; i++) {
        allStars[i].classList.remove('hide');
    }


    machedCard = 0;
    startGame = 0;
    moves = 0;
    counter.textContent = 0;
    li1 = null;
    li2 = null;
    // hide the modal
    modal.classList.remove('show');
    modal.classList.add('hide');
}


// newCard function
const newCard = cardClass => {
    // creating a new li element with a class "card"
    let li = document.createElement("li");
    li.classList.add("card");
    // creating a "i" element called icon and we applied to it a "fa" class, then we applied a class form the array of cards
    let icon = document.createElement("i");
    li.appendChild(icon);
    icon.classList.add("fa");
    icon.classList.add(cardClass);
    return li;
};


const pickACard = card => {

    card.addEventListener('click', function (e) {
        // start time at first click
        if (startGame === 0) {
            timer();
            startGame++;
        }

        let li = e.currentTarget;

        if (lock || li.classList.contains('open') && li.classList.contains('show')) {
            // console.log("this card is already open");
            return true;
        }

        let icon = li.getElementsByClassName('fa')[0].className;

        if (firstClick === null && secondClick === null) {

            firstClick = icon;
            li1 = li; // element of firstClick
            // console.log

        } else if (firstClick !== null && secondClick === null) {
            secondClick = icon;
            li2 = li; // element secondClick
            // console.log

            if (firstClick === secondClick) {
                li1.classList.add('match');
                li1.classList.add('true');
                li2.classList.add('match');
                li2.classList.add('true');
                score.textContent += 5;
                machedCard++;
                if (machedCard === 8) {
                    endOfGame()
                    modal.classList.remove('hide')
                    modal.classList.add('show')
                }


            } else {

                li1.classList.add('unMatch');
                li2.classList.add('unMatch');
                score.textContent -= 1;
                setTimeout(function () {
                    closeUnmatchedCards()
                }, 750)
            }
            moveCounter();
            restartClick();
        }
        displaySymbol(li);
    })
};


function gameStart() {

    restarValue();
    // restart the click
    restartClick();
    // // stop the time
    endOfGame();
    //  we clear the time string
    time.innerHTML = '00:00';
    // grab all the cards
    let list = document.getElementsByClassName("deck");

    // empty the current board of cards
    list[0].innerHTML = '';

    // shuffle the array of cards
    let cardsShuffled = shuffle(cardsArray);

    for (let card of cardsShuffled) {
        let li = newCard(card);
        list[0].appendChild(li);
    }

    let cards = list[0].getElementsByClassName("card")
    for (let card of cards) {

        pickACard(card);
    }

}

gameStart();


Array.from(buttonRestart).forEach(el => {
    el.addEventListener('click', function () {
        gameStart()
    })
});

function result() {
  if (matchingCard.length == 16) {
    // Window method that stops setInterval() Window method from executing "myTimer" function every 1 second
    clearInterval(gameinterval);
    let time = timer.innerHTML;

    // Shows congratulations modal
    result.classList.add('show');

    let starRating = document.querySelector('.stars').innerHTML;

    // Shows number of moves made, time, and rating on modal
    document.getElementById('#fin-moves')[0].innerHTML = moves;
    document.getElementByClassName('.fin-stars')[0].innerHTML = starRating;
    document.getElementById('#finish-time')[0].innerHTML = finalTime;

    // Adds event listener for modal's close button
    closeModal();
  }
}
  
