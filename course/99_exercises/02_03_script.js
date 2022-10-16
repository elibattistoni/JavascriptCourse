"use strict";

// const calcBMI = function (mass, height) {
//   const bmi = mass / height ** 2;
//   console.log(`BMI is ${bmi}`);
//   return bmi;
// };

const mark = {
  fullName: "Mark Miller",
  massKg: 78,
  heightM: 1.69,
  calcBMI: function () {
    this.bmi = this.massKg / this.heightM ** 2;
    return this.bmi;
  },
};
const john = {
  fullName: "John Smith",
  massKg: 92,
  heightM: 1.95,
};
john.calcBMI = mark.calcBMI; // method borrowing

console.log(john.calcBMI());
console.log(john.bmi);
console.log(`John BMI is ${john.bmi}`);
console.log(mark.calcBMI());
console.log(mark.bmi);
console.log(`Mark BMI is ${mark.bmi}`);

console.log(
  `${mark.bmi > john.bmi ? mark.fullName : john.fullName} BMI (${
    mark.bmi > john.bmi ? mark.bmi : john.bmi
  }) is higher than ${
    mark.bmi > john.bmi ? john.fullName : mark.fullName
  } BMI (${mark.bmi > john.bmi ? john.bmi : mark.bmi})`
);
