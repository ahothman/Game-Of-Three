class GameHistory {
   constructor(){
       this._history = []
   }

   addAction(gameAction){
        this._history.push(gameAction)
   }

   getGameActions(){
       return [...this._history]
   }

   getLastAction(){
        return this._history[this._history.length-1]
   }
}

module.exports = GameHistory