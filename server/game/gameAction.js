var { actions } = require('./constants.js')

class GameAction {
    constructor(player,currentNumber,action){
        this.player = player
        this.currentNumber = currentNumber
        this.action = action
    }

    getNextNumber(){
         switch(this.action){
             case actions.plusOne:
               return (this.currentNumber+1)/3
             case actions.minusOne:
                return(this.currentNumber-1)/3
            case actions.plusZero:
                return this.currentNumber/3
            default:
              throw new Error('Not Supported operation')
         }
    }

    // _getAction(){
    //     if(currentNumber%3 == 0){
    //         action = actions.plusZero
    //     }
    //     else if((currentNumber+1)%3 == 0){
    //         action = actions.plusOne
    //     }
    //     else{
    //         action = actions.minusOne
    //     }
    // }

}

module.exports = GameAction