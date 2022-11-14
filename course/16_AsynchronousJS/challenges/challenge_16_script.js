"use strict";

//==============================================================================
//## coding challenge #1
//==============================================================================
console.log("---------- CODING CHALLENGE #1 ----------");

const whereAmI = function (lat, lng) {
  // reverse geocoding
  const apiURL = `https://geocode.xyz/${lat},${lng}?geoit=json`;
  fetch(apiURL)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Problem with geocoding: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
    })
    .catch((err) =>
      console.error(`Something went wrong 💥 💥 💥 ${err.message}`)
    );
};

// whereAmI(52.508, 13.381); // ok
whereAmI(19.037, 72.873); // ok
// whereAmI(-33.933, 18.474); // ok
