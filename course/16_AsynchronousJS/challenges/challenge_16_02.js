"use strict";

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector(".images");

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    // wait for load event in that image
    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });

    // listen to the error as well
    img.addEventListener("error", function () {
      reject(new Error("Image not found"));
    });
  });
};

let currentImg;

// TODO uncomment to see this work
// createImage("../lectures/img/img-1.jpg")
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 1 Loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//     return createImage("../lectures/img/img-2.jpg");
//   })
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 2 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//   })
//   .catch((err) => console.error(err));

// IMPORTANT CHALLENGE 3 with async await

// PART 1
const loadNPause = async function () {
  try {
    // load image 1
    console.log("loading image 1 with await...");
    let img = await createImage("../lectures/img/img-1.jpg");
    // wait
    await wait(2);
    img.style.display = "none";
    // load image 2
    console.log("loading image 2 with await...");
    img = await createImage("../lectures/img/img-2.jpg");
    // wait
    await wait(2);
    img.style.display = "none";

    return img;
  } catch (err) {
    console.error(`${err} 💥💥💥`);
  }
};

// loadNPause(); //TODO comment to see this work

// PART 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (img) => await createImage(img));
    console.log(imgs);
    const imgEl = await Promise.all(imgs);
    console.log(imgEl);

    imgEl.forEach((e) => e.classList.add("parallel"));
  } catch (err) {
    console.error(`${err} 💥💥💥`);
  }
};

loadAll([
  "../lectures/img/img-1.jpg",
  "../lectures/img/img-2.jpg",
  "../lectures/img/img-3.jpg",
]);
