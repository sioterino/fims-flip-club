import { Card } from "./Card.js";

class Board {
  #characters = ["heurimong", "hongppippi", "kimachi", "sakkukku", "zuharong"];

  constructor(mode = 'medium') {
    this.board = document.querySelector(".board");

    this.mode = mode;
    this.totalCards = this.#calculateTotalCards(this.mode);

    this.cards = [];
    this.newBoard();
  }

  newBoard() {
    this.cards = [];

    const all = [];

    this.#characters.forEach((fim) => {
      for (let i = 1; i < 7; i++) {
        all.push(new Card(`../src/assets/images/${fim}-${i}.png`));
      }
    });
    all.push(new Card(`../src/assets/images/summerz.png`));
    all.push(new Card(`../src/assets/images/yesz.png`));

    const needed = (this.totalCards / 2)
    const selected = all
    .filter( card => !card.file.includes('summerz') && !card.file.includes('yesz') )
    .sort( () => Math.random() - .5 )
    .slice( 0, needed - 2 )

    const half = [
      ...selected,
      all.find(card => card.file.includes("summerz")),
      all.find(card => card.file.includes("yesz"))
    ]

    this.cards = [
        ...half,
        ...half.map(card => new Card(card.url))
      ];

      this.#updateBoardGrid();
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

  #calculateTotalCards(mode) {
    switch (mode) {
      case 'easy': return 16;
      case 'medium': return 36;
      case 'hard': return 64;
      default: return 16;
    }
  }

  #updateBoardGrid() {
    const rowcol = Math.ceil( Math.sqrt(this.totalCards) )

    this.board.style.gridTemplate = `repeat(${rowcol}, 100px) / repeat(${rowcol}, 100px)`;
  }
}

export { Board };
