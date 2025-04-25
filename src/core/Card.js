class Card {
  constructor(url, id) {
    this.id = id;
    this.url = url;
    this.isFlipped = false;
    this.isMatched = false;
  }

  flip() {
    this.isFlipped = !this.isFlipped;
  }

  match() {
    this.isMatched = true;
  }
}

export { Card };
