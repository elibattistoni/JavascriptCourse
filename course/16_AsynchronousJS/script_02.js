"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

//==============================================================================
//# ORDERED AJAX: Callback Hell: chaining requests
//==============================================================================
// task: after the first ajax call is completed, we will get from the object of the country (data) the borders (i.e. the neighbouring countries)
// so the second ajax call really depends on the first one because the data about neighbouring countries is the result of the first ajax call

//# NESTED AJAX CALLS and CALLBACKS in order to make it chained/ordered

// function that renders on the fronend the result of the ajax call
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

// function that performs the ajax call
const getCountryAndNeighbour = function (country) {
  //# AJAX call country 1
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    console.log(data.borders);

    //# render country 1
    renderCountryData(data);

    //# get neighbour country (2)
    // use optional chaining to account for countries with no borders property
    const neighbour = data.borders?.[0] || null;
    // if you did not want to account for that:
    // const neighbour = data.borders[0]
    // or
    // const [neighbour] = data.borders
    if (!neighbour) return;

    //# AJAX call neighbour country
    // this second call is really dependent on the first one because we are firing it in the callback function of the first one
    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener("load", function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      //# render neighbour country
      renderCountryData(data2, "neighbour");
    });
  });
};

// call the ajax function only once
// getCountryAndNeighbour("portugal");
// getCountryAndNeighbour("usa");
// getCountryAndNeighbour("italy");
// getCountryAndNeighbour("germany");
getCountryAndNeighbour("netherlands"); // also holland

// IMPORTANT now we are making only 2 ajax calls: only one depends on the other
/// imagine that you wanted to do more requests in sequence, e.g. 10 in sequence,you will have callbacks inside callbacks 10 times
/// this is called CALLBACK HELL
/// CALLBACK HELL = when you have a lot of nested callbacks in order to execute asynchronous tasks in sequence
/// actually, this happends for all asynchronous tasks which are handled by callbacks and not just ajax calls

// in this example we have callback hell (you can identify it by the triangular shape that is formed)
setTimeout(() => {
  console.log("1 second passed");
  setTimeout(() => {
    console.log("2 second passed");
    setTimeout(() => {
      console.log("3 second passed");
      setTimeout(() => {
        console.log("4 second passed");
        setTimeout(() => {
          console.log("5 second passed");
          setTimeout(() => {
            console.log("6 second passed");
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

// NB the problem with callback hell is that it makes the code messy, difficult to understand and maintain, therefore more prone to bugs

// NB you can solve callback hell with Promises (a feature of ES6)
