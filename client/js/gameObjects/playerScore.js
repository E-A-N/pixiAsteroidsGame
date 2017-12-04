var Score =  function(name) {
    this.name = name || "score";
    this.score = 0;
};

Score.prototype.init = function(font){
    this.format = this.name + ": " + this.score;
    var fontVal = font || {font: "32px sans-serif", fill: "white"};
    this.instance = new PIXI.Text(this.format, fontVal);
    this.instance.position.set(50,50);
}

Score.prototype.updateScore = function(value){
    this.score += value || 0;
    this.instance.text = this.format + this.score;
    return this.score;
}
