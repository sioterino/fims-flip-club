import { Storage } from "../utils/Storage.js"

class User {
    constructor(data) {
        this.id = data.id

        this.gamesPlayed = data.gamesPlayed || 0
        this.bestTime = data.bestTime || null

        this.score = data.score || 0

        this.hard = data.hard || 0
        this.medium = data.medium || 0
        this.easy = data.easy || 0

        this.gameData = data.gameData || []
    }

    pushGame(game) {
        this.gameData.push(game)
        this.#calculate()
        this.#saveToLocalStorage()
    }

    #calculate() {
        const bestGame = this.gameData.reduce((best, game) => {
            const currentTime = game.time;
            if (!best || currentTime < best.time) {
                return game;
            }
            return best;
        }, null);
    
        this.bestTime = bestGame ? bestGame.time : null;
    
        this.hard = this.gameData.filter(game => game.mode === 'hard').length;
        this.medium = this.gameData.filter(game => game.mode === 'medium').length;
        this.easy = this.gameData.filter(game => game.mode === 'easy').length;
    
        this.score = this.gameData.reduce((totalScore, game) => totalScore + game.score, 0);
    
        this.gamesPlayed = this.gameData.length;
    }
    
    #saveToLocalStorage() {
        const userdata = Storage.loadFromLocalStorage('fims-flip-club:userdata');
        const index = userdata.findIndex(user => user.id === this.id);

        console.log(this.id)
        console.log(index)

        if (index !== -1) {
            userdata[index] = this;
        } else {
            userdata.push(this);
        }

        Storage.saveToLocalStorage('fims-flip-club:userdata', userdata);
    }
}

export { User }