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

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

//==============================================================================
//## DESTRUCTUING ARRAYS
//==============================================================================

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// Destructuring/unpacking assignment operation
const [x, y, z] = arr;
console.log(x);
console.log(y);
console.log(z);

// if you want to take only some elements you can
const [first, second] = restaurant.categories;
console.log(first, second);

// if you want to skip some elements (you don't want to assign some elements to any variable)
const [one, , , four] = restaurant.categories;
console.log(one, four);

// Switch variables
let [main, secondary] = restaurant.categories;
console.log(main, secondary);
// const temp = main;
// main = secondary;
// secondary = temp;
// with deconstructing you can make it a lot easier
[main, secondary] = [secondary, main];

//NOTE we can have a function return an array and then we can immediately deconstruct the result into different variables, and this allows to return multiple values from a function

const [starterCourse, mainCourse] = restaurant.order(2, 0);
console.log(starterCourse, mainCourse);

// nested arrays
const nestedArr = [2, 4, [5, 6]];
const [i, k, j] = nestedArr;
console.log(i);
console.log(k);
console.log(j);
const [l, m, [n, o]] = nestedArr;
console.log(l);
console.log(m);
console.log(n);
console.log(o);

// set default values for the variables when we are extracting them (useful when you don't know the length of the array)
const [p, q, r] = [1, 2];
console.log(p, q, r); // r qill be undefined
const [s = 1, t = 1, u = 1] = [1, 2];
console.log(s, t, u); // now it will not be undefined but it will get the default value 1

//==============================================================================
//## DESTRUCTUING OBJECTS
//==============================================================================
// IMPORTANT extremely useful when we deal with the result of an API call (i.e. get data from another web application, like weather data or data about movies)
/// this data usually comes in the form of objects and deconstructing allows us to write really much less code

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

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  /// in this function we take as input an object and deconstruct it, and in the deconstruction we assign default values
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = "20:00",
    address = "Via del Sole",
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
};

// destruct objects
const { name, openingHours, categories } = restaurant2;
console.log(name, openingHours, categories);

/// how to have variable names that are different from property names
/// use the colon and specify a new name
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant2;
console.log(restaurantName, hours, tags);

/// how to set default values (if you are trying to read a property that does not exist on the object)
const { menu = [], starterMenu: starters = [] } = restaurant2;
console.log(menu); // menu does not exist therefore it will get the default value of empty array
console.log(starters);

/// mutating variables when deconstructing objects
let xx = 111;
let yy = 999;
const obj = { xx: 23, yy: 7, jj: 14 };
({ xx, yy } = obj);
console.log(xx, yy);

/// nested objects
// retrieve an object
const { fri } = openingHours;
console.log(fri);
// retrieve properties of an object
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);
// retrieve properties of an object + reassign them to another variable
const {
  fri: { open: fridayOpen, close: fridayClose },
} = openingHours;
console.log(fridayOpen, fridayClose);

//IMPORTANT PRACTICAL APPLICATION
// in JS we have function with a lot of parameters, but then it can be hard to know the order of parameters for someone that is using this function
// so instead of defining the parameters manually, we can just pass an object into the function as an argument, and the function will immediately destructure that object
console.log("restaurant2 orderDelivery");
// in the function we pass in just one object (in the function declaration the parameters are deconstructed)
// and obvioulsy they do not need to be in order
restaurant2.orderDelivery({
  time: "22:30",
  address: "Via dei Morei",
  mainIndex: 2,
  starterIndex: 2,
});
