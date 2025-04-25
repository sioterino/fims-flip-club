import { Login } from './core/Login.js'

const login = new Login()

document.querySelector('.logout-button').addEventListener('click', login.logout)
