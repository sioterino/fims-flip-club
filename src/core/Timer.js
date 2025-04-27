class Timer {
  constructor() {
    this.startTime = null;
    this.intervalId = null;

    this.timer = document.querySelector('.timer')
    this.element = this.#createElement()

    this.timer.append(this.element)
  }

  start() {
    this.startTime = Date.now();
    this.intervalId = setInterval(() => this.#updateElement(), 100);
  }

  #update() {
    const now = Date.now();
    const elapsed = now - this.startTime;

    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    const milliseconds = Math.floor(elapsed % 1000);

    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0") +
      ":" +
      String(milliseconds).padStart(2, "0")
    );
  }

  pause = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.elapsedTime = Date.now() - this.startTime;
      this.intervalId = null;
    }
  };
  

  resume = () => {
    if (!this.intervalId) {
      this.startTime = Date.now() - this.elapsedTime;
      this.intervalId = setInterval(() => this.#updateElement(), 100);
    }
  };
  

  stop = () => {
    clearInterval(this.intervalId);
  }

  #createElement() {
    const el = document.createElement('p')
    el.classList.add('clock')
    return el
  }

  #updateElement() {
    this.element.textContent = this.#update()
  }
}

export { Timer };


