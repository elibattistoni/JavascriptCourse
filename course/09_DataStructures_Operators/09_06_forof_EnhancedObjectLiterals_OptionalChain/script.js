"use strict";
//## REST PATTERN & REST PARAMETERS
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

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

//==============================================================================
//## for of loop
//==============================================================================
// you can still use continue and break

const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

// it only gives you the element not the counter
for (const item of menu) console.log(item);

// if you want also the index
for (const item of menu.entries()) console.log(item);

console.log(menu.entries()); // array iterator
console.log([...menu.entries()]);

//if you want to take the item and index
for (const item of menu.entries()) {
  console.log(`${item[0]}: ${item[1]}`);
}

// best practice (using destructuring)
for (const [idx, el] of menu.entries()) {
  console.log(`${idx}: ${el}`);
}

//==============================================================================
//## Enhanced Object Literals
//==============================================================================
// the restaurant object is an object literal because we wrote this object literally in our code using the curly braces syntax
// ES6 introduced three ways that make it easier to write object literal like this

const housePrimary = {
  place: "Fai della Paganella",
  abitants: 3,
  hasGarden: true,
  animalNames: ["Khoru", "Ron"],
};

const houseSecondary = {
  place: "Mezzolombardo",
  abitants: 2,
  hasGarden: false,
  animalNames: [],
};

const houseBattistoni = {
  housePrimary: housePrimary,
  // (1) ES6 enhanced object literal
  houseSecondary,

  // this syntax can be changed into
  // getAllAbitants: function () {
  //   console.log(
  //     `Number of abitants: ${
  //       this.housePrimary.abitants + this.houseSecondary.abitants
  //     }`
  //   );
  // },
  // (2) ES6 function syntax
  getAllAbitants() {
    console.log(
      `Number of abitants: ${
        this.housePrimary.abitants + this.houseSecondary.abitants
      }`
    );
  },
};

console.log(houseBattistoni);
houseBattistoni.getAllAbitants();

// (3) we can compute property names instead of having to write them out manually and literally
const weekdays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [`day-${2 + 4}`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

console.log(openingHours);

//==============================================================================
//## Optional Chaining (?.) used always in combination with the nullish coalescing operator ??
//==============================================================================
const restaurant2 = {
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
    // console.log(mainIngredient);
    // console.log(otherIngredients);
    // console.log(...otherIngredients);
    return `you ordered a pizza with ${mainIngredient} and ${otherIngredients}`;
  },
};

//# OBJECT PROPERTIES
console.log(restaurant2.openingHours.mon); // undefined, no error
// console.log(restaurant2.openingHours.mon.open); // TypeError
// read only if exists
if (restaurant2.openingHours.mon) {
  console.log(restaurant2.openingHours.mon);
}

//IMPORTANT with optional chaining, if a certain property does not exist, undefined is returned immediately
console.log(restaurant2.openingHours.mon?.open); // i.e. only if the property before the question mark exists, the property afterwards is read
// if not, then undefined is returned immediately (exists === nullish concept, i.e. only when null or undefined)
console.log(restaurant2.openingHours?.mon?.open);

const days = ["mon", "tue", "wedy", "thu", "fri", "sat", "sun"];
for (const day of days) {
  const open = restaurant2.openingHours[day]?.open ?? "close"; // || does not work because 0 in opening hour
  console.log(`On ${day} we open at ${open}`);
}

//## METHODS
// we can check if a method exists before calling it
console.log(restaurant2);
console.log(restaurant2.orderPizza("mush", "ham"));
console.log(
  restaurant2.orderPizza?.("plastic", "poison") ?? "Method does not exist"
);
console.log(
  restaurant2.orderRisotto?.("chocolate", "pear") ?? "Method does not exist"
);

//## ARRAYS
const users = [
  {
    nameUser: "Elisa",
    email: "eli.battistoni@gmail.com",
  },
];

console.log(users[0]?.nameUser ?? "IT IS EMPTY");
console.log(users[0]?.height ?? "IT IS EMPTY");
console.log(users[1]?.nameUser ?? "IT IS EMPTY");
