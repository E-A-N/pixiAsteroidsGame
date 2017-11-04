//var gameObject = function(){};
var gameObject = {}

gameObject.id = 0; //game id

/**
*    Place holder update method for game object, no return values because this method is arbitrary.
*    This method throws an error if it's not defined by an instance
*/
gameObject.update = function(){
    var msg = "Please define update method for game obj id#" + this.id;
    throw msg;
}


/**
*    Place holder create method for game object, no return value because this method is arbitrary
*    This method throws an error if it's not defined by an instance
*/
gameObject.create = function(){
    var msg = "Please define create method for game obj id#" + this.id;
    throw msg;
}

/**
*    @param {object} spr - Reference to sprite to extend with gameObject attributes
*    @return {object} - updated gameObject
*/
gameObject.sprConstruct = function(spr) {
    var attributes = Object.keys(gameObject);

    for (var x = 0; x < attributes.length; x++){
        var attr = attributes[x];
        spr[attr] = gameObject[attr];
    }

    return spr;
}
