// from the previous lecture (the code directly in 17_ModernJS)
// you saw how ES6 modules work
// but before ES6 there was another way of implementing modules in JavaScript
// you will see it around

//####################
//= The Module Pattern
//####################
/// the main goal of the module pattern is:
/// 1. to encapsulate functionality
/// 2. to have private data
/// 3. to expose a public API

/// the best way of achieving this is simply by using a function (usually an IIFE)
/// a function gives us private data by default and allow us to return values (which can become the public API)

// NB an IIFE
// NB it is very important that this function is only created once,
// NB because the goal of this function is to create a new scope and return data just once
const ShoppingCart = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  // return something to return a public API
  return { addToCart, cart, totalPrice, totalQuantity };
})();

ShoppingCart.addToCart("apple", 4);
ShoppingCart.addToCart("pizza", 7);

console.log(ShoppingCart);
console.log(ShoppingCart.shippingCost); // undefined because private

// NB this works because of CLOSURE!!
// the IIFE function has returned a long ago (it was executed only once in the beginning)
// all it did was to return this object and assigned it to this variable
// but then we can use all of this and also manipulate the data that is inside the function
// NB remember that closure allows a function to have access to all the variables that were present at its birthplace
// e.g. it can still access shippinCost (you can see it in the log) even if shippingCost is not returned in the object

/// the problem is that if we want one module per file (like we have with ES6 modules)
/// then we would have to create different scripts and link all of them in the HTML file
/// several problems (among which you cannot bundle them together using a bundler)
// and using a bundler is very important in modern javascript
