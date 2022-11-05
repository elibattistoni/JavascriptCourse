"use strict";

// my solution (if you want the user input)
// const weightJohn = Number(prompt("Insert John's weight (kg)"));
// const heightJohn = Number(prompt("Insert John's height (m)"));
// const weightMark = Number(prompt("Insert Mark's weight (kg)"));
// const heightMark = Number(prompt("Insert Mark's height (m)"));

// teacher solution
const weightJohn = 92;
const heightJohn = 1.95;
const weightMark = 78;
const heightMark = 1.69;

function calculateBMI(height, weight) {
  const BMI = weight / height ** 2;
  return BMI;
}

const johnBMI = calculateBMI(heightJohn, weightJohn);
const markBMI = calculateBMI(heightMark, weightMark);

console.log(`John has a BMI of ${johnBMI}`);
console.log(`Mark has a BMI of ${markBMI}`);

// my solution
// let markHigherBMI;
// if (markBMI >= johnBMI) {
//   markHigherBMI = true;
// } else {
//   markHigherBMI = false;
// }

// teacher solution
const markHigherBMI = markBMI > johnBMI;

console.log(
  `Mark ${
    markHigherBMI === true ? "has" : "does not have"
  } a higher BMI than John`
);
