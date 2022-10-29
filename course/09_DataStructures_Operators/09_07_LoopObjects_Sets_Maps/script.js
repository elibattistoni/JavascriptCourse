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

//==============================================================================
//## SETS (another data structure introduced in ES6 besides the already pre-existing objects and arrays)
//==============================================================================
// set = collection of unique elements & the order of the elements is irrelevant

// a set from an array
const ordersSet = new Set(["Pizza", "Pasta", "Risotto", "Pizza", "Pasta"]);
console.log(ordersSet);

ordersSet.size;
console.log(ordersSet.size);

ordersSet.has("Pizza"); // in arrays is [1,2,3,4].includes(3)
console.log(ordersSet.has("Pizza"));
console.log(ordersSet.has("Lasagna"));

ordersSet.add("Lasagna");
console.log(ordersSet);

ordersSet.delete("Risotto");
console.log(ordersSet);

// ordersSet.clear(); // to remove all elements from a set
// console.log(ordersSet);

// a set from string
const stringSet = new Set("Elisa");
console.log(stringSet);

//NB there is no way of getting out values of a set
// you only need to know whether a set has an element or not

// loop over set
for (const order of ordersSet) {
  console.log(order);
}

// Example
const staff = ["Waiter", "Chef", "Manager", "Waiter", "Chef"];
let staffUnique = new Set(staff);
console.log(staffUnique);
// you can use the spread operator to transform the set into an array
staffUnique = [...staffUnique];
console.log(staffUnique);
console.log(new Set(staff).size);

// how many different characters are in a string
console.log(new Set("ElisaBattistoni").size);

//==============================================================================
//## MAPS
//==============================================================================
//IMPORTANT map is a data structure that we can use to map values to keys
// data is stored in key value pairs (just like in objects)
// NB the big difference between objects and maps is that in maps the keys can have any type
// in objects, keys are always strings
// in maps we can have any type of key (it can even be objects, arrays, or other maps)

//- create map
const rest = new Map();
rest.set("name", "Classico Italiano");
console.log(rest);
rest.set(1, "Firenze, Italy");
rest.set(2, "Lisbon, Portugal");
console.log(rest);
// the .set method returns the updated map
// this allows us to chain methods
rest
  .set("cuisine", "african")
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open :D")
  .set(false, "We are closed :(");
console.log(rest);

//- read data from a map with the get method
rest.get("name");
rest.get(true);

console.log(rest.get("name"));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
rest.get(time > rest.get("open") && time < rest.get("close"));
console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

//- if contains a certain key
rest.has("categories");
console.log(rest.has("categories"));
rest.has("open");
console.log(rest.has("open"));

//- delete a key value pair
rest.delete(2);
console.log(rest);

//- size
rest.size;
console.log(rest.size);

//- remove all elements
// rest.clear()

//- arrays or objects as map keys
const arr = [1, 2];
rest.set(arr, "Test");
rest.get(arr);
console.log(rest.get(arr));

// -
rest.set(document.querySelector("h1"), "Heading");
console.log(rest);

//- another way of populating a map without using the set method
const question = new Map([
  ["question", "What is the best programming language in the world?"],
  [1, "Java"], // key-value
  [2, "Python"],
  [3, "C++"],
  [4, "Javascript"],
  ["correct", 4],
  [true, "Correct! 🎉"],
  [false, "Try again!"],
]);
console.log(question);
//IMPORTANT this is exactly the same array structure that is returned from calling Object.entries(myObject)
console.log(Object.entries(openingHours));
//IMPORTANT this means that there is an easy way of converting objects to maps
const hours = new Map(Object.entries(openingHours));
console.log(hours);

//- iterations
console.log(question.get("question"));
for (const [key, value] of question) {
  if (typeof key == "number") {
    console.log(`Answer ${key}: ${value}`);
  }
}
// const answer = Number(prompt("Your answer"));
const answer = 4;
console.log(question.get(answer === question.get("correct")));

//- convert map to array
[...question];
console.log([...question]);

// question.entries(); // no need because it is equal to [...question]
[...question.keys()];
[...question.values()];

// console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);

//==============================================================================
//## CHOOSING THE CORRECT DATA STRUCTURE TO USE
//==============================================================================
// we have 4 data structure types: arrays, objects, sets, maps
//IMPORTANT pros and cons + whne to choose each of them
// IMPORTANT categorization of where the data comes from
//# 1) from the program itself
// the data can be written directly in the source code (e.g. status messages that will be disaplyed on a webpage based on user actions)
//# 2) from the User Interface (UI)
// data that the user inputs into some from the user or data that is written in the DOM (e.g. tasks in todo app, or expenses in a budget app or something like that)
//# 3) from external sources (web API)
// data fetched from web API
// we can use a web API to get data from other web applications

// regardless of the source of data, we usually have collections of data that we need to store somewhere
// we use data structures to store collections of data

//- simple list? => array or set
//- key-value pairs? => object or map (keys allow us to describe values)

// creating arrays of objects is extremely common in javascript

// object vs map => maps offer better performance
