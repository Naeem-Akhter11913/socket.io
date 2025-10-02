
const bookSocket = (io) =>{
    io.on('connection',(socket) =>{
        console.log("Client connected:", socket.id);
        
        
        
        socket.on('disconnect',(io) =>{
            console.log("Client disconnected:", socket.id);
        })
    })
}

module.exports = bookSocket;