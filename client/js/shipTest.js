//setup game constants
var _container      = PIXI.container;
var _renderEngine   = PIXI.autoDetectRenderer;
var _loader         = PIXI.loader;
var _resources      = PIXI.loader.resources;
var _sprite         = PIXI.Sprite;
var _gameWidth      = 500;
var _gameHeight     = 500;
var _imgRoot        = "/img/";
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

//Create a stage and add it to DOM
// var stage = new _container();
// var renderer = _renderEngine(_gameWidth, _gameHeight) //draw the stage
//document.body.appendChild(app.view);

(function gameCheck(app){

    var style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
    });
    var text = new PIXI.Text("PIXI is Running!! <3", style);
    text.x = 50;
    text.y = 50;
    app.stage.addChild(text);

    app.render();

})(app)


var preload = function(){

}

/**
*    @param {int} x - horizontal axis coordinate to set in canvas
*    @param {int} y - vertical axis coordiante to set in canvas
*    @return {obj}  - Ship sprite
*/
var createShip = function(x,y,sprSource){
    var src  = _resources[_imgRoot + "astroidsSprite.json"].textures[sprSource];
    var ship = new _sprite(src);
    ship.x   = x;
    ship.y   = y;

    return ship;
}

var start = function() {
    var myShip = createShip(200, 200, "ship1.png");
    app.stage.addChild(myShip);
}

//load graphical assets
_loader
    .add(_imgRoot + "astroidsSprite.json")
    .load(start)
