var gameObject = function(){};

gameObject.prototype.id = 0;

/**
*    Place holder update method for game object
*    @return {string} - returns false if object has not been over written
*/
gameObject.prototype.update = function(){
    var msg = "Please definte update method for game obj id#" + this.id;
    throw msg;
}


/**
*    Place holder create method for game object
*    @return {string} - returns false if object has not been over written
*/
gameObject.prototype.create = function(){
    var msg = "Please definte create method for game obj id#" + this.id;
    throw msg;
}
