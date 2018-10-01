module.exports = (soc, server, config) => {
    soc.init = false;
    soc.game = {};
    soc.on("ean test!!", (clientData) => {
        soc.username = clientData.username;
        console.log("Username changed to:", clientData.username);
    });

    soc.on("join_game", (data) => {
        if (!soc.init){
            soc.game.type = data.type;
            soc.game.x = 250;
            soc.game.y = 250;
            soc.join(server.game._currentRoom);
            soc.emit(config.successfulJoin);
        }
        else {
            console.log(soc.username, "is already in the game!");
        }
    });

    soc.on("playerInput", (data) => {
        soc.game.leftInput    = data.leftIn;
        soc.game.rightInpout  = data.rightIn;
        soc.game.actionInput  = data.actionIn;
        //find a way to make server calculate input from here eanDebug
    });

    soc.on("disconnecting", () => {
        console.log(soc.id + " has disconnected!!");
        if (server.sockets[soc.id]){
            delete server.sockets[soc.id];
        //find a way to make server remove the player from all other clients (sockets) eanDebug
        }
    })

    return soc;
}
