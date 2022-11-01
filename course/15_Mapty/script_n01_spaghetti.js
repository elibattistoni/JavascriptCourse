"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

// define global variables
let map;
let mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //········································································
      //# 1, GEOLOCATION API: get current coordinates
      //········································································
      // console.log(position);
      // this will create a variable called latitude based on the latitude property of this object
      const { latitude } = position.coords; // same as: const latitude = position.coords.latitude
      const { longitude } = position.coords;
      console.log(`https://www.google.it/maps/@${latitude},${longitude}`);

      //········································································
      //# 2. DISPLAY MAP WITH LEAFLET LIBRARY
      //········································································
      // L. is the main function that Leaflet gives us as an entry point (this is kind of the namespace of the leaflet API)
      // L is basically a gElevationlobal variable inside of the script of Leaflet, and we can access that L global variable from all the other scripts
      // NB any variable that is global in any script will be available to all the other scripts as long as they appear after that script in the HTML
      const coords = [latitude, longitude];
      map = L.map("map").setView(coords, 13); // it will be inserted in the empty div with the id="map" (the string in input of .map() must be the ID name of an element in our HTML)
      // the second input parameter is the zoom
      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        // openstreetmap is an open source map; but leaflet works with other kinds of maps as well (e.g. google maps)
        // you can change the appearance of a map; the teacher found the one at the new url: starter url "https://tile.openstreetmap.org/{z}/{x}/{y}.png" (another theme of these tiles)
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //········································································
      //# 3. DISPLAY MARKER ON MAP CLICK: add event handler on the map
      //········································································
      // actually final behavior: when click, show form; when submitting the form, show marker
      // so that we can handle any incoming click
      // add event listener to the map object created
      // .on() is a method from leaflet, that we will use instead of addEventListener
      // NB if you inspect map you will see that they have set protected methods and properties with the underscore convention: you should not even look at them
      // the .on() method is inherited (they used prototype chain heavily)
      // console.log(map);
      map.on("click", function (mapE) {
        mapEvent = mapE;
        // console.log(mapEvent);
        // console.log(mapEvent.latlng.lat);
        // console.log(mapEvent.latlng.lng);
        //const { lat, lng } = mapEvent.latlng;
        // console.log(lat, lng);
        // L.marker([lat, lng])
        //   .addTo(map)
        //   .bindPopup(
        //     L.popup({
        //       maxWidth: 250,
        //       minWidth: 100,
        //       autoClose: false,
        //       closeOnClick: false,
        //       className: "running-popup",
        //     })
        //   )
        //   .setPopupContent("Workout")
        //   .openPopup();
        // keep the pop up open
        // in leaflet you can add your own class names to the popup

        //········································································
        //# 4. RENDERING INPUT FORM when user clicks on the map
        //········································································
        form.classList.remove("hidden");
        inputDistance.focus();
        // we want that when the form is submitted, you add the marker
        // there is no submit button (to make it smaller) but whenever we hit
        // the Enter key on any of the input fields, it will trigger the submit event on that form
        // we create an event listener outside
      });

      //

      //········································································
      //········································································
      //········································································
      //········································································
      //········································································
      //········································································
    },
    function () {
      alert("Could not get your position");
    }
  );
}

//········································································
//# event listener for showing the marker fter form submission
//········································································
form.addEventListener("submit", function (e) {
  e.preventDefault();
  // Clear input fields
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      "";
  // Display marker
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("Workout")
    .openPopup();
});

// handle the change from Cadence to Elevation if you click on cycling
inputType.addEventListener("change", function () {
  // the element that has the hidden class is the closest div element (the closest parent) to the inputElevation field
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  // by toggling the same class on both of them, we make sure that one of them is always visible and one of them is always hidden
});

//==============================================================================
//# NOTES and IMPORTANT POINTS
//==============================================================================

// NB local storage: it is a browser API that stores the data in the browser;
// NB when the user comes back to the page, it will read the data that was saved in the local storage and display it

// NB async = operation that takes some tim, and only after it is completed, then the rest of the operations that depend on it can be executed

// NB PROJECT ARCHITECTURE: to start, one of the most important aspects of any architecture is to decide where and how to store the data
// NB because data is probably the most fundamental part of any application

// NB having a class that contains all the data and methods about the application is a common thing in simple JavaScript applications
// NB if the application was more complex, we could divide this architecture further, and create one class that would only be concerned with the user interface and one class for the "Business Logic" (i.e. the logic that works only with the underlying data)

//==============================================================================
//# 1. GEOLOCATION API
//==============================================================================

// browser API = anything that the browser gives us (e.g. internationalization, timers)
// modern APIs: geolocation, accessing the user's camera, make the user's phone vibrate

// navigator.geolocation.getCurrentPosition(); takes in input 2 callback functions:
// 1. callback function that will be called on success, i.e. when the browser succeffcully gets the coordinates of the current position of the user
// 2. Error callback, callback that is called when there is an error while getting the coordinates

//==============================================================================
//# 2. DISPLAYING A MAP USING LEAFLET LIBRARY
//==============================================================================
// leaflet = third party library
// https://leafletjs.com/
/// whenever we use a third party library, first we need to include it in our site
/// usually you can either download it, or use a hosted version (i.e. you can use a version of this library that is already hosted by sometone else)
// in this case it is a CDN (= Content Delivery Network) which has u URL
// NB there are more elegant ways of including external JS in our code, e.g. using a package manager like NPM (npm install leaflet)
// we will do this in the future, but for now we will
/// include a hosted version that is on a CDN
// so let's copy it and paste it into the HTML, right before our script and this is very IMPORTANT

//==============================================================================
//# 3. DISPLAYING A MARKER WHENEVER WE CLICK ON THE MAP
//==============================================================================

//==============================================================================
//# 4. RENDERING WORKOUT INPUT FORM
//==============================================================================
