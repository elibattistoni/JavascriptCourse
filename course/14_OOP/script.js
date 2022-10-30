"use strict";

// in JS we have PROTOTYPES
// all objects in JS are linked to a certain prototype object
// so we say that "each object has a prototype"
// the prototype object contains methods and properties that all the objects
// that are linked to that prototype can access and use
// this behavior is called PROTOTYPAL INHERITANCE
/// PROTOTYPAL INHERITANCE or DELEGATION = all objects that are linked to a certain prototype object can use (inherit) methods and properties defined in the prototype
// NB this is not class inheritance
// - class inheritance means that one class inherits from another class
/// this is very different: pin rototypal inheritance, an instance inherits from a class
// technically objects (instances) delegate behavior (methods) to the prototype
// in classical OOP, the behavior (methods) is actually copied from the class to the class or object (and this is completely different from JS OOP)

/// 4 pillars of OOP
/// 1. Abstraction
/// 2. Encapsulation
/// 3. Inheritance
/// 4. Polymorphism

//==============================================================================
//# CONSTRUCTOR FUNCTIONS and the NEW OPERATOR
//==============================================================================
// we can use constructor functions to build an object using a function

//in OOP there is the convention that CONSTRUCTOR FUNCTIONS always start with a capital letter
// we can use a function expression (like the example below) or a function declaration, but you cannot use an arrow function because it does not have the this keyword
// this function is going to produce an object
const Person = function (firstName, birthYear) {
  console.log(this);
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  console.log(this);

  // IMPORTANT you should never create a method inside of a constructor function!!
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};
// NB the only difference between a regular function and a costructor function is that we call the constructor using the "new" keyword
const jonas = new Person("Jonas", 1991);

//~ the new operator is a special type of operator which, when it calls the functions, does much more than simply calling a function:
//~ 1. it creates a New empty object: New{} is created
//~ 2. the function is called, and in this function call the this keyword is set to the newly created object at point 1.: this = {}
//~ 3. the newly created object is linked to a prototype (this will create the __proto__ property and set its value to the prototype property of the constructor function that is being called i.e. Person.prototype) and this is how JS internally knows that the Jonas object is connected to Person.prototype
//~ 4. the object that is created in the beginning is automatically returned from the constructor function; i.e. the function automatically returns the empty object from the beginning (i.e. the this keyword will be automatically returned)
//~ this is how it works with function constructors and also with ES6 classes, but not with Object.create()

const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);

// NB we didn't technically create a class because JS doesn't really have classes in the traditional OOP sense
// but we created 3 objects from 1 constructor function
// constructor functions have been used since the beginning of JS to kind of simulate classes, therefore
/// we can say that Jonas; Matilda and Jack are instances of Person

// you can check to see if something is an instance of something
console.log(jonas instanceof Person); // true

//==============================================================================
//# PROTOTYPES
//==============================================================================
console.log("-------- PROTOTYPES --------");
// every function in JS has automatically a property called PROTOTYPE (also constructor functions have this property)
// and every object that is created by a certain constructor function gets access to all the methods and properties that
// we define on the constructor's prototype property
Person.prototype;
console.log(Person.prototype);
// all the objects that are created through this constructor function will inherit (get access) to all methods and properties
// that are defined on this prototype property Person.prototype
// Person.prototype is an object, therefore:
Person.prototype.calcAge = function () {
  console.log(2013 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();
jack.calcAge();

// the prototype of jonas, matilda, jasck is Person.prototype
console.log(jonas.__proto__); // this is not the prototype property, but it is simply the prototype

// the prototype of the jonas object is the prototype property of the constructor function
console.log(jonas.__proto__ === Person.prototype); // true: jonas prototype (jonas.__proto__) is the prototype property of the person constructor function (Person.prototype)

console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(jack)); // true

// Person.prototype is not the prototype of person
// Person.prototype is what's going to be used as the prototype of all the objects that are created with the person constructor function
console.log(Person.prototype.isPrototypeOf(Person)); // false

/// to make it easier, think of .prototype as equal to .prototypeOfLinkedObjects

// NB you can also set properties on the prototype, not just methods
Person.prototype.species = "Homo Sapiens";
console.log(jonas, matilda);
console.log(jonas.species, matilda.species);
// but this property is not directly in the object (it is not it's own property)
// own properties are only the ones that are declared directly on the object itself, not including the inherited properties
// in JS you can check this:

console.log(
  'jonas.hasOwnProperty("firstName"):',
  jonas.hasOwnProperty("firstName")
); // this works because of the NB PROTOTYPE CHAIN!

console.log(
  'jonas.hasOwnProperty("species"):',
  jonas.hasOwnProperty("species")
);

//==============================================================================
//# PROTOTYPAL INHERITANCE & the PROTOTYPE CHAIN
//==============================================================================
console.log("-------- PROTOTYPAL INHERITANCE & PROTOTYPE CHAIN --------");
console.log(Person.prototype.constructor);

// the jonas object and its prototype form a prototype chain

// the prototype of Person.prototype is Object.prototype

// the prototype chain is pretty similar to the scope chain, but instead of working with scopes, it works with properties and methods in objects

//==============================================================================
//# PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS
//==============================================================================
console.log("-------- PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS --------");
console.log(Person.prototype);
console.log(jonas.__proto__); // inspect: this is the Person prototype
console.log(jonas.__proto__.__proto__); // inspect: this is the prototype property of Object (you see it because there is the method .hasOwnProperty) and this is why you can call it on jonas
console.log(jonas.__proto__.__proto__.__proto__); // inspect: null because Object.prototype (in the line above) is the top of the prototype chain
console.dir(Person.prototype.constructor); // this points to the constructor function itself (NB console.dir())

// a function is also an object, therefore it has a prototype

/// prototype of arrays
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // this is like doing new Array = [1,2,3,4,5,6,7,8,9]
console.log(arr.__proto__); // inspect: this is the prototype of array, and you can see all the methods that you already know
/// this is the reason why all the arrays get access to all of these methods:
// of course, each array does not contain all of these methods, but instead, each array inherits these methods from its prototype

console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__); // inspect: this is Object.prototype
console.log(arr.__proto__.__proto__ === Object.prototype); // inspect: this is Object.prototype

// in the documentation (e.g. MDN) for filter, you see Array.prototype.filter() because the filter method lives in the prototype property of the Array constructor

//# Defining new methods
// we know that an array inherits all the methods from its prototype; therefore, we can use this knowledge to extend the functionality of arrays even further
// you can add any new method to the prototype in this way:
Array.prototype.unique = function () {
  return [...new Set(this)]; //NB this is the array on which the method will be called
};
Array.prototype.calcAverage = function () {
  return this.reduce((a, b) => a + b, 0) / this.length;
};
// and all the arrays would inherit it
console.log(arr.unique());
console.log(arr.calcAverage());
// NB we just added a new method to the prototype property of the array constructor, and therefore all arrays will inherit this method; then we can call that method on any array that we want
/// IMPORTANT extending the prototype of a built-in object is generally not a good idea: why?
/// 1. the next version of JS might ass a method with the same name that we are adding, but it might work in a different way, and your code will then use that new method which works differently and might break your code
/// 2. when you work on a team of developers then this is a bad idea because if multiple developers implement the same method with a different name, then it's going to create many bugs

const h1 = document.querySelector("h1");
console.dir(h1); //inspect: this is to get the actual object; the prototype is an HTMLHeadingElement and its prototype is an HTMLElement, and its prototype is Element, and the prototype of Element is Node
// and its prototype is EventTarget (this is a huge prototype chain!!) and its prototype is Object (and this is the end)

/// prototype of functions
console.dir((x) => x + 1); // its prototype contsins the methods we have previously used on fuctions: apply, bind, call,...
