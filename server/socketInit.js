module.exports = (soc, server, config) => {
    soc.init = false;
    soc.game = {};
    soc.on("ean test!!", (clientData) => {
        soc.username = clientData.username;
        console.log("Username changed to:", clientData.username);
    });

    soc.on("join_game", () => {
        if (!soc.init){
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
        //soc
    })

    return soc;
}
