"use strict";

const countriesContainer = document.querySelector(".countries");

//==============================================================================
//# Our first AJAX call: XML HTTP request function
//==============================================================================
// the data about the countries is going to come from a third party online API
// there are multiple ways of doing AJAX calls

// refactoring in a function
const getCountryData = function (country) {
  const request = new XMLHttpRequest(); // old school
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send(); /// send off the request that fetches the data in the background
  /// when it is done it will emit the load event, so we are listening for that event;
  /// and as soon as the data arrives, the callback function will be called

  // we cannot do data = request.send() because the result is not there yet,
  // because this AJAX call is done in the background while the rest of the code keeps runnig
  // this is the asynchronous behavior

  // what we need to do is to register a callback on the object for the load event
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    // same as:
    // const data = JSON.parse(this.responseText)[0];
    console.log(data);

    // NB with + you convert to number
    const html = `
    <article class="country">
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
  });
};

// you can call more than 2 times the function at the same time
getCountryData("italy");
getCountryData("portugal");
// getCountryData("germany");
// getCountryData("usa");
// by calling this function twice, we will basically have two AJAX calls happening at the same time (in parallel)
// if you reload the page a few times they might appear in different order because the data arrives at a slightly different time

// NB if we wanted these requests to be made in a specific order, we would have to chain the requests, i.e. to make the second request only after the first request has finished.

//==============================================================================
//# ORDERED AJAX: Callback Hell: script_02.js
//==============================================================================
