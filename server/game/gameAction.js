var { actions } = require('./constants.js')

class GameAction {
    constructor(player,currentNumber,action){
        this.player = player
        this.currentNumber = currentNumber
        this.action = action
    }
}

module.exports = GameAction