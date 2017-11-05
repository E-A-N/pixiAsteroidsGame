var gameObject = {}
gameObject.id = 0; //game id
gameObject.spd = 1;   //basic sprite movement speed
gameObject.vx = 0; //velocity x
gameObject.vy = 0; //veloctiy y


/**
*    Place holder update method for game object, no return values because this method is arbitrary.
*/
gameObject.update = function(){};


/**
*    Place holder create method for game object, no return value because this method is arbitrary
*    This method throws an error if it's not defined by an instance
*/
gameObject.create = function(){};


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
