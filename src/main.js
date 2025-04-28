import { Login } from "./core/Login.js";
import { User } from "./core/User.js";
import { Game } from "./core/Game.js";

const user = new User();
const login = new Login();

document
  .querySelector(".logout-button")
  ?.addEventListener("click", login.logout);

const game = new Game()
game.newGame('easy')

document.querySelector('.new-game-button').addEventListener('click', game.newGame)

document.querySelector('.select-option select').addEventListener('change', e => game.newGame(e.target.value))

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