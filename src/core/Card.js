class Card {
  constructor(url, id) {
    this.id = id;
    this.url = url;
    this.file = this.#getFileName(this.url)

    this.isFlipped = false;
    this.isMatched = false;

    this.element = this.#createCard()
    this.#init()
  }

  flip() {
    this.isFlipped = !this.isFlipped;
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
  

  #init() {
    this.element.addEventListener('click', () => {
      this.flip();
      this.element.classList.toggle('flipped', this.isFlipped);
    });
  }
  

  #getFileName(url) {
    return url.split("/").pop()
  }


}

export { Card };
