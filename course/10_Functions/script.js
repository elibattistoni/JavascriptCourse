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
