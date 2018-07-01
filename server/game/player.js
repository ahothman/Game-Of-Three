var  GameAction  = require('./gameAction.js')
var { actions } = require('./constants.js')

class Player {
    constructor(name,socketId,game,isMaster){
        this.name =  name
        this.socketId = socketId
        this.game = game
        this.isMaster = isMaster
    }

    play(currentNumber){
        var action
        if(currentNumber%3 == 0){
            action = actions.plusZero
        }
        else if((currentNumber+1)%3 == 0){
            action = actions.plusOne
        }
        else{
            action = actions.minusOne
        }
         var gameAction = new GameAction(this,currentNumber,action)
         this.game.setAction(gameAction)
    }

}

module.exports = Player