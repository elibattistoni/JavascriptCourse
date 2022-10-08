var country1 = "USA"
var country2 = "Germany"
var country3 = "China"

// mutable: arrays are mutable
var countries = ["USA","Germany","China"]
console.log(countries)
console.log(countries[2])
countries[2] = "Italy"
console.log(countries[2])
console.log(countries)

// immutable: strings are immutable
var country1 = "USA"
console.log(country1)
country1[0] = "K"
console.log(country1)

// an array can take in mixed data types
mixed = [true, 20, "string"]
console.log(mixed)
console.log(mixed.length)

// arrays methods
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
var myArr = ["one","two","three"]
console.log(myArr)
// remove last item
var lastItem = myArr.pop()
console.log(lastItem)
console.log(myArr)
// add item
myArr.push("new_item")
console.log(myArr)
// last item in array
myArr[myArr.length - 1]
console.log(myArr[myArr.length - 1])

// arrays
var matrix = [[1,2,3],[4,5,6],[7,8,9]]
console.log(matrix)
console.log(matrix.length)

// array iterations
arr = ["A","B","C","D"]
for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
console.log()
for (letter of arr) {
    console.log(letter);
}
// to run in js script or console
//for (letter of arr) {
//    alert(letter);
//}
// alternatively, more elegant:
//arr.forEach(alert);

// with custom function
function addAwesome(name) {
    console.log(name + " is awesome!");
}
addAwesome("django")
var topics = ["python","django","science"]
//topics.forEach(addAwesome)