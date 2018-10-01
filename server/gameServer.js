module.exports = function(io){
    const sockets = {};
    const socketInit = require("socketInit");
    const config = require("config");

    //When a new user connects
    io.on("connection", (socket) => {
        console.log("New connection!!", socket, socket.id);
        socket = socketInit(socket, config);
    })
}
