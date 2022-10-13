"use strict";

const airline = "TAP Air Portugal";
const plane = "A320";

console.log(plane[0]);
console.log(plane[1]);
console.log("B737"[0]);

console.log(airline.length);
console.log("B737".length);
console.log(airline.indexOf("r"));
console.log(airline.lastIndexOf("r"));
console.log(airline.indexOf("Portugal"));
console.log(airline.indexOf("portugal")); // returns -1 if not found

console.log(airline.slice(4)); // initial index of the slice
console.log(airline.slice(4, 7)); // (start,end)
// it will stop at 6 actually
// the length of the string will always be 7 - 4
console.log("01234567".slice(4, 7));

console.log(airline.slice(0, airline.indexOf(" ")));
console.log(airline.slice(airline.lastIndexOf(" ") + 1));

// start from the end
console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === "B" || s === "E") {
    console.log("You got the middle seat");
  } else {
    console.log("You are lucky");
  }
};
checkMiddleSeat("11B");
checkMiddleSeat("23C");
checkMiddleSeat("3E");

// behind the scenes, javascript converts the string into an object on which you can call its methods
// you can see all the methods that you can call on a string in this way:
console.log(new String("Elisa"));
console.log(typeof new String("Elisa"));
// and when the operation is done, the object is converted back to a regular string primitive

//## change case
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

//## fix capitalization
let passenger = "jOnAS"; // convert to Jonas
passenger = passenger.toLowerCase();
passenger = passenger[0].toUpperCase() + passenger.slice(1);
console.log(passenger);

//## comparing emails
const email = "hello@jonas.io";
let loginEmail = "  Hello@Jonas.Io \n";
loginEmail = loginEmail.toLowerCase();
loginEmail = loginEmail.trim();
console.log(loginEmail);

// you can also do it in one line
// loginEmail.toLowerCase().trim()
console.log("  Hello@Jonas.Io \n".trimStart());
console.log("  Hello@Jonas.Io \n".trimEnd());

//## replacing
const priceGB = "288,97£";
console.log(priceGB);
const priceUS = priceGB.replace("£", "$").replace(",", ".");
console.log(priceUS);

let announcement = "All passenger come to boarding door 23. Boarding door 23!";
// you can do .replace() to replace only the first instance, .replaceAll() for replacing all of them
announcement = announcement.replaceAll("door", "gate");
console.log(announcement);

//## resular expressions
let secondAnnoun = "All passenger come to boarding door 23. Boarding door 23!";
secondAnnoun = secondAnnoun.replace(/door/g, "gate"); // the first one is a regular expression /.../g and g stands for gloabl

//## booleans
const plane2 = "A320neo";
console.log(plane2.includes("A320"));
console.log(plane2.includes("Boeing"));
console.log(plane2.startsWith("A32"));
console.log(plane2.endsWith("neo"));

//## SPLIT and JOIN
let myNewString = "a+very+nice+string";
myNewString = myNewString.split("+");
console.log(myNewString);

const [firstName, lastName] = "Elisa Battistoni".split(" ");
console.log(firstName);
console.log(lastName);

const newName = ["Ms.", firstName, lastName.toUpperCase()].join(" ");
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(" ");
  let namesUpper = [];
  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
    // namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  namesUpper = namesUpper.join(" ");
  return namesUpper;
};

const passenger2 = capitalizeName("jessica ann smith davis");
console.log(passenger2);

//## padding a string
// i.e. add a number of characters to the string until the string has a desired length
let aaa = "aaa";
aaa = aaa.padStart(6, "b"); // first argument = desired length
console.log(aaa);
aaa = aaa.padEnd(9, "c");
console.log(aaa);
aaa = aaa.padStart(12, "$").padEnd(15, "%");
console.log(aaa);

//##
const maskCreditCard = function (number) {
  const str = number + "";
  const last = str.slice(-4); // take last 4 characters
  return last.padStart(str.length, "*");
};
console.log(maskCreditCard("874387463876483"));

//## REPEAT a string multiple times
const message2 = "Bad weather.... All departures delayed... ";
console.log(message2.repeat(2));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line: ${"🛬 🛫".repeat(n)}`);
};
planesInLine(5);
// other resources: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
