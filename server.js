const express = require('express');
const app = express();
const server = app.listen(2000);
console.log("listening on 2000")
const io = require('socket.io')(server);
var bodyParser = require('body-parser');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(request, response){
    response.render('index')
})
    
    io.on('connection', function(socket) {

        socket.on('ok', function (data) {
            socket.emit("posting_form", {msg: "You emmited the folling info to the server " + JSON.stringify(data)})
            socket.emit("number", {num: "Your lucky number emitted by the server is " + Math.floor(Math.random() * 1000)})
            console.log(data);
        })
    })

app.get('/back', function(request, response){
    response.redirect('/')
})

