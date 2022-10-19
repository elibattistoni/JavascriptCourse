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
