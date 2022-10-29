"use strict";

// select all the elements of interest and store them in variables
// select elements (two ways of selecting elements with ids)
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// define the variables outside and in the initialization function assign them a value
// NB you cannot declare inside a function variables that you use also outside
// you should declare them outside, and in the function assign them the value
let scores, currentScore, activePlayer, playing;

// define the initialization function and run it
const init = function () {
  // we want the initialization function to be run in two conditions:
  // when the page reloads
  // when clicking the new game button

  // assign values to variables
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // set scores to zero
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden"); // remove dice at the beginning
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

// run init function (every time the page is refreshed)
init();

// define function for switching players
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // toggle adds if not present; removes if present
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      // select the element of the current score dinamically, based on who is the current active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Button Hold
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to activer player total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      // Finish game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

//IMPORTANT create a state variable that contains the state of the game (i.e. if you are still playing or not)
// a state variable tells the conditions of a system
// in this case the condition is: is the game playing or not?
// if playing, we can click the buttons and everything works normally
// as soon as the game is finished we will say that the game is no longer playing and can no longer click on these buttons

// Button new game RESET GAME
btnNew.addEventListener("click", init);
