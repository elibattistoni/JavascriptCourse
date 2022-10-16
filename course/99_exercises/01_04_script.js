"use strict";

const calculateTip = function (valueMeal) {
  const tipPerc = valueMeal >= 50 && valueMeal <= 300 ? 15 : 20;
  // calculate the 15% or 20% of the meal
  const percTip = valueMeal * (tipPerc / 100);
  // calculate the amount to pay
  const valueMealFinal = valueMeal + percTip;
  console.log(
    `The bill was ${valueMeal}, the tip was ${percTip}, and the total value ${valueMealFinal}`
  );
};

calculateTip(275);
calculateTip(40);
calculateTip(430);
