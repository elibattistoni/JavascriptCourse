"use strict";

const calculateAverage = function (...scores) {
  let sum = 0;
  for (const score of scores) {
    sum += score;
  }
  const average = sum / scores.length;
  console.log(average);
  return average;
  // to call it:
  // calculateAverage(1, 2, 3, 4);
  // // calculateAverage(1, 4);
};

const checkWinner = function (avgTeam1, nameTeam1, avgTeam2, nameTeam2) {
  let winner;
  if (avgTeam1 >= avgTeam2 * 2) {
    winner = `${nameTeam1} wins (${avgTeam1} vs. ${avgTeam2})`;
  } else if (avgTeam2 >= avgTeam1 * 2) {
    winner = `${nameTeam2} wins (${avgTeam2} vs. ${avgTeam1})`;
  } else {
    winner = "No one wins!";
  }
  console.log(winner);
};

const avgDolphins1 = calculateAverage(44, 23, 71);
const avgKoalas1 = calculateAverage(65, 54, 49);
const avgDolphins2 = calculateAverage(85, 54, 41);
const avgKoalas2 = calculateAverage(23, 34, 27);

checkWinner(avgDolphins1, "Dolphins", avgKoalas1, "Koalas");
checkWinner(avgDolphins2, "Dolphins", avgKoalas2, "Koalas");
