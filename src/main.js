import { Login } from "./core/Login.js";
import { User } from "./core/User.js";
import { Game } from "./core/Game.js";
import { Dialog } from "./core/Dialog.js";
import { Storage } from "./utils/Storage.js";

class Main {
    constructor() {
        this.login = new Login();
        this.session = Storage.loadFromSessionStorage('fims-flip-club:session');
        this.userdata = Storage.loadFromLocalStorage('fims-flip-club:userdata') || [];

        if (!this.session || !this.session.id) return;

        const userDataEntry = this.userdata.find(u => u.id === this.session.id);
        this.user = new User(userDataEntry ?? { id: this.session.id });

        this.game = new Game(this.user);
        this.setupGame();
    }

    setupGame() {
        this.game.newGame('medium');

        document.querySelector('.new-game-button').addEventListener('click', () => this.game.newGame());

        document.querySelector('.select-option select').addEventListener('change', (e) => this.game.newGame(e.target.value));

        const pause = document.querySelector('.pause-button');
        const resume = document.querySelector('.resume-button');

        pause.addEventListener('click', () => {
            this.game.pause();
            pause.classList.toggle('hide');
            pause.classList.toggle('hidden');
            resume.classList.toggle('hide');
            resume.classList.toggle('hidden');
        });

        resume.addEventListener('click', () => {
            this.game.resume();
            pause.classList.toggle('hide');
            pause.classList.toggle('hidden');
            resume.classList.toggle('hide');
            resume.classList.toggle('hidden');
        });
    }
}

let main = null;

export function init() {
  if (main) main = null;

  main = new Main();

  document.querySelector(".logout-button")?.addEventListener("click", main.login.logout);
}

init();

const editPassword = new Dialog(document.querySelector('#edit-password-dialog'), document.querySelector('#edit-password'))
const editUsername = new Dialog(document.querySelector('#edit-username-dialog'), document.querySelector('#edit-username'))

document.querySelectorAll('input[name="user-option"]')
.forEach(radio => {
    radio.addEventListener('change', () => {
        document.querySelector('.account-option').classList.toggle('hide', radio.id !== 'account')
        document.querySelector('.preferences-option').classList.toggle('hide', radio.id !== 'preferences')
    })
})
