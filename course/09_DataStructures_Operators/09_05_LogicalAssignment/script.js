"use strict";

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
//## Logical Assignment Operators
//==============================================================================
// even more modern than the nullish coalescing operators, are three logical assignment operators (introduced in ES 2021)

const rest1 = {
  name: "Capri",
  numGuests: 20,
};
const rest2 = {
  name: "La Piazza",
  owner: "Giovanni Rossi",
};

// create a shallow copy of the objects
const rest3 = { ...rest1 };
const rest4 = { ...rest2 };

//# OR assignment operator
// exercise 1: set a default number of guests for all the restaurants that do not have the numGuest property
//- short circuit when encountering a truthy value
rest1.numGuests = rest1.numGuests || 10;
rest2.numGuests = rest2.numGuests || 10;

console.log(rest1);
console.log(rest2);

// alternative way
rest1.numGuests ||= 10;
rest2.numGuests ||= 10;
//NB but this is wrong if the initial numGuests is 0!!

//## NULLISH ASSIGNMENT OPERATOR
// best practice: nullish assignment operator (it assigns only if null or undefined)
rest1.numGuests ??= 10; // the nullish operator considers 0 as an actual value
rest2.numGuests ??= 10; // the nullish operator considers 0 as an actual value

//## AND ASSIGNMENT OPERATOR
// exercise: anonymize the names of the restaurant owners
// if rest2.owner is a truthy value, go to the next value (it stops when there is a falsy value)
//- short circuit when encountering a falsy value
rest2.owner = rest2.owner && "<ANONYMOUS>";
console.log(rest2);
// if not present it will be undefined, i.e. a falsy value, therefore it will be returned
rest1.owner = rest1.owner && "<ANONYMOUS>";
console.log(rest1);

// this is actually better because it does not add the property:

console.log("----");
rest3.owner &&= "<ANONYMOUS>";
rest4.owner &&= "<ANONYMOUS>";
console.log(rest3);
console.log(rest4);
