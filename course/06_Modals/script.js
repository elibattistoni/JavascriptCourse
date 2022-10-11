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

// listen to keyboard events (keyboard events are global events -- "global" because they do not happen on one specific element)
// listen to the ESC button to close the modal
// you listen to the whole document
// there are 3 types of events for the keyboard:
// key down (fired as soon as we press a key)
// key press (fired continuously as we keep our finger on a key)
// key up (when you lift your finger off a key)
document.addEventListener("keydown", function (e) {
  // this without anything refers to all the keys
  //NB the information about which key was pressed will be stored in the event that is going to occurr as soon as any key is pressed
  // every time this function is called (i.e. every time a key is pressed). JS generates an object
  // this object contains all the information about the event itself, and we can access this object in the event handler function
  // this object is the input parameter e of the function
  // console.log(e);
  // console.log(e.key);
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    // console.log("Escape key was pressed");
    // I only want to close the modal when the modal is visible: if the modal contains the class hidden, it is not visible, else it is visible
    closeModal();
  }
});
