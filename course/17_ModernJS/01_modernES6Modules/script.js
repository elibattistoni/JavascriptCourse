// Importing module
/// importing: method 1
import {
  addToCart,
  totalPrice,
  totalQuantity as quantity,
  iAm,
} from "./shoppingCart.js";
// import "./shoppingCart"; // you can import also without the extension
// you can rename the variables in the import with "as"
// we can import all the exports of a module at the same time with:
console.log("Importing module");
// console.log(shippingCost); // error not defined because top level variables in modules are private

addToCart("bread", 5);

console.log(totalPrice);
console.log(quantity);
console.log(iAm);

/// importing: method 2
import * as ShoppingCart from "./shoppingCart.js";
// it is a convention with the capital first letter, like a class
// we import everything into an object, and this object will contain everything that is exported from the module
// this will basically create a namespace for all the values exported from that module
ShoppingCart.addToCart("banana", 3);
// basically now this module is exporting a public api
console.log(ShoppingCart.totalPrice);
// it is as if this object was an object created from a class, which has these methods and properties
// we can say that a module exports kind of a public API, because everything else stays private inside of the module

//NOTE that here we are importing the same module multiple times but it is just for explanation purposes!
// best practice to import it only once

/// default exports
import printMsg from "./shoppingCart.js";
printMsg("BANANITA");

/// you can have named import/export and default import/export at the same time

/*
import printMsg, {
  addToCart,
  totalPrice,
  totalQuantity,
  iAm,
} from "./shoppingCart.js";
*/
// NB again, this is just for explanation purposes
// best practice: DO NOT MIX NAMED AND DEFAULT EXPORTS/IMPORTS

/// LIVE CONNECTION: IMPORTS ARE NOT COPIES OF THE EXPORTS: they are a live connection and they point to the same place in memory
// we exported cart = []
// but now it is filled
import { cart } from "./shoppingCart.js";
console.log(cart);
