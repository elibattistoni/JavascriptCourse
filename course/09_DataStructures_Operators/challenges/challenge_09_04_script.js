"use strict";

// document.body.append(document.createElement("textarea"));
// document.body.append(document.createElement("button"));

const button = document.getElementById("submitButton");

let text = "";
button.addEventListener("click", function () {
  text = document.querySelector("#textArea").value;

  const re = new RegExp("\\s+", "g");
  text = text.replaceAll(re, " ");

  text = text.split(" ");

  let counter = 1;
  for (let string of text) {
    string = string.toLowerCase();
    string = string.split("_");
    string = string[0] + string[1][0].toUpperCase() + string[1].slice(1);
    string = string.padEnd(20, " ");
    string = string + "✅".repeat(counter);
    counter += 1;
    console.log(string);
  }
});
