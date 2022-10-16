"use strict";

const printForecast = function (...arr) {
  let string = "";
  for (const [idx, value] of arr.entries()) {
    string += `...${value}°C in ${idx + 1} days`;
  }
  return string;
};

console.log(printForecast(17, 21, 23));
console.log(printForecast(12, 5, -5, 0, 4));
