import { Storage } from "../utils/Storage.js";

class Card {
  constructor(url) {
    this.id = Storage.createId();
    this.url = url;
    this.file = this.#getFileName(this.url)

    this.isFlipped = false;
    this.isMatched = false;

    this.element = this.#createCard()
  }

  flip() {
    this.isFlipped = !this.isFlipped;
    this.element.classList.toggle('flipped', this.isFlipped);
  }

  match() {
    this.isMatched = true;
  }

  #createCard() {
    const el = document.createElement('div');
    el.classList.add('card');
  
    const inner = document.createElement('div');
    inner.classList.add('card-inner');
  
    const front = document.createElement('div');
    front.classList.add('card-front');
    front.style.backgroundImage = `url(${this.url})`;
  
    const back = document.createElement('div');
    back.classList.add('card-back');
    back.style.backgroundColor = 'var(--dark-blue)';
  
    inner.append(front, back);
    el.append(inner);
  
    el.id = `${this.id}`;
  
    return el;
  }

  #getFileName(url) {
    return url.split("/").pop()
  }

  disable() {
    this.element.style.pointerEvents = 'none'
  }

  enable() {
    this.element.style.pointerEvents = 'auto'
  }

  paintGray() {
    setTimeout(() => {
      this.element.style.filter = 'grayscale(1)'
    }, 500);
  }

}

export { Card };
