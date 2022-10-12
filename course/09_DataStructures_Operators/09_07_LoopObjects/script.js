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

const openingHours = {
  tue: {
    open: 12,
    close: 22,
  },
  wed: {
    open: 11,
    close: 23,
  },
  thu: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

//==============================================================================
//## loop over objects
//==============================================================================
// several options: loop over the object's property names, loop over the object's values, or loop over both

//## KEYS
for (const day of Object.keys(openingHours)) {
  console.log(day);
}

const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `we are open on ${properties.length} days:`;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

//## VALUES
const values = Object.values(openingHours);
console.log(values);

//## ENTRIES (keys and values)
const entries = Object.entries(openingHours);
console.log(entries);

for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}
