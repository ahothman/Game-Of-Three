var { getMessage } = require('../game/utils.js')

module.exports = [
    {
        eventName:'gameStart',
        handler:function(socket,message){
            var  { session }  = this,
                 { number } = message ,
                 { game } = session,
                 otherPlayer = session.getOtherPlayer(socket.id)

               game.on('win',(player)=>{
                 var currentAction= game.getCurrentAction()
                 socket.emit('message',getMessage(socket.id,currentAction))
                 socket.to(otherPlayer.socketId).emit('message',getMessage(otherPlayer.socketId,currentAction))

                  if(socket.id == player.socketId){
                     socket.emit('message',{message:'you won!!!'})
                     socket.to(otherPlayer.socketId).emit('message',{message:'sorry, you lost!!!'})
                  }
                  else{
                     socket.emit('message',{message:'sorry, you lost!!!'})
                     socket.to(otherPlayer.socketId).emit('message',{message:'you won!!!'})
                  }
                  this.io.emit('gameOver')
                  session.clear()
             })
     
             socket.emit('message',{message:`the game is started with ${number}`})
             socket.to(otherPlayer.socketId).emit('message',{message:`the game is started with ${number}`})
             
             otherPlayer.play(number)
             var currentAction= game.getCurrentAction()
             
             
             if(!game.isOver){
                 var nextNumber = game.getNextNumber()
                 socket.emit('action', {number:nextNumber})
                 socket.emit('message',getMessage(socket.id,currentAction))
                 socket.to(otherPlayer.socketId).emit('message',getMessage(otherPlayer.socketId,currentAction))
             }
     
           
      }
    },
    {
       eventName:'play',
       handler:function(socket,message){
        var {session} = this,
            { number } = message,
            { game } = session,
            currentPlayer = session.getCurrentPlayer(socket.id),
            otherPlayer = session.getOtherPlayer(socket.id)
   
        currentPlayer.play(number)
       
        if(!game.isOver){
           var nextNumber = game.getNextNumber()
           var currentAction= game.getCurrentAction()
           socket.emit('message',getMessage(socket.id,currentAction))
           socket.to(otherPlayer.socketId).emit('message',getMessage(otherPlayer.socketId,currentAction))
           socket.to(otherPlayer.socketId).emit('action', {number:nextNumber})
        }
    }
},
{
    eventName:'disconnect',
    handler:function(socket){
     var { session } = this,
         currentPlayer = session.getCurrentPlayer(socket.id),
         otherPlayer = session.getOtherPlayer(socket.id)

       if( currentPlayer != null && currentPlayer.isMaster){ 
           session.clear()
           if(otherPlayer!=null)
              socket.to(otherPlayer.socketId).emit('clearSession')
       }
      else {
          if(otherPlayer != null){
              session.deletePlayer(socket.id)
              socket.to(otherPlayer.socketId).emit('canStart',{canStart:false})
          }
      }
    }  
}]