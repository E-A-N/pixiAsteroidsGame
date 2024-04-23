/**
*    @class
*   A template for spriteHandlers that organize references and member to gameObjects
*/
var spriteHandler = function(){
    this.info = "Sprite Master Object!!";
    this.defaultCount = 5;
    this.currentCount = 0;
    this.countRoutine = null;
    this.countRoutine
};

//Reference collection of all gamesprites
spriteHandler.prototype.spriteList = {}; /** @member {object} */
spriteHandler.prototype.issuedIds = 0;   /** @member {number} */

/**
*    This method adds a new sprite to the sprite collection and issues it an ID
*/
spriteHandler.prototype.setupCountRoutine = function() {
    this.currentCount = 0;
    this.countRoutine = setInterval(this.countDown.bind(this), 1000);
}

/**
*    This method adds a new sprite to the sprite collection and issues it an ID
*    @param {object} spr - The sprite to be added to collection
*    @returns {number} - an id to reference the sprite with
*/
spriteHandler.prototype.countDown = function() {
    this.currentCount += 1;
    for (let i in this.spriteList){
        let spr = this.spriteList[i];
        if (spr.name === "asteroidRock" && this.currentCount !== 0){
            spr.alpha = (this.currentCount/this.defaultCount);
        }
    }
    if (this.currentCount >= this.defaultCount){
        for (let i in this.spriteList){
            let spr = this.spriteList[i];
            spr.intangible = false;
        }
        clearInterval(this.countRoutine);
    }
}

/**
*    This method checks all sprites for any particular task
*    @param {string} method - A string key that sets action to take
*    @param arg - optional argument to be passed to method argument when called
*    @returns {bool} - true if items in the sprite List have been traversed
*/
spriteHandler.prototype.spriteTraverse = function(method = false, arg = false) {
    // var sprNum = this.spriteList.length;
    // var canTraverse = sprNum > 0;
    //var useMethod = canTraverse && method && typeof method === "string";
    var canTraverse = method && typeof method === "string";
    /*
    *  Sprite method string keys are: "init", "create", "update",
    */
    var curSpr;

    if (canTraverse){
        //for(var x = 0; x < sprNum; x++) {
        for(var x in this.spriteList) {
            curSpr = this.spriteList[x];
            //Evoke an action of the current sprite
            curSpr[method](arg);
        }
    }

    return canTraverse;
}


/**
*    This method adds a new sprite to the sprite collection and issues it an ID
*    @param {object} spr - The sprite to be added to collection
*    @returns {number} - an id to reference the sprite with
*/
spriteHandler.prototype.initGameSprite = function(spr) {
    //TODO write a better method for issuing ids
    spr.id = this.issuedIds++
    this.spriteList[spr.id] = spr;
    //this.spriteList.push(spr);
    return spr.id;
}

/**
*    @param {function} - Optional callback that runs after objects have been updated
*    @returns {bool} - returns true if all applicable game objects have been updated
*/
spriteHandler.prototype.updateAll = function(delta, call = false) {
    var updated = this.spriteTraverse("update",delta)
    var useCallback = updated && call && typeof call === "function";

    if (useCallback){
        call();
    }

    return updated;
}

/**
*    @param {function} - Optional callback that runs after objects have ran their create event
*    @returns {bool} - returns true if all applicable game objects have ran their create event
*/
spriteHandler.prototype.createAll = function(call = false) {
    var updated = this.spriteTraverse("create");
    var useCallback = updated && call && typeof call === "function";

    if (useCallback){
        call();
    }

    return updated;
}

/**
*    @param {function} - Optional callback that runs after objects have ran their delete event
*    @returns {bool} - returns true if all applicable game objects have ran their delete event
*/
spriteHandler.prototype.deleteAll = function(call = false) {
    var updated = this.spriteTraverse("delete");
    var useCallback = updated && call && typeof call === "function";

    if (useCallback){
        call();
    }

    return updated;
}
