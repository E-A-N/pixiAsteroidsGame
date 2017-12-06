var Ost = function(src){
    this.src = src || [
        "/client/audio/bangSmall.wav",
        "/client/audio/bangMedium.wav",
        "/client/audio/bangLarge.wav",
        "/client/audio/fire.wav",
        "/client/audio/thrust.wav",
    ];

    this.soundCollection = [];
};

/**
*    This method is to be used for traversal through source collection
*    @returns {object} A Howl instance from howler.js library
*/
Ost.prototype._setupSound = function(x){
    const config = {
        src: x,
        autoplay: false,
        loop: false,
        volume: 0.5,
    };
    return new Howl(config);
}

Ost.prototype.init = function(){
    const method = this._setupSound;
    this.soundCollection = this.src.map(method);
};

//Sound.soundCollection[1].play();

ga = new Ost();
ga.init();
