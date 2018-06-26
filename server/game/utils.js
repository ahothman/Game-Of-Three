var { actions } = require('./constants')

 function getNextNumber(gameAction){
      switch(gameAction.action){
             case actions.plusOne:
               return (gameAction.currentNumber+1)/3
             case actions.minusOne:
                return(gameAction.currentNumber-1)/3
            case actions.plusZero:
                return gameAction.currentNumber/3
            default:
              throw new Error('Not Supported operation')
         }
 }


 module.exports = {
     getNextNumber
 }

    