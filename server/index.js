const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { userRoute } = require('./routes/userRoute');
const { chatRoute } = require('./routes/chatRoute');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());


connectDB();         //create dataBase


const port = process.env.PORT || 3000;
const server = process.env.SERVER_URL || `http://localhost:${port}`


app.listen(port, () => {
    console.log(`===== server started on  : ${server}`);
})


// ------------- routes -------------
app.use('/api/user', userRoute)
app.use('/api/chat',chatRoute )







// const io = require('socket.io')(3000)

// const users = {}

// io.on('connection', socket => {
//   socket.on('new-user', name => {
//     users[socket.id] = name
//     socket.broadcast.emit('user-connected', name)
//   })
//   socket.on('send-chat-message', message => {
//     socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
//   })
//   socket.on('disconnect', () => {
//     socket.broadcast.emit('user-disconnected', users[socket.id])
//     delete users[socket.id]
//   })
// })


