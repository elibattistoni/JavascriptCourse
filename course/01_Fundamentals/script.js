let js = "amazing";
// if (js === 'amazing') alert('Javascript is FUN!');

// this does not appear anywhere
40 + 8 + 23 - 10;

// if you want somethign to be seen in the console
console.log(40 + 8 + 23 - 10);
console.log(40, 30); // log multiple values at the same time

// values and variables
let firstName = "Jonas";

// data types
console.log(typeof true);
console.log(typeof firstName);
console.log(typeof 23);

// reassign a variable: do not write again let
firstName = "Elisa";

let year;
console.log(year);
console.log(typeof year);

year = 2022;
console.log(year);
console.log(typeof year);

console.log(typeof null); //this is a bug (it returns object)

//=============================================================================
//# let, const, var
// let >> to declare variables that can change later (when you need to mutate a variable, or when you need to declare/preallocate a variable to undefined) (e.g. age)
// const >> to declare variables that are not supposed to change at any point in the future (to declare an immutable variable, e.g. birth year) + you cannot declare empty const variables
// var >> it should be completely avoided (it is old) >> prior to ES6, it is the old way of declaring variables >> the value can be mutated

// you can also not declare the variable, e.g. writing
// lastName = "Battistoni";
// but it is a terrible idea because this does not create a variable in the current scope, but javascript will create a property on the global object

//=============================================================================
//# assignment operators, math operators, comparison operators
// multiplication *
// division /
// exponentiation **
// the typeof operator (see above)

// join or concatenate strings
const myFirstName = "Elisa";
const myLastName = "Battistoni";
console.log(myFirstName + myLastName);
console.log(myFirstName + " " + myLastName);

let x = 10;
x += 1; // x = x + 1
console.log(x);
x *= 2; // x = x * 2
x /= 2; // x = x / 2
x++; // x = x + 1
x--; // x = x - 1

// bigger than >
// smaller than <
// bigger or equal than >=
// smaller or equal than <=
// equal ==
// strictly equal ===

//=============================================================================
//# operator precedence
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table

//=============================================================================
//# strings
// contrary to python, you can concatenate a string and a number without converting the number to a string
const myName = "Elisa";
const job = "Data Scientist";
const birthYear = 1991;
const thisYear = 2022;
const elisa =
  "I'm " + myName + ", a " + (thisYear - birthYear) + " years old " + job;
console.log(elisa);

//=============================================================================
//### template literal
const elisaNew = `I'm ${myName}, a ${thisYear - birthYear} years old ${job}`;
console.log(elisaNew);
// we can use backticks for any regular string
console.log(`This is a string with backticks`);

//# multiline string with template literal
// the old way:
console.log("String with \n\
multipl \n\
lines.");

console.log(`String
multiple
lines `);

//=============================================================================
//# if else
const age = 19;
const isOldEnough = age >= 18;
if (isOldEnough) {
  console.log("Is old enough");
} else {
  console.log("He/She is not old enough");
}

if (age >= 18) {
  console.log("Sarah can start driving license");
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young, Wati another ${yearsLeft} years:`);
}

// statements and expressions
// expression = piece of code that produces a value
//console.log(3 + 4);
//console.log(1991);
// statement = bigger piece of code that is executed and that does not produce a value: it performs some actions
// if else statements, switch statements
// javascript expects statements and expressions in different places
// e.g. in template literals, we can only have expressions, not statements

//! important: preallocate variables for which then you assign a value in the if else statement
let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);

//=============================================================================
//# type conversion vs type cohercion
// type conversion --- you do the conversion
// type cohercion --- javascript automatically coherces the type of a value/variable to another (and it is hidden from us)

// convert strings to numbers
const inputYear = "1991";
console.log(inputYear + 10); // this will do a string concatenation
console.log(Number(inputYear));

let inputYear2 = "1991";
console.log(inputYear2, typeof inputYear2);
inputYear2 = Number(inputYear2);
console.log(inputYear2, typeof inputYear2);

console.log(Number("Elisa")); // this returns NaN (Not a Number -- which actually means invalid number)
console.log(typeof NaN); // this returns number

// convert numbers to strings
console.log(String(23), 23);

// you can convert to Numbers, Strings, Booleans (you cannotconvert to other types)

//! rarely you have to do type conversion manually because in most situations javascript does type cohercion automatically
// type cohercion
// type cohercion subenters whenever there is an operation in which the values have different types
// in order to make the operation happen, js will convert automatically
console.log("I am " + 23 + " years old");
// when there is an operation between numbers and strings, js will automatically convert the number to a string

console.log("23" - "10" - 3); // this will return 10
console.log("23" + "10" + 3); // this will return 23103
//! why? because the minus operator triggers a number cohercion, whereas the plus operator triggers a concatenation
console.log("23" * "2"); // this returns a number
console.log("23" / "2"); // this returns a number
console.log(2 + 3 + 4 + "5"); // this returns a string, "95" because 2+3+4 equals 9, and 9+'5' equals '95

//=============================================================================
//# truthy and falsy values
// falsy values = values that are not inherently false but will become false when we try to convert them into booleans
// there are only 5 falsy values: 0, '', undefined, null, NaN
// truthy values = values that when converted into booleans they become true
// i.e. any value that is not 0, any string that is not an empty string

console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));

console.log(Boolean("Elisa"));
console.log(Boolean(437));
console.log(Boolean({}));

// in practice the conversion to boolean is always implicit, not explicit with Boolean: it is always type cohercion
// when using logical operators and in if else statements
const money = 0;
if (money) {
  console.log("Dont spend it all");
} else {
  console.log("You should get a job");
}

const money2 = 100;
if (money2) {
  console.log("Dont spend it all");
} else {
  console.log("You should get a job");
}

let height;
if (height) {
  console.log("Height is defined");
} else {
  console.log("Height is undefined");
}

//=============================================================================
//# Equality operators
if (age === 18) console.log("You became an adult");

//# strict equality operator ===
// both values are exactly the same
console.log(18 === 18); // true
console.log(18 === "18"); // false
console.log(18 === 19); // false
//# loose equality operator == (it does type cohercion!!)
console.log(18 == "18");

//!! avoid loose equality operator as much as possbile because it makes the code prone to bugs
//! always better to use the strict equality operator
const favourite = prompt("What is your favourite number?");
console.log(favourite);
console.log(typeof favourite); // returns a string
if (favourite == 23) {
  console.log("23 is an amazing number");
}
if (favourite === 23) {
  console.log("23 is an amazing number");
}
// best way of doing it
const favourite2 = Number(prompt("What is your favourite number?"));
if (favourite2 === 23) {
  console.log("23 is an amazing number");
} else if (favourite2 === 7) {
  console.log("7 is also amazing");
} else {
  console.log("Number is not 23 nor 7");
}

//# strict inequality operator
console.log(18 !== "18"); // returns true
console.log(18 != "18"); // returns false

//=============================================================================
//# boolean logic
const myA = true;
const myB = false;

//# AND
console.log(myA && myB);

//# OR
console.log(myA || myB);

//# NOT
console.log(!myA);

const myC = myA && myB;
console.log(myC);

//=============================================================================
//# the switch statement (strictly equality comparison)
const day = "wednesday";

switch (day) {
  case "monday":
    console.log("it's monday");
    break;
  case "tuesday":
    console.log("it's tuesday");
    break;
  case "wednesday":
  case "thursday":
    // it runs the same thing for both wednesday and thursday
    console.log("it's wednesday or thursday");
    break;
  default: // else
    console.log("ciao");
    break;
}

//=============================================================================
//# the switch statement (non strictly equality comparison)
const something = { day: undefined };

// null and undefined are non strictly undefined: null == undefined  is true,
// null === undefined is false
//  e.g. i am not sure what "soemthing" will be, and i cannot place a while cycle here
// this is only useful if your backender is an idiot
switch (true) {
  case something.day == null:
    console.log("yay! for shallow equality!!!");
    break;
  case something.day === null:
    console.log("yay! for strict equality!!!");
    break;
  default: // else
    console.log("wtrfadjvnla");
    break;
}

//=============================================================================
//# map
const dayMap = "tuesday";

const coolMap = new Map();

coolMap.set("monday", "mondayValue");
coolMap.set("tuesday", "tuesdayValue");
coolMap.set("wednesday", "wednesdayValue");
coolMap.set("thursday", "thursdayValue");
coolMap.set("friday", "fridayValue");

const currentDay = coolMap.get(dayMap);

currentDay != null ? console.log(currentDay) : console.log("not a day");

//=============================================================================
//# conditional (or ternary) operator >> good for quick and short decisions
// it allows to write an if else statement in one line
const newAge = 23;
newAge >= 18
  ? console.log("newAge bigger or equal than 18")
  : console.log("newAge smaller than 18");
// (condition if) ? (run if true) : (run if false)

// an operator is an expression, it always produces a value
// you can use it to conditionally assign a value to a variable
const drink = newAge >= 18 ? "wine" : "water";
console.log(drink);

//! big difference between the conditional operator and if else
// with an if else it would be:
let drink2;
if (newAge >= 18) {
  drink2 = "wine";
} else {
  drink2 = "water";
}
console.log(drink);

//! you can use the ternary operator in a template literal
console.log(`I like to drink ${newAge >= 18 ? "wine" : "water"}`);
