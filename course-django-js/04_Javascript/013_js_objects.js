//! Javascript Objects
// js objects are hash-tables, they store information in a key-value pair
// in other languages they are known as dictionary
// js objects do not retain order
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
// https://www.w3schools.com/js/js_objects.asp

var carInfo = { make: "Toyota", year: 1990, model: "Camry" };
console.log(carInfo);
carInfo["make"];
console.log(carInfo["make"]);

var myNewO = { a: "hello", b: [1, 2, 3], c: { inside: ["a", "b"] } };
console.log(myNewO);
console.log(myNewO["b"][1]);
console.log(myNewO["c"]["inside"][1]);

//! CHANGE A VALUE
carInfo["year"] = 2006;
console.log(carInfo);
carInfo["year"] += 1;
console.log(carInfo);
// in orer to see the full object in the console log of the browser:
//console.gir(carInfo)

//! ITERATE IN AN OBJECT
for (key in carInfo) {
  console.log(key);
}

//! OBJECT METHODS
// object methods are functions that are inside of an Object
var carInfo = {
  make: "Toyota",
  year: 1990,
  model: "Camry",
  carAlert: function () {
    alert("We've got a car here!");
  },
};

//! this
// if in the method (function) you want to use some key value pairs that are inside the object
// the *this* keyword acts differently depending on the situation
// for a JS Objectm the *this* is set to the object the method is called on
var myObj = {
  prop: 38,
  reportProp: function () {
    return this.prop;
  },
};
console.log(myObj.reportProp());

//! https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this

var simple = {
  prop: "Hello",
  myMethod: function () {
    console.log("The myMethod was called");
  },
};
console.log(simple);
console.log(simple.myMethod);
simple.myMethod();

var myObj = {
  name: "Elisa",
  greet: function () {
    console.log("Hello " + this.name);
  },
};
myObj.greet()