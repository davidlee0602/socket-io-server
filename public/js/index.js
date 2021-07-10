let socket = io();
socket.on('connect', ()=>{
    console.log('Connected to server.');
    
    //create and emit an event
    // socket.emit('createMsg', {from: "Client", text: "hello"})
})

socket.on('disconnect', ()=>{
    console.log('Disconnected from server.');
})

socket.on('newMsg', (message)=>{
    console.log('newMsg', message);
})