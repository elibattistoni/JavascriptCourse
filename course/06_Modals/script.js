"use strict";

//NB best to select elements at the beginning
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
//NB with querySelector only the first element is selected (e.g. in this case only the first Show Modal Button)
// const btnOpenModal = document.querySelector(".show-modal");
const btnOpenModal = document.querySelectorAll(".show-modal");
// if you want to do somethign to these buttons, you have to loop through the list btnOpenModal

//NOTE we always use the classList.add() and classList.remove() methods with the css classes as input in order to change the appearance of elements on pages
const openModal = function () {
  // remove the hidden class from the modal element so that it will appear
  // classList is a property that has some methods, one of them is .remove("hidden","otherclass","otherclass2")
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  // add again the hidden class to close the modal
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// for (let i = 0; i < btnOpenModal.length; i++)
//   console.log(btnOpenModal[i].textContent);
// if the for loop has only one line you do not have to put the {} around

//NB if you have to manipulate styles with JS it is always best to aggregate them into classes
for (let i = 0; i < btnOpenModal.length; i++) {
  btnOpenModal[i].addEventListener("click", openModal);
}

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
