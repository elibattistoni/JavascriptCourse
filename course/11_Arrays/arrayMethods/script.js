"use strict";

//==============================================================================
//## Array methods
//==============================================================================
console.log("-------------- Array Methods --------------");
// methods are functions that we can call on objects (functions attached to objects)
// and if we have array methods, this means that arrays are also objects

let arr = ["a", "b", "c", "d", "e"];

console.log("-------------- .slice() --------------");
//# slice() slice an array
// with the slice method, we can extract part of the array without changing the original array
//NB this method does not mutate the original array, it returns a new array
console.log(arr.slice(2)); // begin parameter
console.log(arr.slice(2, 4)); // begin and enf parameter --> with 4 it actually ends at 3
// negative index for the begin parameter (it starts to copy from the end of the array)
console.log(arr.slice(-2)); // takes the last 2 elements
// negative index for the end parameter
console.log(arr.slice(1, -2)); // from idx number one, then everything except the last two

//NB to create a shallow copy of an array
console.log(arr.slice()); // wthout arguments
console.log([...arr]);

console.log("-------------- .splice() --------------");
//# .splice() DELETE ELEMENTS FROM
//NB it mutates the original array!!!
console.log(arr.splice(2));
console.log(arr); //IMPORTANT the original array has changed! the extracted elements are gone from the original array

arr = ["a", "b", "c", "d", "e"];
// commonly used to remove the last element
arr.splice(-1);
console.log(arr);
// different parameters compared to the slice method: (start: idxSart, end: numElementsWeWantToDelete)
let arr2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr2.splice(2, 3);
console.log(arr2);

console.log("-------------- .reverse() --------------");
//# reverse()
//NB it mutates the original array
const arr3 = ["g", "e", "o", "t", "u"];
arr3.reverse();
console.log(arr3);

console.log("-------------- .concat() --------------");
//# concat
const letters = arr.concat(arr3);
console.log(letters);
console.log([...arr, ...arr3]);

console.log("-------------- .join() --------------");
//# join
console.log(letters.join("--"));

//==============================================================================
//## the new .at() method
//==============================================================================
console.log("-------------- .at() method --------------");
// to take an element out of the array
const arrA = [5, 3, 7, 9, 3, 2];
console.log(arrA[0]);
console.log(arrA.at(0));

//- getting the last element of an array
console.log(arrA[arrA.length - 1]); // minus 1 because the indexes are zero based
console.log(arrA.slice(-1)[0]); // take the slice of the array with only the last value, then the only element that is in that array
console.log(arrA.at(-1));

//NB the at method also works on strings
console.log("Elisa".at(0));
console.log("ElisaB".at(-1));

//==============================================================================
//## looping over arrays with the forEach method
//# forEach on arrays
//==============================================================================
// we have already learned to loop over arrays with the forof method
// but the forEach method is completely different
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
  // if you want to access the index: (const [i, movement] of movements.entries())
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

console.log("-------------- forEach on Arrays --------------");
// the forEach methods is a higher order function that requires a callback function
// but when does forEach call this callback function?
//NB the forEach method loops over the array and on each iteration it executes the callback function
//NB and as the forEach method calls this callback function on each iteration, it will pass the current element of the array as the argument
// you can give any name you want
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});
//NB actually the forEach method passes in input; the element, the indec and the whole array
// therfore we can specify them in the input parameters

//NB the order is important!! (mov, i, arr)
movements.forEach(function (mov, i, arr) {
  console.log(`movement: ${mov}`);
  console.log(`index: ${i}`);
  console.log(`array: ${arr}`);
});

//IMPORTANT: forEach or for...of?
//- you cannot break out of .forEach() loop (the continue and break statement do not work): it will always loop over the entire array
//- other than that, personal preference

//==============================================================================
//## forEach on maps and sets
//==============================================================================
console.log("-------------- forEach on Map --------------");
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (value, key, map) {
  console.log(`key: ${key} - value: ${value}`);
});

console.log("-------------- forEach on Sets --------------");
const currencySet = new Set(["USD", "USD", "EUR", "GBP", "GBP"]);
console.log(currencySet);
currencySet.forEach(function (value, key, set) {
  // in this case you can also do (value, _, set) because the first and second value are equal
  console.log(`key: ${key} - value: ${value} - set ${set}`);
});
//NB key and value, in the forEach for sets, are equal

//==============================================================================
//## Data transformation: map, filter, reduce
//==============================================================================
// in JS there are 3 important methods for data transformation
// we use these methods to create new arrays based on transforming data from other arrays

//## MAP --> another method for looping over arrays
//NB similar to the forEach method, but the big difference is that map creates a brand new array based on the original array
// it maps the values of the original array to a new array

//## FILTER
// it filters elements that satisfy a certain condition (creates a new array)

//## REDUCE
// boil down all the elements of the original array into one single value
// e.g. add all the elements of an array together (we need to specify an operation in which we have an accumulator variable, and it keeps adding elements to the accumulator)
// it is the final value that gets returned from the reduce method in the end

//==============================================================================
//## .map() method
//==============================================================================
// convert to dollars

const movementsEur = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
const movementsUsd = movementsEur.map(function (value) {
  return value * eurToUsd;
});

console.log(movementsEur);
console.log(movementsUsd);

// the alternative to .map() is that you loop over the old array and push, on each iteration,
// an element to the new array
const movementsUSDfor = [];
for (const mov of movementsEur) {
  movementsUSDfor.push(mov * eurToUsd);
}
console.log(movementsUSDfor);

//best practice the map method is more in line with functional programming

//IMPORTANT use map with arrow function when possible

const movUSDarrow = movementsEur.map((mov) => mov * eurToUsd);
console.log(movUSDarrow);

// the argument can be (mov, i, arr)
const movementsDescription = movementsEur.map(
  (mov, i) => `You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`
);

console.log(movementsDescription);

//==============================================================================
//## .filter() method
//==============================================================================
//

const newMovements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// (mov, i, arr)
const deposits = newMovements.filter(function (mov) {
  return mov > 0;
});
console.log(newMovements);
console.log(deposits);

// with forof
const deposits2 = [];
for (const mov of newMovements) {
  if (mov > 0) {
    deposits2.push(mov);
  }
}
console.log(deposits2);

// negative
const withdrawals = newMovements.filter((mov) => mov < 0);
console.log(withdrawals);

//==============================================================================
//## .reduce() method
//==============================================================================

const balance = newMovements.reduce(function (
  accumulator,
  currElement,
  index,
  array
) {
  console.log(`iteration number ${index}: ${accumulator}`);
  return accumulator + currElement;
},
0);
// this 0 is the initial value of the accumulator, before starting the lop
console.log(balance);

//NB with arrow function
const balanceArrow = newMovements.reduce((acc, el) => acc + el, 0);
console.log(balanceArrow);

//IMPORTANT other things with .reduce()
//# MAXIMUM VALUE
console.log(newMovements);
const max = newMovements.reduce((acc, mov) => {
  acc > mov ? acc : mov;
}, newMovements[0]);
console.log(max);

const max2 = newMovements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, newMovements[0]);
console.log(max2);

//==============================================================================
//## .Chaining methods: pipelines
//==============================================================================
console.log(newMovements);
const totalDepostiUSD = newMovements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUsd) //IMPORTANT remember that to degub, you have access to the array returned from the previous method
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepostiUSD);

//IMPORTANT in JS is bad practice tochain methods that mutate the underlying original array, i.e. methods that do not create a new array
// e.g. do not chain methods like splice and reverse
