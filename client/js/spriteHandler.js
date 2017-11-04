var spriteHandler = function(){};

//Reference collection of all gamesprites
spriteHandler.prototype.sprList = [];

/*
*    This method checks all sprites and runs ideal code on them
*/
spriteHandler.prototype.spriteTraverse = function(call = false) {
    var sprNum = this.sprList.length;
    var canTraverse = sprNum > 0;
    var useCallback = call && typeof call === "function";

    if (canTraverse){
        for(var x = 0; x < sprNum; x++){
            
        }
    }

    return canTraverse;
}

spriteHandler.prototype.create = function() {


}
