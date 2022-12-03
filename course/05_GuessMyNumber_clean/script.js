"use strict";

class GuessMyNumber {
  _body = document.querySelector("body");
  _msgContainer = document.querySelector(".message");
  _checkBtn = document.querySelector(".check");
  _guessContainer = document.querySelector(".guess");
  _secretNumberContainer = document.querySelector(".number");
  _currentScore = document.querySelector(".score");
  _highScoreContainer = document.querySelector(".highscore");
  _againBtn = document.querySelector(".again");

  _state = {
    secretNumber: Math.trunc(Math.random() * 20) + 1,
    score: 20,
    highScore: 0,
  };

  constructor() {
    this.handlerPlayGame();
    this.handlerResetGame();
  }

  _displayMessage(message) {
    this._msgContainer.textContent = message;
  }

  _handleWin() {
    this._displayMessage("🎉 Correct number!");
    this._secretNumberContainer.textContent = this._state.secretNumber;
    this._body.style.backgroundColor = "#60b347";
    this._secretNumberContainer.style.width = "30rem";
    if (this._state.score > this._state.highScore) {
      this._state.highScore = this._state.score;
      this._highScoreContainer.textContent = this._state.highScore;
    }
  }

  _handleWrongGuess(guess) {
    this._displayMessage(
      guess > this._state.secretNumber ? "📈 Too high!" : "📉 Too low!"
    );
    this._state.score--;
    this._currentScore.textContent = this._state.score;
  }

  _handleLoss() {
    this._displayMessage("💀 You lost the game!");
    this._currentScore.textContent = 0;
  }

  /**
   * playGame(): function that controls the game logic
   */
  _playGame() {
    // get guess
    const guess = Number(this._guessContainer.value);
    console.log("guess", guess);
    if (!guess) {
      this._displayMessage("⛔ No number!");
    } else if (guess === this._state.secretNumber) {
      this._handleWin();
    } else if (guess !== this._state.secretNumber) {
      if (this._state.score > 1) {
        this._handleWrongGuess(guess);
      } else {
        this._handleLoss();
      }
    }
  }

  /**
   * resetGame(): Function that resets everything ecept the highscore
   */
  _resetGame() {
    this._displayMessage("Start guessing...");
    this._state.score = 20;
    this._state.secretNumber = Math.trunc(Math.random() * 20) + 1;
    this._currentScore.textContent = this._state.score;
    this._body.style.backgroundColor = "#222";
    this._secretNumberContainer.style.width = "15rem";
    this._secretNumberContainer.textContent = "?";
    this._guessContainer.value = "";
  }

  handlerPlayGame() {
    this._checkBtn.addEventListener("click", this._playGame.bind(this));
  }

  handlerResetGame() {
    this._againBtn.addEventListener("click", this._resetGame.bind(this));
  }
}

new GuessMyNumber();
