var EventEmitter = require('events')
var  GameHistory = require('./gameHisotry.js')
var { actions } = require('./constants.js')
var { getNextNumber } = require('./utils.js')

class Game extends EventEmitter {
    constructor(){
         super()
         this.history = new GameHistory()
         this.winner = null
         this.isOver = false
    }

    setAction(action){
        this.history.addAction(action)
        if(action.getNextNumber() == 1){
            this.winner = action.player
            this.isOver = true
            this.emit('win',action.player)
            this.emit('end')
        }
    }

    getNextNumber(){
        var lastAction = this.history.getLastAction()
        var nextNumber = getNextNumber(lastAction)
        return nextNumber
    }

    getHistory(){
        return this.history.getGameActions()
    }

    getCurrentAction(){
        var action = this.history.getLastAction()
        
        return JSON.stringify({player:action.player.name,
               number:action.currentNumber,action:action.action})
    }
}

module.exports = Game