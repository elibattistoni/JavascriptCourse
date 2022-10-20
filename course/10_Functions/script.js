"use strict";

//==============================================================================
//## DEFAULT PARAMETERS
//==============================================================================

const bookings = [];

const createBooking = function (
  flightNum,
  numPassenger = 1,
  price = 199 * numPassenger //numPassenger shoudl be defined before calling it
) {
  // set default (ES5)
  // numPassenger = numPassenger || 1;
  // price = price || 1;
  // ES6 : in the parameters
  const booking = {
    flightNum,
    numPassenger,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", undefined, 800); //NB undefined to skip a parameter!!

//==============================================================================
//## VALUE vs. REFERENCE (WHAT NOT TO DO!)
//==============================================================================

const flight = "LH234";
const passenger = {
  fullName: "Elisa Battistoni",
  passport: "123456789",
};

const checkIn = function (flight, passenger) {
  flight = "LH999";
  passenger.fullName = "Mrs. " + passenger.fullName;

  if (passenger.passport === "123456789") {
    // alert("Checked in");
    console.log("Checked in");
  } else {
    // alert("Wrong passport");
    console.log("Wrong passport");
  }
};

checkIn(flight, passenger);
console.log(flight);
console.log(passenger);

// IMPORTANT the object passenger has been changed
// IMPORTANT the string flight has not been changed
/// why? because when you call the function and pass the variable string (PRIMITIVE TYPE), JS creates a COPY of that variable
/// it does not create a copy of the object
// when we pass a reference type (object) to a function, what is copied is just a reference to the object in the memory heap,
// but they both point to the same object in memory

//==============================================================================
//## "passing by value" vs. "passing by reference"
//==============================================================================
/// JS does not have passing by reference, it has only passing by value

//==============================================================================
//## First-Class Functions and Higher Order Functions
//==============================================================================
/// first class functions === all functions are values
/// higher order function = function that receives another function as an argument, that returns a new function, or both (this is only possible because of first-class functions)
/// e.g. .addEventListener is a higher order function because ti gets as input another function
/// the function that is passed in is a "callback function", because the callback function will be called later by the higher order function

//==============================================================================
//## Functions accepting callback functions
//==============================================================================
// function that returns a string without space and lowercase
const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

// function that transforms the first word upper
const upperFirstWord = function (str) {
  const [firstWord, ...otherWords] = str.split(" "); //NB rest pattern
  return [firstWord.toUpperCase(), ...otherWords].join(" "); //NB spread operator
};

//= higher order function
const transformer = function (str, fn) {
  const result = fn(str);
  console.log(
    `The original string: ${str} was transformed into: ${result} by the function: ${fn.name}`
  );
  return result;
};

// transformer is the higher order function
transformer("JavaScript is the best!", upperFirstWord); // uppreFirstWord is the callback function
transformer("JavaScript is the best!", oneWord); // oneWord is the callback function

//NB in this case the callback function is also called "event handler" or "event listener"
const high5 = function () {
  console.log("HIGH FIVEEEE 👏");
};
document.body.addEventListener("click", high5);

//in arrays, forEach is a callback (we will see it later in the course)
["Jonas", "Marta", "Adam"].forEach(high5);

// IMPORTANT why callback functions are useful?
// 1. we can split the code in more reusable parts
// 2. they allow us to create abstractions
// ABSTRACITONS = we hide the detail of some code implementation because we don't really care about all that detail
// and this allows us to think about problems at a higher and more abstract level
// e.g. the transformer functino (the higher order function) does not care at all about how the string is transformed,
// it does not care about all that detail: basically it is delegating the string transformation to the other lower level functions

//==============================================================================
//## Functions returning functions: used in FUNCTIONAL PROGRAMMING
//==============================================================================

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet("Hey");
// greet returns a function, therefore if we store the result of greet in a variable, we can use that variable (which is actually a function)
// as a function, giving it the needed parameter
// NOTE this is CLOSURE: a complex mechanism that is part of JavaScript
greeterHey("Elisa");

// NB instead of storing the result in a variable, you can directly call the inner function
greet("Ciaoooo")("Franco");

const arrowGreet = (greeting) => (name) => console.log(`${greeting} ${name}`);
arrowGreet("Ciaoooo")("Franco");

//==============================================================================
//## THE CALL AND APPLY METHODS
//==============================================================================
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  // book: function()
  book(flightNum, passengerName) {
    console.log(
      `${passengerName} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    // we want the book method to add a new object to our bookings
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      passengerName,
    });
  },
};

lufthansa.book(239, "Elisa Battistoni");
lufthansa.book(643, "Franco Conci");

console.log(lufthansa);

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book;
// like this it is a regular function call (not a method) therefore if you call it you will get an error because the this keyword points to undefined (in strict mode)
// book(23, "Sarah");

lufthansa.book(111, "Cristina Pedroncelli");
console.log(lufthansa);

//IMPORTANT we need to explicitly/manually tell JavaScript what the this keyword should be like:
// if we want to book a Lufthansa flight, the this keyword should point to lufthansa
// but if you want to book an Eurowings flight, the this keyword should point to eurowings
// how?
// there are 3 function methods to do this:
//# call, apply, bind

//#::::::::::::::::
//= CALL
//#::::::::::::::::
//NB a function is just an object, and objects have methods, therefore functions can have methods too (the call method is one of them)
// in the call method, the first argument is what we want the this keyword to point to, then the rest of the arguments
// the call method call the book function with the this keyword set to eurowings
book.call(eurowings, 444, "Sara Grimaldi"); // all the arguments after the first one are simply the arguments of the original function
console.log(eurowings);

book.call(lufthansa, 777, "Mary Poppins");

const swiss = {
  airline: "Swiss Air Line",
  iataCode: "LX",
  bookings: [],
};

book.call(swiss, 693, "Grieke Gelderoos");
console.log(swiss);

//#::::::::::::::::
//= APPLY
//#::::::::::::::::
// similar method to the call method
// it does exactly the same thing; the only difference is that
// apply does not receive a list of arguments after the this keyword, it takes an array of arguments
const flightData = [438, "Marco Bianchi"];
book.apply(swiss, flightData);
console.log(swiss);

// best practice This apply method is not used anymore in modern JavaScript, because now we have a better way of doing the same thing
book.call(swiss, ...flightData);

//#::::::::::::::::
//= BIND
//#::::::::::::::::
// bind does not immediately call the function: it returns a new function where the this keyword is bound (where the this keyword is set to the input of bind)
// (it is set to whatever value we pass into bind)
// this makes it easier if you have to run the function multiplt times
// i.e. instead of having to use a call all the time, we can just bind once
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, "Steven Williams");

//NB in the "call" method, we cann pass multiple arguments besides the "named" this keyword; in the bind method we can do the same:
// (so that the parameters are set in stone; i.e. the function will always be called with the same argument)
const bookEW23 = book.bind(eurowings, 23);
// now the book function only needs a name:
bookEW23("Steven Williams 2 ");
bookEW23("Martha Cooper");
//IMPORTANT what we did above (i.e. specifying a part of the arguments beforehand, it is a common pattern called "partial application")
// PARTIAL APPLICATION = a part of the arguments of the original function are already applied/set

//# USE CASE N°1 of BIND
// useful application of the bind method: when we use objects together with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  // add a plane every time this function is called
  console.log(this.planes);
};

document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane);
// it returns NaN because the this keyword is the button element
//IMPORTANT: we have learned that in an event handler function, the this keyword always points to the element on which that handler is attached to
// i.e. the this keyword is attached to document.querySelector(".buy")
document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

//# USE CASE N°2 of BIND

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// if you are note interested in the this keyword, you set null
// the first argument of the bind method is the this keyword
// it could be any value because nothing will happen with it, but null is the standart to use
const addVAT = addTax.bind(null, 0.23);
// this is basically like writing:
// addVAT = value => value + value * 0.23
console.log(addVAT(100));
console.log(addVAT(200));
//NB the order of the arguments is important!
//IMPORTANT basically with the addVAT function we are creating a BRAND NEW FUNCTION that is MORE SPECIFIC, based on a general function (the addTax function)
// it is as if we have returned a new specific function fromthe addTax function

// challenge: do all this with the methdo of returning a function

const addTaxRate = function (rate) {
  return function (value) {
    value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addTaxRate(100));
console.log(addTaxRate(200));

//==============================================================================
//## IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE)
//==============================================================================
// sometimes we need a function that is only executed once and never again,
// i.e. a function that disappears right after it is called once
// we need this technique later with the async/await

const runOnce = function () {
  console.log("This will run ever and ever again");
};
runOnce();
runOnce();

// this is not what we want: we want to execute a function immediately and not even having to save it somewhere
(function () {
  console.log("This will run once and never run again");
})();
// above we transformed the statement that we had before into an expression (by wrapping the function in the parentheses)
// and run it by writing the parentheses()
// with the arrow expression:
(() => console.log("This arrow function will never run again"))();

// why is it important?
// functions create scopes, and one scope does not have access to variables from an inner scope
// i.e. in the global scope here we do not have access to the variables that are defined inside the functions (i.e. defined in the scope of any of these functions)
// the global scope does not have access to the function's inner scopes,
// but the funtions inner scope does have access to the global scope
// we say that:
//# all data defined inside a scope (e.g. inside a function) is "private" or "incapsulated" inside of that specific function scope
// (data encapsulation and data privacy are extremely important concepts in programming)
//NB it is important to hide variables, and scopes are a good tool for doing this

//IMPORTANT in ES6 variables declared with let or const create their own scope inside a block
{
  const constIsPrivate = 23;
  let letIsPrivate = 10;
  var varIsNotPrivate = 46;
}
// console.log(constIsPrivate); // error not defined
// console.log(letIsPrivate); // error not defined
console.log(varIsNotPrivate); // no error
// this is the reason why in modern JavaScript IIFE are not that used anymore
// because if we want to create a new scope for data privacy, all we need to do is to just create a block like this
// but IIFE is still useful when you want to run a function once only

//==============================================================================
//## CLOSURE: an important feature of JavaScript functions
//==============================================================================
// we don't create closures manually, like we create new arrays or functions
// closure happens automatically, we just need to recognize those situations

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`passengerCount: ${passengerCount}`);
  };
};

//NB in the function that is returned, the variable that is defined in the outer funciton is updated

const booker = secureBooking();
// therefore booker will be a function as well

booker();
booker();
booker();
// the booker function was able to increment passengerCount
// but how is it possible? how can the booker function update the passengerCount variable that
// is defined in the secureBooking function that actually has already finished executing?
// i.e. its execution context is no longer on the stack
// but the inner boker function is still able to access the passengerCount variable that
// is inside of the booker function (the passengerCount that should no longer exist)
//NB closure makes a function remember all the variables that existed at the function's birthplace essentially
// we can imagine the secureBooking function as being the birth place of this booker function
// and so this booker function remembers everything at its birthplace
//- closure == any function has always access to the variable environment of the execution context in which the function was created, even after the execution context is gone
//- therefore, closure is basically this variable environment (VE) attached to the function, exactly as it was ath the time and place the function was created
//- the booker function closed over its parent scoper or over its parent VE (and this includes all function arguments)
//- and this attached or closed over variable environment stays with the function forever
//- thanks to closure, a function does not lose connection to variables that existed at the function's birthplace
// what ahppens with the execution of the Booker function:
// the function attempts to increase the passengerCount variable
// however, this variable is not in the current scope
// so JS will immediately look into the closure and see if it can find the variable there
// and it does this even before looking at the scope chain:
// e.g. if there was a global passengerCount variable set to 10, it would still first use the one in the closure
// therefore closure has priority over the scope chain
// and so after running this function, passengerCount becomes 1
