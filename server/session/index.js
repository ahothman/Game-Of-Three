var Game = require('../game/game.js')
var Player = require('../game/player.js')

class Session {
  constructor(){
      this.player1 = null
      this.player2 = null
      this.game = new Game()

  }

  _isValidScoket(socketId){
      if(this.player1 != null && this.player1.socketId == socketId) 
          return true
      if(this.player2 != null && this.player2.socketId == socketId)
          return true
      return false  
  }

  addPlayer(socketId){
        if(this.player1 == null){
            this.player1 = new Player('player_1',socketId,this.game,true)
        }
        else if(this.player2 == null){
            this.player2  = new Player('player_2',socketId,this.game,false)
        }
  }

  deletePlayer(socketId){
     if(this.player1!=null && this.player1.socketId == socketId){
         this.player1 = null
     }
     else if(this.player2 != null && this.player2.socketId == socketId){
        this.player2 = null
    }
  }

 clear(){
     this.player1 = null
     this.player2 = null
     this.game  = new Game()
 }

 getCurrentPlayer(socketId){

    if(!this._isValidScoket(socketId)) {
      return null
    }

    if(this.player1.socketId == socketId){
        return this.player1
    }

    return this.player2
 }

 getOtherPlayer(socketId){
    if(!this._isValidScoket(socketId)) {
       return null
    }

    if(this.player1.socketId == socketId){
        return this.player2
    }
    
    return this.player1
 }

 getMasterPlayer(){
    if(!this._isValidScoket(socketId)) {
        return null
     }
    if(this.player1.isMaster){
        return this.player1
    }
    if(this.player2.isMaster){
        return this.player2
    }
 }

 get canJoin(){
     /** chech if the session has 2 player  */
     return this.player1 == null || this.player2 == null
 }

 get canStart(){
     return this.player1 != null && this.player2 !=null
 }

 get isRunning(){
     return !this.game.isOver  && !this.canJoin
 }
}

module.exports = Session