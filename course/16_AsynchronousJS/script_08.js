"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

//==============================================================================
//# Consuming promises with ASYNC/AWAIT
//==============================================================================
// Since ES 2017 there is a better and easier way to consume promises called async await

// NB let's create an async function, which is a special kind of function

const whereAmIExplained = async function (country) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  console.log(res);

  // this is the same thig as
  // fetch(`https://restcountries.com/v3.1/name/${country}`).then((res) =>
  //   console.log(res)
  // );
};

// whereAmIExplained("portugal"); // TODO uncomment to see it work
// console.log("FIRST"); // TODO uncomment to see it work

/*
# this function is an asynchronous function: this function will basically
# keep running in the background while performing the code that is inside of it
# when the funciton is done, it automatically returns a promise.

# Inside the async function we can have one or more await statements
# each await statements needs a promise
# we use the await keyword to await for the result of a promise
# basically await will stop the code execution at the point of the function 
# in which it is called until the promise is fulfilled (in this case, until the data has been fetched)
NB stopping code execution with await INSIDE an async function is not a problem because the async function 
NB is running asynchronously in the background, therefore it is not blocking the main thread of exection (it is not blocking the call stack)

that is what is special about async await, it is the fact that it makes the code look like regular synchronous code while behind the scenes everything is in fact asynchronous

NB the value of teh await expression is the resolved value of the promise, so we can simply store it in a variable calleg e.g. res

NB async await is simply syntactic sugar over the tehn method in promises, so behind the scenes we are still using promises;
NB here we are simply using a different way of consuming them
*/

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// NB with the await method you can store the fulfilled promise value immediately into a variable without having to mess with callback functions

const whereAmI = async function () {
  //# Geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;
  console.log("latitude", lat);
  console.log("longitude", lng);

  //# Reverse geocoding
  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  const dataGeo = await resGeo.json();
  console.log(dataGeo);
  console.log(dataGeo.city);

  //# Country data
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${dataGeo.country}`
  );
  // to get the data res.json() returns a new Promise therefore it will also need await
  const data = await res.json();
  console.log(data[0]);
};

// whereAmI(); // TODO uncomment to see it work

//==============================================================================
//# Error handling with try... catch
//==============================================================================
/*
With async await we cannot really use the catch method because we cannot attach it anywhere,
instead we use the try catch statement
it has nothing to do with async await, but we can still use it to catch errors in async functions
*/

//# example of try catch
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

const whereAmIErrorHandled = async function () {
  try {
    //# Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    console.log("latitude", lat);
    console.log("longitude", lng);

    //# Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok)
      throw Error(
        `Problem getting location data: ${res.status} ${res.statusText}`
      );
    const dataGeo = await resGeo.json();
    console.log(dataGeo);
    console.log(dataGeo.city);

    //# Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok)
      throw Error(`Problem getting country ${res.status} ${res.statusText}`);
    // to get the data res.json() returns a new Promise therefore it will also need await
    const data = await res.json();
    console.log(data[0]);
  } catch (err) {
    console.error(`💥💥💥 ${err}`);
    alert(`💥💥💥 ${err}`);
  }
};

// whereAmIErrorHandled(); // TODO uncomment to see this work

// NB just like before the fetch promise does not reject on a 404 or 403 error
// NB so we manually have to create an error which will be caught in the catch block

//==============================================================================
//# Returning values from async functions
//==============================================================================
// what if you want to return a value from an async function because you need that value for other things?

const whereAmIReturnValue = async function () {
  try {
    //# Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //# Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok)
      throw Error(
        `Problem getting location data: ${res.status} ${res.statusText}`
      );
    const dataGeo = await resGeo.json();

    return dataGeo.city;
  } catch (err) {
    // console.error(`💥💥💥 ${err}`);
    // reject promise returned from async function
    throw err;
  }
};

//#################### METHOD 1 does not work ########################
//TODO uncomment to see this work
/*
console.log("1: Will get the location");
const city = whereAmIReturnValue();
console.log(city); //inspect this returns a promise, not the value that we would like to get; the fulfilled value of this promise is the string dataGeo.city (NB if there is no error happening in the function)
console.log("3: Finished getting the location");
*/
// NB the value that we return from an async function will be the fulfilled value of the promise that is returned by the function if there is no error happening in the function

//#################### METHOD 2 mixes async/await with then and catch########################
// use the then method to get the fulfilled value of the promise
// use finally to fix the fact that the 3 is printed before the 2
// TODO uncomment to see this work
/*
console.log("1: Will get the location");
whereAmIReturnValue()
  .then((city) => console.log("2:", city))
  .catch((err) => console.error("2:", err.message))
  .finally(() => console.log("3: Finished getting the location"));
*/

/// problem: we are mixing the old and new way of working with promises: the code above mixes the phylosophy of async/await with handling promises using then and catch

// NB you cannot use await without the async function

//#################### METHOD 3 best practice with an IIFE ########################
(function () {
  // function body
})(); // with () you call it

// IMPORTANT so you can also create an async IIFE

console.log("1: Will get the location");
(async function () {
  try {
    const city = await whereAmIReturnValue();
    console.log("2:", city);
  } catch (err) {
    console.error("2:", err.message);
  }
  console.log("3: Finished getting the location");
})();
