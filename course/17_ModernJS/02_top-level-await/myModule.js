console.log("Exporting module");

export const cart = ["banana", "apple", "pear", "raspberry"];

// Blocking code
console.log("Start fetching users....");
await fetch("https://jsonplaceholder.typicode.com/users");
console.log("Users fetched!");
