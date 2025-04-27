import { Board } from "./Board.js";
import { Timer } from "./Timer.js";

class Game {
  constructor() {
    this.timer = null;

    this.board = null;
    this.lockBoard = false;

    this.firstCard = null;
    this.secondCard = null;

    this.score = 0;
  }

  newGame = () => {
    this.board = new Board();
    this.board.board.innerHTML = "";
    document.querySelector(".timer").innerHTML = "";

    this.timer = new Timer();

    this.start();
  };

  start() {
    let gameStarted = false;

    this.board.shuffle();
    this.board.loadCards();

    this.board.cards.forEach((c) => {
      c.element.addEventListener("click", (e) => {

        if (!gameStarted) {
            this.timer.start();
            gameStarted = true;
        }

        const clickedCard = this.board.getCardById(
          e.target.closest(".card").id
        );
        this.handleCardClick(clickedCard);
      });
    });
  }

  handleCardClick(card) {
    if (this.lockBoard || card === this.firstCard || this.timer.intervalId === null) return;

    card.flip();

    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.disable();
      return;
    }

    this.secondCard = card;
    this.secondCard.disable();

    this.lockBoard = true;
    this.board.disable();

    this.checkForMatch();
  }

  checkForMatch() {
    if (this.firstCard.file === this.secondCard.file) {
      this.firstCard.disable();
      this.secondCard.disable();

      this.firstCard.paintGray();
      this.secondCard.paintGray();

      this.firstCard.match();
      this.secondCard.match();

      this.score += 2;
      this.resetTurn();

      if (this.score === this.board.cards.length) {
        this.endGame();
      }
    } else {
      setTimeout(() => {
        this.firstCard.flip();
        this.secondCard.flip();

        this.resetTurn();
      }, 1000);
    }
  }

  resetTurn() {
    if (!this.firstCard.isMatched && !this.secondCard.isMatched) {
      this.firstCard.enable();
      this.secondCard.enable();
    }

    this.firstCard = null;
    this.secondCard = null;

    this.lockBoard = false;
    this.board.enable();
  }

  endGame() {
    this.timer.stop();
    console.log("Game Over! You matched all cards!");
  }

  pause = () => {
    this.board.disable(); // Ensure the board is locked when paused
    this.timer.pause(); // Stop the timer
    this.lockBoard = true; // Prevent further actions during the pause
  };

  resume = () => {
    this.board.enable();
    this.timer.resume();
    this.lockBoard = false;
  };
}

export { Game };
