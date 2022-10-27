"use strict";

//==============================================================================
//## coding challenge #1
//==============================================================================

const dogJulia1 = [3, 5, 2, 12, 7];
const dogKate1 = [4, 1, 15, 8, 3];
const dogJulia2 = [9, 16, 6, 8, 3];
const dogKate2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  const newDogsJulia = dogsJulia.slice(1, -1);
  const allDogs = [...newDogsJulia, ...dogsKate];
  allDogs.forEach(function (age, idx) {
    console.log(
      `Dog number ${idx + 1} is ${
        age < 3 ? "a puppy" : "an adult"
      }, and is ${age} years old.`
    );
  });
};

checkDogs(dogJulia1, dogKate1);
console.log("---------------------------");
checkDogs(dogJulia2, dogKate2);

//==============================================================================
//## coding challenge #2
//==============================================================================

const calcAverageHumanAge = function (ages) {
  // 1. and 2.
  const dogAgeInHumanYears = ages
    .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter((age) => age >= 18);
  console.log(dogAgeInHumanYears);
  // 3. calculate average
  const avg =
    dogAgeInHumanYears.reduce((a, b) => a + b, 0) / dogAgeInHumanYears.length;
  console.log(avg);
  return avg;
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
