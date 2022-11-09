# Node Package Manager (NPM)

**NPM is both a software on our computer and a package repository**

Before NPM, we used to include external libraries right into our HTML, using the script tag, like we imported leaflet in the html of the Mapty project, and we could use the global variable that was exposed by the leaflet library. But this creates a few problems if you have a big project and a big team.
1. It does not make much sense having the HTML loading all of JavaScript, it is really messy.
2. Otherwise, you download the library file to our computer directly but then whenever a new version comes out, you have to manually go to the site, download the new version, change the file in our system manually and then include it in the html again (and this is a huge pain)
3. before npm there wasn't a single reposotory that cantained all the packages that we might need, and this made it even worse and more difficult to manually download all the libraries and manage them on our computers.

Now there is a better way of managing dependencies: with NPM.

everything here was done in the folder: "/home/elisa/elisa/github-javascript-course/JavascriptCourse/course/17_ModernJS/06_npm_introduction"

- open the terminal
- check if npm is installed with `npm -v` and the version number that you get should be greater than 6 (if you get an error, install node.js by going to the website nodejs.org then download and install the version for your computer)
- in each project in which we want to use npm, we need to initialize it with `npm init`, and there will be a few questions: the package name (inside the parenthesis there is the default) and so on... hit enter for everything now
- you will end up, in your folder, with a file named `package.json`, and this is the file that npm just created for our project. This file stores the entire configuration of our project
- now let's install the leaflet library that we used before, but using npm this time
- write `npm install leaflet` or `npm i leaflet` and: 1) in the package.json there will be a new field "dependencies" with leaflet and the version; 2) in the project folder a new folder will be created, named "node_modules" and this contains a folder named "leaflet" and this contains the code of the library
- if we want to use it, we need a module bundler, because this library uses the common JS module system, and therefore we cannot directly import it in our code, we could do it only if later we used a module bundler (more later)
- let's install and import one of the most popular JS libraries, i.e. lodash (lodash is essentially a collection of many useful functions for erase, objects, functions, dates, etc..) NB on its website we are not looking for the normal version of lodash (because it uses the common JS system and we cannot use the common JS system without a module bundler) we need to have the version named Lodash ES (ES because of ES modules)
- install `npm install lodash-es`; look in the folder created in "node_modules": there is one file for each of the methods that are available in lodash. The one that we will include now is the one for cloning objects (cloneDeep.js) `import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";` NB writing all this path is not practical at all, and later we will see another method of importing, with **Parcel** (see later)

IMPORTANT
if you want to move your project to another computer or share it with another developer, or check it in a version control system like Git, **you should never include the "node_modules" folder**.
You only need to keep the package.json and then run `npm install` or `npm i` without any package name, and it will automatically grab them from the dependencies listed in package.json

# Parcel
Parcel is a module bundler, fast and easy to use, and it works without any configuration (Webpack is another popula module bundler especially in the React world)

IMPORTANT in the terminal write: `npm i parcel --save-dev`
IMPORTANT parcel did not build, therefore I used `npm i parcel-bundler --save-dev`

a dev dependency is a tool that we need to build our application, but it is not actually a dependency that we include in our code, it is simply a tool, and in the package.json file it appears in another field called devDependencies (the other libraries like leaflet are regular dependencies)

Let's use Parcel: since it is just another CLI (command line interface), we use it in the terminal.
In order to use Parcel in the console, we have 2 options:
1. we can use something called NPX
2. we can use NPM scripts

### NPX
- in the terminal: `npx parcel index.html` index.html is the entry point because this is where we include our JS (the file that we want to bundle up) -- this html imports the deepClone from the lodash library and some stuff from shoppingCart.js; in this example, the goal of using Parcel is to bundle up these three modules together ( so script.js together with shopppingCart.js together with deepClone.js)
- Parcel actually also starts a new development server on the URL that it prints out; click on it: therefore besides bundling, it also does the same job of our live-server
- NOTE you can also install a specific version of Parcel with `npm install parcel@1.12.4`; use `npm uninstall parcel` to uninstall it and try again.
- NB Parcel (even though in the html <script></script> we had type="module") converts the module into a regular script, because modules do not work in older browsers (this error was in the video, not in what I did; the teacher remover type="module" and then it worked, I did not need to do that)
- IMPORTANT Parcel created a `dist` folder (dist stands for distribution) and this is the folder that we will send to production: it is the code in this folder that will be sent to our final users. In this folder there will be a new index.html that will import a new script.js which has a different name and this script is the bundle itself

NB in Parcel we can activate the **hot module replacement** or **hot module reloading**: in the script.js file, write:
```
if (module.hot) {
  module.hot.accept();
}
```
this is code that only Parcel understands.
HOT MODULE RELOADING = whenever we change one of the modules, it will trigger a rebuild, but then the new modified bundle will then automatically get injected into the browser without triggering a whole page reload; again: when we change something here, this will then not reload this part of the page (NB and this is amazing for maintaining state on our page whenever we are testing out something)

### NPM scripts
NPM script is the way we actually use in practice Parcel.
NPM scripts are basically another way of running locally installed packages in the command line; they also allow us to basically automate repetitive tasks, so therefore we do not need to write `npm parcel...` every time. You can create a script in package.json.

```
"scripts": {
    "start": "parcel index.html"
  },
```

In this case we have added a start script, and to use it in the command line: `npm run start`
it does the same thing as before but now we have the simple command that we can execute whenever we want to start parcel and want to start developing. *This is mainly how we do it in development*

*Development*
Whenever we are done developing our project, it is time to build the final bundle, i.e. the bundle that is compressed and has dead code elimination etc.
For that, we need another parcel command (added in the package.json as another script)
```
"scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html"
    },
```
SO let's run `npm run build`

To install packages globally: `npm install leaflet -g` using `-g`

IMPORTANT in 07_steps.md there is a more concise version and usage of updated Parcel (version 2)