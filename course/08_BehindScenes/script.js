"use strict";

function calcAge(birthYear) {
  const age = 2037 - birthYear;
  // console.log(firstName); // looks in the global scope
  // console.log(lastName); // ReferenceError
  function printAge() {
    let output = `${firstName}, you are ${age} and born in ${birthYear}`;
    console.log("output in printAge " + output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millennial = true;

      //# Creating NEW variable with same name as outer scope's variable
      // does not affect the outer scope's variable value
      const firstName = "Cristina";

      //# Reassigning outer scope's variable
      // does affect the outer scope's variable value
      //NB reassignment does not behave like a new declaration!!
      output = "NEW OUTPUT";

      const str = `${firstName} you are a millennial`;
      console.log("str in if: " + str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str); // ReferenceError (const is block scoped)
    console.log("millennial in printAge:" + millennial); // ok var is function scoped
    console.log(`output after reassignment: ${output}`);
    // add(2, 3); // ReferenceError (functions are block scoped) NB but this is only true for strict mode! if you turn off strict mode you can call this function without error
  }
  printAge();

  return age;
}

const firstName = "Elisa";
calcAge(1991);
// console.log(age); // ReferenceError

//# HOISTING

//IMPORTANT the only function that you can use before defining the function is function declaration
// functions
console.log(addDecl(2, 3)); // you can call it before defining it
// console.log(addExpr(2, 3)); // you cannot call it before initialization
// console.log(addArrow(2, 3)); // same
// console.log(addExprVar);

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

// DO NOT
// var addExprVar = function (a, b) {
//   return a + b;
// };

//IMPORTANT FOR CLEAN CODE
// best practice: declare variables at the beginnig of each scope
// best practice: declare functions at the beginnig of each scope, and use them only after the declaration

// in the browser console if you type
// window
// window is the global object of javascript in the browser
// variables declared with const or let do not create properties on the window object
// instead, variables created with var, create properties on the window obejct

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);

//---------------------------------------------------------------------------
//# THIS keyword
//---------------------------------------------------------------------------

console.log(this); // this is the window global object

const calcAgeExpr = function (birthYear) {
  console.log(`calcAgeExpr 2037 - birthYear ${2037 - birthYear}`);
  console.log("this inside calcAgeExpr: ");
  console.log(this); //NB it is undefined
};
// regular function call ("regular function call" == calling a function without attaching it to an object)
calcAgeExpr(1991);
// it is udefined because we are in strict mode (in sloppy mode, it will be the global window object)

const calcAgeArrow = (birthYear) => {
  console.log(`calcAgeArrow 2037 - birthYear ${2037 - birthYear}`);
  console.log("this inside calcAgeArrow: ");
  console.log(this); //NB it is window because the arrow function does not get
  // its own this keyword, so instead the arrow function simply uses the
  // lexical this keyword (i.e. it uses the this keyword of its parent function or of its parent scope)
};
calcAgeArrow(1991);

console.log("JONAS");
const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge();
//NB when we have a method call, the this keyword inside of the method will be the object that is calling the method
// in this case, the jonas object
console.log("MATILDA");
const matilda = { year: 2017 };
// since functions are just values.....:
matilda.calcAge = jonas.calcAge; // this is called method borrowing
matilda.calcAge(); //NB the this keyword points to the object that is calling the method

const f = jonas.calcAge;
// f();

//other example with arrow functions
const elisa = {
  firstName: "Elisa",
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    // functions inside other functions
    //- solution 1: self
    // console.log("solution 1");
    // const self = this; // self or that
    // const isMillennial = function () {
    //   console.log(this);
    //   console.log(self);
    //   // console.log(this.year >= 1981 && this.year <= 1996);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    //- solution 2: arrow function (it is going to work because the arrow function does not have its own this keyword)
    console.log("solution 2");
    const isMillennial = () => {
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    // call the function
    isMillennial();
  },
  greet: () => console.log(`HEYYY ${this.firstName}`),
};
elisa.greet();
// which is the same as
console.log(window.firstName);
console.log(this.firstName);

// if in the global scope you had defined var firstName = "Elisa"
// then the this.firstName in the arrow function greet would have taken Elisa
// because with var you add a property to the window object
// BEST PRACTICE do not use an arrow function to define a method! always use a function expression

elisa.calcAge();

//---------------------------------------------------------------------------
//# arguments keyword (dealing with multiple parameters)
//---------------------------------------------------------------------------
const myAddExpr = function (a, b) {
  console.log(arguments);
  console.log(a, b);
  return a + b;
};
myAddExpr(2, 3);
myAddExpr(1, 2, 3, 4, 5, 6, 7, 8); // look at the console: the arguments keyword
// is legal for both function expressions and function declarations (but not in functiona rrows)
// but in modern js there are more updated ways of dealing with multiple arguments

//==============================================================================
//## Primitives vs. Objects (= Reference Types)
//==============================================================================
// https://developer.mozilla.org/en-US/docs/Glossary/Primitive
/// primitive types and reference types (objects) are stored differently in memory
/// a primitive (primitive value, primitive data type) is data that is not an object and has no methods or properties.
/// There are 7 primitive data types:
/// string
/// number
/// bigint
/// boolean
/// undefined
/// symbol
/// null
/// All primitives are immutable; that is, they cannot be altered. It is important not to confuse a primitive itself
/// with a variable assigned a primitive value. The variable may be reassigned to a new value,
/// but the existing value can not be changed in the ways that objects, arrays, and functions can be altered.
/// Primitives have no methods but still behave as if they do. When properties are accessed on primitives,
/// JavaScript auto-boxes the value into a wrapper object and accesses the property on that object instead.
//---------------------------------------------------------------------------
//# copies of variables
//---------------------------------------------------------------------------
console.log("copies of variables.....");
let age = 30;
console.log(age);
let oldAge = age;
console.log(oldAge);
age = 31;
console.log(oldAge);
console.log(age);
console.log("copies of objects.....CAREFUL!");
const me = {
  name: "Jonas",
  age: 30,
};
const friend = me;
friend.age = 27;
console.log("Me: ", me);
console.log("Friend: ", friend);
// me.age became 27 too!!

//IMPORTANT it is a misconception that all variables declared with const are immutable:
// it is only true for primitve values, but not for reference values
// whenever you think you are copying an object, you are actually simply creating
// a new variable that points to the exact same object

let lastName = "Williams";
let oldName = lastName;
lastName = "Davis";
console.log(lastName, oldName);

const jessica = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
};
const marriedJessica = jessica; // here you are simply adding another reference name to the same object
// this is simply just another variable in the stack which holds the reference to the original object
// so both of these two variables simply point to the same memory address in the heap
// because in the stack they both hold the same memory address reference
marriedJessica.lastName = "Davis";
console.log("Before marriage: ", jessica);
console.log("After marriage: ", marriedJessica);

// marriedJessica = {}; // this does not work because you have declared the object with const and in this way you are assigning a new value to a const variable (and you can't by definition)
//NB changing an object !== changing a property of an object

// best practice how to copy an object SAFELY
console.log("jessica copy");
const jessicaCopy = Object.assign({}, jessica);
console.log(jessicaCopy);
jessicaCopy.lastName = "Williams";
console.log(jessicaCopy);
//NB if we have an object inside another object, the inner object will still ahve the same problem (it will still point to the same place in memory)
//Object.assign only creates a shallow copy, not a deep copy (which is what we would like to have)
// usually you use an external library like Lo-Dash
