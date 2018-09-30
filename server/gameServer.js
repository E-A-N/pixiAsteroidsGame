module.exports = function(io){
    const sockets = {};
    
    //When a new user connects
    io.on("connection", (socket) => {
        console.log("New connection!!", socket, socket.id);
    })
}
