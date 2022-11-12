"use strict";
"use strict";

const calculateTip = function (valueMeal) {
  const tipPerc = valueMeal >= 50 && valueMeal <= 300 ? 15 : 20;
  // calculate the 15% or 20% of the meal
  const percTip = valueMeal * (tipPerc / 100);
  // alternative way:
  // const percTip =
  //   valueMeal >= 50 && valueMeal <= 300 ? valueMeal * 0.15 : valueMeal * 0.2;
  return percTip;
};

calculateTip(100);

const bills = [125, 555, 44];
const tips = [];
const total = [];
for (const bill of bills) {
  tips.push(calculateTip(bill));
  total.push(calculateTip(bill) + bill);
}

console.log(tips);
console.log(total);
// calculate the amount to pay
// const valueMealFinal = valueMeal + percTip;
// console.log(
//   `The bill was ${valueMeal}, the tip was ${percTip}, and the total value ${valueMealFinal}`
// );
