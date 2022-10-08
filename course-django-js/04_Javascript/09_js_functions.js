function hello() {
    console.log("HELLOOOO");
}
// look, in the console log, the difference between:
// hello()
// hello

function helloYou(name="My Default Name") {
    console.log(`Hello you, ${name}!`)
}
helloYou("ELISAAAAAA")

function addNum(num1,num2) {
    console.log(`sum of ${num1} and ${num2} is ${num1+num2}!`)
}
addNum(2,5)
addNum("2",5)
addNum("Ciao ","Elisa")

// return
function formal(name="Sam",title="Sir") {
    return title + " " + name
}
var output = formal()
console.log(`output: ${output}`)
var output = formal("Elisa","Giovincella")
console.log(`output: ${output}`)

var v = "GLOBAL V"
var stuff = "GLOBAL STUFF"
console.log(`stuff: ${stuff}`);
function fun(stuff) {
    console.log(`v: ${v}`);
    console.log(`stuff: ${stuff}`);
    stuff = "REASSIGNED STUFF";
    console.log(`stuff: ${stuff}`);
}
fun(stuff)
console.log(`stuff: ${stuff}`);