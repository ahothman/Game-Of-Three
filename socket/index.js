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
          console.log('connected',socket.id)
          if(session.canJoin){
             this.session.addPlayer(socket.id)
          }
          listeners.forEach(l => {
              socket.on(l.eventName,l.handler.bind(this,socket))
          });
      })
  }
}

module.exports = Scoket