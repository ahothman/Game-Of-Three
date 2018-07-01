var EventEmitter = require('events')
var  GameHistory = require('./gameHisotry.js')
var { actions } = require('./constants.js')
var utils = require('./utils.js')

class Game extends EventEmitter {
    constructor(){
         super()
         this.history = new GameHistory()
         this.winner = null
         this.isOver = false
    }

    setAction(action){
        this.history.addAction(action)
        if(utils.getNextNumber(action) == 1){
            this.winner = action.player
            this.isOver = true
            this.emit('win',action.player)
        }
    }

    getNextNumber(){
        var lastAction = this.history.getLastAction()
        var nextNumber = utils.getNextNumber(lastAction)
        return nextNumber
    }

    getHistory(){
        return this.history.getGameActions()
    }

    getCurrentAction(){
        var action = this.history.getLastAction()
        return action
    }
}

module.exports = Game