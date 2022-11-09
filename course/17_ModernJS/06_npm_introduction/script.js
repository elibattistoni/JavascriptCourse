import { addToCart, totalPrice, totalQuantity, cart } from "./shoppingCart.js";
// we are specifying the whole path but with parcel this is not necessary
// NB in module bundlers it is not necessary to specify the entire path
// NB (it will automatically find the path to this module)
// NB this works for all kinds of assets (even with HTML, CSS, SAAS, images, and ofc modules -- not only ES6 modules but also Common JS modules)
// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
import cloneDeep from "lodash-es";
// you can also import Common JS modules (like the commented line below) and Parcel is smart enough to also install that library
// import cloneDeep from "lodash"
// NB in this way we can then simply use all the modules that are available on NPM (also older ones that use older module formats)

console.log("Importing module");

addToCart("apple", 4);
addToCart("pizza", 7);
console.log(cart);

// it is very hard to copy nested objects
const state = {
  cart: [
    {
      product: "bread",
      quantity: 5,
    },
    {
      product: "pizza",
      quantity: 7,
    },
  ],
  user: { loggedIn: true },
};
// this is a deeply nested object

// copying the object with JS
const stateClone = Object.assign({}, state);
console.log(stateClone);
// if you change a value in the original object
state.user.loggedIn = false;
// it changes also in the cloned object
console.log(stateClone);

// NB it does not create a deep copy or deep clone of an object, and creating it manually is a lot of work
// NB instead, we use this function given by lodash

const stateDeepClone = cloneDeep(state);
console.log(stateDeepClone);
state.user.loggedIn = true;
console.log(stateDeepClone);

//# HOT MODULE REPLACEMENT or RELOADING
// this is for Parcel
// you can not have errors because now you are running it with parcel
// if you run this with live-server and the browser, it will not understand it
if (module.hot) {
  module.hot.accept();
}
/*
HOT MODULE RELOADING = whenever we change one of the modules, it will trigger a 
rebuild, but then the new modified bundle will then automatically get injected 
into the browser without triggering a whole page reload; again: when we 
change something here, this will then not reload this part of the page 
(NB and this is amazing for maintaining state on our page whenever we are 
  testing out something)

e.g. in our bankist app, whenever we reloaded the page, we needed to login again into the application
but with parcel and hot module replacement, this is not needed because the page will not reload, the state will be maintained
*/
