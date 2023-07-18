const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);
const connect = require('./config/db-config');
// const Chat = require('./models/chat')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


io.on('connection', (socket) => {

    socket.on('join_room',  (data) => {
        console.log(' join room event ', data)
        socket.join(data.roomId)
    })
   
    socket.on('msg_send', async (data ) => {
        console.log('send msg ',data.roomid)
        const room = io.sockets.adapter.rooms.get(data.roomid);
        const numClients = room ? room.size : 0;
        console.log('Number of clients in room:', numClients);
        io.to(data.roomid).emit("msg_rcvd", data);
        //  const chat = await Chat.create({
        //     roomId: data.roomid,
        //     user: data.username,
        //     content: data.msg
        // })
     
   })
})

app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + "/public" ))


app.post('/', (req, res) => {
    console.log('requst ',req.body)
    // const uniqeId = new Date().valueOf();
     res.status(200).json({msg: 'room joined', roomid :req.body.roomId})
})

app.get('/chat/:roomid', async (req,res) => {
    // const Chats = await Chat.find({ roomId: req.params.roomid }).select('content user')
    // console.log('id ',req.params.roomid
    res.render('index', {
        id: req.params.roomid,
       });
})



server.listen(3000, async () => {
    console.log('server started at 3000')
    await connect()
    console.log('mongodv connected')
}) 