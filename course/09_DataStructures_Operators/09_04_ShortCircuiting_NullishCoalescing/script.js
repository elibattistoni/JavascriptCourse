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
//## OR ||
//==============================================================================
console.log("-------------- OR -------------");

// the result of the OR || operator is not always a boolean
console.log(3 || "Elisa");
//IMPORTANT: boolean operators 1) use ANY data type, 2) return ANY data type, 3) do SHORT-CIRCUITING (short circuit evaluation)
//# short circuiting = if the first value is a truthy value, it will immediately return the first value,
//# JavaScript will not look at the other value/operator (it will not evaluate, it will not even look at it)
console.log("" || "Joans");
console.log(true || 0);
console.log(undefined || null); // it returns null even if null is a falsy value
console.log(undefined || 0 || "" || "Hello" || 23 || null);

// BEST PRACTICE do not do these things with if else statements but witht these operators!
// to assign a default value if a preoperty of an object does not exist:
//  uncomment to set the property and see how the short circuit evaluation behaves
// restaurant.numGuests = 23;
// restaurant.numGuests = 0; // this is problematic because this is the actual number of guests but it is a falsy value
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);
// instead of this we can use short cirtuiting
// if numGuests exists, assign it to guests2 else give the default number of 10
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

//==============================================================================
//## AND &&
//==============================================================================
console.log("-------------- AND -------------");
// works in the opposite operator of OR
//# the && operator short circuits when it encounters the first falsy value: if all are truthy values, it return the last element
//# whereas the || operator short circuits when it encounters the first truthy value: if all are falsy values, it returns the last element
console.log(0 && "Elisa");
console.log("Elisa" && undefined);
console.log("Elisa" && 35 && true && "ultimoelemento");

// to avoid an if else statement like the one below, which checks if a certain property or value exist
if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "ham");
}
// check if orderPizza exists, and if so, use it
restaurant.orderPizza && restaurant.orderPizza("mushrooms", "ham");

//==============================================================================
//## NULLISH COALESCING ??
//==============================================================================
console.log("-------------- NULLISH COALESCING -------------");
//# it works with the idea of nullish values (instead of falsy values)
// Nullish values are: null, undefined (NOT 0 or '')
restaurant.numGuests = 0;
const guests3 = restaurant.numGuests || 10; // this is problematic because 0 is the actual number of guests but it is a falsy value, therefore it will return 10
console.log(guests3);
const guests4 = restaurant.numGuests ?? 10;
console.log(guests4);
// 10 is assigned only if numGuests is null or undefined; if it were 0 or '', these values will be assigned to the const variable
restaurant.numGuests = null;
const guests5 = restaurant.numGuests || 10;
console.log(guests5);
const guests6 = restaurant.numGuests ?? 10;
console.log(guests6);
