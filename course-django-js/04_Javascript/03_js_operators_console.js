// in the console
true;
false;
3 > 2;
2 < 3;
3 >= 2;
2 <= 3;

// EQUALITY
2 == 2; // returns true
"user" == "user"; // returns true
"q" != "a"; // returns true
"2" == 2; // returns true (which is not what we want) with == js uses "type cohercion"
"2" === 2; // returns false (which is what we want)
"5" !== 5; // returns true (it checks also data type)
"5" != 5; // returns false (does not check data type)


true == 1; // returns true
true === 1; // returns false
false == 0; // returns true
false === 0; // returns false

// weird behaviors for null, undefined, and NaN
null == undefined; // returns true
NaN == NaN; // returns false

console.log(`null == undefined is ${null == undefined}.`) // true
console.log(`null === undefined is ${null === undefined}.`) // false
console.log(`NaN == NaN is ${NaN == NaN}.`) // false

// LOGICAL OPERATORS
// AND (all conditions need to be true)
1 === 1 && 2 === 2;
console.log(`[AND operator] 1 === 1 && 2 === 2 is ${1 === 1 && 2 === 2}.`) // true

// OR (only one condition needs to be true)
1 === 1 || 1 === 2;
console.log(`[OR operator] 1 === 1 || 1 === 2 is ${1 === 1 || 1 === 2}.`) // true

// NOT
console.log(`[NOT operator] (1 === 1) is ${(1 === 1)}.`) // true
console.log(`[NOT operator] !(1 === 1) is ${!(1 === 1)}.`) // false
console.log(`[NOT operator] !(1 == 1) is ${!(1 == 1)}.`) // false

// exercise
var x = 1
var y = 2
console.log(`"2" == y && x === 1 is ${"2" == y && x === 1}.`) // true
console.log(`x >= 0 || y === "2" is ${x >= 0 || y === "2"}.`) // true
console.log(`!(x !== 1) && y === (1+1) is ${!(x !== 1) && y === (1+1)}.`) // true
console.log(`y !== "2" && x < 10 is ${y !== "2" && x < 10}.`) // true
console.log(`y !== x || y == "2" || x === 3 is ${y !== x || y == "2" || x === 3}.`) // true