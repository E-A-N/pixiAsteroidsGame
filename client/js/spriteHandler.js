//create prototype object
var spriteHandler = function(){
    this.info = "Sprite Master Object!!";
};

//Reference collection of all gamesprites
spriteHandler.prototype.spriteList = [];
spriteHandler.prototype.issuedIds = 0;


/**
*    This method checks all sprites for any particular task
*    @param {string} method - A string key that sets action to take
*    @return {bool} - true if items in the sprite List have been traversed
*/
spriteHandler.prototype.spriteTraverse = function(method = false) {
    var sprNum = this.spriteList.length;
    var canTraverse = sprNum > 0;
    var useMethod = canTraverse && method && typeof method === "string";
    /*
    *  Sprite method string keys are: "init", "create", "update",
    */
    var curSpr;

    if (canTraverse){
        for(var x = 0; x < sprNum; x++) {

            curSpr = this.spriteList[x];
            //Evoke an action of the current sprite
            curSpr[method]();
        }
    }

    return canTraverse;
}


/**
*    This method adds a new sprite to the sprite collection and issues it an ID
*    @param {object} spr - The sprite to be added to collection
*    @return {number} - an id to reference the sprite with
*/
spriteHandler.prototype.initGameSprite = function(spr) {
    //TODO write a better method for issuing ids
    spr.id = this.issuedIds++
    this.spriteList.push(spr);

    return spr.id;
}

/**
*    This method adds new sprites to the sprite collection and issues them IDs
*    @param {array} sprites - The sprite to be added to collection
*    @return {array} - a collection of the added IDs
*/
spriteHandler.prototype.initGameSprites = function(sprites) {
    var amount = sprites.length;
    var idList = [];
    for (var x = 0; x < amount; x++) {
        //TODO write a better method for issuing ids
        sprites[x].id = this.issuedIds++;
        idList.push(this.issuedIDs);
        this.spriteList.push(sprites[x]);
    }
    return idList;
}

/**
*    @param {function} - Optional callback that runs after objects have been updated
*    @return {bool} - returns true if all applicable game objects have been updated
*/
spriteHandler.prototype.updateAll = function(call = false) {
    var updated = this.spriteTraverse("update")
    var useCallback = updated && call && typeof call === "function";

    if (useCallback){
        call();
    }

    return updated;
}
