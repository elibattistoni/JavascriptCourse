Now that we have activated bundling, it is time to configure Babel to transpile our modern code to ES5 code.

Parcel automatically uses Babel to transpile our code.

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
