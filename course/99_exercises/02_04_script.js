"use strict";

// same as 02_02_script.js
const calculateTip = function (bill) {
  const percentage = bill >= 50 && bill <= 300 ? 15 : 20;
  // calculate the 15% or 20% of the bill
  const tip = bill * (percentage / 100);
  // alternative way:
  // const tip =
  //   bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
  return tip;
};

calculateTip(100);

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const total = [];
for (const bill of bills) {
  tips.push(calculateTip(bill));
  total.push(calculateTip(bill) + bill);
}

console.log(tips);
console.log(total);
// calculate the amount to pay
// const valueMealFinal = valueMeal + tip;
// console.log(
//   `The bill was ${valueMeal}, the tip was ${tip}, and the total value ${valueMealFinal}`
// );
