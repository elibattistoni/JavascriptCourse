// Part 6 - Objects Exercise

////////////////////
// PROBLEM 1 //////
//////////////////

// Given the object:
// Add a method called nameLength that prints out the
// length of the employees name to the console.

var employee = {
  name: "John Smith",
  job: "Programmer",
  age: 31,
};

var employee = {
  name: "John Smith",
  job: "Programmer",
  age: 31,
  nameLength: function () {
    console.log(this.name.length);
  },
};
employee.nameLength();

///////////////////
// PROBLEM 2 /////
/////////////////

// Given the object:
// Write program that will create an Alert in the browser of each of the
// object's values for the key value pairs. For example, it should alert:
// Name is John Smith, Job is Programmer, Age is 31.
var employee = {
  name: "John Smith",
  job: "Programmer",
  age: 31,
  employeeAlert: function () {
    //should be alert
    console.log(
      "Name is: " +
        this.name +
        ", Job is: " +
        this.job +
        ", Age is: " +
        this.age
    );
  },
};

employee.employeeAlert();

///////////////////
// PROBLEM 3 /////
/////////////////

// Given the object:
// Add a method called lastName that prints
// out the employee's last name to the console.
// You will need to figure out how to split a string to an array.
// Hint: http://www.w3schools.com/jsref/jsref_split.asp

var employee = {
  name: "John Smith",
  job: "Programmer",
  age: 31,
  lastName: function(){
    console.log(this.name.split(" ")[1])
  }
};
employee.lastName()
