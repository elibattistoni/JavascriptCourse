# An overview of modern JavaScript development

In the past we used to write all our code into one big script or maybe multiple scripts.

Today, we didive our project into multiple modules, and these modules can share data between them and make our code more organized and maintanable.

One great thing about modules, is that we can also include 3rd party modules into our code.

NPM is basically both the repository in which packages live and a program that we use on our computers to install and manage these packages.

IMPORTANT
When we are creating *real world applications*, after developing the code, our project needs to go through a **build process** in which a big **final Javascript bundle** is built, and this is the final file that we will **deploy to our web server for production**.
So basically it's the Javascript file that will be sent to browsers in production (production means that the application is being used by real users in the real world).

A *build process* can be something really complex but we will keep it simple and include only two steps:
1. **BUNDLING**: bundle all our modules togehter into one big file (a complex process that eliminates unused code and compress the code); important because 1) old browsers don't support modules at all; 2) better for performance
2. **TRANSPILING & POLYFILLING**: convert all modern JavaScript syntax and features back to old ES5 syntax, so that even old browsers can understand our code without breaking (this is done using a tool called *Babel*)

We use a special tool to implement this build process for us, and the most common *build tools* available are *webpack* and *parcel* (they are called Javascript bundlers because they take our raw code and transform it into a JS bundle)

Parcel is nicer because you don't need to configure anything

# An overview of modules in Javascript

MODULE = reusable piece of code that encapsulated implementation details of a certain part of our project; a module is a standalone file

a module contains code, but can also contain imports and exports; with exports we can export values and functions out of a module, and whatever we export from a module is called *public API*; in case of a public API, it is consumed by importing values into a module; we can import values from other modules, and these modules are called dependencies

Why modules?
- *COMPOSE SOFTWARE: Modules are small building blocks that we put together to build complex applications*
- *ISOLATE COMPONENTS: Modules can be developed in isolation without thinking about the entire codebase (better for working in teams)*
- *ABSTRACT CODE: modules make it easy to abstract code; you can implement low-level code in modules and import these abstractions into other modules*
- *ORGANIZED CODE: modules naturally lead to a more organized codebase (when we break up our code into separate isolated and abstracted modules, this will organize the code and make it easier to understand)*
- *REUSE CODE: modules allow us to easily reuse the same code, even across multiple projects*

### ES6 Modules
From ES6 javascript has a native built-in module system.
Modules are stored in files, and each file is one module, so there is exactly **one module per file**.

- **TOP-LEVEL VARIABLES**
  - In *modules*, all top level variables are *scoped to the module*, so basically variables are private to the module by default, and the only way an outside module can access a value that is inside of a module is by exporting that value; but if we do not export, then no one from the outside can see this variable.
  - In *scripts*, all top level variables are always *global* and this can lead to problems like global namespace pollution (where multiple script try to declare variables with the same name and then these variables collide)
- **DEFAULT MODE**
  - Modules are executed always in *strict mode* by default (so no more need to declare strict mode)
  - Scripts are executed in *sloppy mode* by default
- **TOP LEVEL this**
  - in Modules the this keyword is always undefined at the top level
  - in Scripts the this keyword points to the window object
- **IMPORTS & EXPORTS**
  - in Modules you can export and import values and functions between modules using the ES6 import and export syntax (NB they can only happen at the top level, i.e. outside any function or if block); all imports are hoisted (i.e. no matter where you import modules, it will always be like imports will be moved to the top of the file)
  - in Scripts it is impossible
- **HTML LIKNING**
  - for Modules: in order to link a module to an HTML file, we need to use the script tag with the type attribute set to module, isntead of just a plain script tag. therefore <script type="module">
  - for Scripts: <script>
- **FILE DOWNLOADING**
  - about downloading the module files themselves, it always happens in an *asynchronous* way; and this is true for a module loaded from HTML as well as for modules that are loaded by importing one module into another using the import syntax
  - regular scripts are downloaded by default in a *blocking synchronous way* unless we use the *async* or *defer* attribute on the script tag

IMPORTANT: when the exported value changes in the exporting module, then the same value also changes in the importing module (other module systems do not work like this, but JavaScript modules do)

IMPORTANT best practice: convention that the file name of modules should be in *camelCase*