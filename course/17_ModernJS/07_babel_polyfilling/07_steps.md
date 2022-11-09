STEPS
check 
1. `npm init`
2. `npm i parcel --save-dev` and check this https://parceljs.org/getting-started/migration/
3. in package,json remove "main":..., and add the following:
    "scripts": {
       "start": "parcel index.html",
       "build": "parcel build index.html"
     },
4. `npm run start`
5. `npm run build`

CFR https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/22649505#questions/17644824

# Transpiling and Polyfilling
# Transpiling with Babel
Now that we have activated bundling, it is time to configure Babel to transpile our modern code to ES5 code (many people still have Windows XP or Windows 7 computers which cannot update their old internet explorer, but we want our application to work for everyone).

Parcel automatically uses Babel to transpile our code, and Parcel makes some very good decisions for us (in terms e.g. for what browsers should be supported). We will simply go with the defaults.

Babel basically works with plugins and presets that can be configured. A **plugin** is basically a specific JavaScript feature that we want to transpile (i.e. to convert). For example, let's say that we want to convert arrow functions bacj to ES5 but leave everything else in ES6: **usually, instead of using single plugins for each of these features, Babel uses presets (preset = a bunch of plugins bundled together), and by default Babel is going to use this preset: @babel/preset-env for compiling ES2015+ syntax which you can find at this link https://babeljs.io/docs/en/presets and this preset will automatically select which JS features should be compiled based on browser support**

NB if you use an experimental feature (listed here under "esperimental" or "proposal": https://babeljs.io/docs/en/plugins-list) you have to manually include the plugin for that specific feature in order to make the code work.

NB if you have ES6 feature in your original code (e.g. Promise, find,..) they are not converted back to ES5, because Babel can only transpile ES6 syntax (i.e. things like arrow functions, classes, const, or the spread operator, i.e. things that have an equivalent way of writing them in ES5) but this is not true for real new features that were added to the language like find and Promise: these NEW features simply cannot be transpiled, it is not possible.
For these new features, we can **polyfill them**

# Polyfilling with core-js
- install core js with: `npm install core-js`
- import this library in the script.js with `import 'core-js/stable'`

NB polyfilling recreates defined functions and makes them available in this bundle
polyfilling is going to polyfill everything eve if we don't need it

If you want you can cherry pick just the features that we want to polyfill: it is a lot of work but it will reduce the bundle size.
import core-js/stable/array/find
import core-js/stable/promise
but this is a lot of work which usually we don't do

## One more thing
There is still one feature that is not polyfilled by core-js; so we always need to install a package called *regenerator-runtime* with `npm install regenerator-runtime` and import it with `import "regenerator-runtime/runtime"` and this is done for **polyfilling async functions**