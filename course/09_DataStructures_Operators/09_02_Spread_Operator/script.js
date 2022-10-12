"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

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

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1},${ing2},${ing3}`);
  },
};

//## SPREAD OPERATOR (expand ana array)
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);
const goodNewArray = [1, 2, ...arr];
console.log(goodNewArray);
console.log(...goodNewArray); // logs elements indivudually
console.log(1, 2, 7, 8, 9);
//NB we can use the spread operator whenever we would otherwise write multiple values separated by commas
// situation n°1 when we write an array literal like the example above (when we need the elements of an array individually)
// situation n°2 when we pass multiple arguments into functions (console log example)

const newMenu = [...restaurant.mainMenu, "Ghocchi"];
console.log(newMenu);

//- the spread operator is similar to deconstructing, because they both allow us to get elements out of arrays
//- the big difference is that the spread operator does not create new variables, therefore you can use it only when you need to write values separated by commas

//# SPREAD OPERATOR: create shallow copies and merge arrays
// copy array
const mainMenuCopy = [...restaurant.mainMenu];
// join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// IMPORTANT the spread operator works on all iterables (not just on arrays), i.e. strings, maps, sets (NOT objects!)
const me = "ElisaBattistoni";
console.log([...me]);
const letters = [...me, " ", "B."];
console.log(letters);

// this is not going to work because a template literal does not expect elements separated by commas
// console.log(`${...me} B.`);

//#functions
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1"),
//   prompt("Ingredient 2"),
//   prompt("Ingredient 3"),
// ];
const ingredients = ["a", "b", "c"];
console.log(ingredients);

// two alternatives but the second one is BEST PRACTICE with ES6
restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);

//# Objects
const newRestaurant = { ...restaurant, founder: "Giuseppe" }; // this will copy all the properties of the restaurant into this new object, and then we can add anything we want
// you can also do shallow copies of objects, instead of doint object.assign (like in the previous lecture)
const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Ristorante Italiano Roma";
console.log(restaurant.name);
console.log(restaurantCopy.name);
