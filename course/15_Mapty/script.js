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

class Workout {
  // this is cutting edge javascript; not supported everywhere, if you want to be safe do it in the constructor
  date = new Date();
  id = (Date.now() + "").slice(-10); // NB in the real world it is best practice to use a library for creating unique IDs, you should not do it on your own custom like here

  constructor(coords, distance, duration) {
    // this.date = new Date()
    // this.id =
    this.coords = coords; // [lat,lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calculatePace();
  }

  calculatePace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calculateSpeed();
  }

  calculateSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1);
// console.log(cycling1);

// ·············································································
//· APPLICATION ARCHITECTURE
// ·············································································
class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();

    // we want the event listeners to be added at the beginning, when the script loads
    // and the constructor is the method that automatically gets called as soon as we instantiate app
    form.addEventListener("submit", this._newWorkout.bind(this)); // you have to call bind because otherwise the this keyword will point to the form instead of the object itself
    inputType.addEventListener("change", this._toggleElevationField); // do not need to bind because toggleElevationField does not call the this keyword
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // so you set this to App,if you do not bind this will be undefined
        // (this._loadMap alone would be treated as a regular function call, not as a method call, but it is a callback function)
        // it is getCurrentPosition that will call the _loadMap callback function once it gets the current position of the user
        // and when it calls the methos ._loadMap alone it does so as a regular function call
        // and we learned that in a regular function call, the this keyword is set to undefined
        this._loadMapError
      );
    }
  }

  _loadMapError() {
    alert("Could not get your position");
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];
    // console.log(this);
    this.#map = L.map("map").setView(coords, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks
    this.#map.on("click", this._showForm.bind(this)); // the binded this keyword is always the App object
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    // helper function that checks that elements of an array are numbers
    const validInputs = (
      ...inputs // (...inputs) indicates an arbitrary number of inputs and with ... you get an array
    ) => inputs.every((inp) => Number.isFinite(inp));

    e.preventDefault();

    //# 1. Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value; // + to convert into number
    const duration = +inputDuration.value;

    // NB if else not much used anymore in modern Javascript, cleaner to write multiple if statements
    //# 3. If workout running, create running objet
    if (type === "running") {
      const cadence = +inputCadence.value;
      //# 2. Check if data is valid
    }

    //# 4. If workout cycling, create cycling object
    if (type === "cycling") {
      const elevation = +inputElevation.value;
      //# 2. Check if data is valid
      // NB another trend in modern JS is the "guard clause": we check for the opposite of what you are interested in, and if that is true, then return the function immediately
      if (
        !Number.isFinite(distance) ||
        !Number.isFinite(duration) ||
        !Number.isFinite(cadence)
      ) {
        return alert("Inputs have to be numbers!");
      }
    }

    //# 5. Add new object to workout array

    //# 6. Render workout on map as marker
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
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

    //# 7. Render workout on list

    //# 8. Hide form + clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";
  }
}

const app = new App();
