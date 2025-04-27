import { Card } from "./Card.js";

class Board {
  #characters = ["heurimong", "hongppippi", "kimachi", "sakkukku", "zuharong"];

  constructor() {
    this.board = document.querySelector(".board");

    this.cards = [];
    this.newBoard();
  }

  newBoard() {
    this.cards = [];

    const half = [];

    this.#characters.forEach((fim) => {
      for (let i = 1; i < 7; i++) {
        half.push(new Card(`../src/assets/images/${fim}-${i}.png`));
      }
    });
    half.push(new Card(`../src/assets/images/summerz.png`));
    half.push(new Card(`../src/assets/images/yesz.png`));

    this.cards = [
        ...half,
        ...half.map(card => new Card(card.url))
      ];
      
  }

  shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }

  loadCards() {
    this.cards.forEach((c) => this.board.append(c.element));
  }

  getCardById(id) {
    return this.cards.find(c => c.id == id)
  }

  disable () {
    this.board.style.pointerEvents = "none";
  }

  enable () {
    this.board.style.pointerEvents = "auto";
  }
}

export { Board };
