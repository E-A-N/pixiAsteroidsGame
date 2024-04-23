/**
*    @class
*   A template for spriteHandlers that organize references and member to gameObjects
*/
var GameMaster = {};
GameMaster.info = "Sprite Master Object!!";
GameMaster.defaultCount = 5;
GameMaster.currentCount = 0;
GameMaster.countRoutine = null;
GameMaster.bigRockStart = -1;
GameMaster.initiatingNewWave = false;


//Reference collection of all gamesprites
GameMaster.spriteList = {}; /** @member {object} */
GameMaster.issuedIds = 0;   /** @member {number} */

/**
*    GameMaster method adds a new sprite to the sprite collection and issues it an ID
*/
GameMaster.setupCountRoutine = function() {
    GameMaster.currentCount = 0;
    GameMaster.countRoutine = setInterval(GameMaster.countDown, 1000);
}

/**
*    This starts the next stage of the game
*/
GameMaster.newWave = function() {
    GameMaster.bigRockStart += 2;
    GameMaster.initiatingNewWave = true;
    let rockTypes = ["rock1.png", "rock2.png"];
    for (let i = 0; i < GameMaster.bigRockStart; i++){
        let coinFlip = Math.random() > 0.5 ? 0 : 1;
        var asteroid = addSprite(
            Math.floor(Math.random() * _gameWidth),
            Math.floor(Math.random() * _gameHeight), 
            _astroidSpritesSheet, 
            rockTypes[coinFlip], 
            asteroidRock
        );
        asteroid.sizeState = "large";
        app.stage.addChild(asteroid);
    }
    GameMaster.createAll();
    GameMaster.setupCountRoutine();
}

/**
*    This method checks for existing astroids, starting a new wave
if there are none
*/
GameMaster.checkForCompletedWave = function() {
    if(GameMaster.initiatingNewWave){
        return;
    }
    for (let i in GameMaster.spriteList){
        let spr = GameMaster.spriteList[i];
        if (spr.name === "asteroidRock"){
            return;
        }
    }

    console.log("no more astroids, new wave time!!");
    GameMaster.newWave();
}


/**
*    This method adds a new sprite to the sprite collection and issues it an ID
*    @param {object} spr - The sprite to be added to collection
*    @returns {number} - an id to reference the sprite with
*/
GameMaster.countDown = function() {
    GameMaster.currentCount += 1;
    for (let i in GameMaster.spriteList){
        let spr = GameMaster.spriteList[i];
        if (spr.name === "asteroidRock" && GameMaster.currentCount !== 0){
            console.log("new rock!", spr.alpha);
            spr.alpha = (GameMaster.currentCount/GameMaster.defaultCount);
        }
    }
    if (GameMaster.currentCount >= GameMaster.defaultCount){
        for (let i in GameMaster.spriteList){
            let spr = GameMaster.spriteList[i];
            spr.intangible = false;
        }
        GameMaster.initiatingNewWave = false;
        clearInterval(GameMaster.countRoutine);
    }
}

/**
*    This method checks all sprites for any particular task
*    @param {string} method - A string key that sets action to take
*    @param arg - optional argument to be passed to method argument when called
*    @returns {bool} - true if items in the sprite List have been traversed
*/
GameMaster.spriteTraverse = function(method = false, arg = false) {
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
        for(var x in GameMaster.spriteList) {
            curSpr = GameMaster.spriteList[x];
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
GameMaster.initGameSprite = function(spr) {
    //TODO write a better method for issuing ids
    spr.id = GameMaster.issuedIds++
    GameMaster.spriteList[spr.id] = spr;
    //GameMaster.spriteList.push(spr);
    return spr.id;
}

/**
*    @param {function} - Optional callback that runs after objects have been updated
*    @returns {bool} - returns true if all applicable game objects have been updated
*/
GameMaster.updateAll = function(delta, call = false) {
    var updated = GameMaster.spriteTraverse("update",delta)
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
GameMaster.createAll = function(call = false) {
    var updated = GameMaster.spriteTraverse("create");
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
GameMaster.deleteAll = function(call = false) {
    var updated = GameMaster.spriteTraverse("delete");
    var useCallback = updated && call && typeof call === "function";

    if (useCallback){
        call();
    }

    return updated;
}
