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
*    @param {function} call - optional callback to run
*    @return {obj}  - Ship sprite
*/
var addSprite = function(x, y, src, texture, call){
    var img  = _resources[src].textures[texture];
    var sprite = new _sprite(img);
    sprite.x   = x;
    sprite.y   = y;

    if (typeof call === "function") {
        call(sprite);
    }
    return sprite;
}

/**
*    This handles loading game resources
*    @param {obj} L - A reference to the loader object
*    @param {array} urls - A collection of resource locations for loading
*    @return {bool} - Whether the resources have successfully loaded
*/
var loadResources = function(urls = _urls, L = _loader){

    //Traverse url collection to load graphics
    for (var x = 0; x < urls.length; x++){
        L.add(urls[x]);
        console.log(urls[x] + ": loaded in the game");
    }

    /*
        TODO: make sure the return value is asynchonous based since the pixiLoader
        is async based
    */
    return true;
};


/**
*    Game loop that will constantly update the state of the game
*/
var gameLoop = function(){
    requestAnimationFrame(gameLoop);
    //game play logic goes here
    app.render();
};


(function startGame(){

    console.log(_urls);
    loadResources(_urls, _loader);

    var ship = addSprite(50,50,_astroidSpritesSheet, "ship1.png");
    console.log(ship);


    gameLoop();
})()
