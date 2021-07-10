import { join } from 'path';
import { createServer } from 'http';
import express, { static } from 'express';
import socketIO from 'socket.io';

const publicPath  = join(__dirname, '/../public');
const port = process.env.PORT || 4000;

import dotenv from 'dotenv';
const app = express();
const server = createServer(app);
const io = socketIO(server);

app.use(static(publicPath));

io.on('connection', (socket)=>{
    //io for broadcast
    //socket for single client connection

    //private room
    socket.join('room1');
    console.log("A new user connected.");

    //server sends event and data to individual client
    socket.emit("newMsg", {
        from: "Admin",
        text: "Welcome to the chat app!",
        createdAt: new Date().getTime()
    })

    //server broadcasts messages excluding new connection client
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