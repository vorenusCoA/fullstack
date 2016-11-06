var WebSocketServer = require('ws').Server
var http = require('http')

var server = http.createServer()

server.listen(5000)

var wss = new WebSocketServer({
    server: server
})

wss.on('connection', function (ws){
    console.log('connection open!')

    var iSnd = setInterval(function (){
        var msg = 'ping from server: ' + new Date()
        ws.send(msg)
    }, 3000)

    ws.on('message', function (msg){
        console.log(msg)
    })

    ws.on('close', function (){
        console.log('connection closed!')
        clearInterval(iSnd)
    })
})
