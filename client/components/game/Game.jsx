var React = require('react')
var { Component } = React
var io = require('socket.io-client')
var GameController = require('./GameController.jsx')
var Refresh = require('./Refresh.jsx')

class Game extends Component {
   constructor(props){
       super(props)
       this.state = {
           player:null,
           canStart:false,
           requireRefresh:false,
           messages: []
       }
       this.start = this.start.bind(this)
       this.socket = io('http://localhost:3000')
   }

   componentDidMount(){
       var { socket } = this 
       socket.on('message', (data)=>{
         var { message } =  data
         var messages = [...this.state.messages,message]
         this.setState({
             messages
         })
      });
   
       socket.on('action', (data)=> {
           var { number } = data
           socket.emit('play',{number})
       });

       socket.on('join',(player)=>{
            this.setState({
                player
            })
       })

       socket.on('canStart',(message)=>{
           var { canStart } = message
           this.setState({
               canStart
           })
       })

       socket.on('clearSession',()=>{
           this.setState({
                requireRefresh:true
           })
       })
   }


   start(number){
        var { socket } = this
        socket.emit('gameStart',{ number })
   }

   getGameController(){
       var { player, canStart,requireRefresh } = this.state
       if(player.isMaster){
           return <GameController canStart={canStart} startGame={this.start}/>
       }

       return null
   }

   render(){
      var { messages,player,canStart,requireRefresh } = this.state

      if(player == null) {
          return null
      }
      if(requireRefresh == true && !player.isMaster){
         return <Refresh/>
      }
      
      var controller = this.getGameController()

      return <div className="game">
                <div className="primary">
                   <h4 className="p-name">{player.name}</h4>
                   {controller}
                </div>
                <div className="secondary">
                  <h3 className="header">Game Of Three</h3>
                   {messages.map(m=><p>{m}</p>)}
                </div>
              </div>
   }
}

module.exports = Game