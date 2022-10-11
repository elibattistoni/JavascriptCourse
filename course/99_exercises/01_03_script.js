"use strict";

// declare variable that selects the element button with class calculcate
// const calcBtn = document.querySelector("calculate");

// declare objects with scores
const match1 = {
  Dolphins: [96, 108, 89],
  Koalas: [88, 91, 110],
};
const match2 = {
  Dolphins: [97, 112, 101],
  Koalas: [109, 95, 123],
};
const match3 = {
  Dolphins: [97, 112, 101],
  Koalas: [109, 95, 106],
};

// create a function that computes the average of an array of numbers
const getAverage = function (numArray) {
  const average = numArray.reduce((a, b) => a + b, 0) / numArray.length;
  return average;
};

// calculate the winner of the first match
const avgDolphins1 = getAverage(match1.Dolphins);
const avgKoalas1 = getAverage(match1.Koalas);
let winner1;
if (avgDolphins1 === avgKoalas1) {
  winner1 = "winner1: BOTH WIN!";
} else {
  winner1 =
    avgDolphins1 > avgKoalas1
      ? "winner1: DOLPHINS WIN!"
      : "winner1: KOALAS WIN!";
}
winner1 =
  winner1 + ` Koalas score: ${avgKoalas1}; Dolphins score: ${avgDolphins1}`;

console.log(winner1);

// function that determines if there is at least a 100 score
const getMinimum = function (numArray) {
  let has100 = false;
  for (let i = 0; i < numArray.length; i++) {
    if (numArray[i] >= 100) {
      has100 = true;
    }
  }
  return has100;
};
const avgDolphins2 = getAverage(match2.Dolphins);
const avgKoalas2 = getAverage(match2.Koalas);
let winner2 = "winner2: BOTH WIN!";
if (avgDolphins2 === avgKoalas2) {
  winner2 = "winner2: DRAW!";
} else {
  if (avgDolphins2 > avgKoalas2 && getMinimum(match2.Dolphins)) {
    winner2 = "winner2: DOLPHINS WIN!";
  } else if (avgDolphins2 < avgKoalas2 && getMinimum(match2.Koalas)) {
    winner2 = "winner2: KOALAS WIN!";
  }
}

winner2 =
  winner2 + ` Koalas score: ${avgKoalas2}; Dolphins score: ${avgDolphins2}`;

console.log(winner2);

// maybe it is the average minimum score should be above 100 + implement minimum 100 for the draw as well
winner2 = "winner2: NO ONE WINS!";
if (avgDolphins2 === avgKoalas2 && avgDolphins2 > 100) {
  winner2 = "winner2: BOTH WIN!";
} else {
  if (avgDolphins2 > avgKoalas2 && avgDolphins2 > 100) {
    winner2 = "winner2: DOLPHINS WIN!";
  } else if (avgDolphins2 < avgKoalas2 && avgKoalas2 > 100) {
    winner2 = "winner2: KOALAS WIN!";
  }
}

winner2 =
  winner2 + ` Koalas score: ${avgKoalas2}; Dolphins score: ${avgDolphins2}`;

console.log(winner2);
