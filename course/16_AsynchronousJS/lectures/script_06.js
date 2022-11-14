"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

//==============================================================================
//# Building a simple promise
//==============================================================================
// simulate a lottery using a promise
// a fulfilled promise = win the lottery
// a rejected promise = lose the lottery

/// Step 1. Build the Promise
// promises are just a special kind of object in JS
// the promise constructor takes in one argument, i.e. the executor function
// it is like e.g. the fetch function which also creates a new promise
const lotteryPromise = new Promise(function (resolve, reject) {
  // NB this is the EXECUTOR FUNCTION
  // NB this executor function will contain the asynchronous behavior that we are trying to handle with the promise
  // as soon as the promise executor runs, it will automatically execute this executor function
  // and as it executes this function, it will pass 2 arguments, i.e. the resolve function and the reject function
  // NB this xecutor function should eventyally produce a result value, i.e. the value that basically is going to be the future value of the promise

  if (Math.random() >= 0.5) {
    // in this example case, we say that we win the lottery
    // this marks the promise as a fulfilled promise or resolved promise
    // into the resolve function we pass the fulfilled value of the promise so that it can later be consumed with the then method
    resolve("You win 💲"); // we pass in the result of the promise that will be available in the then handler
  } else {
    // into the reject function we pass in the error message that we later want to be available in the catch handler
    reject("YOU LOSE 💀");
  }
});

/// Step 2. Consume the Promise
// TODO uncomment to see it work
// lotteryPromise
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

// NB the example above is not asynchronous yet

/// Step 3. let's simulate a lottery draw by adding a timer
// this simulates the time that is passed between buying the lottery ticjet and getting the result

// now by using this timer, we encapsulated some asynchronous behavior in the promise (and this is the whole point of promises in the first place)
const timedLotteryPromise = new Promise(function (resolve, reject) {
  console.log(
    "Lottery draw is happening 🔮... THIS IS THE FIRST PROMISE AND FIRST MICROTASK"
  );

  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve("You win 💲");
    } else {
      reject(new Error("YOU LOSE 💀"));
    }
  }, 2000); // TODO try with 2000 to see this work
});

// TODO uncomment to see this work
timedLotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

// IMPORTANT
/// in practice, most of the time we CONSUME PROMISES
/// we usually only build promises to basically wrap old callback based functions into promises: this process is calle PROMISIFYING
/// PROMISIFYING = converting callback based asynchronous behavior to promise based

//## promisify the setTimeout function and create a wait function
//# note that promisifying is basically what the fetch function does

const waitExplained = function (seconds) {
  return new Promise(function (resolve) {
    // we do not need the reject function because it is nearly impossible for the setTimeout to fail
    setTimeout(resolve, seconds * 1000);
  });
};

// refactoring
const wait = (seconds) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

wait(2)
  .then(() => {
    // NB here we could run any code that we wanted to be executed after 2 seconds
    console.log("I waited for 2 seconds");
    return wait(1); // let's wait one more second
  })
  .then(() => console.log("I waited for 1 second"));
// NB this is exactly what we did before, when we wanted to chain two sequential Ajax calls using the fetch function

// so before we had
// setTimeout(() => {
//   console.log("1 second passed");
//   setTimeout(() => {
//     console.log("2 second passed");
//     setTimeout(() => {
//       console.log("3 second passed");
//       setTimeout(() => {
//         console.log("4 second passed");
//         setTimeout(() => {
//           console.log("5 second passed");
//           setTimeout(() => {
//             console.log("6 second passed");
//           }, 1000);
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);
// instead of having the callback hell like above, we have this nice asynchronous behavior
wait(1)
  .then(() => {
    console.log("1 second passed");
    return wait(1);
  })
  .then(() => {
    console.log("2 second passed");
    return wait(1);
  })
  .then(() => {
    console.log("3 second passed");
    return wait(1);
  })
  .then(() => {
    console.log("4 second passed");
    return wait(1);
  })
  .then(() => {
    console.log("5 second passed");
    return wait(1);
  })
  .then(() => {
    console.log("6 second passed");
    return wait(1);
  });

// we can also create a fulfilled or rejected promise immediately
Promise.resolve("This is the resolved value").then((x) => console.log(x));
Promise.reject(new Error("This is the rejected value")).catch((x) =>
  console.error(x)
);
