//var gameSoul = function(){};
var gameSoul = Object.create(PIXI.Sprite)

gameSoul.prototype.id = 0; //game id
gameSoul.prototype.spr = {}; //container for Pixi sprite
/**
*    Place holder update method for game object, no return values because this method is arbitrary.
*    This method throws an error if it's not defined by an instance
*/
gameSoul.prototype.update = function(){
    var msg = "Please define update method for game obj id#" + this.id;
    throw msg;
}


/**
*    Place holder create method for game object, no return value because this method is arbitrary
*    This method throws an error if it's not defined by an instance
*/
gameSoul.prototype.create = function(){
    var msg = "Please define create method for game obj id#" + this.id;
    throw msg;
}
