console.log("Exporting module");

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const shippingCost = 10;
export const cart = [];

export const totalPrice = 237;
export const totalQuantity = 23;
