The goal of asynchronous JavaScript is basically to deal with long-running tasks, that basically run in the background.
The most common use case of asynchronous JS is to fetch data from remote servers, in so-called AJAX calls.

The most popular use cases of asynchronous JavaScript is to make Ajax calls to APIs.

## SYNCHRONOUS CODE vs. ASYNCHRONOUS CODE
So far, most of the code that we have been writing has been synchronous code.
*SYNCHRONOUS* simply means that the code is executed line by line, in the exact order of execution that we have defined in our code. Each line of code always awaits for the previous line to finish execution.

*This can create problems when one line of code takes a long time to run.*
For example when we have an alert statement, it creates an alert window, and this alert window will block code execution, until we click the OK button. Only then, the code can continue executing.
The alert is a perfect example of a long running operation, which blocks the execution of the code.

Most of the time, synchronous code is fine and makes sense. However, image that execution would have to wait e.g. a 5 seconds timer to finish: this would be terrible because during those 5 seconds, nothing in the page would work: this is where asynchronous code comes into play.

The setTimeout() function starts a timer in an asynchronous way: the time runs in the background without preventing the main code from executing; the callback function inside the setTimout() function will be executed only after the timer has finished running. This callback function is asynchronous JS.
It is asynchronous because it will be executed only after a task that is running in the background finishes execution. This callback function is registered, and then we immediately move on to the next line, so the main code is not being blocked and execution does not wait for the asynchronous timer to finish its work.

This is the big difference between synchronous and asynchronous code:
1) in **synchronous** code and the alert function, the next line of code waited for the user to click on the alert window to continue execution (alert is blocking synchronous code)
2) in **asynchronous** code, the asynchronous code is registered and then the execution moves to the next line; **the asynchronous code is executed after the process running in the background is completed**: with the timer, the callback function is actually asynchronous and it will be executed after the timer has finished, and it is non blocking because in the meantime the rest of the code can keep running normally; this callback function will be executed after all the other code is executed, even though it is not at the end of the code (**an action was deferred into the future in order to make the code non-blocking**)

IMPORTANT:
- *asynchronous code is executed after a task that runs in the background finishes*
- *asynchronous code is non-blocking*
- *execution does not wait for an asynchronous task to finish its work*

**Asynchronous programming is all about coordinating the behavior of our program over a certain period of time.**
asynchronous = not occurring at the same time


In this example we needed a callback function to implement the asynchronous behavior. However, IMPORTANT *callback functions alone do not make automatically the code asynchronous*.
Only certain functions work in an asynchronous way; we just have to know which ones do and which ones don't.

Another example:
```
const img = document.querySelector(".dog")
img.src = "dog.jpg"

img.addEventListener("load", function(){ img.classList.add("fadeIn") })

p.style.width = "300px"
```
img.src is actually asynchronous: setting the source attribute of an image is essentially loading an image in the background while the rest of the code can keep running (if it is a huge image, you don't want the code to wait for the image to load).
Once the image finishes loading, a load event will automatically be emitted by JS (in the code we listen for that event in order to act on it): here as well, we provide a callback function that will be executed when a process finishes, in this case only after the image has been loaded, and not right away. So instead of blocking, execution moves on, right to the next line, and once the image is completely loaded, the load event is registered and the callback function is executed.
Once more, we *deferred an action into the future, making the code asynchronous and non-blocking*.
IMPORTANT *event listeners alone, do not make the code asynchronous, just like callback functions alone do not make the code asynchronous*
e.g. an event listener listening for a click on a button, is not doing any work in the backgroun; it is simply waiting for a click to happen, but it is not doing anything, so there is no asynchronous behavior involved at all.
What makes our prvious example asynchronous, is that the image is loading in the background asynchronously, but not the fact that we are listening for the load event to happen.
So, *what matters is the asynchronous behavior of a task, like running a timer or loading an image*

Other eamples of asynchronous behavior in JS: Geolocation API, AJAX calls,...

**AJAX calls are the most important use case of asynchronous JavaScript**


# AJAX

**Asynchronous Javascript And Xml** allows us to communicate with remote web servers in an asynchronous way; in practice, with AJAX calls, we can request data from web servers dynamically (i.e. without reloading the page).

XML is a data format which used to be widely used to transmit data on the web; however, these days basically no API uses XML data anymore; most API use the JSON format (the name AJAX remains even though XML is not used anymore). JSON is basically just a JavaScript object converted to a string.

IMPORTANT check out note in lecture 246 for better explanation. 

When we are asking a server to send us some data, this server usually contains a web API, and this API is th one that has the data we are asking for.

## API

= **Application Programming Interface**

An API is basically a piece of software that can be used by another piece of software in order to allow applications to talk to each other and exchange infromation. This is true not only for web development and JavaScript, but for programming in general.

In web development there are many types of APIs:
- *DOM API*
- *Geolocation API* (these are called API because they are a self-contained piece of software that allow other pieces of software to interact with them -- e.g. our Mapty app of the previous section).
- *Our own Class API*: we can implement a small and simple API in a class where we make some methods available as a public interface (objects made from a class can be seen as self-contained encapsulated pieces of software that other pieces of software can interact with)

When we use AJAX, we are interested in an important type of API, and these are called *"online APIs"* (term by Jonas). An online API is an application running on a web server, which receives requests for data, then retrieves this data from some database and then sends it back to the client (e.g. our browser). In practice, when we build applications, we simply call them "API", "APIs", "WEB APIs" (Jonas calls them "online API" because the term WEB API is actually used also for other things).

We can build online APIs, but that requires *back-end development* e.g. with node.js (i.e. development with servers and databases etc) or use a *3rd-party API* (APIs that other developers make available for us most of the time for free).


# API URL CHANGE for vide 247
The base URL of the API used throughout this section has changed

Instead of:

https://restcountries.eu/rest/v2/

It's now:

https://restcountries.com/v2/

## List of all public API
https://github.com/public-apis/public-apis

column *Auth*: if it needs authentication
column *cors*: any API that you use here should always have CORS set to "yes" or maybe "unknown" (CORS = Cross Origin Resource Sharing) and without CORS, we cannot access a third party API from our own code

look for Rest Countries, open the relative page, and look for "API ENDPOINT" which is essentially another name for the URL that we need

https://restcountries.com/v3.1/all this URL is for all countries


# How the web works: requests and responses
Lecture 249 IMPORTANT