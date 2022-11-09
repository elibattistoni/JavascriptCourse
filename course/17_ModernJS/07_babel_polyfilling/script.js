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
