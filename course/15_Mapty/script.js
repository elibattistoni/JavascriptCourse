"use strict";

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

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = "running"; // this will be available on all the isntances
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calculatePace();
    this._setDescription();
  }

  calculatePace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calculateSpeed();
    // this.type="cycling" // line 43 and this one are the same
    this._setDescription();
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
  #workouts = [];

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

  _hideForm() {
    // emoty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";
    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    e.preventDefault();

    //# HELPER FUNCTIONS: nice for testing complex conditions
    // it checks that loops over the array and checks if every element is a number
    const validInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp)); // (...inputs) indicates an arbitrary number of inputs and with ... you get an array
    // check if data is positive
    const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

    //# 1. Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value; // + to convert into number
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // NB if else not much used anymore in modern Javascript, cleaner to write multiple if statements
    //# 3. If workout running, create running object
    if (type === "running") {
      const cadence = +inputCadence.value;
      //# 2. Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return alert("Inputs have to be positive numbers!");
      }
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    //# 4. If workout cycling, create cycling object
    if (type === "cycling") {
      const elevation = +inputElevation.value;
      //# 2. Check if data is valid
      // NB another trend in modern JS is the "guard clause": we check for the opposite of what you are interested in, and if that is true, then return the function immediately
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        return alert("Inputs have to be positive numbers!");
      }
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    //# 5. Add new object to workout array
    this.#workouts.push(workout);
    console.log(this.#workouts);

    //# 6. Render workout on map as marker
    this._renderWorkoutMarker(workout);

    //# 7. Render workout on list
    this._renderWorkout(workout);

    //# 8. Hide form + clear input fields
    this._hideForm();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    // we will do some DOM manipulation
    // we are going to create some markup i.e. some HTML and then we will insert that into the DOM whenever there is a new workout
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;
    if (workout.type === "running") {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;
    }

    if (workout.type === "cycling") {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevation}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;
    }
    form.insertAdjacentHTML("afterend", html);
  }
}

const app = new App();
