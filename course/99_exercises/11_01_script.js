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

//==============================================================================
//## coding challenge #4
//==============================================================================
const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// 1.
dogs.forEach((dog) => {
  dog["recommendedFood"] = Math.trunc(dog["weight"] ** 0.75 * 28);
});
console.log(dogs);

// 2.
const SarahDog = dogs.find((dog) => dog["owners"].includes("Sarah"));
console.log(SarahDog);

if (SarahDog["curFood"] > SarahDog["recommendedFood"]) {
  console.log("The dog is eating too much");
} else {
  console.log("The dog is eating too little");
}

// 3. and 4.
const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recommendedFood)
  .map((dog) => dog.owners)
  .flat();
const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recommendedFood)
  .map((dog) => dog.owners)
  .flat();
console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little!`);

// 5.
dogs.forEach((dog, idx) => {
  if (dog.recommendedFood === dog.curFood) {
    console.log(`Dog number ${idx} is eating the exact amount of food`);
  }
});

// 6.
// console.log(250 + 250 * 0.1); // equal to // console.log(250 * 1.1);
// console.log(250 - 250 * 0.1); // equal to // console.log(250 * 0.9);
dogs.forEach((dog, idx) => {
  if (
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
  ) {
    console.log(`Dog number ${idx} is eating an OKAY amount of food`);
  }
});

// 7.
const dogsOkay2 = dogs.filter(
  (dog) =>
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
);
console.log(dogsOkay2);

const dogsOkay = dogs.filter(function (dog) {
  return (
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
  );
});
console.log(dogsOkay);

// 8.
const newDogs = dogs.slice();
const newDogs2 = [...dogs];
console.log(newDogs);
console.log(newDogs2);

console.log("Ascending order:");
newDogs.sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(newDogs);
