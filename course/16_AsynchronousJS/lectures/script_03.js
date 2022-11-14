"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderCountryData = function (data, className = "") {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

//==============================================================================
//# PROMISES and the FETCH API
//==============================================================================
/// PROMISES is a moden JavaScript feature that we can use to escape Callback hell

/// let's write a more modern way of making AJAX calls with the FEATCH API

// to make a simple GET request we only need to specify the URL
// form more complex ajax calls the fetch function can take in an object of options as well
const request = fetch("https://restcountries.com/v3.1/name/portugal");
// console.log(request); // NB the fetch() function returns a Promise

/*
IMPORTANT

/ Promise ES6
= object that is used as a placeholder for the future result of an asynchronous operation
= a contrainer for an asynchronously delivered value
= a container for a future value
the perfect example of a future value is the response coming from an AJAX call
i.e. when we start the ajax call there is no value yet, but we know that 
there will be some value in the future, so we can use a promise to handle this future value.

/ Advantages of Promises
= 1) we no longer need to rely on events and callback functions to handle asynchronous results (events and callbacks can sometimes cause unpredicatble results)
= 2) we can chain promises for a sequence of asynchronous operations instead of nesting (escaping callback hell)

/ Life cycle of a Promise
= since promises work with asynchronous operations, they are time sensitive,
= i.e. they change over time, therefore they can be in different states (i.e. they have a life cycle)
= 1) initially, a promise is PENDING, i.e. before any value resulting from the asynchronous task is available.
    = during this time, the asynchronous task is still doing its work in the background
    = when the task finishes, the promise is SETTLED (2 different types of settled promises)
= 2a) FULFILLED (SETTLED) PROMISES, i.e. a promise that has successfully resulted in a value, like we expected (e.g. when we use a promise to fetch data from an API, a fulfilled promise successfully got that data and it is available to being used)
= 2b) REJECTED (SETTLED) PROMISES, i.e. there has been an error during the asynchronous task (e.g. when the user is offline and can't connect to the API server)
NB these states are very important because when using promises we can handle these different states in different ways in order to do something as a result of either a succesful promise or a rejected one
NB, a promise is only settled ONCE, and from there, the state will remain unchanged forever, i.e. it it impossible to change that state

/ Consume a Promise
we consume a promise when we use a promise to get a result
the fetch function builds the promise and returns it for us to consume (in this case we do not have to build the promise ourselves in order to consume it)
most of the time we will consume promises, but sometimes we also need to build a promise and not just consume it
*/

//==============================================================================
//# HANDLING FULFILLED PROMISES
//==============================================================================

//==============================================================================
//# CONSUMING PROMISES
//==============================================================================

// we are going to use two promises
const getCountryData = function (country) {
  // in the then method we pass a callback function that will be executed as soon as the promise is fulfilled (i.e. as soon as the result is available)
  const apiUrl = `https://restcountries.com/v3.1/name/${country}`;
  fetch(apiUrl)
    .then(function (response) {
      // response is the response of an ajax call
      console.log(response); // object Response

      // in order to read the data from the body, you have to call the json method on the response
      // the .json() method is available on all the Response objects that come from the fetch() function, so all of the resolved values
      // here, response is a resolved value
      // the problem is that this json method is also an asynchronous function, so it will also return a new Promise
      // so let's return the new promise
      return response.json();
      // to handle this promise as well, you need to call another .then() with another callback function
    })
    .then(function (data) {
      console.log(data);
      renderCountryData(data[0]);
    });
};

// getCountryData("portugal");

// refactoring
const getCountryDataRefactored = function (country) {
  const apiUrl = `https://restcountries.com/v3.1/name/${country}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => renderCountryData(data[0]));
};

// getCountryDataRefactored("portugal"); // TODO uncomment to see it work

// NB Promises do not get rid of callbacks; they get rid of the callback hell

// NB the then method always returns a promise, no matter if it returns a value or not;
// NB if it returns a value, than that value will become the fulfillment value of the return promise

//==============================================================================
//# CHAINING PROMISES
//==============================================================================
const getCountryNeighbour = function (country) {
  //# Country 1
  const apiUrl = `https://restcountries.com/v3.1/name/${country}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      renderCountryData(data[0]);

      //# Country 2
      /// the second AJAX call needs to happen here
      /// as soon as we get the data, we need to get the neighbour country and do the ajax call for it
      const neighbour = data[0].borders?.[0] || null;
      if (!neighbour) return;
      const neighbourUrl = `https://restcountries.com/v3.1/alpha/${neighbour}`;
      return fetch(neighbourUrl); // return the promise (like you return response.json() which is also a promise)
      // so that the fulfilled value of the next then method will be the fulfilled value of this previous promise
    })
    .then((response) => response.json()) // NB do not attach this to the return of the previous callback otherwise you will be again in the callback hell: always return a promise and then handle it outside by simply continuing the chain with the then method
    .then((data) => renderCountryData(data[0], "neighbour"));
};

// NB so here instead of the callback hell we have the FLAT CHAIN OF PROMISES

// getCountryNeighbour("portugal");
getCountryNeighbour("germany");
