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
  clicks = 0;

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

  // we can interact with each of the object using the public interface
  click() {
    this.clicks++;
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
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    //# Get user's position
    this._getPosition();

    //# Get data from local storage
    this._getLocalStorage();

    //# Attach event handlers
    // we want the event listeners to be added at the beginning, when the script loads
    // and the constructor is the method that automatically gets called as soon as we instantiate app
    form.addEventListener("submit", this._newWorkout.bind(this)); // you have to call bind because otherwise the this keyword will point to the form instead of the object itself
    inputType.addEventListener("change", this._toggleElevationField); // do not need to bind because toggleElevationField does not call the this keyword
    // move the map on the clicked marker with EVENT DELEGATION
    containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
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
    this.#map = L.map("map").setView(coords, this.#mapZoomLevel);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks
    this.#map.on("click", this._showForm.bind(this)); // the binded this keyword is always the App object

    // render the markers now that the map is available
    this.#workouts.forEach((work) => {
      this._renderWorkoutMarker(work);
    });
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
    // we delegate the functionality to another method
    this.#workouts.push(workout);
    console.log(this.#workouts);

    //# 6. Render workout on map as marker
    // we delegate the functionality to another method
    this._renderWorkoutMarker(workout);

    //# 7. Render workout on list
    // we delegate the functionality to another method
    this._renderWorkout(workout);

    //# 8. Hide form + clear input fields
    // we delegate the functionality to another method
    this._hideForm();

    //# 9. Set local storage to all workouts
    // we delegate the functionality to another method
    this._setLocalStorage();
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

  _moveToPopup(e) {
    const workoutEl = e.target.closest(".workout"); // .closest() is the opposite of .querySelector()
    // the element that we are looking for is the one with class workout
    // so wherever the click happens (no matter if it is inside one of the child divs o spans) we will end up in the li element with the workout class
    // because from the element that is clicked, we will move up to this exact element using the closest method
    // console.log("listening here");
    // console.log(workoutEl);
    // in this element we have the id, and we will use this id to find the workout in the workouts array
    // the id serves as a bridge between the user interface and the data in our application
    if (!workoutEl) return; // if you click not on one of the elements, it logs to null
    const workout = this.#workouts.find(
      (work) => work.id === workoutEl.dataset.id
    );
    // console.log("LISTENED");
    // console.log(workout);
    // take the coordinates from this element and move the map to that position (in leaflet there is a emthod for that)
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // use the publicj interface
    // workout.click(); // NB removed because with local storage you do not preserve the prototype chain
  }

  // NB when you convert the object to a string, and then back to an object, you loose the prototype chain
  // NB so when you retrieve the objects, they are regular objects, and no longer objects that were created by the running or by the cycling class (and therefore they will not inherit the methods, e.g. the click method)
  _setLocalStorage() {
    // local storage is a simple key value store
    // JSON.stringify() converts any object in JS to a string
    // best practice: use it only for small amount of data because localStorage is a very simple API (because localStorage is "blocking")
    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    // egt data and convert the string back to the objects with JSON.parse()
    const data = JSON.parse(localStorage.getItem("workouts"));
    console.log(data); // inspect: you will see that the prototype chain is gone, the obejcts are not reconducted anymore to Running or Cycling
    // check if there is some data
    if (!data) return;
    //NB to avoid the porblem of losing the prototype chain, we couls loop over the data array and restore the objects by creating a new object using the class, based on the data that comes from the local storage
    // NB try to do it on your own (for now, I will disable the clicks functionality)
    // restore workouts array
    this.#workouts = data;
    this.#workouts.forEach((work) => {
      this._renderWorkout(work);
      // this._renderWorkoutMarker(work); // when we try to add this, right at the beginning when the application is first loaded..
      //the map has actually not been loaded yet (we are trying to add the marke to the map which is still undefined:
      // this is a first glimple into the nature of Asynchronous JavaScript)
      // the loading of the application takes some time
      // you must load the markers only once the map has been loaded: you can put this logic into _loadMap
    });
  }

  reset() {
    // remove the workouts item from the local store
    localStorage.removeItem("workouts");
    // reload the page programmatically
    location.reload(); // location is a bit object that contains a lot of methods and properties in the browser
  }
}

const app = new App();

//# move the map on an marker when clicked
// at the beginning (when loading the page) we don't have the element on which we want to attach the event listener because it has not been created yet
// therefore we have to do EVENT DELEGATION: add the event handler to the parent element (i.e. the element with class "workout")
// we do it in the constructor so that the event listener is added right at the beginning

//# count the clicks that happen on each workout in the workouts list
// we do this just to make the public interface of these classes more complete, because so far we have not called any mthod outside the classes themselves
// so we are not really using any public interface on any of these object
// add the property clicks on the Workout class

//# working with local storage: let's use the local storage API in order to make the workout data persist across page reloads
// the idea is that whenever a workout is added, then all the workouts will be added to the local storage
// local storage = a place in he browser where we can store data that will stay there even after we close the page
// the data is basically linked to the URL on which we are using the application
// whenever the page loads, we will load all the workouts from the local storage and render tem on the map and on the list

//# delete all the workouts at once
// add a method to the public interface of the class
// this class is a bit unusual because so far we do not have any public method, so there is no public interface
// let's create a reset() method that you can use out here or even in the console

//# FINAL CONSIDERATIONS: what we could have implemented (as challenges)
// ability to edit a workout
// ability to delete a workout
// ability to delete all workouts
// ability to sort workouts by a certain field (e.g. distance)
// re buld Running and Cycling object coming from Local Storage
// more realistic error and confirmation messages
// (hard) ability to position the map to show all the workouts at once
// (hard) ability to draw lines and shapes instead of just points
// geocode location from coordinates (Run in Faro, Portugal) (only after asynchronous JS section): you could use a third party API to plug in the coordinates and that would give you back the real location
// use an API to display weather data for a workout time and place (only after Asynchronous JS section)
