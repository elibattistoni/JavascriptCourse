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

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    if (!response.ok)
      throw new Error(
        `Error in getting response: ${data.message} (${response.status})`
      );
    return data;
  } catch (err) {
    console.error(`💥 💥 💥 ${err}`);
    throw err;
  }
};

/// refactored getJSON and sendJSON with the funciton AJAX above
/*
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
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

/IMPORTANT to make this function more robust by adding some timeout, i.e. setting a time after which
// we make the request fail.
// This is important in order to prevent that the fetch runs forever when you have really bad internet connection.

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // with this we specify that we send data in JSON format (only then our API can correctly accept that data and create a new recipe in the db)
      },
      body: JSON.stringify(uploadData),
    });
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json(); // the API will return the data that we just sent
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

*/
