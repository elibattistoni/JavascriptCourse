"use strict";

//=============================================================================
//# activating Strinct Mode
// it is a special mode that we can activate in js in order to write more secure code
// in order to do that, at the beginning of the file you have to write
// "use strict"
// no code before that statement, otherwise it will not work
// you can also activate strict code for a specific code block or function (but there is no point in doing that)
// the strict mode prevents us from writing bugged code
// 1) it does not allow us to do some things
// 2) it will create visible errors in the console (without the strict mode js will stay silent)

let hasDriverLicense = false;
const passTest = true;

if (passTest) {
  // hasDriveLicense = true; without strict mode this error will not appear in the console; with the strict mode you will see the error in the console
  hasDriverLicense = true;
}
if (hasDriverLicense) console.log("I can drive");

// the strict mode also introduces a short list of variable names that are reserved for features that might be added to the language in the future
// const interface = "Audio";
// const private = 534;
// with the strict mode you will get an error: Uncaught SyntaxError: Unexpected strict mode reserved word
// because js is reserving this word to a variable that it is going to implement in the future

//=============================================================================
//# functions
// function = piece of code that you can use over and over again
function logger() {
  console.log("My name is Elisa");
}

// calling, running, invoking a function
logger();

function fruitJuice(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges`;
  return juice;
}

const myJuice = fruitJuice(2, 3);
console.log(myJuice);

//=============================================================================
//# function declarations vs function expressions
// there are different ways for writing functions, and they work in different ways
console.log("function declarations vs function expressions");

//~ function declaration
function calculateAge(birthYear) {
  return 2037 - birthYear;
}
const age1 = calculateAge(1991);
// console.log(age1);

//~ function expression or anonymous function
const calculateAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = calculateAge2(1991);
// console.log(age2);

//! what is the big difference between function declaration and function expression?
/// we can call function declarations before they are defined in the code
const age3 = calcAge(1991);
console.log(age3);

function calcAge(myYear) {
  return 2022 - myYear;
}

// you cannot call function expressions before they are defined
//Uncaught ReferenceError: Cannot access 'calcAge2' before initialization

// which one to use? it's personal preference

//=============================================================================
//# arrow functions
console.log("arrow function");

/// arrow function = special form of function expression that is shorter and faster to write
const calcAge4 = (birthYear) => 2037 - birthYear;
// 1) no curly brackets
// 2) no need for return keyword

const age4 = calcAge4(1991);
console.log(age4);

const yearsUntilRetirement = (birthYear) => {
  const age = 2022 - birthYear;
  const retirement = 65 - age;
  return retirement;
};
console.log(yearsUntilRetirement(1991));

// multiple parameters
const yearsUntilRetirement2 = (birthYear, firstName) => {
  const age = 2022 - birthYear;
  const retirement = 65 - age;
  return `${firstName} still has to work ${retirement} years.`;
};
console.log(yearsUntilRetirement2(1991, "Elisa"));

//! big difference between arrow function vs traditional functions (function declaration and expression):
//! the arrow function do not get the 'this' keyword

//=============================================================================
//# functions calling other functions

function cutFruit(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruit(apples);
  const orangePieces = cutFruit(oranges);

  const juice = `Juice with ${applePieces} apple pieces and ${orangePieces} orange pieces.`;

  return juice;
}

console.log(fruitProcessor(2, 3));

//=============================================================================
//# introduction to ARRAYS (data structure -- the other is OBJECTS)

const friend1 = "Michael";
const friend2 = "Nicholas";
// not useful to write all
const friends = ["Michael", "Nicholas", "Gianni"]; // literal syntax
console.log(friends);

const newFriends = new Array("Giuseppe", "Michael", "Nicholas", "Gianni");
const years = new Array(1991, 1994, 1989, 1998);

// log the first element
console.log(friends[0]);
console.log(newFriends[2]);
console.log(years.length);
// get the last element
console.log(years[years.length - 1]);
// you can insert an expression, not a statement

// change or mutate the array
friends[2] = "Jay";
console.log(friends);
//! only primitive values are immutable when initialized with const
//! you can mutate arrays even if they are declared with const
//! you cannot replace the whole array
// friends = ["Bob", "Alice"];
// Uncaught TypeError: Assignment to constant variable.

//# arrays can hold values with different types at the same time
const miscArray = new Array(1, "ciao", false, undefined);
console.log(miscArray);

//# apply a function to some elements of an array
const calcUserAge = function (birthYear) {
  return 2022 - birthYear;
};
const userYears = new Array(1991, 1994, 1989, 2000, 1998);

const userAge0 = calcUserAge(userYears[0]);
const userAge2 = calcUserAge(userYears[2]);

const userAges = [calcUserAge(userYears[0]), calcUserAge(userYears[2])];
console.log(userAges);

//=============================================================================
//# basic array operations (methods)
// js has some built in functions that we can apply directly on arrays (methods = array operations)

/// push
/// the push method adds elements to the end of an array
const myFriends = ["Elisa", "Franco"];
myFriends.push("Alberto");
console.log(myFriends);

// the push method is a function that returns the length of the array, therefore:
const lenFriends = myFriends.push("Xavi");
console.log(myFriends);
console.log(lenFriends);

/// unshift
/// the unshift methods adds elements to the beginning of an array
myFriends.unshift("Giovanni");
console.log(myFriends);
const whatIs = myFriends.unshift("Noriberto"); // it also returns the length
console.log(myFriends);
console.log(myFriends.length);
console.log(`whatIs ${whatIs}`);

/// pop
/// removes the last element of the array
myFriends.pop();
console.log(myFriends);
// the pop method returns the removed element
const removedFriend = myFriends.pop();
console.log(myFriends);
console.log(removedFriend);

/// shift
/// remove first element of array
console.log("shift");

console.log(myFriends);
myFriends.shift();
const whatRemoved = myFriends.shift();
console.log(myFriends);
console.log(whatRemoved);

/// indexOf
/// in which position a certain element is in the array
console.log(myFriends.indexOf("Elisa"));
// you will get -1 if the element is not present

/// includes
/// returns true if an element is in the array, otherwise false
// this uses strict equality
console.log(myFriends.includes("Elisa"));
console.log(myFriends.includes("Bob"));

if (myFriends.includes("Elisa")) {
  console.log("myFriends includes Elisa");
}

//=============================================================================
//# objects
// 2 types of data structure: arrays, objects
// objects are basically python dictionaries, where keys can also be called properties

//# object literal syntax
const elisa = {
  firstName: "Elisa",
  lastName: "Battistoni",
  age: 2022 - 1991,
  job: "unknown",
  friends: ["Franco", "Alberto"],
};

//# retrieve and edit information of an object
//# dot vs bracket notation
console.log(elisa);

// dot notation (real property name --> best this when possible)
console.log(elisa.firstName);
// bracket notation (computed property name)
console.log(elisa["firstName"]);
const nameKey = "Name";
console.log(elisa["first" + nameKey]);
console.log(elisa["last" + nameKey]);

//! if you try to access a property that does not exist, you get undefined
console.log(elisa["djkfgbsdkj"]);

//! add new properties
elisa.blabla = "blabla";
console.log(elisa);

elisa["kkk"] = "kkkValue";
console.log(elisa);

const accessProperty = prompt("What property do you want to access?");
console.log(elisa[accessProperty]); // in this case accessProperty is interpreted as a variable whose value is the property of the object
console.log(elisa.accessProperty); // in this case accessProperty is interpreted as a property of the object

if (elisa[accessProperty]) {
  console.log(elisa[accessProperty]);
} else {
  console.log("Wrong request");
}

console.log(
  `${elisa.firstName} has ${elisa.friends.length} friends, and her best friend is called ${elisa.friends[0]}.`
);

//=============================================================================
//# object methods

/// in the key-value pair, the value can also be a function
console.log("elisa2");
const elisa2 = {
  firstName: "Elisa",
  lastName: "Battistoni",
  birthYear: 1991,
  job: "unknown",
  friends: ["Franco", "Alberto"],
  hasDriverLicense: true,
  calcAge: function (birthYear) {
    return 2022 - birthYear;
  },
};
// any function (written as a function expression) that is attached to an object is called "method"
// a method is also a property
console.log(elisa2.calcAge(1991));
// you can also use the bracket notation
console.log(elisa2["calcAge"](1991));
// since the birth year is already present in the object you can access the property

//=============================================================================
//# this
// in every method, js gives us access to a special variable called this
// we can read the birth year from the object itself without having to pass it in as a parameter into the function
/// the this keyword or the this variable is equal to the object on which the method is called (equal to the object calling the method)
console.log("elisa3");
const elisa3 = {
  firstName: "Elisa",
  lastName: "Battistoni",
  birthYear: 1991,
  calcAge: function () {
    console.log(this); // this points to the object elisa
    return 2022 - this.birthYear;
  },
};
console.log(elisa3.calcAge());

//# this
/// you can use the this keyword to store a new property
// this is the most efficient solution
console.log("elisa4");
const elisa4 = {
  firstName: "Elisa",
  lastName: "Battistoni",
  birthYear: 1991,
  calcAge: function () {
    this.age = 2022 - this.birthYear;
    return this.age; // best practice to return the computed result
  },
};
console.log(elisa4.calcAge()); /// you have to call it first and then you can access the property created after running the function
console.log(elisa4.age);

// exercise
console.log("mySummary");

const mySummary = {
  firstName: "ELisa",
  lastName: "Battistoni",
  birthYear: 1991,
  hasDriverLicense: false, // true
  calcAge: function () {
    this.age = 2022 - this.birthYear;
    return this.age; // best practice to return the computed result
  },
  getSummary: function () {
    this.summary = `${this.firstName} - ${this.lastName} - ${
      this.birthYear
    } - ${this.calcAge()} - has ${
      this.hasDriverLicense ? "a" : "no"
    } driver license`;
    return this.summary;
  },
};

mySummary.getSummary();
console.log(mySummary.summary);

// arrays are a special kind of objects (see how you call the push etc methods on them)

//=============================================================================
//# loops
// rep++ is equal to rep = rep+1
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting repetition ${rep}`);
}

console.log("Loop on array");

//# loop through arrays
const myArray1 = [
  "Elisa",
  "Battistoni",
  2037 - 1991,
  "developer",
  ["Franco", "Cristina", "Alberto"],
  true,
];

const newArray = [];
for (let i = 0; i < myArray1.length; i++) {
  console.log(myArray1[i], typeof myArray1[i]);
  newArray.push(typeof myArray1[i]);
  // alternatively:
  // newArray[i] = typeOf myArray[i]
}
console.log(newArray);

//# continue === exit the current iteration of the loop and continue to the next one
console.log("------ ONLY STRINGS ------");
for (let i = 0; i < myArray1.length; i++) {
  if (typeof myArray1[i] !== "string") continue;
  console.log(myArray1[i], typeof myArray1[i]);
}

//# break === completely terminate the whole loop
console.log("------ BREAK LOOP ------");
for (let i = 0; i < myArray1.length; i++) {
  if (typeof myArray1[i] === "number") break;
  console.log(myArray1[i], typeof myArray1[i]);
}

//=============================================================================
//# loop backwards
const myArray2 = [
  "Elisa",
  "Battistoni",
  2037 - 1991,
  "developer",
  ["Franco", "Cristina", "Alberto"],
  true,
];

for (let i = myArray2.length - 1; i >= 0; i--) {
  console.log(myArray2[i]);
}

//=============================================================================
//# while loop

let rep = 1;
while (rep <= 10) {
  console.log(`${rep}`);
  rep++;
}

let dice = Math.random() * 6; // float (decimal)
console.log(dice);

// dice2
let dice2 = Math.trunc(Math.random() * 6) + 1; // int
console.log(dice2);

while (dice2 !== 6) {
  dice2 = Math.trunc(Math.random() * 6) + 1;
  console.log(`you rolled a dice2 ${dice2}`);
  if (dice2 === 6) console.log("Loop is about to end...");
}
