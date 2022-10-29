"use strict";

//TODO to see this script in action, change the scource in the HTML file

//==============================================================================
//## SELECTING ELEMENTS
//==============================================================================
// there is a special way for selecting the entire document
document.documentElement; // "document" (the first part of the statement) is not enough to select the document element (it is not the real DOM element)
// if you want to apply css etc, you have to select it in this way
console.log(document.documentElement);
// head and body
document.head;
document.body;

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section"); // this returns a NodeList
console.log(allSections);

document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button"); // IMPORTANT this returns an HTML collection (not a NodeList)
console.log(allButtons);
/// HTML collection = life collection: if the DOM changes then this collection is also updated automatically (this does not happen with nodelists)

document.getElementsByClassName("btn"); // this also returns a live HTML collection

//==============================================================================
//## CREATING & INSERTING ELEMENTS
//==============================================================================
//IMPORTANT~ also insertAdjacentHTML // look in the bankist application
//~ sometime is more useful to build the element from scratch instead of inserting content in it

const message = document.createElement("div"); // this will create a DOM div element that we can save into a variable
//NB this creates a DOM element and then it stores the element into the message variable; the element is not yet in the DOM
// it is simply a DOM object that we can now use to do something
// add a class to the element
message.classList.add("cookie-message");
message.textContent = "We use cookies for improved functionality and analytics";
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;
// now we have to insert it into the DOM (let's insert it into the header)
header.prepend(message); /// .prepend() adds the message element as the FIRST CHILD of the header element
// header.append(message); /// adds the message element as the LAST CHILD
//NB if you uncomment the .append() you will see that the element is inserted actually only once, because the message element is now a life element living in the DOM and therefore it cannot be at multiple places at the same time
//NB therefore you can use these two methods to MOVE elements, because a DOM element is unique
/// if you really want to copy an element, you have to do this:
// header.append(message.cloneNode(true)); // true means that all the child elements will also be copied

// insert the message before the header, insert the message after the header (BOTH AS A SIBLING)
// header.before(message);
// header.after(message);

//==============================================================================
//## DELETING ELEMENTS
//==============================================================================
// delete the cookie message when clicking on the button "got it"
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
    //NB .remove() is very recent, before you could only remove child elements, therefore you had to select first the parent element, and then remove the child
    //message.parentElement.removeChild(message) //NB this is called DOM traversing
  });

//==============================================================================
//## STYLES, ATTRIBUTES and CLASSES
//==============================================================================
/// STYLES
message.style.backgroundColor = "#37383d";
message.style.width = "120%";
// you can read styles that you define here (you can read inline styles, i.e. styles that we set manually), but not styles that you don't define here
console.log(message.style.height);
console.log(message.style.backgroundColor);
// e.g. if you try to get the color of this message (which is defined in the stylesheet you cannof log it here)
console.log(message.style.color);
// but you can get styles if you want (getComputedStyle returns the real style as it appears on the page)
console.log(getComputedStyle(message)); // it returns an object with all the properites and values
// so you can get a single property only
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
// change the height based on the one that is in the real style
// Number.parseFloat takes out the number from a string
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + "px";

/// CSS VARIABLES or CSS CUSTOM PROPERTIES
// the idea of css variables is similar to the idea of javascript variables
// as you can see in the css stylesheet, they refer to root, i.e.e they are defined in the document root; in JS that is the equivalent to the document element
// document.documentElement.style.setProperty("--color-primary", "orangered"); //TODO uncomment to see the effect

/// ATTRIBUTES (src,...)
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
console.log(logo.designer); // non standard
// usually JS automatically creates the properties on the objects from the attributes (only if they are standard attributes)
// if in the HTML you insert some properties of your own that you come up with, that are not standard, JS will not create them automatically
// so you have to get them in another way:
console.log(logo.getAttribute("designer"));

// you can also set the value of standard attributes
logo.alt = "Beautiful, minimalist logo";

// you can create a new attribute: set the name and value of new attributes
logo.setAttribute("company", "ElisaBankistCompany");

//~ src: absolute and relative path
console.log(logo.src); // ABSOLUTE
console.log(logo.getAttribute("src")); // RELATIVE

const link = document.querySelector(".nav__link--btn");
console.log(link.href); // ABSOLUTE
console.log(link.getAttribute("href")); // RELATIVE

/// DATA ATTRIBUTES (in the html they have to start with "data-")
console.log(logo.dataset.versionNumber);

/// CLASSES
// fake classes just to make the examples
// you can uncomment to see the effect TODO
// logo.classList.add("c", "j"); // add multiple classes like this
// logo.classList.remove("c", "j");
// logo.classList.toggle("c", "j");
// logo.classList.contains("c", "j");
// you can also set a class
//NB do not use the following! it overrides all the existing classes and it allows to put one class only on any element
// logo.className = "fhbsdjfhbsj"; //NB do not uncomment!
//NB better to use the methods above

//==============================================================================
//## Modal Windows
//==============================================================================

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal"); // this isa nodelist (so you can use forEach on it)

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
//## 1. IMPLEMENT SMOOTH SCROLLING TO ONE SECTION WHEN CLICKING ON "LEARN MORE" BUTTON
//==============================================================================
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
btnScrollTo.addEventListener("click", function (e) {
  //~ 1. get the coordinates of the element that we want to scroll to
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // so when you click the button you get the DOM rectangle
  // and it has all the properties:
  // NB it is relative to the current viewport
  // x: x position, measured from the left side of the viewport (not the page itsef)
  // y: y positino, measured from the top of the viewport (not the page itsef)
  // width, height, ...
  // to understand better let's get the rectangle of the button
  // e.target is the element that you just clicked
  console.log(e.target.getBoundingClientRect());

  // you can get the current scroll position
  console.log("Current scroll (X/Y): ", window.pageXOffset, window.pageYOffset); // measured in pixel
  // how much you have scrolled from the left of the page and from the top of the page
  // i.e. the position of the viewport (left and top) relative to the beginning (left and top) of the page
  //NB you can also read the height and width of the viewport
  console.log(
    "height/width viewport: ",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //~ scrolling
  // and to make it not relative to the current viewport, add the current scroll position
  // otherwise if you click it when you are not on the top of the page, it will not work well
  //TODO uncomment below to see it work
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  // to make this animation nice and smooth, you have to pass an object
  //TODO uncomment below to see it work
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  // IMPORTANT there is a more modern way of doing this:
  /// we simply take the element we want to scroll to (section1 and we call scrollIntoView and pass an object like above)
  section1.scrollIntoView({ behavior: "smooth" });
});

//==============================================================================
//## 2. TYPES of EVENTS and EVENTHANDLERS
// ## https://developer.mozilla.org/en-US/docs/Web/Events
//==============================================================================
// TODO uncomment to see this work
// const h1 = document.querySelector("h1");
// h1.addEventListener("mouseenter", function (e) {
//   alert("addEventListener from h1");
// });

// another way of attaching an event listener to an element
// TODO uncomment to see this work
// h1.onmouseenter = function (e) {
//   alert("onmouseenter form h1");
// };
// for each of the events here https://developer.mozilla.org/en-US/docs/Web/Events there is a on-event property like the one above
// best practice: addEventListener
// why? because with .addEventListener() you can add more event listeners to the same element
// 1) wherenas with .onmouseenter you can only fedine one callback function per property
// 2) because we can remove an event handler if we don't need it anymore
// first of all, you have to store the callback function into a variable
const h1 = document.querySelector("h1");
const alertH1 = function (e) {
  alert("addEventListener from h1");
  // h1.removeEventListener("mouseenter", alertH1); // you can place it here or anywhere in the code
};
// TODO comment to see propagation work
h1.addEventListener("mouseenter", alertH1);
setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000); // but here if you do not hover within 3 seconds on h1, it is not shown
// or here

//==============================================================================
//## 3. EVENT PROPAGATION: BUBBLING and CAPTURING
//==============================================================================
/// JS events have a very important property: they have a "capturing phase" and a "bubbling phase"
// for the theory, see lecture 190
/// Event propagation in practice (mainly bubbling): catch event in the second and third phase (see slides)
// random number generator
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor());

// let's attach an event handler to the link Features in the navbar (NB this is not commented just to show the code, uncomment line 266 to see everything work)
document.querySelector(".nav__link").addEventListener("click", function (e) {
  console.log("LINK", e.target); // e.target is where the event originated (where it first happened)
  console.log(e.currentTarget); // this is the element on which the event handler is attached
  //~ remember that in an event handler, the this keyword always points to the element on which that event handler is attached to
  // TODO uncomment to see propagation work
  this.style.backgroundColor = randomColor();
  /// you can STOP PROPAGATION
  // TODO comment to see propagation work
  e.stopPropagation(); //NB usually not a good idea, but sometimes (in very complex applications with many handlers for the same event) it can fix problems
});
// this is the parent of nav__link
// TODO uncomment to see this work
document.querySelector(".nav__links").addEventListener("click", function (e) {
  console.log("LINKS", e.target);
  console.log(e.currentTarget);
  this.style.backgroundColor = randomColor();
});
// this is the parent of nav__links
// TODO uncomment to see this work
document.querySelector(".nav").addEventListener("click", function (e) {
  console.log("NAV", e.target);
  console.log(e.currentTarget);
  this.style.backgroundColor = randomColor();
});
// NB in all three handlers, the target will always be the same (e.target)
// e.currenTarget is the same as the this keyword (it is not the same for all the events)

/// if you want to catch event in the capture èhase (usually not relevant) you add a third parameter (true or flase) to the addEventListener function
// if true, the event handler will no longer listen to bubbling events but to capturing events
// TODO uncomment to see this work
document.querySelector(".nav").addEventListener(
  "click",
  function (e) {
    console.log("NAV listening to capture phase");
    this.style.backgroundColor = randomColor();
  },
  true
);
// it makes the first element on which the listeners attach (it is the first event to be handled)
// i.e. it listens for the event as it travels down the DOM
// while the other "normal" listen for the event as it travels back up (i.e. later)

//==============================================================================
//## 4. Event delegation: implementing page navigation
//==============================================================================
// let's use the power of event bubbling to implement event delegation

// when you click on the links in the navbar, it automatically scrolls smoothnly to the corresponding sections
// implement without EVENT DELEGATION TO SEE THE PROBLEM in the approach we used so far
// TODO uncomment to see this work
document.querySelectorAll(".nav__link").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault(); // this because in the HTML you have href="#id_of_element_you_want_to_scroll_to" and without the preventDefault, they go to the relative section
    // NB the preventDefult is done only because we want the scrolling to be SMOOTH: if you wanted a normal behavior, the code in the HTML will be ok and you do not need to write JS for this functionality

    /// this is a common and important technique used for implementing navigation in this way:
    /// in the HTML, in the href attribute, you put the id of the elements you want to scroll to, so that in JS you can read that href and select the element you want to scroll to
    const id = this.getAttribute("href"); // getAtrtibute because you want the relative url
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});

/// however, the same exact function is attached to all the .nav__link elements
/// but if we have thousands of elements and attach an event handler to each of them, then we would create thousands of copies of the same function, and it would impact the performance
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
//## TRAVERSING THE DOM
//==============================================================================
// DOM traversing == walking through the DOM i.e. we can select an element based on another element
// this is very important and useful because sometimes we need to select elements relative to a certain other element (e.g. a direct child or a direct parent element)
// or sometimes we don't even know the structure of the DOM runtime --> in these cases, you need DOM traversing
// const h1 = document.querySelector("h1");

//# going downwards: selecting CHILD ELEMENTS
//============================================
console.log(h1.querySelectorAll(".highlight")); // this returns a NodeList with all the children elements of h1 that have class highlight
//NB this would work no matter how deep these child elements are inside of the h1 element
// if you want all the child elements
console.log("childNodes:");
console.log(h1.childNodes); // this returns a NodeList (there is all kind of stuff: all nodes)
console.log("children:");
console.log(h1.children); // this returns an HTML collection (.children if you are interested in the actual elements) NB this works only for direct children
//~ first and last element child
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "orangered";

//# going upwards: selecting PARENT ELEMENTS
//===========================================
console.log(h1.parentNode);
console.log(h1.parentElement);
// sometimes we need a parent element that is not a direct parent; we might need to find a parent element no matter how far it is in the DOM tree
// imagine that on the page we have multiple headers (i.e. multiple elements with a class of header) but we want to find the one that is a parent element of h1
// example with setting the value with a CSS variable
h1.closest(".header").style.background = "var(--gradient-secondary)"; //NB important for event delegation!!
h1.closest("h1").style.background = "var(--gradient-primary)"; // this is the element itself
// we can think of closest as being the opposite of querySelector: they both receive a query string as an input, but querySelector finds childre, while closest finds parents (no matter how far up in the dom tree)

//# going sideways: selecting SIBLINGS
//===========================================
// in JS we can access only direct siblings
console.log("previousElementSibling");
console.log(h1.previousElementSibling);
console.log("nextElementSibling");
console.log(h1.nextElementSibling);
// there is also
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// if you need all the siblings you move up to the parent element and read all the children from there
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = "scale(0.5";
  }
});

//==============================================================================
//## Implement sticky navigation bar (NB the OLD WAY!)
//==============================================================================
//TODO uncomment to see this work but if you do, then comment the code of the sticky navigation bar using the intersection observer API
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// //NB actually "scroll" is bad practice because it fires continuously
// window.addEventListener("scroll", function () {
//   // console.log(window.scrollY);
//   // when we reach the first section, the navigation bar should become sticky
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

//==============================================================================
//## Implement sticky navigation bar with the new INTERSECTION OBSERVER API
//==============================================================================
// this API allows our code to observe changes to the way a certain target element intersects another element or the viewport

/// this callback function is called each time the target element (i.e. the observed element, i.e. section1) is intersecting the root element (i.e. the viewport) at the define threshold
// called regardless of whether you are scrolling up or down
const observerCallback = function (entries, observer) {
  // entries is an array of threshold values
  entries.forEach((entry) => console.log(entry)); /// important: intersectionRatio and isIntersecting
};

const observerOptions = {
  root: null, // root is the element that the target is intersecting: section1 is the target; null is the viewport
  // threshold: 0.1, // threshold is the percentage of intersection at which the observer callback will be called (0.1 is equal to 10%); you can have a single value or an array
  threshold: [0, 0.2], // 0% means that the callback function will be called each time the target element moves completely out of view; and also as soon as it enters the view
  // because the callback function is called when the threshold is passed when moving into the view and when moving out of the view
  // if we wrote [0, 1] this means that the callback function will be called when 100% of the target is visible in the viewport (this is impossible because the section itself is already bigger than the viewport)
  // 0.2 means that the callback fun is triggered when 20% of the target moves into the viewport
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// now let's use this observer to observe a certain target
observer.observe(section1);

//==============================================================================
//##
//==============================================================================
// bene o male
// function Mycomponent({ var1 }) {
//   const [var3, setVar3] = useState("banana");

//   return <div>{var1}</div>;
// }

// class MyComponent extends React.Component(props) {
//   constructor(props) {
//     super(props);
//     var1 = this.props.var1;
//     var3 = banana;
//     setstate = setstate.bind(this);
//   }
//   setstate(value) {
//     this.var3 = value;
//   }
//   render() {
//     return <div>{this.var1}</div>;
//   }
// }
