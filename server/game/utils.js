var { actions } = require('./constants')

 function getNextNumber(gameAction){
     var currentNumber = parseInt(gameAction.currentNumber)
      switch(gameAction.action){
             case actions.plusOne:
               return (currentNumber+1)/3
             case actions.minusOne:
                return(currentNumber-1)/3
            case actions.plusZero:
                return currentNumber/3
            default:
              throw new Error('Not Supported operation')
         }
 }

 function getMessage(socketId, gameAction){
         var { player,action, currentNumber } = gameAction
         var name = player.name
         if(socketId == player.socketId){
             name = 'you'
         }

         return  {
                message:`${name} select action ${action} on number ${currentNumber}`
         }

 }


 module.exports = {
     getNextNumber,
     getMessage
 }

    