//create prototype object
var sprMaster = function(){
    this.info = "Sprite Master Object!!";
};

//Reference collection of all gamesprites
sprMaster.prototype.sprList = [];
sprMaster.prototype.issuedIds = 0;


/**
*    This method checks all sprites for any particular task
*    @param {function} method - An object method based actions to take
*    @return {bool} - true if items in the sprite List have been traversed
*/
sprMaster.prototype.spriteTraverse = function(method = false) {
    var sprNum = this.sprList.length;
    var canTraverse = sprNum > 0;
    var useMethod = call && typeof call === "string";
    var curSpr;

    if (canTraverse){
        for(var x = 0; x < sprNum; x++){
            curSpr = this.sprList[x];
            //Evoke an action of the current sprite
            useMethod ? curSpr[call]() : console.log(curSpr);
        }
    }

    return canTraverse;
}


/**
*    This method adds a new sprite to the sprite collection and issues it an ID
*    @param {object} spr - The sprite to be added to collection
*    @return {number} - an id to reference the sprite with
*/
sprMaster.prototype.addGameSprite = function(spr) {


    //TODO write a better method for issuing ids
    spr.id = ++this.issuedIds
    this.sprList.push(spr);

    return spr.id;
}

var frosty = {}
frosty.update = function() {
    console.log("its me frosty!!");
}
