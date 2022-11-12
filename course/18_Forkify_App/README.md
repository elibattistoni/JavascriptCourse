# Steps
1. **npm init**
2. in the file package.json remove *"main": "index.js"* if you are using Parcel v2
3. in package.json write the scripts
   "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html"
    }
  NB sometimes in project we do not even have an html, so the entry point can also be a JavaScript file,
  or the entry file can be in a different folder (and you can specify it in the Parcel command)
4. Install Parcel as a dev dipendency with: **npm install parcel -D**
5. Start parcel bu running **npm run start** or **npm run** (you can omit run because the start script is a special one)
6. Add polyfills for ES6 features with the command: **npm install core-js regenerator-runtime** (you will see them in package.json, among the dependencies) and import them at the top of our controller.js file (**import "core-js/stable"; import "regenerator-runtime/runtime";**). In this way we make sure that most of old browsers are still being supported by our application. NB *regenerator-runtime is for polyfilling async/await; core-js is for polyfilling everything else*.
7. **MVC architecture**: we will have one module for the Models (model.js), one module for the Controller (controller.js) and one module for each View (they will be stored in the folder views)
8. **npm install fractional** IMPORTANT not if you want to deploy!! Library used for converting 0.5 to 1/2 (for cups etc.) is called fractional https://www.npmjs.com/package/fractional
9. Many real world applications have *two special modules* that are *completely independent from the rest of the architecture*: a **module for the project configuration (CONFIGURATION FILE)** and a **module for some general helper functions that are going to be useful across the entire project (HELPERS FILE)**. In the js folder, we create a **config.js** file in which we put all the variables that should be constant and should be reused across the project. The goal of the config file is that it will allow us to easily configure our project by simply changing some of the data in this file. Variables should be all uppercase (it is a convention). Create a file named helpers.js, and the goal of this module is to have some functions that we reuse over and over in the project.
10. Listen for events and handle events in the MVC architecture with the **Publisher-Subscriber Pattern**. Listening for events (regardless of what events) that happen on tha page should be done into the view. NB *Events should be handled in the controller (otherwise we would have application logic in the view); BUT Events should be listened for in the view (otherwise we would need DOM elements in the controller)*. NB **DESIGN PATTERNS in PROGRAMMING**, like the Publisher-Subscriber Design patern are basically just standard solutions to certain kinds of patterns. In the Publisher-Subscriber pattern we have a publisher (which is some code that knows when to react, i.e. in this case the addHandlerRender function in the view because it will contain the addEventListener method) and we have a subscriber (which is code that wants to react, i.e. the code that should be executed when the event happens, i.e. the controlRecipes() function that is in the controller) NB the publisher does not know that the subscriber exists, because the subscriber is in the controller that the view cannot access. The solution is that we can subscribe to the publisher by passing in the subscriber function as an argument. In practice, it means that as soon as the program loads, the init function is called; this init function immediately calls the addHandlerRender function from the view (and this is possible because the controller imports bothe the view and the model). As we call addHandlerRender, we pass in our controlRecipes function as an argument (i.e. we subscrive controlRecipes to addHandlerRender) so these two functions are connected. So now addHandlerRender listens for events using the addEventListener method as always, then as soon as the event happens, the controlRecipes function will be called as the callback function of addEventListener (i.e. as soon as the publisher publishes an event, the subscriber will be called).
11. **ERROR HANDLING** The real world way of handling errors is to display some message in the user interface, so that the user can know what is going on. Basically handling an error means to display an error message in the view. And this code for error handling should be in the view, not in the model and not in the controller.



IMPORTANT
Document your application with JS docs https://jsdoc.app/
/** and then tab (prompt)

# DEPLOY
We will manually deploy the forkify project to a free hosting service called Netlify.
But before doing that, we have to create the final bundle of our application by running the build command.
In development (npm run start) the code is not compressed and the dead code is not eliminated (and we have to do these things before deploying)
1. Stop running on the development server
2. Delete the *dist* folder and the *.parcel_cache* folder
3. In **package.json**: the build command is not complete, we need to manually specify that we want our output to be in the dist folder. So the build command should be edited to: **"build": "parcel build index.html --dist-dir ./dist"** (which stands for distribution directory) and we have to specify the folder that we want to be created
4. Then in the terminal run **npm run build**
5. Now we can deploy the folder that was just created to the Netlify server
6. Go to https://www.netlify.com/ Netlify is a free service that lets us developers deploy static we pages or static web applications ("static" means that the application only contains HTML, CSS, JavaScript files, some images, but no database or no server side code, i.e. **Netlify only works for Front-End applications**) and it contains a lot of great features that you can use for free (e.g. Continuous Integration with Git). If you need something more simple, without having to open an account, you can also use surge service which is also free and even easier (https://surge.sh/)

IMPORTANT BEFORE DEPLOYING
https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/22648459#questions/15745552/
Aleksander — Teaching Assistant
Answer
73 upvotes
1 year ago

Hi Guys
Would you like to try with a different package? It's called fracty.
**npm uninstall fractional**
You can install it with **npm install fracty**, and then change the import in the **recipeView.js** file to
    **import fracty from "fracty";**
and this line
    **ing.quantity ? new Fraction(ing.quantity).toString() : ''**
to
    **ing.quantity ? fracty(ing.quantity).toString() : '';**


NOTES about Netlify
- our page is now secured with an SSL certificate
- all the files we deployed were deployed to a Content-Delivery Network (CDN), i.e. instead of uploading the files only to one server in one location in the world, our site noew actually lives in many locations, so then when a user tries to access our page, they will then get diversion from the server that is closest to them, and this will greatly speed up the delivery time of your page or application