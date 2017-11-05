//setup game constants
var _container      = PIXI.container;
var _renderEngine   = PIXI.autoDetectRenderer;
var _loader         = PIXI.loader;
var _resources      = PIXI.loader.resources;
var _sprite         = PIXI.Sprite;
var _gameWidth      = 500;
var _gameHeight     = 500;
var _imgRoot        = "/img/";
var _astroidSpritesSheet = _imgRoot + "astroidsSprite.json";
var _urls           = [_astroidSpritesSheet];
var _gameCanvas     = document.getElementById("gameContainer");
var _gameMaster     = new spriteHandler; //from spriteHandler.js

//assign app parameters
var opts = {};
opts.autoStart = false;
opts.width     = _gameWidth;
opts.height    = _gameHeight;
opts.backgroundColor = 0x1099bb;

//initialize app
var app = new PIXI.Application(opts);
_gameCanvas.appendChild(app.view);

// (function gameCheck(app){
//
//     var style = new PIXI.TextStyle({
//         fontFamily: 'Arial',
//         fontSize: 36,
//         fontStyle: 'italic',
//         fontWeight: 'bold',
//         fill: ['#ffffff', '#00ff99'], // gradient
//         stroke: '#4a1850',
//         strokeThickness: 5,
//         dropShadow: true,
//         dropShadowColor: '#000000',
//         dropShadowBlur: 4,
//         dropShadowAngle: Math.PI / 6,
//         dropShadowDistance: 6,
//         wordWrap: true,
//         wordWrapWidth: 440,
//     });
//     var text = new PIXI.Text("PIXI is Running!! <3", style);
//     text.x = 50;
//     text.y = 50;
//     app.stage.addChild(text);
//
//     app.render();
//
// })(app)


/**
*    @param {int} x - horizontal axis coordinate to set in canvas
*    @param {int} y - vertical axis coordiante to set in canvas
*    @param {object} src - A url reference to collection of textures
*    @param {string} texture - A url reference to ideal texture
*    @param {function} call - optional callback assign attributes to new sprite
*    @return {obj}  - Ship sprite
*/
var addSprite = function(x, y, src, texture, call = false){
    var img  = _resources[src].textures[texture];
    var spr = new _sprite(img);
    spr = gameObject.sprConstruct(spr);
    spr.x = x;
    spr.y = y;

    if (call && typeof call === "function") {
        call(spr);
    }

    _gameMaster.initGameSprite(spr);
    return spr;
}

/**
*    This handles loading game resources
*    @param {obj} L - A reference to the loader object
*    @param {array} urls - A collection of resource locations for loading
*    @param {function} call - Function to run when resources have fully loaded
*    @return {bool} - Whether the resources have successfully loaded
*/
var preload = function(urls = _urls, L = _loader){

    //Traverse url collection to cache graphics
    for (var x = 0; x < urls.length; x++){
        L.add(urls[x]);
        console.log(urls[x] + ": loaded in the game");
    }
    //Load all resources into the game
    L.load();

    //return value does not effect asynchronous timing
    return true;
};




/**
*    Game loop that will constantly update the state of the game
*/
var update = function(){
    requestAnimationFrame(update);
    //game play logic goes here

    _gameMaster.updateAll();
    //app.render();
};

/**
*   TODO: make this function more modular and testable, add parameters and return value
*/
var createPhase = function(){
    console.log("Everything has loaded!");
    //ship is the player character
    var ship = addSprite(50, 50, _astroidSpritesSheet, "ship1.png", playerShip);

    var ast1 = addSprite(250,250, _astroidSpritesSheet, "rock1.png", asteroidRock);
    app.stage.addChild(ship);
    app.stage.addChild(ast1);
}

//Make sure resources are loaded before starting game
_loader.onComplete.add(createPhase);

//Run the game
(function startGame(){

    console.log(_urls);
    preload(_urls, _loader);
    //console.log(ship);
    app.render();
    update();
})()
