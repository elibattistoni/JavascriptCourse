"use strict";

// EXPLANATIONS

//- to select an HTML class
// document.querySelector(".class-element");
//- to select an HTML id
// document.querySelector("#id-element");

//- this logs the entire element
// console.log(document.querySelector(".message"));
//- to get the content of the element
// console.log(document.querySelector(".message").textContent);

//- set the content of the element: the winning phrase
// document.querySelector(".message").textContent = "🎉 Correct number!";
// console.log(document.querySelector(".message").textContent);

// document.querySelector(".number").textContent = "13";
// document.querySelector(".score").textContent = "10";

//- input field
// document.querySelector(".guess").value = 23;
// console.log(document.querySelector(".guess").value);

//##############################################################################
//- handling the click of a button
//- IMPORTANT for this you need an EVENT LISTENER
//- event = something that happens on the page (e.g. mouse click, mouse moving, key press,...)
//- with an event listener we can wait for a certain event to happen and then react to it
//- in order to listen for events, we first need to select the element where the event should happen
//- listen to the event on the Check button
//- .addEventListener(first_argument, second_argument) --> special kind of function:
//- first_argument = the event (the action) that we want to listen (the name of the event)
//- second_argument = the reaction to the event = tell the event listener what to do >> you need to define a function
//- this function contains the code that has to be executed when the event happens on the selected element
//- this function is called the "event handler" (the second argument is a function value -- a function is a value, and if a function is a value, it can be passed as input into another function)
// we only define the function we did not call it anywhere, but it is the JS engine that will call this function as soon as the event happens
// the function passed as the second argument is a function expression, with the difference that we are not assigning it to any variable
//- function expression definition
// const calculateAge2 = function (birthYear) {
//   return 2037 - birthYear;
// };
//- function expression usage
// const age2 = calculateAge2(1991);

//------------------------------------------------------------------------------
// ACTUAL GAME LOGIC
// define one secret number per game (per page refresh)
// random number between 0 and 19 >> Math.random()*20
// to make int: Math.trunc(floatingnumber)
// add + 1 to make it between 1 and 20

let secretNumber = Math.trunc(Math.random() * 20) + 1;
// for dev purposes, show it in the FE
// document.querySelector(".number").textContent = secretNumber;

// this variable could also be called "state" variable
// because this score is part of the "application state" == all the data that is relevant to the application
// the secret number is also part of the state of the application
// we want all the data to always be available somewhere in our code and not just in the DOM
let score = 20;

let highScore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

//event click listener
document.querySelector(".check").addEventListener("click", function () {
  // store the number in a variable
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess);

  // IMPORTANT always treat first the scenario in which there is no input
  // if there is no guess, the number is automatically 0 (it is false as boolean)
  if (!guess) {
    // document.querySelector(".message").textContent = "⛔ No number!";
    displayMessage("⛔ No number!");
  } else if (guess === secretNumber) {
    // document.querySelector(".message").textContent = "🎉 Correct number!";
    displayMessage("🎉 Correct number!");
    document.querySelector(".number").textContent = secretNumber;
    // change background color
    // to select an element, insert the element name
    // for the css property names like background-color, javascript makes them camel case backgroundColor
    document.querySelector("body").style.backgroundColor = "#60b347";
    // make number bigger
    document.querySelector(".number").style.width = "30rem"; // needs to be in a string
    // set highscore
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    // refactoring
    if (score > 1) {
      const msgWrong = guess > secretNumber ? "📈 Too high!" : "📉 Too low!";
      displayMessage(msgWrong);
      // document.querySelector(".message").textContent = msgWrong;
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("💀 You lost the game!");
      // document.querySelector(".message").textContent = "💀 You lost the game!";
      document.querySelector(".score").textContent = 0;
    }
  }
  // old code
  // else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "📈 Too high!";
  //     score--; // decrease the score because wrong answer
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     document.querySelector(".message").textContent = "💀 You lost the game!";
  //     document.querySelector(".score").textContent = 0;
  //   }
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "📉 Too low!";
  //     score--; // decrease the score because wrong answer
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     document.querySelector(".message").textContent = "💀 You lost the game!";
  //     document.querySelector(".score").textContent = 0;
  //   }
  // }
});

// reset page when click on Again! button
// this resets everything except the highscore
document.querySelector(".again").addEventListener("click", function () {
  // restore initial value of score
  score = 20;
  // set another secret number value
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // restore initial message
  document.querySelector(".score").textContent = score;
  // document.querySelector(".message").textContent = "Start guessing...";
  displayMessage("Start guessing...");

  // restore background color and size number box
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".number").textContent = "?";

  // restore initial input field
  document.querySelector(".guess").value = "";
});
