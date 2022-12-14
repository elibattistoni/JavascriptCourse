"use strict";

//==============================================================================
//## coding challenge #1
//==============================================================================
console.log("---------- CODING CHALLENGE #1 ----------");

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const audi = new Car("Audi", 100);
const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

audi.accelerate();
audi.accelerate();
audi.accelerate();
audi.brake();
audi.brake();

bmw.accelerate();
bmw.accelerate();
bmw.brake();

mercedes.accelerate();
mercedes.brake();
mercedes.brake();
mercedes.brake();

console.log(Car.prototype);
console.log(audi.__proto__);
console.log(audi);

//==============================================================================
//## coding challenge #2
//==============================================================================
console.log("---------- CODING CHALLENGE #2 ----------");

class CarClass {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  // NB with getters you transform a method into a property
  get speedUS() {
    return this.speed / 1.6;
  }

  // this allows to give as input the current speed speedUS in mi/h
  // but it sets the current speed back to km/h before storing the speed in the object
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarClass("Ford", 120);
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.brake();

// after defining the setter
ford.speedUS = 50; // this sets the current speed in mi/h but it converts it to km/h before storing the value in the object ford (as you can see from inspecting the object)
console.log(ford);

//==============================================================================
//## coding challenge #3
//==============================================================================
console.log("---------- CODING CHALLENGE #3 ----------");

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// also Car has the method accelerate
// NB when there are two methods or properties with the same name in the prototype chain, then the first one that appears in the chain is the one that is going to be used
// NB in thsi way a child class can override a method or property that is defined in the parent class (THIS IS POLYMORPHISM!!)
// if we did not create this accelerate method, it would still work, because it would inherit the method (JS finds it in the prototype chain)
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
  );
};

const tesla = new EV("Tesla", 120, 23);
console.log(tesla);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();

tesla.accelerate();
tesla.accelerate();
console.log(tesla); // inspect: both the EV and the Car have the method accelerate, but Javascript uses the first one

//==============================================================================
//## coding challenge #4
//==============================================================================
console.log("---------- CODING CHALLENGE #4 ----------");

class ElectricCarClass extends CarClass {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(this);
    return this; // needed for chaining
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(this);
    return this; // needed for chaining
  }

  brake() {
    this.speed -= 3;
    console.log(this);
    return this;
  }
}

const rivian = new ElectricCarClass("Rivian", 120, 23);
console.log(rivian);

rivian
  .chargeBattery(50)
  .accelerate()
  .accelerate()
  .brake()
  .accelerate()
  .chargeBattery(100)
  .brake()
  .brake();
