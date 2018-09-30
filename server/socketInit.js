module.exports = (soc) => {
    soc.isInGame = false;
    soc.on("ean test!!", (data) => {
        soc.username = data.username;
        console.log("Username changed to:", data.username);
    });

    soc.on("join_game", () => {

    })
}
