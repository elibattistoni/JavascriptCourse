"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal"); // this is a nodelist (so you can use forEach on it)
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

// define open modals and close modals functions
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// open modals
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// close modal
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// if you press esc, close the modal window if it is visible (i.e. if it does not contain the class hidden)
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//==============================================================================
//## 1. Smooth scrolling when clicking on the "Learn more button"
//==============================================================================
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

//==============================================================================
//## 2. Smooth scrolling of page navigation with EVENT DELEGATION
//==============================================================================
// when you click on the links in the navbar, it automatically scrolls smoothnly to the corresponding sections

// best practice: event delegation: using the fact that events bubble up
// and we do that by putting the event listener on a common parent of all the elements that we are interested in, in this case, the container with class .nav__links

//~ 2 steps in event delegation:
// 1) Add the event listener to a common parent element of all the elements that we are interested in
// 2) in that event listener, determine what element originated the event (so we can work with that element, where the event was actually created)
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(e.target);

  // Matching strategy: check if the target has the nav__link class (the one you are interested in)
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//==============================================================================
//## 3. Building a tabbed component
//==============================================================================

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  // console.log(clicked);

  // Guard clause (if you click on the container but not on one of the tabs) return the function right away
  if (!clicked) return;

  /// ACTIVE TAB
  // remove the "going up" of a tab from all the tabs (qhen a tab is clicked/active, you add a class so that it moves a bit upwards)
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  // add active
  clicked.classList.add("operations__tab--active");

  /// ACTIVE CONTENT AREA
  // remove active class from all the tabs
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  // console.log(clicked.dataset.tab);
  // add active
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//==============================================================================
//## Menu fade animation
//==============================================================================
//## Passing arguments to Event Handlers: fade out all the links whyen we hover on one of them, except for the link that we actually hover over

const handleHover = function (e, opacity) {
  console.log(this); // this is for understading better when you use bind
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    // let's look for a parent that matches a certain query
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        // el.style.opacity = opacity; // use this one if you do not use bind
        el.style.opacity = this; // use this one if you use bind
      }
      // logo.style.opacity = opacity; // use this one if you do not use bind
      logo.style.opacity = this; // use this one if you use bind
    });
  }
};

// best practice: refactoring number 1
// mouse over
//NB "mouseenter" does not bubble; "mouseover" bubbles
//NB you cannot directly call the handleHover funciton, you have to insert it into a callback function
//TODO uncomment to see this work
// nav.addEventListener("mouseover", function (e) {
//   handleHover(e, 0.5);
// });
// mouse out
//TODO uncomment to see this work
// nav.addEventListener("mouseout", function (e) {
//   handleHover(e, 1);
// });
//best practice: better refactoring (refactoring number 2)
/// using bind to pass "arguments" into handler function (between quotes because handler functions can only accept one argument, i.e. the event itself)
// mouse over
nav.addEventListener("mouseover", handleHover.bind(0.5)); // NB the bind method will set the this keyword to whatever value we pass into bind
// mouse out
nav.addEventListener("mouseout", handleHover.bind(1));

//==============================================================================
//## Implement sticky navigation bar
//==============================================================================
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

//NB actually "scroll" is bad practice because it fires continuously
window.addEventListener("scroll", function () {
  // console.log(window.scrollY);
  // when we reach the first section, the navigation bar should become sticky
  if (window.scrollY > initialCoords.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});
