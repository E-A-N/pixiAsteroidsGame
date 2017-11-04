var gameObject = function(){};

gameObject.prototype.id = 0;

/**
*    Place holder update method for game object, no return values because this method is arbitrary.
*    This method throws an error if it's not defined by an instance
*/
gameObject.prototype.update = function(){
    var msg = "Please define update method for game obj id#" + this.id;
    throw msg;
}


/**
*    Place holder create method for game object, no return value because this method is arbitrary
*    This method throws an error if it's not defined by an instance
*/
gameObject.prototype.create = function(){
    var msg = "Please define create method for game obj id#" + this.id;
    throw msg;
}
