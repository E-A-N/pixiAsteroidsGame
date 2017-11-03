//setup game constants
var _container      = PIXI.container;
var _renderEngine   = PIXI.autoDetectRenderer;
var _loader         = PIXI.loader;
var _resources      = PIXI.resources;
var _sprite         = PIXI.Sprite;
var _gameWidth      = 256;
var _gameHeight     = 256;
var _imgRoot       = "../img/";

//Create a stage and add it to DOM
var stage = new _container();
var renderer = _renderEngine(_gameWidth, _gameHeight) //draw the stage
document.body.appendChild(renderer.view);

var preload = function(){

}

/**
*    @param {int} x - horizontal axis coordinate to set in canvas
*    @param {int} y - vertical axis coordiante to set in canvas
*    @return {obj}  - Ship sprite
*/
var createShip = function(x,y,resource){
     //var
}


//load graphical assets
_loader
    .add(_imgRoot + "fireball.png")
    .add(_imgRoot + "ship1.png")
    .add(_imgRoot + "ship2.png")
    .load()
