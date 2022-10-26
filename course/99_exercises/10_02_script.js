"use strict";

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";

  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "blue";
  });
})();

// how does the callback function in the addeventlistener method have access to the header variable?
// because of closure:
// bu the time the callback function in the addeventlitener method is executed, the IIFE is gone (it has been executed and the variable is gone)
// but the callback function is still attached to the body and waiting for something to happen, and it is executed when the event happens
