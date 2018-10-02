module.exports = (soc, server, config) => {
    soc.init = false;
    soc.game = {};

    const controls = require("./player/controls")(soc,server, config);
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
        const dataExists = Object.keys(data).length > 0;
        if (dataExists){
            controls(data)
        }
        

        //find a way to make server calculate input from here eanDebug
    });

    //eanDebug check if disconnect or disconnecting is proper built in api
    soc.on("disconnect", () => {
        console.log(soc.id + " has disconnected!!");
        if (server.sockets[soc.id]){
            delete server.sockets[soc.id];
        //find a way to make server remove the player from all other clients (sockets) eanDebug
        }
    })

    return soc;
}
