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
    console.log("A new user connected.");

    // uses socket param passed
    socket.on('disconnect', ()=>{
        console.log("A user disconnected.");
    })
})



server.listen(port, () => {
    console.log(`Communication Server started in port: ${port}`);

})