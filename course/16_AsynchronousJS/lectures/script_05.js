"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

//==============================================================================
//# EVENT LOOP in practice
//==============================================================================

// inspect

console.log(">>>>>>> Test start"); // NB position in run: 1 (because it is synchronous)

// let's build a timer that will fire after 0 seconds
setTimeout(() => console.log("O sec timer"), 0); // NB position in run: (5) / (4)
// after 0 seconds, this callback will be put on the callback queue

// let's build a promise that resolves immediately
// a promise that is immediately resolved i.e. that immediately has a success value// then we can handle the resolved promise
// the fulfilled success value is "Resolved promise 1"
Promise.resolve("Resolved promise 1").then((res) => console.log(res)); // NB position in run: 3

Promise.resolve("Resolved promise 2").then((res) => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
}); // NB position in run: (4) / none

console.log(">>>>>>> Test end"); // NB position in run: 2 (because it is synchronous)

// NB both the timer and the promise will finish at the exact same time, right after zero seconds
// the timer because we told it to finish right after zero seconds
// the promise because we told it to immediately become resolved
// but which one will be handled/executed first?
// NB the timer appears first, so its callback will be the first to appear in the callback queue
// NB but it will not be the first one to be executed because of the micro-tasks queue
// NB the callback of the resolved promise will be put on the micro-tasks queue
// NB and the micro-tasks queue has priority over the callback queue
// NB therefore if one of the micro-tasks takes a long time to run, then the timer will be delayed and run after more than the 0 seconds that we defined
// NB it will run a litte later, just after the micro-task is actually done with its work (the Promise 2 shows this)
/// IMPORTANT this means that you cannot do high precision things with JavaScript timers
/// so keep this in mind when you work with timers and promises at the same time
