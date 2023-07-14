const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);


io.on('connection', (socket) => {
    console.log('a user connected', socket.id)

    socket.on('from_client', () => {
        console.log('Event comming from client')
   })

    setInterval(() => {
        socket.emit('from_server')
    }, 2000)
})


app.use('/', express.static(__dirname + "/public" ))

server.listen(3000, () => {
    console.log('server started')
}) 