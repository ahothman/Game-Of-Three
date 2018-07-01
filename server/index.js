var path = require('path')
var http  = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var Session = require('./session')
var Socket = require('./socket')
var sockets = []

var app  = express()
app.use(express.static(path.join(__dirname,'socket.io')))
app.use('/build',express.static(path.join(__dirname,'../build')))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.set('session',new Session())

app.get('/',(req,res)=>{
    var { session } = app.settings
    
    if(session.isRunning){
        res.redirect('/session/busy')
    }
    else{
        res.render('index')
    }
   
})

app.get('/session/busy',(req,res)=>{
    var { session } = app.settings
    
    if(session.isRunning){
        res.render('busySession')
    }
    else{
        res.redirect('/')
    }
})

var server =  app.listen(3000,(req,res)=>{
    console.log('server started on 3000')
})

var socket =  new Socket(app)
socket.init(server)

