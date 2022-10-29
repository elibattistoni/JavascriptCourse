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
  // console.log(this); // this is for understading better when you use bind
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
//## Implement sticky navigation bar with the new INTERSECTION OBSERVER API
//==============================================================================
// this API allows our code to observe changes to the way a certain target element intersects another element or the viewport

// when do we want our navigation bar to become sticky? when the header moves completely out of view
const header = document.querySelector(".header ");
const navHeight = nav.getBoundingClientRect().height;

// define the options
const headerObsOpt = {
  root: null, // root is the element that the target is intersecting: section1 is the target; null is the viewport
  threshold: 0, // when the 0% of the header is visible (ie.e when the header is completely not visible in the viewport) we want something to happen
  rootMargin: `-${navHeight}px`, // the root margin is a box (in this case of 90px) that will be applied outside of our target element (ie.e header)
  // it is as if for this functionality, you want the header to stop at this bottom - 90 px (i.e. it is as if the header was 90px shorter at the bottom)
  // 90 px is the height of the navigation bar
  // NB you can create the height parameter of the navigation bar programmatically and insert is in the rootMargin IMPORTANT to make it responsive
};

// this callback function is called each time the target element (i.e. the observed element, i.e. section1) is intersecting the root element (i.e. the viewport) at the define threshold
const stickyNav = function (entries) {
  // add and remove the sticky class
  // entries is usually an array of threshold values, but in this case it is only 1
  // let's use destructuring to take out the single value
  const [entry] = entries; // same thing as writing entry = entries[0]
  // console.log(entry);
  /// only when the header is not intersecting the viewport, we want to add the sticky class
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  } // i.e. when the target is NOT intersecting the root, then we want the sticky navbar, else remove it
};
const headerObserver = new IntersectionObserver(stickyNav, headerObsOpt);

headerObserver.observe(header);

//==============================================================================
//## Revealing elements on scrolling with the INTERSECTION OBSERVER API (make sections slide in gradually)
//==============================================================================
// the animation itself comes from CSS, so we will simply add a class to each section as we approach them with scrolling

// we have to add .section--hidden (see css) to give them an opacity of 0 and move them a bit down (done in html)
// when we scroll on them, we remove this class

// reveal sections

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return; // Guard clause: if not intersecting, then return right away (do nothing)

  entry.target.classList.remove("section--hidden");

  // unobserve because the observer is no longer necessary: this will make the sliding appear only once when you are in the webpage (to see it again you have to refresh)
  observer.unobserve(entry.target); // best practice better for performance
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, // the section is revealed only when it is 15% visible
});

allSections.forEach(function (section) {
  // add the hidden class programmatically (better to do it here than in the html, because sometimes users disable JavaScript, so if you add these classes in the html, the page would not be visible)
  section.classList.add("section--hidden");
  sectionObserver.observe(section);
});

//==============================================================================
//## LAZY LOADING IMAGES: performance is important!!!
//==============================================================================
// one of the most important things when building websites is performance
// images have the biggest impact on page loading
// therefore it is very important that images are optimized on any page
// we can use a strategy calle Lazy Loading Images

// IMPORTANT the main ingredient to this lazy loading strategy is that we have a very low resolution image (a really small image) loaded right in the beginning
/// in the html you first insert the low resolution image in src="low-res-image.png"
/// and you define the high resolution image in data-src="high-res-image.png" ("data-" is a special attribute that we can use but any other work as well)
/// the idea is that when you scroll to one of the images, you replace the low resolution image with the high resolution image
/// and remove the class lazy-img because it is the filter that makes the image blurred

// only the images that have the "data-src" attribute will be lazy loaded, the other ones will not be lazy loaded
const imgTargets = document.querySelectorAll("img[data-src]"); // select all the images that have the property data-src

const loadHighResImage = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return; // Guard clause: if not intersecting, then return right away (do nothing)

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // you have to wait for the image to finish loading before removing the blur filter (consider that there may be connection problems or slow connections)
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadHighResImage, {
  root: null,
  threshold: 0,
  rootMargin: "+200px", // so that you do not see any dealy (in this way users do not realize that is lazy loading)
  // i.e. 200px before we reach them
});

imgTargets.forEach((img) => imgObserver.observe(img));

//==============================================================================
//## SLIDER COMPONENT
//==============================================================================
// establish the initial condition: all should be side by side
// the following lines are just to understand how the HTML and CSS work
// TODO uncomment for understanding how to work on sliders
// const slider = document.querySelector(".slider");
// slider.style.transform = "scale(0.4) translateX(-800px)";
// slider.style.overflow = "visible";

/// define the variables of interest
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let currentSlide = 0;
const maxSlide = slides.length;

/// implement the dots
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

/// function for activating the current dot
const activateDot = function (slide) {
  // remove the active class from all the dots
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  // add the active class only for the one of interest
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`) // because you want to select based on the data-slide attribute
    .classList.add("dots__dot--active");
};

/// function for going to a specific slide
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

/// NEXT SLIDE and PREVIOUS SLIDE
/// function for going to the next slide
// going to the next slide == changing the value in the transform property, i.e. change the percentages of translateX
const nextSlide = function () {
  //maxSlide - 1 to make it zero based like the idx of the slides
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  // currentSlide = 1: -100%, 0%, 100%, 200%
  // here we want the first slide to go to -100%, the second slide to go to 0%, the third slide to go to 100%, and the fourth slide to go 200%
  goToSlide(currentSlide); // this is after refactoring
  activateDot(currentSlide);
};

/// function for going to previous slide
const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

/// initial function call
const init = function () {
  // when the application starts, immediately go to slide 0 (the first one)
  // instead of writing this:
  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  // you write this (after refactoring)
  goToSlide(0);
  // currentSlide = 0: 0%, 100%, 200%, 300%
  // the first slide should be at 0%
  // the second slide at 100% (because the width of the slide is 100%)
  // the third slide at 200% (if you have 3 slides)
  // then 300% (if you have 4 slides)

  // create the dots at the beginning
  createDots();
  activateDot(0);
};
init();

//# EVENT HANDLERS
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

// add event listener to buttons arrow left and arrow right so that you can use the keyboard to move
document.addEventListener("keydown", function (e) {
  console.log(e);
  if (e.key === "ArrowLeft") prevSlide(); // normal if statement
  e.key === "ArrowRight" && nextSlide(); // short circuiting
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    // console.log("DOT");
    // const slide = e.target.dataset.slide // is the same as:
    const { slide } = e.target.dataset; // this is destructuring
    goToSlide(slide);
    activateDot(slide);
  }
});

//NB usually better in a single function like this
/*
const slider = function () {
  // define the variables of interest
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let currentSlide = 0;
  const maxSlide = slides.length;

  // implement the dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // function for activating the current dot
  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  // function for going to a specific slide
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // NEXT SLIDE and PREVIOUS SLIDE
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  // function for going to previous slide
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  // initial function call
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // EVENT HANDLERS
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
// then call it like this
slider();
*/
