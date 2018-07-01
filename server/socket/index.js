var socketIO = require('socket.io')
var listeners = require('./listeners')

class Scoket {
  constructor(app){
      var { session } = app.settings
      this.session = session
  }


  init(server){
      this.io = socketIO.listen(server)
      this.io.on('connection',socket=>{
          var { session } = this
         
          if(session.canJoin){
             session.addPlayer(socket.id)
             var player = session.getCurrentPlayer(socket.id)
             socket.emit('join',
             {   
                name:player.name,
                isMaster:player.isMaster
              })
          }

          if(session.canStart){
              var socketId = session.player1.socketId
              socket.to(socketId).emit('canStart',{canStart:true})
          }

          listeners.forEach(l => {
              socket.on(l.eventName,l.handler.bind(this,socket))
          });
      })
  }
}

module.exports = Scoket