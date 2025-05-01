import { Storage } from "./Storage.js";

class DOM {
  static popup(str, warning = false) {
    const popup = document.querySelector(".popup");

    if (warning) {
      popup.classList.add("red-popup");
      popup.classList.remove("green-popup");
      popup.querySelector("span").textContent = "cancel";
    } else {
      popup.classList.add("green-popup");
      popup.classList.remove("red-popup");
      popup.querySelector("span").textContent = "check_circle";
    }

    popup.querySelector("p").textContent = str;

    popup.classList.add("popup-show");
    setTimeout(() => {
      popup.classList.remove("popup-show");
    }, 2000);
  }

  static settings() {
    const loginData = Storage.loadFromLocalStorage("fims-flip-club:login");
    const sessionData = Storage.loadFromSessionStorage(
      "fims-flip-club:session"
    );

    const user = loginData.find((u) => u.id == sessionData.id);

    const account = document.querySelector(".account-option");
    account.querySelector("#username").placeholder = user.username;
    account.querySelector("#password").placeholder = "*".repeat(
      user.password.length
    );
  }

  static stats() {
    const userData = Storage.loadFromLocalStorage("fims-flip-club:userdata");
    const sessionData = Storage.loadFromSessionStorage(
      "fims-flip-club:session"
    );

    const stats = userData.find((u) => u.id == sessionData.id);

    if (!stats) return

    const score = document.querySelector(".score-stats");
    score.querySelector(".account-score").textContent = stats.score;
    score.querySelector(".avarage-score").textContent = Math.ceil(
      stats.score / stats.gamesPlayed
    );
    score.querySelector(".score-per-time").textContent = Math.ceil(
      stats.score /
        (stats.gameData.reduce((sum, game) => sum + game.time, 0) /
          stats.gameData.length /
          1000)
    );

    const time = document.querySelector(".time-stats");
    time.querySelector('.best-time').textContent = Math.min(...stats.gameData.map(game => game.time)) / 1000
    time.querySelector('.avarage-time').textContent = (stats.gameData.reduce((sum, game) => sum + game.time, 0) / stats.gameData.length / 1000).toFixed(3)
    time.querySelector('.worst-time').textContent = Math.max(...stats.gameData.map(game => game.time)) / 1000

    const game = document.querySelector(".game-stats");
    game.querySelector('.easy-percent').textContent = (stats.easy / stats.gamesPlayed).toFixed(2)
    game.querySelector('.medium-percent').textContent = (stats.medium / stats.gamesPlayed).toFixed(2)
    game.querySelector('.hard-percent').textContent = (stats.hard / stats.gamesPlayed).toFixed(2)
  }

  static toggleSettings() {
    const settings = document.querySelector('.settings')
    const table = document.querySelector('.table')

    document.querySelector('.setting-button').addEventListener('click', () => {
        settings.classList.remove('hide')
        table.classList.add('hide')
    })


    document.querySelector('.logotipo').addEventListener('click', () => {
        settings.classList.add('hide')
        table.classList.remove('hide')
    })
  }

  static toggleBetweenSettings() {
    document.querySelectorAll('input[name="user-option"]')
    .forEach(radio => {
        radio.addEventListener('change', () => {
            document.querySelector('.account-option').classList.toggle('hide', radio.id !== 'account')
            document.querySelector('.preferences-option').classList.toggle('hide', radio.id !== 'preferences')
        })
    })
  }

  static themeSwitch() {
    const body = document.querySelector('body')
    document.querySelector('#theme-switch').addEventListener('change', e => {
        const darkMode = e.target.checked
        darkMode ? body.classList.add('dark-mode') : body.classList.remove('dark-mode')

        const loginData = Storage.loadFromLocalStorage('fims-flip-club:login')
        const id = main.user.id

        const i = loginData.findIndex(u => u.id == id)

        if (i === -1) return

        loginData[i]['dark-mode'] = darkMode

        Storage.saveToLocalStorage('fims-flip-club:login', loginData)
    })
  }

}

export { DOM };
