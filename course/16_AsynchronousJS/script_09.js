"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const getJSON = function (url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response.json();
  });
};

//==============================================================================
//# Running promises in parallel
//==============================================================================

// IMPORTANT in an async function we always need to wrap our code in a try catch block!!!

const get3countries = async function (c1, c2, c3) {
  try {
    const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);
  } catch (err) {
    console.error(err);
  }
};

// get3countries("italy", "portugal", "netherlands"); // TODO uncomment to see this work

/// but why should the second ajax call (which returns data2) wait for the first one (which returns data1) to finish?

// NB we can run them in parallel, saving valuable loading time

// NB let's use the Promise.all() combinator function which takes in an array of promises and returns a new promise which then will run all the promises in the array at the same time

const get3countriesParallel = async function (c1, c2, c3) {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map((d) => d[0].capital[0]));
  } catch (err) {
    console.error(err);
  }
};

// get3countriesParallel("italy", "portugal", "netherlands"); // TODO uncomment to see this work

// NB if one of the promises rejects, then the whole promise.all rejects
// NB so we say that Promise.all() short circuits when one promise rejects

// IMPORTANT when you can run always always always multiple asynchronous operations at the same time (when these operations do not depend on each other)
/// if you do not use async awaut the Promise.all() will work exactly the same with the then method

//==============================================================================
//# Other promise combinators; race, allSettled, any
//==============================================================================

/// Promise.race()
// combinator function that receives an array of promises and returns a promise
// this one is settled as soon as one of the input promises settles (settle means that a value is available, regardless of whether it is fulfilled or rejected)
// the first settled promise wins the race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  // console.log(res[0].name); // TODO uncomment to see this work
})();
// if the winning promise is a fulfilled promise, then the fulfilled value of the whole race promise is the fulfillment value of the winning promise
// we only get one result, not an array of results
// Promise.race() short circuits whenever one of the promises gets settled (regardless of fulfilled or rejected)
// NB very useful to prevent against never ending promises or very long running promises
// e.g. if a user has a very bad internet connection, then a fecth request in your app might take too long to be useful
// so we can create a special timeout promise, which automatically rejects after a certain time has passed
// this is going to reject, not to resolve
// after a certain time has passed, we reject a promise
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! ${sec}`));
    }, sec * 1000);
  });
};
// so now we can have the ajax call raced against this timeout
Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/italy`),
  timeout(1), // the second promise is going to be our timeout TODO play around with 0.1 and 1 to see this work
  // so if the timeout wins, all of this will be rejected, aborting the fetch that is hapening in getJSON
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.error(err));

/// Promise.allSettled()
// combinator function that receives an array of promises and returns a promise
// it returns an array of all the settled promises
// the difference with Promise.all() is that promise.all() short circuits as soon as one promise rejects, but Promise.allSettled() never short circuits
// it returns sll the results of all the promises
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Success"),
]).then((res) => console.log(res));

/// Promise.any() [ES2021]
// combinator function that receives an array of promises and returns a promise
// it will return the first fulfilled promise, it will ignore rejected promises
// similar to Promise.race() with the difference that rejected promises are ignored
// the result of Promise.any() will always be a fulfilled promise (unless they all reject)
Promise.any([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Success"),
]).then((res) => console.log(res));
