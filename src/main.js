import { Login } from "./core/Login.js";
import { Board } from "./core/Board.js";

const login = new Login();

document.querySelector(".logout-button").addEventListener("click", login.logout);

const board = new Board()
board.shuffle()
board.loadCards()
