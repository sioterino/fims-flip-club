class Storage {
  static #ids = new Set();

  static loadFromLocalStorage(key) {
    const raw = localStorage.getItem(key);
    const data = raw ? JSON.parse(raw) : null;
    return data || [];
  }

  static saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static loadFromSessionStorage(key) {
    const raw = sessionStorage.getItem(key);
    const data = raw ? JSON.parse(raw) : null;
    return data || [];
  }

  static saveToSessionStorage(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  static createId() {
    let id;

    do {
      id = Date.now() + Math.floor(Math.random() * 1000);
    } while (this.#ids.has(id));

    this.#ids.add(id);
    return id;
  }

  static encode(str) {
    return btoa(str);
  }

  static decode(str) {
    return atob(str);
  }
}

export { Storage };
