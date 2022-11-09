/*
There are other module systems that have been used by JS in the past (NB they were not native JS):
1) AMD Modules
2) Common JS modules

Common JS modules are important because they have been used in Node.js for almost all its existence;
only very recently ES modules have actually been implemented in Node.js
(Node.js is a way of running JS on a web server, outisde of a browser)

The consequence is that almost all the modules in the npm repository still use the Common JS module system
(because originally npm was only intende for node, which uses common JS -- only later 
  the npm repository became the standard repo for the whole JS world, so we are stuck with Common JS)

Like ES6 modules, one file is one module
*/

//# EXPORT
// NB this does not work in the browser but it works in node.js
export.addToCart  = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

//# IMPORT
const {addToCart} = require("./shoppingCart.js")

/*
NB export. and require are not defined in the browser environment, but they are defined in Node.js
NB because they are part of the CommonJS specification

in the long run ES6 modules will probably replace all of these different module systems
*/