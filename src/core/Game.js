import { Board } from "./Board.js";
import { Timer } from "./Timer.js";

class Game {
  constructor(mode = 'medium') {
    this.mode = mode

    this.board = new Board(this.mode);
    this.timer = new Timer();

    this.lockBoard = false;

    this.firstCard = null;
    this.secondCard = null;

    this.score = 0

    this.scoreBoard = document.querySelector('.score')
  }

  newGame = (mode = this.mode) => {
    this.mode = mode;

    this.board = new Board(this.mode);
    this.timer = new Timer();

    this.lockBoard = false;

    this.firstCard = null;
    this.secondCard = null;

    this.board.board.innerHTML = "";
    document.querySelector(".timer").innerHTML = "";

    this.score = 0
    this.#updateScoreBoard()

    this.#start();
  };

  #start() {
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
        this.#handleCardClick(clickedCard);
      });
    });
  }

  #handleCardClick(card) {
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

    this.#checkForMatch();
  }

  #checkForMatch() {
    if (this.firstCard.file === this.secondCard.file) {
      this.firstCard.disable();
      this.secondCard.disable();

      this.firstCard.paintGray();
      this.secondCard.paintGray();

      this.firstCard.match();
      this.secondCard.match();

      this.score += 2;
      this.#updateScoreBoard()
      this.#resetTurn();

      if (this.score === this.board.cards.length) {
        this.endGame();
      }
    } else {
      setTimeout(() => {
        this.firstCard.flip();
        this.secondCard.flip();

        this.#resetTurn();
      }, 1000);
    }
  }

  #resetTurn() {
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
  }

  pause = () => {
    this.board.disable();
    this.timer.pause();
    this.lockBoard = true;
  };

  resume = () => {
    this.board.enable();
    this.timer.resume();
    this.lockBoard = false;
  };

  #updateScoreBoard() {
    this.scoreBoard.textContent = this.score
  }
}

export { Game };
