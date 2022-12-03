# Guess my number

### Credits and changes
The game project in this repository was written following the lectures of the course [The complete Javascript course](https://www.udemy.com/course/the-complete-javascript-course/).
The code was not refactored during the lessons, I did the refactoring on my own, therefore it will be different from the code that can be found [here](https://github.com/jonasschmedtmann/complete-javascript-course/tree/master/05-Guess-My-Number/final).

I deployed this game on Netlify. You can try it out [here]().

### Game logic
The game starts anew at every page refresh. It generates a secret random number (integer) between 1 and 20 (which is hidden by a question mark). The goal of the game is to correctly guess that secret number; when you correctly guess it, the background of the page will change, together with a success message, and the hidden secret number will be revealed.
The game starts with a score of 20: for each wrong guess it will decrease the score by 1 point.
In order to make a guess, you can insert a number between 1 and 20 in the input box, then click "Check". On the right side of the page, you will get a clue on whether your input number is lower or higher than the secret number. Continue guessing until you find the correct number. When you guess the correct number, and the current score is higher than the "Highscore" (i.e. the best score across different games), the current score replaces the highscore. If you refresh the page, you will start a new game from scratch, with a highscore of 0. Instead, if you want to keep playing with another game, maintaining your highscore, click on the "Again!" button on the upper left corner.