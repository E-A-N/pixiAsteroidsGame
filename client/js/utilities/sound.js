var Sound = function(src){
    this.src = src || [
        "/client/audio/bangSmall.wav",
        "/client/audio/bangMedium.wav",
        "/client/audio/bangLarge.wav",
        "/client/audio/fire.wav",
        "/client/audio/thrust.wav",
    ];

    this.soundCollection = [];
};

/*
*    This method is to be used for traversal through source collection
*/
Sound.prototype._setupSound = function(x){
    var config = {
        src: x,
        autoplay: false,
        loop: false,
        volume: 0.5,
    }
    return new Howl(config);
}

Sound.prototype.init = function(){
    var method = this._setupSound;
    this.soundCollection = this.src.map(method);
};
