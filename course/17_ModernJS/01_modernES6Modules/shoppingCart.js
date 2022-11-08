// Exporting module
console.log("Exporting module");

// NB all top level variables are private inside of this module
const shippingCost = 10;
export const cart = [];

// NB in ES6 modules there are 2 types of exports: 1) NAMED EXPORTS and 2) DEFAULT EXPORTS

//###############
//= NAMED EXPORTS
//###############

// NAMED EXPORTS are the simplest way:
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};
// with named imports you have to use exactly the same names for the exported/imported values
// NB exports need to happen always in top level code

// you can export multiple things at the same time
const totalPrice = 237;
const totalQuantity = 23;
const iAmHereBecauseIdontKnowWhatElseToWrite = "blablabla";

export {
  totalPrice,
  totalQuantity,
  iAmHereBecauseIdontKnowWhatElseToWrite as iAm,
};
// you can rename variables within the export

//#################
//= DEFAULT EXPORTS
//#################
// NB we use default exports when we want to export only one thing per module

export default function (msg) {
  console.log(
    `This is the default export, a function that only logs an input message: ${msg}`
  );
}
