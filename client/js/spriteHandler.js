var spriteHandler = function(){};

//Reference collection of all gamesprites
spriteHandler.prototype.sprList = [];

/*
*    This method checks all sprites and runs ideal code on them
*/
spriteHandler.prototype.spriteTraverse = function(call = false) {
    var sprNum = this.sprList.length;
    var canTraverse = sprNum > 0;
    var useCallback = call && typeof call === "string";
    var curSpr;

    if (canTraverse){
        for(var x = 0; x < sprNum; x++){
            curSpr = this.sprList[x];
            //Evoke an action of the current sprite
            useCallback ? curSpr[call]() : console.log(curSpr);
        }
    }

    return canTraverse;
}

/**
*    This method runs a create event on all existing game sprites
*    @return {bool} - returns true if sprites exist with the create method
*/
spriteHandler.prototype.createAll = function() {
    var successfulCreate = this.spriteTraverse("create");
    return successfulCreate;
}
