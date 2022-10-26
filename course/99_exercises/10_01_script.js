"use strict";

const btnPoll = document.querySelector(".poll");
const btnBuy = document.querySelector(".buy");

const poll = {
  question: "What is your favourite programming language?",

  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],

  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  registerNewAnswer: function () {
    // show prompt
    const response = Number(
      prompt(`${this.question}\n${this.options.join("\n")}`)
    );
    // update answers array
    if (typeof response === "number" && response >= 0 && response <= 3) {
      this.answers[response] += 1;
    }
  },

  displayResults: function (type = "array") {
    type === "string"
      ? console.log(`Poll results are ${this.answers}`)
      : console.log(this.answers);
  },
};

// you need to tell js what is the this object: do this with the bind method
btnPoll.addEventListener("click", poll.registerNewAnswer.bind(poll));
btnPoll.addEventListener("click", poll.displayResults.bind(poll, "string"));

// BONUS
const data_1 = { answers: [5, 2, 3] };
const data_2 = { answers: [1, 5, 3, 9, 6, 1] };
const displayResults = poll.displayResults;
displayResults.call(data_1, "array");
displayResults.call(data_2, "string");
