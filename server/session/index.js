var Game = require('../game/game.js')
var Player = require('../game/player.js')

class Session {
  constructor(){
      this.player1 = null
      this.player2 = null
      this.game = new Game()

  }

  _isValidScoket(socketId){
      if(this.player1.socketId == socketId || this.player2.socketId == socketId){
          return true
      }
      return false  
  }

  addPlayer(socektId){
        if(this.player1 == null){
            this.player1 = new Player('player_1',socektId,this.game)
        }
        else if(this.player2 == null){
            this.player2  = new Player('player_2',socektId,this.game)
        }
  }

  getNextNumber(){
    var nextNumber =  this.game.getNextNumber()
    return nextNumber
  }

 getCurrentPlayer(socketId){

    if(!this._isValidScoket(socketId)) {
        throw new Error('the sockeId is not in this session')
    }

    if(this.player1.socketId == socketId){
        return this.player1
    }

    return this.player2
 }

 getOtherPlayer(socketId){
    if(!this._isValidScoket(socketId)) {
        throw new Error('the sockeId is not in this session')
    }

    if(this.player1.socketId == socketId){
        return this.player2
    }
    
    return this.player1
 }

 get canJoin(){
     /** chech if the session has 2 player  */
     return this.player1 == null || this.player2 == null
 }

 get isRunning(){
     return !this.game.isOver  && !this.canJoin
 }
}

module.exports = Session