var path = require('path')
var http  = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var socketIO = require('socket.io')
var Session = require('./session')

var sockets = []

var app  = express()
app.use(express.static(path.join(__dirname,'socket.io')))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.set('session',new Session())

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../index.html'))
})

var server =  app.listen(3000,(req,res)=>{
    console.log('server started on 3000')
})


var sockets = []
var io = socketIO.listen(server);
io.on('connection', socket=> {
var {session} = app.settings
 console.log(socket.id)
 sockets.push(socket.id)
 session.addPlayer(socket.id)

 socket.on('gameStart',(message)=>{
       var { number } = message ,
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
 })

 socket.on('play',(message)=>{
     var { number } = message,
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
 })

});