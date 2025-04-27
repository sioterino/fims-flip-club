import { Login } from "./core/Login.js";
import { User } from "./core/User.js";
import { Game } from "./core/Game.js";
import { Timer } from "./core/Timer.js";
import { Board } from "./core/Board.js";
import { Card } from "./core/Card.js";

const user = new User();
const login = new Login();

document
  .querySelector(".logout-button")
  ?.addEventListener("click", login.logout);

const game = new Game()
game.newGame()

document.querySelector('.new-game-button').addEventListener('click', game.newGame)

const pause = document.querySelector('.pause-button')
const resume = document.querySelector('.resume-button')

pause.addEventListener('click', () => {
    game.pause()
    pause.classList.toggle('hide')
    pause.classList.toggle('hidden')
    resume.classList.toggle('hide')
    resume.classList.toggle('hidden')
})
resume.addEventListener('click', () => {
    game.resume()
    pause.classList.toggle('hide')
    pause.classList.toggle('hidden')
    resume.classList.toggle('hide')
    resume.classList.toggle('hidden')
})