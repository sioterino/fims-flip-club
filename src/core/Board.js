import { Card } from "./Card.js";
import { Storage } from "../utils/Storage.js";

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
        half.push(
          new Card(`../src/assets/images/${fim}-${i}.png`, Storage.createId())
        );
      }
    });
    half.push(new Card(`../src/assets/images/summerz.png`, Storage.createId()));
    half.push(new Card(`../src/assets/images/yesz.png`, Storage.createId()));

    this.cards = [
        ...half,
        ...half.map(card => new Card(card.url, Storage.createId()))
      ];
      
  }

  shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }

  loadCards() {
    this.cards.forEach((c) => this.board.append(c.element));
  }
}

export { Board };
