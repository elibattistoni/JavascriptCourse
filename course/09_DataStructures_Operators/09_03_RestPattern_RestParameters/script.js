"use strict";

//## REST PATTERN & REST PARAMETERS

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

//==============================================================================
//## 1) DESTRUCTURING (rest pattern)
//==============================================================================
//NB the rest pattern looks like the spread operator with the 3 dots but it does the opposite
// NB the rest pattern collects multiple elements and condenses them into an array
// the spread operator --> unpacks
// the rest pattern --> packs

//## SPREAD, because on RIGHT side of =
const arr = [1, 2, ...[3, 4, 5, 6]];

//## REST, because on LEFT side of =
// syntax (on the LEFT side of the assignment operator)
// but we can also use it on the left hand side of the assignment operator =, together with destructuring
const [a, b, ...others] = [1, 2, 3, 4, 5, 6];
console.log(a);
console.log(b);
console.log(others); // this is the array [3,4,5,6]
// it is called REST because it will take the rest of the elements of the array and put them into a new array
//- the REST pattern collects the elements that are unused in the destructuring assignment
//NB for this reason it should always be the last elelemtn in the destructuring assignment
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

console.log(pizza);
console.log(risotto);
console.log(otherFood); // it DOES NOT INCLUDE THE SKIPPED ELEMENTS

// REST IN OBJECTS
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat);
console.log(weekdays);

//==============================================================================
//## 2) FUNCTIONS (rest parameters --> to pass any number of arguments into a function
//==============================================================================
// the arguments are compressed into a single array

//# rest parameters: you pass in input any number of individual parameters
const add = function (...numbers) {
  console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(`sum: ${sum}`);
  return sum;
};
add(1, 2);
add(10, 20, 30);
add(40, 40, 60, 60);
// if you want to pass an array, you have to unpack it with the spread operator, which returns the indiidual elements of the array
add(...[10, 20, 30]);

// example
restaurant.orderPizza(
  "ingredient1",
  "--",
  "..",
  ...["ingredient2", "ingredient3"],
  "ingredient4"
);
restaurant.orderPizza("mushrooms"); // the second argument will be put into an empty array
