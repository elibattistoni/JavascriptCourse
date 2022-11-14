"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

//==============================================================================
//# Promisifying the Geolocation API
//==============================================================================
navigator.geolocation.getCurrentPosition(
  (position) => console.log("First position: ", position),
  (err) => console.error(err)
);
console.log("Getting position"); // this is logged first (it happens first), therefore the geolocation has an asynchronous behavior
// because that function offloaded its work to the background, to the web API environment in the browser and then immediately moved to the next line
// so this is clearly a callback based API, so thi is another opportunity to promisify a callback based API to a promise based API

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => resolve(position), // position is the fulfilled value that we want to get from this promise in case that is suffessful
    //   (err) => reject(new Error(err))
    // );
    // NB since .getCurrentPosition() automatically calls the two above callback functions psaaing as input AUTOMATICALLY the position
    // NB the function above can be simplified in this way:
    navigator.geolocation.getCurrentPosition(
      resolve, // this is the callback function that will be automatically called with the position
      reject
    );
  });
};

getPosition().then((pos) => console.log("Second position: ", pos));

const whereAmI = function () {
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Problem with geocoding: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      console.log(`You are in ${data.city}`);
    })
    .catch((err) => console.error(`${err.message}`));
};

btn.addEventListener("click", whereAmI);
