Usually we have to manually reload the browser to see any change in our code.

We can have the page reload automatically whenever we change our code in the editor.

You have to install a developer tool called Live Server.
You can use a Live Server in two different ways:
1. you can install a VS Code extension (extension called "Live Server" >> click Go Live >> any time you save the code it will reload automatically)
2. you can use a more professional way to run a Live Server: Node.js and a npm package >> Node.js is a javascript runtime that we can install on our computers.
   1. Install Node.js
   2. Use a npm package called Live Server on Node.js
   Node.js is a way of running javasript outside of the browser, and a way of running development tools like the Live Server that we want to install now

Install Node.js from the terminal
$ sudo apt update
$ sudo apt install nodejs
$ node -v
$ npm -v
npm is already present with the installation of nodejs

Install live server:
$ sudo npm install live-server -g

# IMPORTANT:
run
$ live-server 
in the JavascriptCourse folder!

when you run live-server from the terminal, located in a specific folder, you open that folder in the browser, and it will open the index.html file by default.

coding challenges:
codewars

# Debugging
Using automated tests is the most useful way to find a bug during the development process (you should never find a bug during production).
a) identify
b) find
c) fix

IMPORTANT write tests using testing software

console.warn(message); >> displays a warning message in yellow in the console log
console.error(message); >> displays an error message in red in the console log
console.table(myObject)

# How to use a debugger in Google Chrome
- open the page inspector (Ctrl + shift + I)
- go in the tab Sources
- click (on the left) on script.js (the current script)
- you can see your js code
- insert breakpoints (by clicking on the line number and a red dot appears)
- when you reload the page, the execution will stop at that point
- reload the page; click on the top right button "Resume script execution"
- on the right you can see all the variables (also local, within a function)
- you can execute the rest of the function bu clicking on the "Step" button on the top right (executes one line at a time)
- get rid of the red dot of the breakpoint

IMPORTANT instead of going to the Sources to debug, in your script in VS Code you can also write
`debugger;` which opens automatically the debugger tool