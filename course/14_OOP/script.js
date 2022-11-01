"use strict";

//~ 3 ways for implementing PROTOTYPAL INHERITANCE or DELEGATION
//~ 1. CONSTRUCTOR FUNCTIONS
//~ 2. ES6 CLASSES
//~ 3. Object.create()

// in JS we have PROTOTYPES
// all objects in JS are linked to a certain prototype object
// so we say that "each object has a prototype"
// the prototype object contains methods and properties that all the objects
// that are linked to that prototype can access and use
// this behavior is called PROTOTYPAL INHERITANCE
/// PROTOTYPAL INHERITANCE or DELEGATION = all objects that are linked to a certain prototype object can use (inherit) methods and properties defined in the prototype
// NB this is not class inheritance
// - class inheritance means that one class inherits from another class
/// this is very different: in prototypal inheritance, an instance inherits from a class
// technically objects (instances) delegate behavior (methods) to the prototype
// in classical OOP, the behavior (methods) is actually copied from the class to the class or object (and this is completely different from JS OOP)

/// 4 pillars of OOP
/// 1. Abstraction
/// 2. Encapsulation
/// 3. Inheritance
/// 4. Polymorphism

//==============================================================================
//# CONSTRUCTOR FUNCTIONS and the NEW OPERATOR
//==============================================================================
console.log(
  "---------- PROTOTYPAL INHERITANCE: CONSTRUCTOR FUNCTIONS ----------"
);

// we can use constructor functions to build an object using a function

// in OOP there is the convention that CONSTRUCTOR FUNCTIONS always start with a capital letter
// we can use a function expression (like the example below) or a function declaration, but you cannot use an arrow function because it does not have the this keyword
// this function is going to produce an object
const Person = function (firstName, birthYear) {
  console.log(this);
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  console.log(this);

  // IMPORTANT you should never create a method inside of a constructor function!!
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};
// NB the only difference between a regular function and a costructor function is that we call the constructor using the "new" keyword
const jonas = new Person("Jonas", 1991);

//~ the new operator is a special type of operator which, when it calls the functions, does much more than simply calling a function:
//~ 1. it creates a New empty object: New{} is created
//~ 2. the function is called, and in this function call the this keyword is set to the newly created object at point 1.: this = {}
//~ 3. the newly created object is linked to a prototype (this will create the __proto__ property and set its value to the prototype property of the constructor function that is being called i.e. Person.prototype) and this is how JS internally knows that the Jonas object is connected to Person.prototype
//~ 4. the object that is created in the beginning is automatically returned from the constructor function; i.e. the function automatically returns the empty object from the beginning (i.e. the this keyword will be automatically returned)
//~ this is how it works with function constructors and also with ES6 classes, but not with Object.create()

const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);

// NB we didn't technically create a class because JS doesn't really have classes in the traditional OOP sense
// but we created 3 objects from 1 constructor function
// constructor functions have been used since the beginning of JS to kind of simulate classes, therefore
/// we can say that Jonas; Matilda and Jack are instances of Person

// you can check to see if something is an instance of something
console.log(jonas instanceof Person); // true

//==============================================================================
//# PROTOTYPES
//==============================================================================
console.log("-------- PROTOTYPES --------");
// every function in JS has automatically a property called PROTOTYPE (also constructor functions have this property)
// and every object that is created by a certain constructor function gets access to all the methods and properties that
// we define on the constructor's prototype property
Person.prototype;
console.log(Person.prototype);
// all the objects that are created through this constructor function will inherit (get access) to all methods and properties
// that are defined on this prototype property Person.prototype
// Person.prototype is an object, therefore:
Person.prototype.calcAge = function () {
  console.log(2013 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();
jack.calcAge();

// the prototype of jonas, matilda, jasck is Person.prototype
console.log(jonas.__proto__); // this is not the prototype property, but it is simply the prototype

// the prototype of the jonas object is the prototype property of the constructor function
console.log(jonas.__proto__ === Person.prototype); // true: jonas prototype (jonas.__proto__) is the prototype property of the person constructor function (Person.prototype)

console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(jack)); // true

// Person.prototype is not the prototype of person
// Person.prototype is what's going to be used as the prototype of all the objects that are created with the person constructor function
console.log(Person.prototype.isPrototypeOf(Person)); // false

/// to make it easier, think of .prototype as equal to .prototypeOfLinkedObjects

// NB you can also set properties on the prototype, not just methods
Person.prototype.species = "Homo Sapiens";
console.log(jonas, matilda);
console.log(jonas.species, matilda.species);
// but this property is not directly in the object (it is not it's own property)
// own properties are only the ones that are declared directly on the object itself, not including the inherited properties
// in JS you can check this:

console.log(
  'jonas.hasOwnProperty("firstName"):',
  jonas.hasOwnProperty("firstName")
); // this works because of the NB PROTOTYPE CHAIN!

console.log(
  'jonas.hasOwnProperty("species"):',
  jonas.hasOwnProperty("species")
);

//==============================================================================
//# PROTOTYPAL INHERITANCE & the PROTOTYPE CHAIN
//==============================================================================
console.log("-------- PROTOTYPAL INHERITANCE & PROTOTYPE CHAIN --------");
console.log(Person.prototype.constructor);

// the jonas object and its prototype form a prototype chain

// the prototype of Person.prototype is Object.prototype

// the prototype chain is pretty similar to the scope chain, but instead of working with scopes, it works with properties and methods in objects

//==============================================================================
//# PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS
//==============================================================================
console.log("-------- PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS --------");
console.log(Person.prototype);
console.log(jonas.__proto__); // inspect: this is the Person prototype
console.log(jonas.__proto__.__proto__); // inspect: this is the prototype property of Object (you see it because there is the method .hasOwnProperty) and this is why you can call it on jonas
console.log(jonas.__proto__.__proto__.__proto__); // inspect: null because Object.prototype (in the line above) is the top of the prototype chain
console.dir(Person.prototype.constructor); // this points to the constructor function itself (NB console.dir())

// a function is also an object, therefore it has a prototype

/// prototype of arrays
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // this is like doing new Array = [1,2,3,4,5,6,7,8,9]
console.log(arr.__proto__); // inspect: this is the prototype of array, and you can see all the methods that you already know
/// this is the reason why all the arrays get access to all of these methods:
// of course, each array does not contain all of these methods, but instead, each array inherits these methods from its prototype

console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__); // inspect: this is Object.prototype
console.log(arr.__proto__.__proto__ === Object.prototype); // inspect: this is Object.prototype

// in the documentation (e.g. MDN) for filter, you see Array.prototype.filter() because the filter method lives in the prototype property of the Array constructor

//# Defining new methods
// we know that an array inherits all the methods from its prototype; therefore, we can use this knowledge to extend the functionality of arrays even further
// you can add any new method to the prototype in this way:
Array.prototype.unique = function () {
  return [...new Set(this)]; //NB this is the array on which the method will be called
};
Array.prototype.calcAverage = function () {
  return this.reduce((a, b) => a + b, 0) / this.length;
};
// and all the arrays would inherit it
console.log(arr.unique());
console.log(arr.calcAverage());
// NB we just added a new method to the prototype property of the array constructor, and therefore all arrays will inherit this method; then we can call that method on any array that we want
/// IMPORTANT extending the prototype of a built-in object is generally not a good idea: why?
/// 1. the next version of JS might ass a method with the same name that we are adding, but it might work in a different way, and your code will then use that new method which works differently and might break your code
/// 2. when you work on a team of developers then this is a bad idea because if multiple developers implement the same method with a different name, then it's going to create many bugs

const h1 = document.querySelector("h1");
console.dir(h1); //inspect: this is to get the actual object; the prototype is an HTMLHeadingElement and its prototype is an HTMLElement, and its prototype is Element, and the prototype of Element is Node
// and its prototype is EventTarget (this is a huge prototype chain!!) and its prototype is Object (and this is the end)

/// prototype of functions
console.dir((x) => x + 1); // its prototype contsins the methods we have previously used on fuctions: apply, bind, call,...

//==============================================================================
//# ES6 CLASSES
//==============================================================================
console.log("---------- PROTOTYPAL INHERITANCE: ES6 CLASSES ----------");

// we implemented prototypal inheritance with constructor functions, and then we
// manually set the methods on the prototype property of the constructor function

/// ES6 classes allow us to do the same thing but in a nicer and more modern syntax

// remember that classes in JavaScript do not work like traditional classes in other languages like Java or C++
// they still implement prototypal inheritance behind the scenes but with a syntax that makes more sense to people coming from other programming languages

// classes are just a special type of functions

//# ES6 Class expression
const PersonClassExpression = class {};

//# ES6 Class declaration
class PersonClassDeclaration {
  // the constructor works in a similar way as a constructor function, but this is a method of this class
  // we pass in the arguments for the properties that we want the object to have
  // you will then create a new object with the "new" operator; when you do this, the constructor will automatically be called
  constructor(firstName, birthYear) {
    // like before, the this keyword inside the constructor will be set to the newly created empty object
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // to add methods you do this, just like a regular function:
  /// methods will be added to .prototype property of the Person Class
  calculateAge() {
    console.log(2037 - this.birthYear);
  }
  // NB all the methods that you write in this class, outside the constructor,
  // NB will be on the prototype of the object, not on the object itself (like before, this is prototypal inheritance)

  // no commas between methods
  greetAgain() {
    console.log(`Hey AGAIN ${this.firstName}`);
  }
}

const elisa = new PersonClassDeclaration("Elisa", 1991);
console.log(elisa); // inspect and you will see that the method calculateAge will be inside its prototype
elisa.calculateAge();
console.log(elisa.__proto__ === PersonClassDeclaration.prototype);

// you can also add a method manually to the prototype
PersonClassDeclaration.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};
elisa.greet();

// the Class simply hides the true nature of prototypal inheritance in JavaScript

elisa.greetAgain();

// NB about classes:
// NB 1) Classes are NOT hoisted: even if the methods are function declarations (which are hoisted, usually, i.e. we can use them before they are delcared in the code), with classes it does not work
// NB 2) Classes are first class citizens: this means that you can pass them into functions and return them from functions (because Classe are really just a special kind of function behind the scenes)
// NB 3) Classes are always executed in strict mode: the body of a class is always executed in strict mode (even if you did not activate it in the script)

// NB: constuctor functions are NOT old or deprecated syntax, therefore you can use one of the two methods at your own preference

//==============================================================================
//# SETTERS & GETTERS: SETTER PROPERTY and GETTER PROPERTY = "ASSESSOR PROPERTY"
//==============================================================================
console.log("---------- SETTERS & GETTERS ----------");

// this is a feature that is commo to all objects in JavaScript
// every object in JS can have a setter and getter property

/// DATA PROPERTIES = normal properties
/// ASSESSOR PROPERTIES = getters and setters

// NB getters and setters are functions that get and set a value, but on the outside they still look like regular properties

//# in OBJECT LITERALS
const account = {
  owner: "Jonas",
  movements: [200, 530, 120, 300],

  // by prepending get, the latest() method is transformed into a getter
  get latest() {
    return this.movements.at(-1); // alternatively: this.movements.slice(-1).pop()
  },

  // any setter method needs to have exactly one parameter in input
  set latest(mov) {
    this.movements.push(mov);
  },

  // NB it is not mandatory to specify a setter when we have a getter for the same property
  // just a getter or just a setter would be enough
};

// NB a getter is useful when we want to read something as a property but you need to do some calculations before
// NB a setter is useful when

// then you use it like a property:
// getter
console.log(account.latest);

// setter
account.latest = 50;
console.log(account);

//# in CLASSES
// in classes they work in the exact same way

class Dog {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  get age() {
    return 2022 - this.birthYear;
  }
}

const myDog = new Dog("Khoru", 2016);
console.log(myDog.age);

// inspect this
console.log(myDog); // in the prototype there is the get age method (function f age()) and the age property that has been added automatically

/// getters and setters can be very useful for data validation
class FullPerson {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  /// instance method = method that will be added to the prototype property so that all instances can have access to them
  calculateAge() {
    console.log(2037 - this.birthYear);
  }

  /// setter method
  // set a property that already exists (for example, this validates the input data)
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    // NB _ is a convention when you have a setter that is trying to set a property that already exists (but you are creating a new variable)
    else alert(`${name} is not a full name!`);
  }
  /// getter method
  get fullName() {
    return this._fullName;
  }

  /// static method
  static hey() {
    console.log("HEY THERE!! 🌝");
    console.log(this); // the this keyword is the entire class
  }
}

/// we are creating a setter for a property name that already exists
/// what happens is that each time we set the fullName on the this keyword, the setter is going to be executed
const me = new FullPerson("Elisa Battistoni", 1991);
// there is a weird error because right now the setter function and the constructor function are trying to set the exact same property name; so you add the underscore otherwise you get this weird error

// NB if you inspect me, now the property that exists is _fullName, so right now you cannot do me.fullName because it does not exist
console.log(me);
// NB to fix this, you need to create a getter for the fullName property
console.log(me.fullName);

//==============================================================================
//# STATIC METHODS
//==============================================================================
console.log("---------- STATIC METHODS ----------");

console.log(Array.from(document.querySelectorAll("h1")));
// the .from() method is attached to the entire Array constructor, not to the prototype property of the constructor (therefore all the arrays do not inherit this method)
// you cannot use it on an array, e.g.:
// console.log([1, 2, 3].from());

/// "the from method is in the array name space"
// from is a static method

/// let's implement a static method on a class created with the constructor function
// NB it is not on the prototype
Person.hey = function () {
  console.log("HEY THERE!! 🌝");
  console.log(this);
};
Person.hey(); // the this keyword is the entire constructor
// NB since it is not on the prototype, it is not inherited
// jonas.hey(); // error, like the error in [1,2,3].from()

/// static method on ES6 class: see above, by prepending static to the method
FullPerson.hey();
// sometimes useful for implementing some kind of helper function about a class (if ES6 syntax) or about a constructor function (with constructor functions)

//==============================================================================
//# Object.create()
//==============================================================================
console.log("---------- PROTOTYPAL INHERITANCE: Object.create() ----------");

//~ we learned about CONSTRUCTOR FUNCTIONS and ES6 CLASSES, but there is a third way of implementing PROTOTYPAL INHERITANCE or DELEGATION

// this function works in a pretty different way than constructor functions and classes

// NB there is still the idea of prototypal inheritance, but there are no prototype properties involved, no constructor function, no new operator
// NB we use Object.create to manually set the prototype of an object to any other object that we want

// let's create an object that we want to be the prototype of all the other objects
// in this prototype object there are all the methods that we want the person object to inherit
const PersonProto = {
  calculateAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    // NB this is a manual way of initializing the object, and this function could have any name
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// let's now create a person object with the object PersonProto as the prototype
const steven = Object.create(PersonProto);
// this will return a new empty object that is linked to the prototype given as input
console.log(steven);
// add the properties like in any other object literal
steven.name = "Steven";
steven.birthYear = 2002;
// this is not ideal! below there is a better mthod for doing this
steven.calculateAge();
// NB we did not need any constructor function nor prototype proiperties to achieve
// NB the same thing we achieved with the constructor function and the ES6 classes
// BEST PRACTICE this is the least used way of implementing prototypal inheritance

console.log(steven.__proto__ === PersonProto);

// best practice to set properties on the object: by defining the init() function in the prototype
// best practice (this function can have any name, its goal is similar to the constructor function,
// best practice but they are completely different; this is simply a manual way of initializing an object)
const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1979); // this is much better than the code in line 400-402
console.log(sarah);
sarah.calculateAge();

// usually you need Object.create() to link prototypes in the next lecture, in order to implement inheritance between classes

//==============================================================================
//# INHERITANCE BETWEEN CLASSES: CONSTRUCTOR FUNCTIONS
//==============================================================================
console.log("------ INHERITANCE BETWEEN CLASSES: CONSTRUCTOR FUNCTIONS ------");
// let's talk about real inheritance:
/// inheritance between classes (not just prototypal inheritance between instances and a prototype property like we have done so far)
/// we use the terminology "class" because it makes it easier to understand, but real classes do not exist in JavaScript

// we will create a new Student class that will inherit from the Person class
// Person will be the parent class
// Student will be the child class

// I just copy here the Person function constructor (from the beginning of this script and the calcAge method that we set up on the prototype property of Person)

const Person2 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person2.prototype.calculateAge = function () {
  console.log(2022 - this.birthYear);
};

// student constructor function
const Student = function (firstName, birthYear, course) {
  Person2.call(this, firstName, birthYear);
  this.course = course;
};

// NB we want to make Person.prototype the prototype of Student.prototype
// i.e. we want to set Student.prototype.__proto__ === Person.prototype
/// we need to manually link these two prototype objects with Object.create()
Student.prototype = Object.create(Person2.prototype); // with this, the Student.prototype object is now an object that inherits from Person.prototype
// we have to create this connection before we add any more methods to the prototype object of student (because Object.create will return an empty object, then onto that empty object we can add methods like the following)
// if you write Object.create() after defining the following methods, you would overwrite the methods that you added to the prototype object of student

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
console.log(mike);
mike.introduce();

mike.calculateAge();

console.log(mike instanceof Student);
console.log(mike instanceof Person2);
console.log(mike instanceof Object);

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.dir(Student.prototype.constructor); // JS thinks that the constructor of Student.prototype is Person, because we set the prototype property of the student using Object.create()
// but this is not what we want, so we do this:
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

//==============================================================================
//# INHERITANCE BETWEEN CLASSES: ES6 CLASSES
//==============================================================================
console.log("---------- INHERITANCE BETWEEN CLASSES: ES6 ----------");

// NB the class syntax hides a lot od details that are actually happening behind the scenes, because classes are really just a layer of abstraction over constructor functions

class PersonClass {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // instance method
  calculateAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // static method
  static hey() {
    console.log("HEY THERE!! 🌝");
  }
}

// NB to implement inheritance between ES6 classes we only need: the extends keyword and the super function
// let's now inherit from this class
// the extends keyword alone will link the prototypes behind the scenes
// super() is the constructor function of the parent class (it replaces .call())
class StudentClass extends PersonClass {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear); // pass in the parameters that are specified in the constructor function of the parent class, and this is always first because it is responsible for creating the this keyword in this subclass (child class)
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // the calculateAge overrides or shadows the calculateAge method in PersonClass
  calculateAge() {
    console.log("I feel older");
  }
}

const martha = new StudentClass("Martha Jones", 2002, "Computer Science");
console.log(martha);
martha.introduce();
martha.calculateAge();

/// you do not need to have a constructor, it works
// this is just to demonstrate that if you do not need any new properties, you don't even need to write a constructor method in the child class
class StudentClass2 extends PersonClass {}
const martin = new StudentClass2("Martin Guerrero", 2000);
console.log(martin);

//==============================================================================
//# INHERITANCE BETWEEN CLASSES: Object.create()
//==============================================================================
console.log(
  "---------- INHERITANCE BETWEEN CLASSES Object.create() ----------"
);

// NB with this version we do not worry about constructors, prototype properties, and the new operator
// NB with Object.create() you are not faking classes (you are faking classes when you use ES6 classes and constructor functions),
// NB you are simply linking objects together, where some objects then serve as the prototype of other objects

// parent class
const PersonProtoNew = {
  calculateAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
// instance of parent class
const chrisParent = Object.create(PersonProtoNew);

// child class
const StudentProtoNew = Object.create(PersonProtoNew); // PersonProtoNew is the prototype of StudentProtoNew
StudentProtoNew.init = function (firstName, birthYear, course) {
  // the child prototype can reuse the init method from the person prototype (which is a parent prototype)
  PersonProtoNew.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProtoNew.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
// instance of child class
const chrisSon = Object.create(StudentProtoNew); // StudentProtoNew is the prototype of chrisSon
// therefore, PersonProtoNew is a parent prototype of chrisSon
chrisSon.init("Chris", 2000, "Computer Science");
chrisSon.introduce();
chrisSon.calculateAge();

//==============================================================================
//# Another class example
//==============================================================================
console.log("---------- ANOTHER CLASS EXAMPLE ----------");

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks ${this.owner} for opening an account!`);
  }

  // Public interface
  deposit(val) {
    this.movements.push(val);
  }
  // the withdraw method abstracts the fact that a withdrawal is basically a negative movement
  withdraw(val) {
    this.deposit(-val);
  }

  approveLoan(val) {
    return true;
  }
  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log("Loan approved");
    }
  }
}

const acc1 = new Account("Jonas", "EUR", 1111);
console.log(acc1);

// NB not a good idea to interact with properties in the following method!
// acc1.movements.push(250)
// acc1.movements.push(-120)
// BEST PRACTICE: create methods that interact with these properties, especially if they are important properties

acc1.deposit(300);
acc1.withdraw(20);
// NB these methods .deposit() and .withdraw() are the interface to our objects (we also call this API)

// security: some methods and properties should not be accessible
// e.g. we only want this to be accessible:
acc1.requestLoan(1000);
// but you do not want this to be accessible:
acc1.approveLoan(1000); // this is an internal method that only the requestLoan method should use

/// we really need data encapsulation and data privacy

//==============================================================================
//# ENCAPSULATION: PROTECTED PROPERTIES AND METHODS
//==============================================================================
console.log("---------- DATA PRIVACY & ENCAPSULATION ----------");

/// ENCAPSULATION = keeping some properties and methods private inside the class, so that they are not accessible form outside the class
/// the rest of the methods are exposed as a public interface (which we can also call API)

// NB why do you need ENCAPSULATION and DATA PRIVACY?
// NB 1) in order to prevent code from outside of a class to accidentally manipulate the data inside the class (e.g. the movements property in the example above)
// NB 2) when we expose only a small interface (a small API) consisting only of a few public methods,
// NB then we can change all the other internal methods with more confidence,
// NB because in this case we can be sure that external code does not rely on these private methods
// NB therefore our code will not break when we do internal changes

/// JS classes actually do not yet support real data privacy and encapsulation (it is on the way)
/// so we will fake encapsulation by using a convention

class AccountEncapsulated {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin; // protected property
    this._movements = []; // protected property
    this.locale = navigator.language;

    console.log(`Thanks ${this.owner} for opening an account!`);
  }

  // Public interface
  getMovements() {
    return this._movements;
  }
  deposit(val) {
    this._movements.push(val);
  }
  // the withdraw method abstracts the fact that a withdrawal is basically a negative movement
  withdraw(val) {
    this.deposit(-val);
  }

  _approveLoan(val) {
    return true;
  } // _approveLoan should not be part of the public API, but all the others should be

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log("Loan approved");
    }
  }
}

const acc2 = new AccountEncapsulated("Elisa", "USD", 2222);
acc2.deposit(300);
acc2.deposit(1570);
acc2.withdraw(20);
acc2.requestLoan(10000);

// _ does not make the property or method truly private, it is just a convention
// NB _movements is a "protected property", not a private proprty because it is not truly private

console.log(acc2._movements); /// the data is still accessible but at least you and your team will know that this property is not supposed to be touched outside of the class
console.log(acc2.getMovements());

//==============================================================================
//# ENCAPSULATION: PRIVATE CLASS FIELDS AND METHODS
//==============================================================================
/// TRULY PRIVATE FIELDS AND METHODS
// there is a proposal called "Class fields proposal" that is ongoing and it will be approved sometime in the future
// but some parts of this proposal already work in Google Chrome (only here)

//- CLASS FIELDS
// in traditional OOP languages like Java and C++, properties are usually called fields
// therefore with this new proposal, JS is moving away from the idea that classes are just syntactic sugar over constructor functions
// because with this new class features, classes will start to have abilities that we did not previously have with constructor functions

/// in this proposal there are 4 (actually 8) different kinds of fields and methods
/// 1. PUBLIC FIELDS
/// 2. PRIVATE FIELDS
/// 3. PUBLIC METHODS
/// 4. PRIVATE METHODS
/// each one has also the STATIC version, that is why there are 8

/// FIELD = property that will be on all instances

class AccountX {
  //~ PUBLIC FIELDS (on instances, not on prototype)
  // i.e. fields that will be present on all the instances that we create through the class: NB they are not on the prototype!! (referenceable by the this keyword)
  locale = navigator.language;

  //~ PRIVATE FIELDS (on instances, not on prototype)
  // i.e. fields that are truly not accessible from the outside
  #movements = [];
  #pin; // set to empty because you cannot have it in the constructor, but you set the pin based on the input value to the constructor

  // constructor
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
  }

  //~ PUBLIC METHODS (public interface, API)
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
  }

  // the withdraw method abstracts the fact that a withdrawal is basically a negative movement
  withdraw(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log("Loan approved");
    }
  }

  //~ PRIVATE METHODS (not yet implemented, so switching to protected)
  // useful to hide the implementation details from outside
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  } // NB no browser supports this

  //~ static methods: they are not available on all the instances but only on the class itself
  static helper() {
    console.log("THIS IS THE CLASS HELPER");
  }
}

const accx = new AccountX("Elisa", "EUR", 3333);
accx.deposit(2000);
accx.deposit(7368);
accx.deposit(6637);
accx.withdraw(200);
accx.requestLoan(20389457);
console.log(accx.movements);
// console.log(accx.#movements); // error
console.log(accx.getMovements()); // but you can still get the movements through the public interface (API)

console.log(accx.pin);
// console.log(accx.#pin); // error
console.log(accx);
// console.log(accx.#approveLoan(534)); // its says "private fields"... not "private methods", therefore they are not yet available

AccountX.helper();

//==============================================================================
//# CHAINING METHODS
//==============================================================================
// like chaining array methods

class AccountK {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    this._movements = [];
    this.locale = navigator.language;

    console.log(`Thanks ${this.owner} for opening an account!`);
  }

  getMovements() {
    return this._movements;
  }
  deposit(val) {
    this._movements.push(val);
    return this;
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log("Loan approved");
      return this;
    }
  }
}

// BEST PRACTICE returning this, i.e. the object, makes the method chainable, and this makes most sense in methods that set some property
const acck = new AccountK("Gelsomino", "STERLINE", 4444);
acck.deposit(300).deposit(500).withdraw(200).requestLoan(72638); // we want acck.deposit(300) to return acck, so that you can chain the next oepration, then return acck, then chain the other operation
console.log(acck.getMovements());

//==============================================================================
//# ES6 CLASSES SUMMARY
//==============================================================================
