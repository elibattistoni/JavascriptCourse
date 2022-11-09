///////////////////////////////////////
// Exporting and Importing in ES6 Modules

console.log("Importing module");

import { addToCart, cart } from "./shoppingCart.js";
addToCart("pizza", 2);
addToCart("bread", 5);
addToCart("apples", 4);

console.log(cart);

///////////////////////////////////////
// Introduction to NPM
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from "lodash-es";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}

//////////////////////////////////
// let's write some code that is not part of the preset-env here https://babeljs.io/docs/en/presets
// because this preset-env actually includes only final features (i.e. features that are already part of the language)
// NB this is just for explanation purposes on transpiling and polyfilling
class Person {
  #greeting = "Hey";
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }

  _sayHiAgain() {
    console.log(`Say Hi again ${this.name}`);
  }
}
const jonas = new Person("Jonas");
console.log("Jonas" ?? null);
console.log(cart.find((el) => el.quantity >= 2));
Promise.resolve("TEST").then((x) => console.log(x));

///////////////////////////////////////////
// polyfilling
import "core-js/stable";
// NB
import "regenerator-runtime/runtime"; // for polyfilling async functions
