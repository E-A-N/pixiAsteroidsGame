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

gameObject.gatherStageInfo = function(width, height) {

}



/**
*    This function checks if a sprite is on the border of a stage and sends it to the opposite side of it is.
*    @param {number} stageWidth - The horizonal size of ideal stage
*    @param {number} stageHeight - The vertical size of ideal stage
*    @param {bool} - Returns true if there's any screen wrap
*/
gameObject.screenWrap = function(stageWidth, stageHeight){

    var wrapLeft   = this.x < -this.width/2;
    var wrapRight  = this.x > stageWidth + this.width/2;
    var wrapTop    = this.y < -this.height/2;
    var wrapBottom = this.y > stageHeight + this.height/2;

    if (wrapLeft)   this.x  = stageWidth + this.width/2;
    if (wrapRight)  this.x  = -this.width/2;
    if (wrapTop)    this.y  = stageWidth + this.height/2;
    if (wrapBottom) this.y = -this.height/2;

    return wrapLeft || wrapRight || wrapTop || wrapBottom
}
