module.exports = [
    {
        eventName:'gameStart',
        handler:function(socket,message){
            var  { session }  = this,
                 { number } = message ,
                 { game } = session,
                 otherPlayer = session.getOtherPlayer(socket.id)
     
             socket.emit('message',{message:`the game is started with ${number}`})
             socket.to(otherPlayer.socketId).emit('message',{message:`the game is started with ${number}`})
             
             otherPlayer.play(number)
             socket.emit('message',{message:game.getCurrentAction()})
             socket.to(otherPlayer.socketId).emit('message',{message:game.getCurrentAction()})
             if(!game.isOver){
                 var nextNumber = session.getNextNumber()
                 socket.emit('action', {number:nextNumber})
             }
     
             game.on('win',(player)=>{
                 socket.emit('message',{message:game.getCurrentAction()})
                 socket.to(otherPlayer.socketId).emit('message',{message:game.getCurrentAction()})
                 
                  if(socket.id == player.socketId){
                     socket.emit('message',{message:'you won!!!'})
                     socket.to(otherPlayer.socketId).emit('message',{message:'sorry, you lost!!!'})
                  }
                  else{
                     socket.emit('message',{message:'sorry, you lost!!!'})
                     socket.to(otherPlayer.socketId).emit('message',{message:'you won!!!'})
                  }
             })
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
           var nextNumber = session.getNextNumber()
           socket.emit('message',{message:game.getCurrentAction()})
           socket.to(otherPlayer.socketId).emit('message',{message:game.getCurrentAction()})
           socket.to(otherPlayer.socketId).emit('action', {number:nextNumber})
        }
    }
},
{
    eventName:'disconnect',
    handler:function(socket,message){
       console.log('disconnect',socket.id)
    }
}
]