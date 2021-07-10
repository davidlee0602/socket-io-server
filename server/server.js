const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath  = path.join(__dirname, '/../public');
const port = process.env.PORT || 4000;

const dotenv = require('dotenv');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    //io for broadcast
    //socket for single client connection

    console.log("A new user connected.");

    socket.emit("newMsg", {
        from: "Admin",
        text: "Welcome to the chat app!",
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit("newMsg", {
        from: "Admin",
        text: "New User Joined",
        createdAt: new Date().getTime()
    })


    //custom event
    // socket.on('createMsg', (message)=>{
    //     console.log("A new user joined.");

        // broadcast to everyone including client emitting event
        // io.emit('newMsg', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })


        //broadcast to everyone excluding client emitting event
        // socket.broadcast.emit('newMsg', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    // })

    // uses socket param passed
    socket.on('disconnect', ()=>{
        console.log("A user disconnected.");
    })
})

server.listen(port, () => {
    console.log(`Communication Server started in port: ${port}`);

})