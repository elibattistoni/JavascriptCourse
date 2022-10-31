"use strict";

//==============================================================================
//## coding challenge #1
//==============================================================================

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  const increasedSpeed = this.speed + 10;
  console.log(increasedSpeed);
};

Car.prototype.brake = function () {
  const decreasedSpeed = this.speed - 5;
  console.log(decreasedSpeed);
};

const car1 = new Car("Audi", 100);
car1.accelerate();
car1.brake();

console.log(Car.prototype);
console.log(car1.__proto__);
console.log(car1);

const car2 = new Car("BMW", 120);
car2.accelerate();
car2.brake();

const car3 = new Car("Mercedes", 95);
car3.accelerate();
car3.brake();

//==============================================================================
//## coding challenge #2
//==============================================================================
