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
  // countriesContainer.style.opacity = 1;
};

//==============================================================================
//# HANDLING REJECTED PROMISES with .catch() and .finally()
//==============================================================================
// so far we have assumed that everything went well with our AJAX calls, we never handled errors
// best practice is to handle errors because it is very common
// remember that a promise in which an error happens, is a REJECTED PROMISE; therefore we are going to learn how to handle PROMISE REJECTIONS

// NB the only way in which the fetch promise rejects, is when the user loses his internet connection
// NB in order to simulate losing the internet connection, we can go in the tab Network in the browser inspect, and change the speed to offline
// however, when we reload the page, everything disappears, but it is not what we want
// NB we want to simulate that the page was first still loaded but then, as the user does the request without internet, we want to see an error

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
};

const getCountryNeighbour = function (country) {
  // Country 1
  const apiUrl = `https://restcountries.com/v3.1/name/${country}`;
  fetch(apiUrl)
    .then(
      (response) => response.json()
      // (err) => alert(err) //# OPTION 1 (handle error in each function)
    )
    .then((data) => {
      renderCountryData(data[0]);

      // Country 2
      const neighbour = data[0].borders?.[0] || null;
      if (!neighbour) return;
      const neighbourUrl = `https://restcountries.com/v3.1/alpha/${neighbour}`;
      return fetch(neighbourUrl);
    })
    .then(
      (response) => response.json()
      // (err) => alert(err) //# OPTION 1 (handle error in each function)
    )
    .then((data) => renderCountryData(data[0], "neighbour"))
    .catch((err) => {
      // NB with .catch() errors propagate down the chain until they get caught
      console.error(`${err} 💥 💥 💥`); //# OPTION 2 (better) handle all the errors globally in just one place (it handles all the errors, no matter where they appear in the chain)
      // we also want to display a message for the user to see
      renderError(`Something went wrong 💥 💥 💥 ${err.message}. Try again!`);
      // NB err is a JavaScript object (we can create errors in JS with a constructor, like we create e.g. maps or sets)
      // NB any error created like this contains the messag property, so we can use that property to print the message and not the whole object
      // NB the err object contains also the stack trace

      // NB .catch() returns a promise that .finally() will use as input
    })
    .finally(() => {
      // NB this callback function will be called whatever happens with the promise: it will be called no matter if the promise was fulfilled or rejected
      countriesContainer.style.opacity = 1;
    });
};

// we want to call the function whenever the user clicks on a button
btn.addEventListener("click", function () {
  getCountryNeighbour("portugal");
  // getCountryNeighbour("germany");
});

// if you set Offline, and click the button again, you will get the error of "Uncaught promise" because we have failed to fetch

/// there are 2 ways of handling rejections
/// 1. pass a second callback function into the then method (the first callback will be called for the fulfilled promise, the second promise for the rejected promise)
/// 2. handle all the errors globally with the .catch() method

// NOTE: .then() is called if the promise is fulfilled; .catch() is called if the promise is rejected; .finally() is called always (regardless of whether the promise is fulfilled or rejected)
//~ the .finally() method is not always useful but sometimes it is: we use this method for something that always needs to happen no matter the result of the promise
//~ an example is to hide a loading spinner (e.g. rotating circles that you see everywhere in web applications when you load some data)
//~ these applications show a spinner when an asynchronous operation starts and hide it once the operation completes, and this happens no matter if the operation is successful or not
//~ what we always need to do is to fade-in the container: countriesContainer.style.opacity = 1; no matter if we renderCountry or we renderError

// simulate another error:
// getCountryNeighbour("osidflj"); // TODO uncomment to see this work

/// IMPORTANT the .fetch() promise only rejects when there is no internet connection,
/// but with a 404 error (like the one that you get if you enter a country that does not exist)
/// the fetch() promise will still get fulfilled, so there is no rejection and so our catch handler cannot pick up on this error
/// it picks up an error but it is not the real error: the real error is that there is no country with the name "osidflj"

//==============================================================================
//# THROWING ERRORS MANUALLY
//==============================================================================
// getCountryNeighbour("osidflj");
// the problem with this was that fduring the fetch there was a 404 error because our API could not find any country with this name
// but the fetch function did not reject
// so we have to do it manually

/*
const getCountryNeighbour2 = function (country, render = true) {
  const apiUrl = `https://restcountries.com/v3.1/name/${country}`;
  fetch(apiUrl)
    .then((response) => {
      console.log("log Country 1", response); // this is the first .then() handler which gets access to the direct response of the API
      // inspect: ok is false and status is 404
      if (!response.ok && response.status === 404) {
        throw new Error(`${response.status}: Country not found`);
        // throw immediately terminates the current function (like return) so that the promise will immediately reject and enters the .catch() method
      }
      return response.json();
    })
    .then((data) => {
      if (render) {
        renderCountryData(data[0]);
      }

      const neighbour = data[0].borders?.[0] || null;
      if (!neighbour) return;
      const neighbourUrl = `https://restcountries.com/v3.1/alpha/${neighbour}`;
      return fetch(neighbourUrl);
    })
    .then((response) => {
      console.log("log Country 2", response);

      if (!response.ok && response.status === 404) {
        throw new Error(`${response.status}: Country not found`);
      }
      return response.json();
    })
    .then((data) => {
      if (render) {
        renderCountryData(data[0], "neighbour");
      }
    })
    .catch((err) => {
      renderError(`Something went wrong 💥 💥 💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

getCountryNeighbour2("odfsj", false);

*/

// we can use the fact that the ok property set to false to reject the promise manually

// best practice to always handle errors in promises with .catch() and .finally() and manually handling errors

const getJSON = function (url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response.json();
  });
};

const getCountryNeighbour2 = function (country, render = true) {
  const apiUrl = `https://restcountries.com/v3.1/name/${country}`;
  getJSON(apiUrl)
    .then((data) => {
      console.log(data[0]);
      if (render) {
        renderCountryData(data[0]);
      }

      const neighbour = data[0].borders?.[0] || null;
      console.log(neighbour);
      // let's handle the fact that there might be no neighbour
      if (!neighbour) throw new Error("No new neighbour found");
      const neighbourUrl = `https://restcountries.com/v3.1/alpha/${neighbour}`;
      return getJSON(neighbourUrl);
    })
    .then((data) => {
      console.log(data[0]);
      if (render) {
        renderCountryData(data[0], "neighbour");
      }
    })
    .catch((err) => {
      renderError(`Something went wrong 💥 💥 💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// getCountryNeighbour2("dnsldn", true);
// getCountryNeighbour2("portugal", true);
getCountryNeighbour2("australia", true);
