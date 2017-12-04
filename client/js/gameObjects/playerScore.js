var Score =  function(name) {
    this.name = name || "score";
    this.score = 0;
    this.format = this.name + ": ";
};

Score.prototype.init = function(font){
    var text = this.name + ": " + this.score;
    var fontVal = font || {font: "32px sans-serif", fill: "white"};
    this.instance = new PIXI.Text(text, fontVal);
}

Score.prototype.updateScore = function(value){
    this.score += value || 0;
    this.instance.text = this.format + this.score;
    return this.score;
}
