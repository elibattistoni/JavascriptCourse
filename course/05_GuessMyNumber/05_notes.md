The classes of the elements in the HTML are very important: like you need them for styling the element in the CSS; you can use HTML classes to select elements for JavaScript.

DOM manipulation = make JS interact with the web page
DOM = Document Object Model = structured representation of HTML documents; the DOM allows us to use JS to access HTML elements and styles in order to manipulate them (change text, HTML attributes, CSS styles). DOM == connection point between HTML documents and JS code.
The DOM is automatically created by the browser as soon as the HTML page loads and it is stored in a tree structure. In this tree, each HTML element is one object (since it looks like a family tree, you can use the word parents, child element, sibling element).
The Document at the top is a special object that is the entry point to the DOM: `document.querySelector()`.
The first child element of the document is the HTML element (the root element), which has head and body (which are siblings).

The DOM tree has more than just element nodes: it has nodes also for all the text itself, comments, ect (the rule is whatever is in the HTML document also has to be in the DOM, because the DOM is a complete representation of the HTML document).

The DOM also includes styles, therefore with DOM manipulation you can also include styles.

IMPORTANT
The DOM and the DOM emthods are part of the WEB APIs.
The WEB APIs are like libraries that browsers implement and that we can access from our JS code.
WEB APIs = libraries that are also written in JS and that are automatically available for us to use (all this happens behind the scens: we do not have to import or do anything).
There is an official DOM specification that browser implement, which is the reason why DOM manipulation works the same in all browsers.
There are many more web APIs, such as "Timers", "Fetch",...

NB here https://github.com/elibattistoni/guess-my-number there is the clean and refactored version of this project by me.