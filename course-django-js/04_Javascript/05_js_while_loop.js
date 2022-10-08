var x = 0;

while (x < 5) {
    console.log(`x is currently ${x}`)
    if (x == 3) {
        console.log(`breaking loop at x == ${x}`)
        break;
    }
    x = x + 1;
}

// while loop to print all the even numbers from 1 to 10
var num = 1

while (num <= 10) {
    if (num % 2 === 0) {
        console.log(`number ${num} is even`)
    }
    num = num + 1
}