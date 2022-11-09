"use strict";

/*
# 3 main areas of FUNCTIONAL PROGRAMMING in JS:
# 1) Immutability
# 2) Side effects and pure functions
# 3) Data transformation with pure functions such as .map() .filter() .reduce()

*/

//================================================
//## Immutability, side effects and pure functions
//================================================
// in JS there is a way to make a data structure (an array or object) immutable
//- Object.freeze()

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const budget = Object.freeze([
  { value: 250, description: "Sold old TV 📺", user: "jonas" },
  { value: -45, description: "Groceries 🥑", user: "jonas" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
  { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
  { value: -1100, description: "New iPhone 📱", user: "jonas" },
  { value: -20, description: "Candy 🍭", user: "matilda" },
  { value: -125, description: "Toys 🚂", user: "matilda" },
  { value: -1800, description: "New Laptop 💻", user: "jonas" },
]);

// NB now spendingLimits is immutable, i.e. we can no longer put any new properties into it
// spendingLimits.jay = 200; /// ERROR: Object is not extensible

// NB Object.freeze() freezes only the first level of the object, it is not a "deep freeze", so you can still edit the object in its deep levels

// console.log(spendingLimits);
// console.log(spendingLimits?.jonas ?? "not found");
// console.log(spendingLimits?.patrick ?? "not found");
// const limit = spendingLimits[user] ? spendingLimits.user : 0; // otherwise by teacher

// const getLimit = (user) => spendingLimits?.[user] ?? 0;
const getLimit = (limits, user) => limits?.[user] ?? 0; // PURE VERSION

const addExpense = function (
  state,
  limits,
  value,
  description,
  user = "jonas"
) {
  // NB this is an IMPURE FUNCTION
  // NB if you freeze the budget array, this function will have SIDE EFFECTS
  // NB because it manipulates something that is outisde of the function,
  // NB and the function does something other than simply returning a value
  // NB you solve this with:
  //# 1. always pass all the data that the function depends on, into the function, so that it does not have to reach into the outer scope
  //# 2. the function should not change any of these values (it should not mutate them): you should create a copy and then return the copy of the state (of the data)
  // NB now it is a pure function! it does not have any more side effects
  // create a new user instead of mutating the original
  // user = user.toLowerCase();
  const cleanUser = user.toLowerCase();

  // instead of manipulating the original object we create a copy with [...] and add another object
  // budget.push({ value: -value, description, user: cleanUser }); // enhanced object literal
  // add else that if the value is beyond the limit, it will return the original state
  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
// NB now calling addExpense will not mutate the original object budget
// so if we want to do something with the budget, we need to store something
const newBudget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  1000,
  "Going to movies 🍿",
  "Matilda"
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, "Stuff", "Jay");
console.log("newBudget1", newBudget1);
console.log("newBudget2", newBudget2);
console.log("newBudget3", newBudget3);
console.log("budget original", budget);

// NB in the real world we use something called COMPOSING and the technique CURRYING to create a chain of operations like this
// the one above is a chain of add expenses, and in the real world big functional application we would use composing to create one function
// which will then perform all of these operations at once

//======================
//## Data transformation
//======================
const checkExpenses = function (state, limits) {
  return state.map((entry) => {
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: "limit" } // this returns a copy of entry with another property
      : entry;
  });
  // for (const entry of budget)
  //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = "limit";
};
const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log("finalBudget", finalBudget);

// transformed to arrow function
const checkExpenses2 = (state, limits) =>
  state.map((entry) =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: "limit" }
      : entry
  );
// this is a pure function because it does not mutate anything because .map() returns a brand new array

// NB this is an impure function because it creates side effects by doing console.log()
// NB console logs are impure because they do something (but all programs need some side effects)
const logbigExpenses = function (state, bigLimit) {
  // NB this was imperative
  // let output = "";
  // for (const entry of budget)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : "";
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);

  // NB this is functional
  const bigExpenses = state
    .filter((entry) => entry.value <= -bigLimit)
    .map((entry) => entry.description.slice(-2))
    .join(" / ");
  console.log(bigExpenses);
  // same as:
  const bigExpenses2 = state
    .filter((entry) => entry.value <= -bigLimit)
    .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, "");
  console.log(bigExpenses2);
};

logbigExpenses(finalBudget, 1000);
