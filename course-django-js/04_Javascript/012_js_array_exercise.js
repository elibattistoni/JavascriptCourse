// PART 4 ARRAY EXERCISE
// This is  a .js file with commented hints, its optional to use this.

// Create Empty Student Roster Array
// This has been done for you!
var roster = []

// Create the functions for the tasks

// ADD A NEW STUDENT
// Create a function called addNew that takes in a name
// and uses .push to add a new student to the array
function addNew(name) {
    roster.push(name)
}

// REMOVE STUDENT
// Create a function called remove that takes in a name
// Finds its index location, then removes that name from the roster
// HINT: http://stackoverflow.com/questions/5767325/how-to-remove-a-particular-element-from-an-array-in-javascript
function remove(name) {
    roster = roster.filter(item => item !== name)
}

// DISPLAY ROSTER
// Create a function called display that prints out the orster to the console.
function display() {
    console.log(roster)
}

// Start by asking if they want to use the web app
var start = confirm("Do you want to use the web app?");
// OK = true, Cancel = false
// console.log(start)
// console.log(true)
// console.log(start == true)


// Now create a while loop that keeps asking for an action (add,remove, display or quit)
// Use if and else if statements to execute the correct function for each command.
if (start == true) {
    var counter = 0
    while (counter <= 20) {
        action = prompt("Choose your action among: add, remove, display, quit")
        if (action == "add") {
            var myname = prompt("Enter Name: ")
            addNew(myname);
        } else if (action == "remove") {
            var myname = prompt("Enter Name: ")
            remove(myname);
        } else if (action == "display") {
            display();
        } else if (action == "quit") {
            break;
        }
        counter = counter + 1
    }
}
