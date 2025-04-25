import { Login } from "./core/Login.js";
import { Card } from "./core/Card.js";
import { Storage } from "./utils/Storage.js";

const login = new Login();

document
  .querySelector(".logout-button")
  .addEventListener("click", login.logout);

const characters = [
  "heurimong",
  "hongppippi",
  "kimachi",
  "sakkukku",
  "zuharong"
];
const cards = [];

characters.forEach((fim) => {
    for (let i = 1; i < 7; i++) {
        cards.push(new Card(`../src/assets/images/${fim}-${i}.png`, Storage.createId()))
    }
});

cards.push(new Card(`../src/assets/images/summerz.png`, Storage.createId()))
cards.push(new Card(`../src/assets/images/yesz.png`, Storage.createId()))

const duplicatedCards = [...cards, ...cards]
duplicatedCards.sort(() => Math.random() - 0.5)

console.log(duplicatedCards)

const board = document.querySelector('.board')
duplicatedCards.forEach(card => {
    const el = document.createElement('div')

    el.classList.add('img')
    el.classList.add('card')

    el.id = card.id
    el.style.backgroundImage = `url(${card.url})`;

    board.append(el)
});
