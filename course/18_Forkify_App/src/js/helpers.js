import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/*
The timeout function will return a new promise, and this promise will reject 
after a certain number of seconds
And in order to use this timout function, we will have a race between the 
timeout promise and the fetch function for getting the data
*/

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    if (!response.ok)
      throw new Error(
        `Error in getting response: ${response.status} - ${response.statusText} - ${data.message}`
      );
    return data;
  } catch (err) {
    console.error(`💥 💥 💥 ${err}`);
    throw err;
    // NB throw the error here because you want to handle it in loadRecipe in model.js
  }
};

/*
IMPORTANT to make this function more robust by adding some timeout, i.e. setting a time after which
/ we make the request fail.
/ This is important in order to prevent that the fetch runs forever when you have really bad internet connection.
*/
